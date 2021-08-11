import React from "react";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {getAuthUserData} from "./auth-reducer";


const initialState = {
    initialized: false
}

export const appReducer = (state: AppType = initialState, action: ActionsType): AppType  => {
    switch (action.type) {
        case 'SN/APP/INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true,
            }
        default:
            return state

    }
}


export const actions = {
    initializedSuccess: () =>
        ({type: 'SN/APP/INITIALIZED_SUCCESS'} as const),
}


export const initializeApp = (): ThunkType => (dispatch) => {
    let promise = dispatch(getAuthUserData())
    Promise.all([promise])
        .then(() => {
        dispatch(actions.initializedSuccess())
    })

}

export type AppType = typeof initialState

type ActionsType = InferActionsTypes<typeof actions>

type ThunkType = BaseThunkType<ActionsType, void>