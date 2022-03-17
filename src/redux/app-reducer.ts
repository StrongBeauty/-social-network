import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {getAuthUserData} from "./auth-reducer";


const initialState = {
    initialized: false,
    globalError: '',
}

export const appReducer = (state: AppType = initialState, action: ActionsType): AppType => {
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

export const initializeApp = (): ThunkType =>
    async (dispatch) => {
    console.log('+')
        const promise = dispatch(getAuthUserData())
        await Promise.all([promise])
        dispatch(actions.initializedSuccess())
    }

export type AppType = typeof initialState

type ActionsType = InferActionsTypes<typeof actions>

type ThunkType = BaseThunkType<ActionsType, void>
