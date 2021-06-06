import React from "react";
import s from "./Profile.module.css"
import {MyPosts} from './MyPosts/MyPosts'
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ActionsTypes, ProfilePageType} from "../../redux/state";

type ProfilePagePropsType = {
    profilePage: ProfilePageType
    //addPost: () => void
    //updateNewPostText: (newText: string) => void
    dispatch: (action: ActionsTypes) => void
}

export const Profile: React.FC<ProfilePagePropsType> = (props ) => {

    return(
        <div>
            <ProfileInfo />
            <MyPosts posts={props.profilePage.posts}
                     newPostText={props.profilePage.newPostText}
                     dispatch={props.dispatch}
                     /* addPost={props.addPost}
                     updateNewPostText={props.updateNewPostText} */
            />
        </div>
    )
}

//export default Profile;