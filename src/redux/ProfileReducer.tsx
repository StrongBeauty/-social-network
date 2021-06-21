

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

export type initialStateAction = {}

const initialState = {
    posts: [
        //{id: 1, message: 'Hi!', likesCount: 12},
        //{id: 2, message: 'How are u?', likesCount: 15},
        //{id: 3, message: 'Hey!', likesCount: 12},
        //{id: 4, message: 'Yo!', likesCount: 15},
    ] as Array<PostType>,
    newPostText: '' as string
}

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

        default:
            return state

    }
}
export const addPostActionCreator = () =>
    ({type: ADD_POST}) as const

export const updateNewPostTextActionCreator = (newText: string) =>
    ({type: UPDATE_NEW_POST_TEXT, newText: newText}) as const


type AddPostActionType = {
    type: typeof ADD_POST
}
type updateNewPostTextActionType = {
    type: typeof UPDATE_NEW_POST_TEXT
    newText: string
}
type ActionsTypes = AddPostActionType | updateNewPostTextActionType
export type PostType = {
    id: number
    message: string
    likesCount: number
}
export type ProfilePageType = typeof initialState