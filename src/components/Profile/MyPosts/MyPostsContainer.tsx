import {MyPosts} from "./MyPosts"
import {actions, PostType} from "../../../redux/profile-reducer";
import {AppStateType} from "../../../redux/redux-store";
import {connect} from "react-redux";
import {Dispatch} from "redux";


let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        posts: state.profilePage.posts,
    }
}

let mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        addPost: (newPostElement: string) => {
            dispatch(actions.addPost(newPostElement))
        },
    }
}

export const MyPostsContainer = connect<MapStateToPropsType,
    MapDispatchToPropsType,
    OwnPropsDialogsContainerType,
    AppStateType>(mapStateToProps, mapDispatchToProps)(MyPosts)

export type MapStateToPropsType = {
    posts: Array<PostType>
}

export type MapDispatchToPropsType = {
    addPost: (newPostElement: string) => void
}

export type OwnPropsDialogsContainerType = {}
