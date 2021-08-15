import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {authAPI} from "../api/auth-api";
import Login from "../components/Login/Login";


const initialState = {
    data: {}  as DataType ,
    isAuth: false
}


export const authReducer = (state: AuthPageType = initialState, action: ActionsType): AuthPageType  => {
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


export const getAuthUserData = (): ThunkType => (dispatch) => {
    authAPI.me()
        .then(response => {
            if (response.data.resultCode === 0) {
                console.log('res',response)
                dispatch(actions.setAuthUsersData(response.data as any,  true))
            }
        })
}

export const login = (email: string, password: string, rememberMe: boolean): ThunkType => (dispatch) => {
    authAPI.login(email, password, rememberMe)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(getAuthUserData())
            }
        })
}

export const logout = (): ThunkType => (dispatch) => {
    authAPI.logout()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(actions.setAuthUsersData({id: -1, login: '', email: '' }, false))
            }
        })
}

/*type SetAuthUsersDataACT = {
    type: 'SET_USERS_DATA'
    data: DataType
    isAuth: boolean
}*/

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
