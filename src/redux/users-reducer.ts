import {Dispatch} from "redux";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {usersAPI} from "../api/users-api";

/*const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'*/


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

export const usersReducer = (state: UsersPageType = initialState, action: ActionsType): UsersPageType => {
    switch (action.type) {
        case 'SN/USERS/FOLLOW':
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
        case 'SN/USERS/UNFOLLOW':
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }
        case 'SN/USERS/SET_USERS':
            return {
                ...state,
                users: action.users
            }
        case 'SN/USERS/SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.currentPage
            }
        case 'SN/USERS/SET_TOTAL_USERS_COUNT':
            return {
                ...state,
                totalUsersCount: action.count
            }
        case 'SN/USERS/TOGGLE_IS_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching
            }
        case 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS':
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

export const actions = {
     followSuccess: (userId: number) => ({type: 'SN/USERS/FOLLOW', userId} as const),

     unfollowSuccess: (userId: number) => ({type: 'SN/USERS/UNFOLLOW', userId} as const),

     setUsers: (users: Array<UserType>) => ({type: 'SN/USERS/SET_USERS', users} as const),

     setCurrentPage: (currentPage: number) => ({type: 'SN/USERS/SET_CURRENT_PAGE', currentPage} as const),

     setTotalUsersCount: (totalUsersCount: number) => ({type: 'SN/USERS/SET_TOTAL_USERS_COUNT', count: totalUsersCount} as const),

    toggleIsFetching: (isFetching: boolean) => ({type: 'SN/USERS/TOGGLE_IS_FETCHING', isFetching} as const),

    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({type: 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId} as const),
}


export const requestUsers = (page: number, pageSize: number): ThunkType => {

    return (dispatch) => {
        dispatch(actions.toggleIsFetching(true))
        dispatch(actions.setCurrentPage(page))
        usersAPI.getUsers(page, pageSize).then(data => {
            dispatch(actions.toggleIsFetching(false))
            dispatch(actions.setUsers(data.items))
            dispatch(actions.setTotalUsersCount(data.totalCount))
        })
    }
}

export const followThunk = (userId: number): ThunkType => {
    return (dispatch) => {
        console.log('follow ===>' + userId)
        dispatch(actions.toggleFollowingProgress(true, userId))

        usersAPI.follow(userId)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(actions.followSuccess(userId))
                }
                dispatch(actions.toggleFollowingProgress(false, userId))
            })
    }
}

export const unfollowThunk = (userId: number): ThunkType => {

    return (dispatch) => {
        dispatch(actions.toggleFollowingProgress(true, userId))

        usersAPI.unfollow(userId)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(actions.unfollowSuccess(userId))
                }
                dispatch(actions.toggleFollowingProgress(false, userId))
            })
    }
}


/*type FollowACT = ReturnType<typeof followSuccess>

type UnfollowACT = ReturnType<typeof unfollowSuccess>

type SetUsersACT = ReturnType<typeof setUsers>

type SetCurrentPageACT = ReturnType<typeof setCurrentPage>

type setTotalUsersCountACT = ReturnType<typeof setTotalUsersCount>

type toggleIsFetchingACT = ReturnType<typeof toggleIsFetching>

type toggleIsFollowingProgressACT = ReturnType<typeof toggleFollowingProgress>*/

/*type ActionsTypes =
    FollowACT
    | UnfollowACT
    | SetUsersACT
    | SetCurrentPageACT
    | setTotalUsersCountACT
    | toggleIsFetchingACT
    | toggleIsFollowingProgressACT*/

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

type ActionsType = InferActionsTypes<typeof actions>

type DispatchType = Dispatch<ActionsType>

type ThunkType = BaseThunkType<ActionsType, void>
