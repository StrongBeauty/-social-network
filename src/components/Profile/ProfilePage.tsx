import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getStatus, getUserProfile} from "../../redux/profile-reducer";
import {useParams} from 'react-router';
import {selectAuthorizedUserId} from "../../redux/auth-selector";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import { useNavigate } from "react-router-dom";

type ParamsType = {
    userId: string
}

const ProfilePage = () => {

    const authorizedUserId = useSelector(selectAuthorizedUserId)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    console.log(!null)

    const params = useParams() as ParamsType
    const isOwner = (+params.userId === authorizedUserId)


    useEffect(() => {
        let userId = params.userId

        if (userId === 'undefined' && !authorizedUserId) {
            navigate('login', {replace: true})
        } else {
            if(userId === 'undefined' && authorizedUserId){
                userId = String(authorizedUserId)
                console.log(userId)
            }
            dispatch(getUserProfile(+userId))
            dispatch(getStatus(+userId))
        }
    }, [params.userId])

    return (
        <div>
            <ProfileInfo isOwner={isOwner}/>
            <MyPostsContainer/>
        </div>
    )
}

export default ProfilePage
