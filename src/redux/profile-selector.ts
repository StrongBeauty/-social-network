import {AppStateType} from "./redux-store";

export const selectProfile = (state: AppStateType) => state.profilePage.profile

export const selectStatus = (state: AppStateType) => state.profilePage.status
