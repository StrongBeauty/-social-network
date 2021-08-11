import {GetItemsType, instance} from "./api";




export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },
    getNoUsers() {
        return instance.get<GetItemsType>(`users`)
            .then(response => {
                return response.data
            })
    },
    follow(userTd: number) {
        return instance.post(`follow/${userTd}`)

    },
    unfollow(userTd: number) {
        return instance.delete(`follow/${userTd}`)
    },

    /*getProfileUser(userId: number) {
        return instance.get(`/profile/${userId}`)
            .then(response => {
                return response.data
            })
    },*/
}