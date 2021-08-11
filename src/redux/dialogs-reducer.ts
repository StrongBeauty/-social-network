//const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY'
import {InferActionsTypes} from "./redux-store";

//const SEND_MESSAGE = 'SN/DIALOGS/SEND-MESSAGE'

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
        {id: 6, message: 'Welcom'}
    ] as Array<MessageType>,
    //newMessageBody: '' as string
}


export const dialogsReducer = (state = initialState, action: ActionsType): DialogsPageType => {
   // let stateCopy

    switch (action.type) {
/*        case UPDATE_NEW_MESSAGE_BODY: {
            return {
                ...state,
                newMessageBody: action.body
            }
            //return stateCopy
        }*/
        case 'SN/DIALOGS/SEND-MESSAGE': {
            let body = action.newMessageBody
            //let body = state.newMessageBody
            return {
                ...state,
                //newMessageBody: '',
                messages: [...state.messages, {id: 6, message: body}]
            }
            //return stateCopy
        }
        default:
            return state
    }
}

export const actions = {
    sendMessageActionCreator:  (newMessageBody: string) =>
        ({type: 'SN/DIALOGS/SEND-MESSAGE', newMessageBody} as const)
}


/*export const updateNewMessageBodyActionCreator = (body: string): UpdateNewMessageBodyActionType =>
    ({type: UPDATE_NEW_MESSAGE_BODY, body})*/


/*type SendMessageActionType = {
    type: typeof SEND_MESSAGE
    newMessageBody: string
}*/
/*type UpdateNewMessageBodyActionType = {
    type: typeof UPDATE_NEW_MESSAGE_BODY
    body: string
}*/
//type ActionsTypes = SendMessageActionType
    //| UpdateNewMessageBodyActionType

export type DialogsPageType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

export type DialogType = {
    id: number
    name: string
}
export type MessageType = {
    id: number
    message: string
}
