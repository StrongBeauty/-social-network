import React from "react";
import s from "./ProfileInfo.module.css"
import {Preloader} from "../../common/preloader/preloader";
import {ProfilePageType, ProfileType} from "../../../redux/profile-reducer";

type PropsType = {
    profile: ProfileType
}

export const ProfileInfo = (props: PropsType) => {
    if (!props.profile) {
        return <Preloader />
    }

    return(
        <div>
            <div>
                <img src='http://dgdesign.ru/uploads/posts/2016-04/1461001405_shapka-sayta-gory-34342.jpg'/>
            </div>
            <div className={s.descriptionBlock }>
                <img src={props.profile.photos?.large}/>
            </div>
        </div>
    )
}

//export default Profile;