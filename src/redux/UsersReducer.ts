

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'


const initialState = {
    users: [
        //{id: 1, message: 'Hi!', likesCount: 12},
        //{id: 2, message: 'How are u?', likesCount: 15},
        //{id: 3, message: 'Hey!', likesCount: 12},
        //{id: 4, message: 'Yo!', likesCount: 15},
    ] as Array<UserType>,
}

export const usersReducer = (state:UsersPageType = initialState, action: ActionsTypes): UsersPageType  => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                //users: [...state.users],
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                return u
                })
            }
            case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }
            case SET_USERS:
            return {
                ...state,
                users: [...state.users, ...action.users]
            }
        default:
            return state

    }
}
export const followAC = (userId: number) =>
    ({type: FOLLOW, userId}) as FollowACType

export const unFollowAC = (userId: number) =>
    ({type: UNFOLLOW, userId}) as UnFollowACType

export const setUsersAC = (users: Array<UserType>) =>
    ({type: SET_USERS, users}) as SetUsersACType

type FollowACType = {
    type: typeof FOLLOW
    userId: number
}
type UnFollowACType = {
    type: typeof UNFOLLOW
    userId: number
}
type SetUsersACType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
type ActionsTypes = FollowACType  | UnFollowACType | SetUsersACType
export type UserType = {
    id: number
    photoURL: string
    followed: boolean
    fullName: string
    status: string
    location: LocationType
}
export type LocationType = {
    city: string
    country: string
}
export type UsersPageType = typeof initialState