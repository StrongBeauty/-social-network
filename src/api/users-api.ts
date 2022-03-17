import { UserType } from "../redux/users-reducer";
import {GetItemsType, instance, OperationObjectType} from "./api";

export const  usersAPI = {
    async getUsers(currentPage: number, pageSize: number) {
        const response = await instance.get<GetItemsType<UserType>>(`/users?page=${currentPage}&count=${pageSize}`)
        console.log(response)
                return response.data
    },
    async getNoUsers() {
        const response = await instance.get<GetItemsType<UserType>>(`/users`)
                return response.data
    },
    follow(userId: number) {
        return instance.post<OperationObjectType>(`/follow/${userId}`)

    },
    unfollow(userTd: number) {
        return instance.delete<OperationObjectType>(`/follow/${userTd}`)
    },
}


