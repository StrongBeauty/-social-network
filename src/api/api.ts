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
    Succes = 0,
    Captcha = 10,
    Error = 1 ,
}


export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string
}

export type ResponseType<D = {}, RC = ResultCodeEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}


