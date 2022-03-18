import {instance, OperationObjectType, ResultCodeEnum} from "./api";
import {DataType} from "../redux/auth-reducer";

export const authAPI = {
    async me() {
        const response = await instance.get<OperationObjectType<DataType>>(`/auth/me`)
        console.log('me ',  response)
        return response.data
    },

    async login(email: string, password: string, rememberMe: boolean = false, captcha?: string) {
        const response = await instance.post<OperationObjectType<LoginResponseDataType>>(`/auth/login`, {email, password, rememberMe, captcha})
        console.log('login', response)
        return response.data
    },

    async logout() {
        const response = await instance.delete<OperationObjectType>(`/auth/login`)
        console.log('logout', response)
        return response.data
    },
}

type  LoginResponseDataType = {
    userId: number
}


