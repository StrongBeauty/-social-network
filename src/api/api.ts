import axios from "axios";
import {UserType} from "../redux/users-reducer";


export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '065141aa-5aec-4cbf-85a6-d8a09e624b9e'
    }
})

export enum ResultCodeEnum {
    Succes = 0,
    Error,
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


