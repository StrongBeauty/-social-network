import {ResponseType, instance} from "./api";
import {DataType} from "../redux/auth-reducer";

export const authAPI = {
    me() {
        return instance.get<ResponseType<DataType>>(`/auth/me`)
    },

    login(email: string, password: string, rememberMe: boolean = false) {
        return instance.post<ResponseType<LoginResponseDataType>>(`/auth/login`, {email, password, rememberMe})
    },

    logout() {
        return instance.delete(`/auth/login`)
    },
}


type  LoginResponseDataType = {
    userId: number
}
