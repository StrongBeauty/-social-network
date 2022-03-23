import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getStatus, getUserProfile} from "../../redux/profile-reducer";
import {useParams} from 'react-router';
import {selectAuthorizedUserId} from "../../redux/auth-selector";
import {ProfileInfo} from "../../components/Profile/ProfileInfo/ProfileInfo";
import { useNavigate } from "react-router-dom";
import { MyPosts } from "../../components/Profile/MyPosts/MyPosts";

type ParamsType = {
    userId: string
}

const ProfilePage = () => {
    const authorizedUserId = useSelector(selectAuthorizedUserId)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams() as ParamsType

    let userId = params.userId

    useEffect(() => {
        if (userId === 'undefined' && !authorizedUserId) {
            navigate('/login', {replace: true})
        } else {
            if (userId === 'undefined' && authorizedUserId){
                userId = String(authorizedUserId)
            }
            dispatch(getUserProfile(+userId))
            dispatch(getStatus(+userId))
        }
    }, [userId])

    return (
        <div>
            <ProfileInfo isOwner={+userId === authorizedUserId} />
            <MyPosts />
        </div>
    )
}

export default ProfilePage
