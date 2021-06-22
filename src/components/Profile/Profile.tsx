import React from "react";
import s from "./Profile.module.css"
import {MyPosts} from './MyPosts/MyPosts'
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";

/*type ProfilePagePropsType = {
    profilePage: ProfilePageType
    //addPost: () => void
    //updateNewPostText: (newText: string) => void
    dispatch: (action: ActionsTypes) => void
}*/

export const Profile = () => {

    return(
        <div>
            <ProfileInfo />
            <MyPostsContainer //state={props.state}
                             // posts={props.profilePage.posts}
                    // newPostText={props.profilePage.newPostText}
                     //dispatch={props.dispatch}
                />
            {/*<MyPosts posts={props.profilePage.posts}
                     newPostText={props.profilePage.newPostText}
                     dispatch={props.dispatch}
                     /* addPost={props.addPost}
                     updateNewPostText={props.updateNewPostText} />*/}
        </div>
    )
}
