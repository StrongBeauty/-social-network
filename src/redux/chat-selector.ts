import {AppStateType} from "./redux-store";

export const selectMessages = (state: AppStateType) => state.chat.messages
