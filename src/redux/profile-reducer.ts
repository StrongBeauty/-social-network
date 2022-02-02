import {Dispatch} from "redux";
import {InferActionsTypes} from "./redux-store";
import {profileAPI} from "../api/profile-api";


const initialState = {
    posts: [] as Array<PostType>,
    profile: {} as ProfileType,
    status: '' as string,
}


export const profileReducer = (state: ProfilePageType = initialState, action: ActionsType): ProfilePageType => {
    switch (action.type) {
        case 'SN/PROFILE/ADD-POST':
            let newPost: PostType = {
                id: 5,
                message: action.newPostText,
                likesCount: 0,
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
            }

        case 'SN/PROFILE/SET_USER_PROFILE':
            return {
                ...state,
                profile: action.profile
            }

        case 'SN/PROFILE/SET_USER_STATUS':
            return {
                ...state,
                status: action.status
            }

        case 'SN/PROFILE/DELETE-POST':
            return {
                ...state,
                posts: state.posts.filter((p) => p.id !== action.postId)
            }
        default:
            return state

    }
}

export const actions = {
    addPost: (newPostText: string) =>
        ({type: 'SN/PROFILE/ADD-POST', newPostText: newPostText} as const),

    setUserProfile: (profile: ProfileType) =>
        ({type: 'SN/PROFILE/SET_USER_PROFILE', profile} as const),

    setStatus: (status: string) =>
        ({type: 'SN/PROFILE/SET_USER_STATUS', status} as const),

    deletePost: (postId: number) =>
        ({type: 'SN/PROFILE/DELETE-POST', postId} as const)
}


export const getUserProfile = (userId: number) =>
    async (dispatch: Dispatch) => {
        const data = await profileAPI.getProfileUser(+userId)
        dispatch(actions.setUserProfile(data))
    }

export const getStatus = (userId: number) =>
    async (dispatch: Dispatch) => {
        const data = await profileAPI.getStatus(userId)
        dispatch(actions.setStatus(data))
    }

export const updateStatus = (status: string) =>
    async (dispatch: Dispatch) => {
        const data = await profileAPI.updateStatus(status)
        console.log(data)
        if (data.resultCode === 0) {
            console.log(status)
            dispatch(actions.setStatus(status))
        }}

type ActionsType = InferActionsTypes<typeof actions>

export type ProfilePageType = typeof initialState

export type PostType = {
    id: number
    message: string
    likesCount: number
}

export type ProfileType = {
    userId: number
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    contacts: {
        facebook: string,
        github: string,
        instagram: string,
        mainLink: string,
        twitter: string,
        vk: string,
        website: string,
        youtube: string,
    }
    aboutMe: string,
    photos: {
        large: string,
        small: string,
    }

}
