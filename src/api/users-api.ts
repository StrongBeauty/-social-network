import {GetItemsType, instance} from "./api";




export const  usersAPI = {
    async getUsers(currentPage: number, pageSize: number) {
        const response = await instance.get<GetItemsType>(`/users?page=${currentPage}&count=${pageSize}`)
                return response.data
    },
    async getNoUsers() {
        const response = await instance.get<GetItemsType>(`/users`)
                return response.data
    },
    follow(userId: number) {
        return instance.post(`/follow/${userId}`)

    },
    unfollow(userTd: number) {
        return instance.delete(`/follow/${userTd}`)
    },
}
