import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux";
import {profileReducer} from "./profile-reducer";
import {dialogsReducer} from "./dialogs-reducer";
import {sidebarReducer} from "./sidebar-reducer";
import {usersReducer} from "./users-reducer";
import { authReducer} from "./auth-reducer";
import thunkMiddleware, {ThunkAction} from 'redux-thunk';
import {appReducer} from "./app-reducer";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}


const reducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
})

const composeEnhancers =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducer,  composeEnhancers(
    applyMiddleware(thunkMiddleware)
));

type RootReducerType = typeof reducer
export type AppStateType = ReturnType<RootReducerType>

type PropertiesTypes<T> = T extends { [key: string]: infer U} ? U: never
export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any}> = ReturnType<PropertiesTypes<T>>


export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>
//type ReducersType = ReturnType<typeof reducers>

//export const store = createStore(reducer, applyMiddleware(thunkMiddleware))

//@ts-ignore
window.__store__ = store;
