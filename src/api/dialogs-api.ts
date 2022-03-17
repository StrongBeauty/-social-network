import { DialogType } from '../redux/dialogs-reducer';
import {instance, OperationObjectType} from './api';



export const dialogsAPI = {

    async getDialogs() {
        const response = await instance.get<DialogType[]>(`/dialogs`)
        return response.data // or response, but hardly

    },

    async startDialog(userId: number) {
        const response = await instance.put<OperationObjectType>(`/dialogs/${userId}`)
        return response.data
    },

    async getMessages(userId: number, currentPage: number = 1, pageSize: number = 10) {
        const response = await instance.get<GetMessagesResponse>(`dialogs/${userId}/messages?page=${currentPage}&count=${pageSize}`)
        return response.data
    },

    async sendMessage(userId: number, message: string) { //redux-thunk
            const response = await instance.post(`dialogs/${userId}/messages`, {message})
            return response.data
    },

    async isMessageViewed(messageId: number) {
        const response = await instance.get(`dialogs/messages/${messageId}/viewed`)
        return response.data
    },

    async setMessageInSpam(messageId: number) {
        const response = await instance.post(`dialogs/messages/${messageId}/spam`)
        return response.data
    },

    async deleteMessage(messageId: number) {
        const response = await instance.delete(`dialogs/messages/${messageId}`)
        return response.data
    },

    async restoreMessage(messageId: number) {
        const response = await instance.put(`dialogs/messages/${messageId}/restore`)
        return response.data
    },

    async getDateMessages(userId: number, date: string) {
        const response = await instance.get(`dialogs/${userId}/messages/new?newerThen=${date}`)
        return response.data
    },

    async getNewMessages() {
        const response = await instance.get(`dialogs/messages/new/count`)
        return response.data
    },
}

dialogsAPI.getDialogs()

type GetMessagesResponse = {
    error: string | null
    items: []
    totalCount: number
}
