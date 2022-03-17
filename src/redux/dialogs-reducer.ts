import { PhotosType } from "./profile-reducer";
import {InferActionsTypes} from "./redux-store";

const initialState = {
    dialogs: [
        {id: 1, name: 'A'},
        {id: 2, name: 'B'},
        {id: 3, name: 'C'},
        {id: 4, name: 'D'},
        {id: 5, name: 'E'},
        {id: 6, name: 'F'}
    ] as Array<DialogType>,
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'Hey'},
        {id: 3, message: 'Hello'},
        {id: 4, message: 'Yo'},
        {id: 5, message: 'Yep'},
        {id: 6, message: 'Welcome'}
    ] as Array<MessageType>,
}

export const dialogsReducer = (state = initialState, action: ActionsType): DialogsPageType => {

    switch (action.type) {
        case 'SN/DIALOGS/SEND-MESSAGE': {
            let body = action.newMessageBody
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: body}]
            }
        }
        default:
            return state
    }
}

export const actions = {
    sendMessageActionCreator: (newMessageBody: string) =>
        ({type: 'SN/DIALOGS/SEND-MESSAGE', newMessageBody} as const)
}

export type DialogsPageType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

export type DialogType = {
    id: number
    name: string
    userName: string,
    hasNewMessages: boolean,
    lastDialogActivityDate: string,
    lastUserActivityDate: string,
    newMessagesCount: 0,
    photos: PhotosType
}
export type MessageType = {
    id: number
    message: string
}

