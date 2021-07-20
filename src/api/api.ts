import axios from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    headers: {
        'API-KEY': '065141aa-5aec-4cbf-85a6-d8a09e624b9e'
    }
})

export const usersAPI = {
    getUsers (currentPage: number, pageSize: number) {
        return instance.get(`/users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },
    getNoUsers () {
        return instance.get(`/users`)
            .then(response => {
                return response.data
            })
    }
}

export const authAPI = {
    getAuthUser() {
        return instance.get(`/auth/me`)
            .then(response => {
                return response.data
            })
    },

}

export const profileAPI = {
    getProfileUser(userId: number) {
        return instance.get(`/profile/${userId}`)
            .then(response => {
                return response.data
            })
    },
}