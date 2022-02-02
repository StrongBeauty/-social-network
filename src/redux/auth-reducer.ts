import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {authAPI} from "../api/auth-api";


const initialState = {
    data: {} as DataType,
    isAuth: false
}

export const authReducer = (state: AuthPageType = initialState, action: ActionsType): AuthPageType => {
    switch (action.type) {
        case 'SN/AUTH/SET_USERS_DATA':

            return {
                ...state,
                ...action.data,
                isAuth: action.isAuth,
            }
        default:
            return state

    }
}


export const actions = {
    setAuthUsersData: (data: DataType, isAuth: boolean) =>
        ({type: 'SN/AUTH/SET_USERS_DATA', data, isAuth} as const),
}


export const getAuthUserData = (): ThunkType =>
    async (dispatch) => {
        const response = await authAPI.me()
        if (response.data.resultCode === 0) {
            dispatch(actions.setAuthUsersData(response.data as any, true))
        }
    }

export const login = (email: string, password: string, rememberMe: boolean): ThunkType =>
    async (dispatch) => {
        const response = await authAPI.login(email, password, rememberMe)
        if (response.data.resultCode === 0) {
            dispatch(getAuthUserData())
        }
    }

export const logout = (): ThunkType =>
    async (dispatch) => {
        const response = await authAPI.logout()
        if (response.data.resultCode === 0) {
            dispatch(actions.setAuthUsersData({id: -1, login: '', email: ''}, false))
        }
    }

export type AuthPageType = typeof initialState

type ActionsType = InferActionsTypes<typeof actions>

type ThunkType = BaseThunkType<ActionsType, void>

export type AuthType = {
    resultCode: 0
    messages: []
    data: DataType
}

export type DataType = {
    id: number
    login: string
    email: string
}


