import React from "react";
import {followThunk, unfollowThunk} from "../../redux/users-reducer";
import {User} from "./User";
import {useDispatch, useSelector} from "react-redux";
import {
    reselectUsers,
    selectFollowingInProgress,
} from "../../redux/users-selector";
import {selectIsAuth} from "../../redux/auth-selector";

export const Users: React.FC = React.memo(() => {

    const users = useSelector(reselectUsers)
    const followingInProgress = useSelector(selectFollowingInProgress)
    const isAuth = useSelector(selectIsAuth)
    //const filter = useSelector(selectUsersFilter)
    const dispatch = useDispatch()

    const follow = (userId: number) => {
        dispatch(followThunk(userId))
    }
    const unfollow = (userId: number) => {
        dispatch(unfollowThunk(userId))
    }

/*    if (users.length === 0) {
        usersAPI.getNoUsers()
            .then(data => {
                dispatch(actions.setUsers(data.items))
            })
    }*/
console.log('u')
    return <>
        {users.map(u =>
            <User key={u.id}
                  user={u}
                  follow={follow}
                  unfollow={unfollow}
                  followingInProgress={followingInProgress}
                  isAuth={isAuth}
            />
        )}
    </>
})
