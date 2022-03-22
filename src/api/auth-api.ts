import {instance, OperationObjectType} from "./api";
import {AuthDataType} from "../redux/auth-reducer";

type  UserIdType = {
    userId: number
}

export const authAPI = {
    async me() {
        const response = await instance.get<OperationObjectType<AuthDataType>>(`/auth/me`)
        return response.data
    },

    async login(email: string, password: string, rememberMe: boolean = false, captcha?: string) {
        const response = await instance.post<OperationObjectType<UserIdType>>(`/auth/login`, {email, password, rememberMe, captcha})
        return response.data
    },

    async logout() {
        const response = await instance.delete<OperationObjectType>(`/auth/login`)
        return response.data
    },
}


