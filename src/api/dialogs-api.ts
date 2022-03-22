import { DialogType } from '../redux/dialogs-reducer';
import {GetItemsType, instance, OperationObjectType} from './api';



export const dialogsAPI = {
    async getDialogs() {
        const response = await instance.get<DialogType[]>(`/dialogs`)
        return response.data // or response, but hardly

    },

     startDialog(userId: number) {
        return  instance.put<OperationObjectType>(`/dialogs/${userId}`) //specify OperationObjectType
    },

    async getMessages(userId: number, currentPage: number = 1, pageSize: number = 10) {
        const response = await instance.get<GetItemsType>(`dialogs/${userId}/messages?page=${currentPage}&count=${pageSize}`) //specify GetItemsType
        return response.data
    },

    async sendMessage(userId: number, message: string) { //redux-thunk
            const response = await instance.post(`dialogs/${userId}/messages`, {message})
        console.log(response)
            return response.data
    },

    async isMessageViewed(messageId: number) {
        const response = await instance.get(`dialogs/messages/${messageId}/viewed`) //TS
        return response.data
    },

    async setMessageInSpam(messageId: number) {
        const response = await instance.post(`dialogs/messages/${messageId}/spam`) //TS
        return response.data
    },

    async deleteMessage(messageId: number) {
        const response = await instance.delete(`dialogs/messages/${messageId}`) //TS
        return response.data
    },

    async restoreMessage(messageId: number) {
        const response = await instance.put(`dialogs/messages/${messageId}/restore`) //TS
        return response.data
    },

    async getDateMessages(userId: number, date: string) {
        const response = await instance.get(`dialogs/${userId}/messages/new?newerThen=${date}`) //TS
        return response.data
    },

    async getNewMessages() {
        const response = await instance.get(`dialogs/messages/new/count`)
        return response.data
    },
}
