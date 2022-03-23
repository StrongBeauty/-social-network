import { UserType } from "../redux/users-reducer";
import {GetItemsType, instance, OperationObjectType} from "./api";

export const  usersAPI = {
    async getUsers(currentPage?: number, pageSize?: number) {
        const response = await instance.get<GetItemsType<UserType>>(`/users?page=${currentPage}&count=${pageSize}`)
                return response.data
    },
    async getNoUsers() {
        const response = await instance.get<GetItemsType<UserType>>(`/users`)
                return response.data
    },
    async follow(userId: number) {
        const response = await instance.post<OperationObjectType>(`/follow/${userId}`)
        return  response.data

    },
    async unfollow(userTd: number) {
        const response = await instance.delete<OperationObjectType>(`/follow/${userTd}`)
        return response.data
    },
}


