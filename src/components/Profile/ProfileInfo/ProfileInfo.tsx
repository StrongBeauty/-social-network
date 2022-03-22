import React, {useState} from "react";
import s from "./ProfileInfo.module.css"
import {Preloader} from "../../common/preloader/preloader";
import {savePhoto} from "../../../redux/profile-reducer";
import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks";
import avatarLarge from "../../../assets/images/avatarLarge.png";
import {useDispatch, useSelector} from "react-redux";
import {selectProfile, selectStatus} from "../../../redux/profile-selector";
import {ProfileDataForm} from "./ProfileData/ProfileDataForm";
import {ProfileData} from "./ProfileData/ProfileData";
import {MainUserInformation} from "../../common/mainUserInform/MainUserInformation";


type ProfileInfoPropsType = {
    isOwner: boolean
}

export const ProfileInfo: React.FC<ProfileInfoPropsType> = ({
                                                                isOwner
                                                            }: ProfileInfoPropsType) => {
    const status = useSelector(selectStatus)
    const profile = useSelector(selectProfile)
    const dispatch = useDispatch()

    const [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            dispatch(savePhoto(e.target.files[0]))
        }
    }

    return (
        <div>
            <div>
                <img src='https://blog.prostodizain.ru/wp-content/uploads/2019/03/shapka-dlya-saita.jpg'
                     alt='loading..'
                />
            </div>
            <ProfileStatusWithHooks status={status}/>
            <div className={s.descriptionBlock}>
{/*                <img className={s.photo} src={profile.photos?.large || userPhoto}
                     alt='loading..'
                />*/}
                <MainUserInformation photo={profile.photos?.large}
                                     name={profile.fullName}
                                     avatar={avatarLarge}
                />
                {isOwner &&
                    <>
                        <input type='file'
                               className={s.btn}
                               name='Download photo'
                               id='img'
                               onChange={onMainPhotoSelected}
                        />
                        <span><label className={s.btn__custom} htmlFor='img'>Select photo</label></span>
                    </>
                }

                {editMode ? <ProfileDataForm/> : <ProfileData lookingForAJob={profile.lookingForAJob}
                                                              lookingForAJobDescription={profile.lookingForAJobDescription}
                                                              fullName={profile.fullName}
                                                              contacts={profile.contacts}
                                                              aboutMe={profile.aboutMe}
                                                              isOwner={isOwner}
                                                              goToEditMode={() => setEditMode(true)}
                />}
            </div>
            <h1>{profile.aboutMe}</h1>
        </div>
    )
}


