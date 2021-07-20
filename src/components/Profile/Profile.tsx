import React from "react";
import s from "./Profile.module.css"
import {MyPosts} from './MyPosts/MyPosts'
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfilePageType, ProfileType} from "../../redux/profile-reducer";

type ProfilePagePropsType = {
    profile: ProfileType
    setUserProfile: any
}

export const Profile = (props: ProfilePagePropsType) => {

    return(
        <div>
            <ProfileInfo profile={props.profile}/>
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
