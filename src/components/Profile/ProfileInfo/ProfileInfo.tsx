import React from "react";
import s from "./ProfileInfo.module.css"
import {Preloader} from "../../common/preloader/preloader";
import {ProfileType} from "../../../redux/profile-reducer";
import {ProfileStatus} from "./ProfileStatus";
import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks";


type PropsType = {
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
}

export const ProfileInfo = (props: PropsType) => {
    if (!props.profile) {
        return <Preloader />
    }

    return(
        <div>
            <div>
                <img src='https://blog.prostodizain.ru/wp-content/uploads/2019/03/shapka-dlya-saita.jpg'
                     alt='loading..'
                />
            </div>
            <ProfileStatusWithHooks status={props.status}
                           updateStatus={props.updateStatus}/>
            <div className={s.descriptionBlock }>
                <img src={props.profile.photos?.large}
                     alt='loading..'
                />
                <div>{props.profile.fullName}</div>

            </div>
            <h1>{props.profile.aboutMe}</h1>
        </div>
    )
}
