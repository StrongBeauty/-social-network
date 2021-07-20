import {usersAPI} from "../api/api";

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'


const initialState = {
    users: [
        //{id: 1, message: 'Hi!', likesCount: 12},
        //{id: 2, message: 'How are u?', likesCount: 15},
        //{id: 3, message: 'Hey!', likesCount: 12},
        //{id: 4, message: 'Yo!', likesCount: 15},
    ] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>,
}

export type UsersPageType = typeof initialState

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
                users: action.users
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
            case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.count
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        default:
            return state

    }
}

export const follow = (userId: number) =>
    ({type: FOLLOW, userId}) as FollowACType

export const unfollow = (userId: number) =>
    ({type: UNFOLLOW, userId}) as UnfollowACType

export const setUsers = (users: Array<UserType>) =>
    ({type: SET_USERS, users}) as SetUsersACType

export const setCurrentPage = (currentPage: number) =>
    ({type: SET_CURRENT_PAGE, currentPage}) as SetCurrentPageACT

export const setTotalUsersCount = (totalUsersCount: number) =>
    ({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount}) as setTotalUsersCountACT

export const toggleIsFetching = (isFetching: boolean) =>
    ({type: TOGGLE_IS_FETCHING, isFetching}) as toggleIsFetchingACT

export const toggleIsFollowingProgress = (isFetching: boolean, userId: number) =>
    ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId}) as toggleIsFollowingProgressACT

export const getUsersThunkCreator = (currentPage: number, pageSize: number) => {

    return (dispatch: any) => {

        dispatch(toggleIsFetching(true))

        usersAPI.getUsers(currentPage, pageSize).then(data => {
            dispatch(toggleIsFetching(false))
            dispatch(setUsers(data.items))
            dispatch(setTotalUsersCount(data.totalCount))
        })
    }
}


type FollowACType = {
    type: typeof FOLLOW
    userId: number
}
type UnfollowACType = {
    type: typeof UNFOLLOW
    userId: number
}
type SetUsersACType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
type SetCurrentPageACT = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
type setTotalUsersCountACT = {
    type: typeof SET_TOTAL_USERS_COUNT
    count: number
}
type toggleIsFetchingACT = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}

type toggleIsFollowingProgressACT = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}


type ActionsTypes = FollowACType  | UnfollowACType | SetUsersACType | SetCurrentPageACT | setTotalUsersCountACT | toggleIsFetchingACT | toggleIsFollowingProgressACT
export type UserType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
    totalCount: number
    error: string
    location: LocationType
}

export type PhotosType = {
    small: string,
    large: string
}

export type LocationType = {
    city: string
    country: string
}
