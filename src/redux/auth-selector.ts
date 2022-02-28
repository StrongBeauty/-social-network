import {AppStateType} from "./redux-store";

export const selectIsAuth = (state: AppStateType) => {
    return state.auth.isAuth
}

export const selectCaptchaUrl = (state: AppStateType) => {
    return state.auth.captchaUrl
}

export const selectAuthorizedUserId = (state: AppStateType) => {
    return state.auth.data.id
}

export const selectLogin = (state: AppStateType) => {
    return state.auth.data.email
}
