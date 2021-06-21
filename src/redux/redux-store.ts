import {combineReducers, createStore} from "redux";
import {profileReducer} from "./ProfileReducer";
import {dialogsReducer} from "./DialogsReducer";
import {sidebarReducer} from "./SidebarReducer";


const reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer
})

type ReducersType = typeof reducers
export type AppStateType = ReturnType<ReducersType>

//type ReducersType = ReturnType<typeof reducers>

export const store = createStore(reducers)
