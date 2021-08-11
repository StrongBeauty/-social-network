import {instance} from "./api";

export const profileAPI = {

    getProfileUser(userId: number) {
        return instance.get(`profile/${userId}`)
            .then(response => {
                return response.data
            })
    },

    getStatus(userId: number) {
        return instance.get(`profile/status/${userId}`)
            .then(response => {
                return response.data
            })
    },

    updateStatus(status: string) {
        return instance.put(`profile/status`, {status: status})
            .then(response => {
                return response.data
            })
    },
}