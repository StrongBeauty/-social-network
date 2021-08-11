import {Dispatch} from "redux";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {profileAPI} from "../api/profile-api";
/*
const ADD_POST = 'ADD-POST'
//const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_USER_STATUS = 'SET_USER_STATUS'*/

const initialState = {
    posts: [
        //{id: 1, message: 'Hi!', likesCount: 12},
        //{id: 2, message: 'How are u?', likesCount: 15},
        //{id: 3, message: 'Hey!', likesCount: 12},
        //{id: 4, message: 'Yo!', likesCount: 15},
    ] as Array<PostType>,
    //newPostText: '' as string,
    profile: {} as ProfileType,
    status: '' as string,
}



export const profileReducer = (state: ProfilePageType = initialState, action: ActionsType): ProfilePageType  => {
    switch (action.type) {
        case 'SN/PROFILE/ADD-POST':
            let newPost: PostType = {
                id: 5,
                message: action.newPostText,
                //message: state.newPostText,
                likesCount: 0,
            }
            return {
                ...state,
                posts : [...state.posts, newPost],
                //newPostText: ''
            }

/*        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
            newPostText: action.newText
            }*/

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


        default:
            return state

    }
}

export const actions = {
    addPost: (newPostText: string) =>
        ({type: 'SN/PROFILE/ADD-POST', newPostText: newPostText} as const),

    /*export const updateNewPostText = (newText: string): updateNewPostTextACT =>
        ({type: UPDATE_NEW_POST_TEXT, newText: newText})*/

    setUserProfile: (profile: ProfileType) =>
        ({type: 'SN/PROFILE/SET_USER_PROFILE', profile} as const),

    setStatus: (status: string) =>
        ({type: 'SN/PROFILE/SET_USER_STATUS', status} as const),
}



/*
type AddPostACT = {
    type: typeof ADD_POST
    newPostText: string
}
/!*type updateNewPostTextACT = {
    type: typeof UPDATE_NEW_POST_TEXT
    newText: string
}*!/
type setUserProfileACT = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}

type setStatusACT = {
    type: typeof SET_USER_STATUS
    status: string
}
*/



export const getUserProfile = (userId: number) => (dispatch: Dispatch) => {
    profileAPI.getProfileUser(+userId).then(data => {
        dispatch(actions.setUserProfile(data))
    })
}

export const getStatus = (userId: number) => (dispatch: Dispatch) => {
    profileAPI.getStatus(userId)
        .then(data => {
                dispatch(actions.setStatus(data))
        })
}

export const updateStatus = (status: string) => (dispatch: Dispatch) => {
    profileAPI.updateStatus(status)
        .then(data => {
            if (data.resultCode === 0)
                dispatch(actions.setStatus(data))
    })
}

type ActionsType = InferActionsTypes<typeof actions>

export type ProfilePageType = typeof initialState

/*type ActionsTypes = AddPostACT
    //| updateNewPostTextACT
    | setUserProfileACT
    | setStatusACT*/

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