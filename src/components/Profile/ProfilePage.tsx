import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getStatus, getUserProfile} from "../../redux/profile-reducer";
import {useParams, useHistory} from 'react-router';
import {selectAuthorizedUserId} from "../../redux/auth-selector";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {Redirect} from "react-router-dom";

type ParamsType = {
    userId: string
}

 const ProfilePage = () => {

    const authorizedUserId = useSelector(selectAuthorizedUserId)
    const dispatch = useDispatch()

    const params = useParams() as ParamsType
    const history = useHistory()


    useEffect(() => {
        let userId = params.userId ? params.userId : '11851'
        if (!userId) {
            userId = String(authorizedUserId)
            if (+userId) {
                history.push('/login')
            }
        }
        dispatch(getUserProfile(+userId))
        dispatch(getStatus(+userId))
    }, [])

    return (
        <div>
            <ProfileInfo isOwner={!params} />
            <MyPostsContainer/>
        </div>
    )
}

export default ProfilePage
