import React from "react";
import {UserType} from "../../redux/users-reducer";
import {Paginator} from "../common/Paginator/Paginator";
import {User} from "./User";


type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (p: number) => void
    users: UserType[]
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    followingInProgress: Array<number>
    toggleFollowingProgress: (isFetching: boolean, userId: number) => void
    isAuth: boolean
}

export const Users: React.FC<UsersPropsType> = ({
                                                    totalUsersCount,
                                                    pageSize,
                                                    currentPage,
                                                    onPageChanged,
                                                    users,
                                                    follow,
                                                    unfollow,
                                                    followingInProgress,
                                                    isAuth
                                                }) => {


    return <div>
        <Paginator currentPage={currentPage}
                   totalUsersCount={totalUsersCount}
                   pageSize={pageSize}
                   onPageChanged={onPageChanged}
        />
        {users.map(u => <User key={u.id}
                              user={u}
                              follow={follow}
                              unfollow={unfollow}
                              followingInProgress={followingInProgress}
                              isAuth={isAuth}
        />)}
    </div>
}
