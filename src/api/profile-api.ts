import {instance} from "./api";

export const profileAPI = {

    async getProfileUser(userId: number) {
        const response = await instance.get(`profile/${userId}`)
        return response.data

    },

    async getStatus(userId: number) {
        const response = await instance.get(`profile/status/${userId}`)
        return response.data
    },

    async updateStatus(status: string) {
        const response = await instance.put(`profile/status`, {status: status})
        return response.data
    },
}
