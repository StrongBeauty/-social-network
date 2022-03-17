import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {authAPI} from "../api/auth-api";
import {securityAPI} from "../api/security-api";

const initialState = {
    data: {} as DataType,
    isAuth: false,
    captchaUrl: '' as string ,
}

export const authReducer = (state: AuthPageType = initialState, action: ActionsType): AuthPageType => {
    switch (action.type) {

        case 'SN/AUTH/SET_USERS_DATA':
            return {
                ...state,
                data: action.data,
                isAuth: action.isAuth,
            }

        case 'SN/AUTH/GET_CAPTCHA_URL':

            return {
                ...state,
                captchaUrl: action.url,
            }
        default:
            return state

    }
}


export const actions = {
    setAuthUsersData: (data: DataType, isAuth: boolean) =>
        ({type: 'SN/AUTH/SET_USERS_DATA', data, isAuth} as const),

    getCaptchaUrl: (url: string) =>
        ({type: 'SN/AUTH/GET_CAPTCHA_URL', url} as const)
}


export const getAuthUserData = (): ThunkType =>
    async (dispatch) => {
        const response = await authAPI.me()
        if (response.data.resultCode === 0) {
            dispatch(actions.setAuthUsersData(response.data.data as DataType, true))
        }
    }

export const getCaptchaUrl = (): ThunkType =>
    async (dispatch) => {
        const response = await securityAPI.getCaptchaUrl()
        dispatch(actions.getCaptchaUrl(response.data.url))
    }

export const loginThunk = (email: string, password: string, rememberMe: boolean, captcha?: string): ThunkType =>
    async (dispatch) => {
        const response = await authAPI.login(email, password, rememberMe, captcha)
        if (response.data.resultCode === 0) {
            dispatch(getAuthUserData())
        } else if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl())
        }
    }

export const logoutThunk = (): ThunkType =>
    async (dispatch) => {
        const response = await authAPI.logout()
        if (response.data.resultCode === 0) {
            dispatch(actions.setAuthUsersData({id: '', login: '', email: ''}, false))
        }
    }

export type AuthPageType = typeof initialState

type ActionsType = InferActionsTypes<typeof actions>

type ThunkType = BaseThunkType<ActionsType, void>

export type AuthType = {
    resultCode: number
    messages: []
    data: DataType
}

export type DataType = {
    id: number | ''
    login: string
    email: string
}


