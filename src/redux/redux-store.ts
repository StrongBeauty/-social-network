import {Action, applyMiddleware, combineReducers, createStore} from "redux";
import {profileReducer} from "./profile-reducer";
import {dialogsReducer} from "./dialogs-reducer";
import {sidebarReducer} from "./sidebar-reducer";
import {usersReducer} from "./users-reducer";
import {AuthPageType, authReducer} from "./auth-reducer";
import thunkMiddleware, {ThunkAction} from 'redux-thunk';
import {appReducer} from "./app-reducer";




const reducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
})

type RootReducerType = typeof reducer
export type AppStateType = ReturnType<RootReducerType>

type PropertiesTypes<T> = T extends { [key: string]: infer U} ? U: never
export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any}> = ReturnType<PropertiesTypes<T>>


export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>
//type ReducersType = ReturnType<typeof reducers>

export const store = createStore(reducer, applyMiddleware(thunkMiddleware))

//@ts-ignore
window.store = store;
