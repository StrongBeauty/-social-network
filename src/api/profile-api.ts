import {PhotosType, ProfileType} from "../redux/profile-reducer";
import {instance, OperationObjectType} from "./api";

type PhotosDataType = {
    photos: PhotosType
}

export const profileAPI = {

    async getProfileUser(userId: number) {
        const response = await instance.get<ProfileType>(`/profile/${userId}`)
        return response.data

    },

    async setProfile(profile: ProfileType) {
        const response = await instance.put<OperationObjectType>(`profile`, {profile})
        return response.data
    },

    async getStatus(userId: number) {
        const response = await instance.get<string>(`/profile/status/${userId}`)
        return response.data
    },

    async updateStatus(status: string) {
        const response = await instance.put<OperationObjectType>(`/profile/status`, {status: status})
        return response.data
    },

    async savePhoto(photoFile: File) {
        const formData = new FormData()
        formData.append('image', photoFile)
        const response = await instance.put<OperationObjectType<PhotosDataType>>(`/profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data
    },
}
