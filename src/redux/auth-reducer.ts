const SET_USERS_DATA = 'SET_USERS_DATA'



const initialState = {
    data: {} as DataType,
    isAuth: false as boolean
}

export type AuthPageType = typeof initialState


export const authReducer = (state: AuthPageType = initialState, action: ActionsTypes): AuthPageType  => {
    switch (action.type) {
        case SET_USERS_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true,
            }
        default:
            return state

    }
}


export const setUsersData = (data: DataType) =>
    ({type: SET_USERS_DATA, data})


type SetUsersDataAC = {
    type: typeof SET_USERS_DATA,
    data: DataType
}

type ActionsTypes = SetUsersDataAC

export type AuthType = {
    resultCode: 0
    messages: [],
    data: DataType
}

export type DataType = {
    id: number
    email: string
    login: string
}
