const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
const SET_USER_PROFILE = 'SET_USER_PROFILE'


const initialState = {
    posts: [
        //{id: 1, message: 'Hi!', likesCount: 12},
        //{id: 2, message: 'How are u?', likesCount: 15},
        //{id: 3, message: 'Hey!', likesCount: 12},
        //{id: 4, message: 'Yo!', likesCount: 15},
    ] as Array<PostType>,
    newPostText: '' as string,
    profile: {} as ProfileType
}

export type ProfilePageType = typeof initialState

export const profileReducer = (state: ProfilePageType = initialState, action: ActionsTypes): ProfilePageType  => {
    switch (action.type) {
        case ADD_POST:
            let newPost: PostType = {
                id: 5,
                message: state.newPostText,
                likesCount: 0,
            }
            return {
                ...state,
                posts : [...state.posts, newPost],
                newPostText: ''
            }

        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
            newPostText: action.newText
            }

        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }

        default:
            return state

    }
}


export const addPost = (): AddPostACT =>
    ({type: ADD_POST})

export const updateNewPostText = (newText: string): updateNewPostTextACT =>
    ({type: UPDATE_NEW_POST_TEXT, newText: newText})

export const setUserProfile = (profile: ProfileType): setUserProfileACT =>
    ({type: SET_USER_PROFILE, profile})


type AddPostACT = {
    type: typeof ADD_POST
}
type updateNewPostTextACT = {
    type: typeof UPDATE_NEW_POST_TEXT
    newText: string
}
type setUserProfileACT = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}


type ActionsTypes = AddPostACT | updateNewPostTextACT | setUserProfileACT

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