import {instance, OperationObjectType, ResultCodeEnum} from "./api";
import {DataType} from "../redux/auth-reducer";

export const authAPI = {
    me() {
        return instance.get<OperationObjectType<DataType>>(`/auth/me`)
    },

    login(email: string, password: string, rememberMe: boolean = false, captcha?: string) {
        return instance.post<OperationObjectType<LoginResponseDataType>>(`/auth/login`, {email, password, rememberMe, captcha})
    },

    logout() {
        return instance.delete(`/auth/login`)
    },
}

type  LoginResponseDataType = {
    userId: number
}


