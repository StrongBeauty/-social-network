export type PostType = {
    id: number
    message: string
    likesCount: number
}
export type DialogType = {
    id: number
    name: string
}
export type MessageType = {
    id: number
    message: string
}
export type ProfilePageType = {
    posts: Array<PostType>
    newPostText: string
}
export type DialogsPageType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
}
export type SideBarType = {}
export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    sidebar: SideBarType
}

export type StoreType = {
    _state: RootStateType
    _callSubscriber: () => void
    getState: () => RootStateType
    addPost: () => void
    updateNewPostText: (newText: string) => void
    dispatch: (action: ActionsTypes) => void
    subscriber: (observer: ()=> void) => void
}

//export type AddPostActionType = ReturnType<typeof addPostActionCreator>
    //{ type: 'ADD-POST'
    //postText: string}

//export type  UpdateNewPostTextActionType = ReturnType<typeof updateNewPostTextActionCreator>
    //{    type: 'UPDATE-NEW-POST-TEXT'
    //newText: string }

export type ActionsTypes = ReturnType<typeof addPostActionCreator> | ReturnType<typeof updateNewPostTextActionCreator>

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

export let store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hi!', likesCount: 12},
                {id: 2, message: 'How are u?', likesCount: 15},
                {id: 3, message: 'Hey!', likesCount: 12},
                {id: 4, message: 'Yo!', likesCount: 15},
            ],
            newPostText: 'It'
        },
        dialogsPage: {
            dialogs: [
                {id: 1, name: 'A'},
                {id: 2, name: 'B'},
                {id: 3, name: 'C'},
                {id: 4, name: 'D'},
                {id: 5, name: 'E'},
                {id: 6, name: 'F'}
            ],
            messages: [
                {id: 1, message: 'Hi'},
                {id: 2, message: 'Hey'},
                {id: 3, message: 'Hello'},
                {id: 4, message: 'Yo'},
                {id: 5, message: 'Yep'},
                {id: 6, message: 'Welcom'}
            ]
        },
        sidebar: {}
    },
    _callSubscriber() {
        console.log('state changed')
    },
    getState() {
        return this._state
    },
    addPost() {
        let newPost: PostType = {
            id: 5,
            message: this._state.profilePage.newPostText,
            likesCount: 0,
        }
        this._state.profilePage.posts.push(newPost)
        this._state.profilePage.newPostText = ''
        this._callSubscriber()
    },
    updateNewPostText(newText: string) {
        this._state.profilePage.newPostText = newText
        this._callSubscriber()
    },
    dispatch (action) {
        if (action.type === ADD_POST) {
            let newPost: PostType = {
                id: 5,
                message: this._state.profilePage.newPostText,
                likesCount: 0,
            }
            this._state.profilePage.posts.push(newPost)
            this._state.profilePage.newPostText = ''
            this._callSubscriber()
        } else if (action.type === UPDATE_NEW_POST_TEXT) {
            this._state.profilePage.newPostText = action.newText
            this._callSubscriber()
        }
    },
    subscriber(observer) {
        this._callSubscriber = observer // наблюдатель (паттерн)
    }
}

export const addPostActionCreator = () =>
    ({type: ADD_POST}) as const

export const updateNewPostTextActionCreator = (newText: string) =>
    ({type: UPDATE_NEW_POST_TEXT, newText: newText}) as const

