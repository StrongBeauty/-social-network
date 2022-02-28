import {ResponseType, instance} from "./api";
import {DataType} from "../redux/auth-reducer";

export const authAPI = {
    me() {
        return instance.get<ResponseType<DataType>>(`/auth/me`)
    },

    login(email: string, password: string, rememberMe: boolean = false, captcha?: string) {
        return instance.post<ResponseType<LoginResponseDataType>>(`/auth/login`, {email, password, rememberMe, captcha})
    },

    logout() {
        return instance.delete(`/auth/login`)
    },
}


type  LoginResponseDataType = {
    userId: number
}
