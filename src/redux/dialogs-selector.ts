import {AppStateType} from "./redux-store";

export const selectDialogs = (state: AppStateType) => state.dialogsPage.dialogs

export const selectIsFetching = (state: AppStateType) => state.dialogsPage.isFetching
