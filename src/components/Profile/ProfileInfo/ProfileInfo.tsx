import React, {useState} from "react";
import s from "./ProfileInfo.module.css"
import {Preloader} from "../../common/preloader/preloader";
import {ContactsType, ProfileType, savePhoto} from "../../../redux/profile-reducer";
import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks";
import userPhoto from '../../../assets/images/userPhoto.jpg'
import {useDispatch, useSelector} from "react-redux";
import {selectProfile, selectStatus} from "../../../redux/profile-selector";


type ProfileInfoPropsType = {
    isOwner: boolean
}

export const ProfileInfo: React.FC<ProfileInfoPropsType> = ({isOwner}: ProfileInfoPropsType) => {

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
            <ProfileStatusWithHooks status={status} />
            <div className={s.descriptionBlock}>
                <img className={s.photo} src={profile.photos?.large || userPhoto}
                     alt='loading..'
                />
                {isOwner &&
                <input type='file'
                       name='Download photo'
                       onChange={onMainPhotoSelected}
                />}
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

type ContactPropsType = {
    contactTitle: keyof ContactsType,
    contactValue: string
}

type ProfileDataPropsType = Omit<ProfileType, 'userId' | 'photos'> & {isOwner: boolean} & {goToEditMode: () => void}

const ProfileData = ({lookingForAJob, lookingForAJobDescription, fullName, contacts, aboutMe, isOwner, goToEditMode}: ProfileDataPropsType) => {
    return <>
        <div>{fullName}</div>
        <div>
            <b>Looking for a job:</b> {lookingForAJob ? 'yes' : 'no'}
        </div>
        <div>
            <b>My professionals skills:</b> {lookingForAJobDescription}
        </div>
        <div>
            <b>About me:</b> {aboutMe}
        </div>
        <div>
            <b>Contacts:</b> {contacts &&
        (Object.keys(contacts) as Array<keyof ContactsType>).map(
            (k: keyof ContactsType) => {
                return <Contact
                    key={k}
                    contactValue={contacts[k]}
                    contactTitle={k}
                />
            })}
            {isOwner && <div><button onClick={goToEditMode}>edit</button></div>}
        </div>
    </>
}

const ProfileDataForm = () => {
    return <div>form</div>
}

const Contact: React.FC<ContactPropsType> = ({contactTitle, contactValue}: ContactPropsType) => {
    return <div><b>{contactTitle}:</b> {contactValue}</div>
}
