import { PhotosType } from "./profile-reducer";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {dialogsAPI} from "../api/dialogs-api";

const initialState = {
    dialogs: [] as Array<DialogType>,
    isFetching: false,
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
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: action.newMessageBody}]
            }
        }
        case 'SN/DIALOGS/SET-DIALOGS': {
            return {
                ...state,
                dialogs: action.dialogs
            }
        }
        case 'SN/DIALOGS/TOGGLE_IS_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching
            }
        default:
            return state
    }
}

export const actions = {
    sendMessageActionCreator: (newMessageBody: string) =>
        ({type: 'SN/DIALOGS/SEND-MESSAGE', newMessageBody} as const),
    setDialogs: (dialogs: DialogType[]) =>
        ({type: 'SN/DIALOGS/SET-DIALOGS', dialogs} as const),
    setCurrentPage: (currentPage: number) => ({type: 'SN/DIALOGS/SET_CURRENT_PAGE', currentPage} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'SN/DIALOGS/TOGGLE_IS_FETCHING', isFetching} as const),
/*    startDialog: (dialogs: any) =>
        ({type: 'SN/DIALOGS/START-DIALOG'} as const)*/
}

export const requestDialogs = (): ThunkType => {
    return async (dispatch) => {
         dispatch(actions.toggleIsFetching(true))
        const data = await dialogsAPI.getDialogs()
        dispatch(actions.toggleIsFetching(false))
        dispatch(actions.setDialogs(data))
    }
}


export const startDialog =  async (userId: number) => {
         await dialogsAPI.startDialog(userId)
    }

export const sendMessage =  async (userId: number, message: string) =>{
      await  dialogsAPI.sendMessage(userId, message)
    }

export type DialogsPageType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType, void>

export type DialogType = {
    id: number
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

