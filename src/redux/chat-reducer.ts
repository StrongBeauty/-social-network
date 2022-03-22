import {chatAPI, ChatMessageType} from "../api/chat-api";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {Dispatch} from "redux";

const initialState = {
    messages: [] as ChatMessageType[]
}

export const chatReducer = (state: ChatPageType = initialState, action: ActionsType): ChatPageType => {
    switch (action.type) {
        case 'SN/CHAT/MESSAGES_RECEIVED':

            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages]
            }
        default:
            return state

    }
}

const actions = {
    messagesReceived: (messages: ChatMessageType[]) => ({
        type: 'SN/CHAT/MESSAGES_RECEIVED', payload: {messages}
    } as const),

}

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null

const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }
    return _newMessageHandler
}

export const startMessagesListening = (): ThunkType =>
    async (dispatch) => {
        await chatAPI.start()
         chatAPI.subscribe(newMessageHandlerCreator(dispatch))
    }

export const stopMessagesListening = (): ThunkType =>
    async (dispatch) => {
        await chatAPI.unsubscribe(newMessageHandlerCreator(dispatch))
        chatAPI.stop()
    }

export const sendMessage = (message: string): ThunkType =>
    async (dispatch) => {
        await chatAPI.sendMessage(message)
        dispatch(startMessagesListening)
    }

export type ChatPageType = typeof initialState

type ActionsType = InferActionsTypes<typeof actions>

type ThunkType = BaseThunkType<ActionsType, void>
