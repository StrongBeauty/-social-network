import {Dispatch} from "redux";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {usersAPI} from "../api/users-api";
import {updateObjectInArray} from "../utils/object-helpers";
import { PhotosType } from "./profile-reducer";
import {ResultCodeEnum} from "../api/api";

const initialState = {
    users: [] as UserType[],
    pageSize: 10,
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
                users: updateObjectInArray(state.users, action.userId,'id',  {followed: true})
            }
        case 'SN/USERS/UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId,'id',  {followed: false})
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
                    : state.followingInProgress.filter(id => id !== action.userId)
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

    setTotalUsersCount: (totalUsersCount: number) => ({
        type: 'SN/USERS/SET_TOTAL_USERS_COUNT',
        count: totalUsersCount
    } as const),

    toggleIsFetching: (isFetching: boolean) => ({type: 'SN/USERS/TOGGLE_IS_FETCHING', isFetching} as const),

    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({
        type: 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS',
        isFetching,
        userId
    } as const),
}


export const requestUsers = (page: number, pageSize: number): ThunkType => {

    return (dispatch: DispatchType) => {
        dispatch(actions.toggleIsFetching(true))
        dispatch(actions.setCurrentPage(page))
        usersAPI.getUsers(page, pageSize).then(data => {
            dispatch(actions.toggleIsFetching(false))
            dispatch(actions.setUsers(data.items))
            dispatch(actions.setTotalUsersCount(data.totalCount))
        })
    }
}

const followUnfollowFlow = async (userId: number, dispatch: DispatchType, AC: FollowUnfollowACType, apiMethod: ApiMethodType) => {
    dispatch(actions.toggleFollowingProgress(true, userId))
    const response = await apiMethod(userId)
    if (response.resultCode === ResultCodeEnum.Success) {
        dispatch(AC(userId))
    }
    dispatch(actions.toggleFollowingProgress(false, userId))
}

export const followThunk = (userId: number): ThunkType => {
    return async (dispatch: DispatchType) => {
        await followUnfollowFlow(userId, dispatch, actions.followSuccess, usersAPI.follow.bind(usersAPI))
    }
}

export const unfollowThunk = (userId: number): ThunkType => {
    return async (dispatch: DispatchType) => {
        await followUnfollowFlow(userId, dispatch, actions.unfollowSuccess, usersAPI.unfollow.bind(usersAPI))
    }
}

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

export type LocationType = {
    city: string
    country: string
}

type FollowUnfollowACType = typeof actions.followSuccess | typeof actions.unfollowSuccess
type ApiMethodType = typeof usersAPI.follow | typeof usersAPI.unfollow

type ActionsType = InferActionsTypes<typeof actions>
type DispatchType = Dispatch<ActionsType>
type ThunkType = BaseThunkType<ActionsType, void>
