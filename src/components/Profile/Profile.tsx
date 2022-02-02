import React from "react";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import { ProfileType} from "../../redux/profile-reducer";

type ProfilePagePropsType = {
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
}

export const Profile = (props: ProfilePagePropsType) => {

    return(
        <div>
            <ProfileInfo profile={props.profile}
                         status={props.status}
                         updateStatus={props.updateStatus} />
            <MyPostsContainer />
        </div>
    )
}
