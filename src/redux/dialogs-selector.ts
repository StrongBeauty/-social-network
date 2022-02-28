import {AppStateType} from "./redux-store";

export const selectMessages = (state: AppStateType) => state.dialogsPage.messages

export const selectDialogs = (state: AppStateType) => state.dialogsPage.dialogs
