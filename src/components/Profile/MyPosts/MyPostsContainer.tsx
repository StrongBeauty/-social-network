import React from "react";
import {MyPosts} from "./MyPosts"
import {addPost, PostType, updateNewPostText} from "../../../redux/profile-reducer";
import {AppStateType} from "../../../redux/redux-store";
import {connect} from "react-redux";
import {Dispatch} from "redux";

/*type MyPostsPropsType = {
    posts: Array<PostType>
    newPostText: string
    //addPost: () => void
    //updateNewPostText: (newText: string) => void
    dispatch: (action: ActionsTypes) => void
}*/

/*export const MyPostsContainer: React.FC<MyPostsPropsType> = (props) => {

    // let state = store.getstate()
    /* const addPost = () => {
         //if(newPostElement.current)

         //props.addPost()
         props.store.dispatch(addPostActionCreator())
         //newPostElement.current && newPostElement.current.value
         //or
         //newPostElement.current?.value

     }
     /*let onPostChange = (text: string) => {
         //let text = newPostElement.current?.value as string
         //let newText = newPostElement.current?.value as string
         //props.dispatch(updateNewPostTextActionCreator(newText))
         let action = updateNewPostTextActionCreator(text)
         props.store.dispatch(action)
     }*/

/*return (
    <StoreContext.Consumer>
        {(store) => {
            let state = store.getState()
            const addPost = () => {
                store.dispatch(addPostActionCreator())
            }
            let onPostChange = (text: string) => {
                let action = updateNewPostTextActionCreator(text)
                store.dispatch(action)
            }
            return <MyPosts updateNewPostText={onPostChange}
                            addPost={addPost}
                            posts={state.profilePAge.posts}
                            newPostText={state.profilePage.newPostText}/>
        }
        }
    </StoreContext.Consumer>
)
}
*/

let mapStateToProps =  (state: AppStateType): MapStateToPropsType => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

let mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        addPost: () => {
            dispatch(addPost())
        },
        updateNewPostText: (text) => {
            dispatch(updateNewPostText(text))
        }
    }
}

export const MyPostsContainer = connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsDialogsContainerType, AppStateType>(mapStateToProps, mapDispatchToProps)(MyPosts)

export type MapStateToPropsType = {
    posts: Array<PostType>
    newPostText: string
}

export type MapDispatchToPropsType = {
    addPost: () => void
    updateNewPostText: (text: string) => void
}

export type OwnPropsDialogsContainerType = {}