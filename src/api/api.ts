import axios from "axios";
import {UserType} from "../redux/users-reducer";


export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    headers: {
        'API-KEY': '054f8216-62dd-456e-9d45-b11474987d99'
    }
})

export enum ResultCodeEnum {
    Success = 0,
    Captcha = 10,
    Error = 1 ,
}

export type OperationObjectType<D = {}, RC = ResultCodeEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}

export type GetItemsType<T = []> = {
    items: T[]
    totalCount: number
    error: string
}


