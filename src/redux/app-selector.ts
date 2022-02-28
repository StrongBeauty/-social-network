import {AppStateType} from "./redux-store";

export const selectInitialized = (state: AppStateType) => state.app.initialized
