import React from "react";
import styles from "./Users.module.css"
import userPhoto from '../../../src/assets/images/user.jpg'
import {UserType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";


type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (p: number) => void
    users: Array<UserType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    followingInProgress: Array<number>
    toggleFollowingProgress: (isFetching: boolean, userId: number) => void
}

export const Users: React.FC<UsersPropsType> = ({totalUsersCount,
                                                 pageSize,
                                                 currentPage,
                                                 onPageChanged,
                                                 users,
                                                 follow,
                                                 unfollow,
                                                 followingInProgress,
                                                 toggleFollowingProgress}) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize)
    let pages = []
    for (let i = 1; i < pagesCount; i++) {
        pages.push(i)
    }
    return <div>
        <div>
            {pages.map(p => {
                return <span className={currentPage === p ? styles.selectedPage : ''}
                             onClick={(e) => {
                                 onPageChanged(p)
                             }}>{p}</span>
            })}
        </div>
        {users.map(u => (
                <div key={u.id}>
                    <span>
                        <div>
                            <NavLink to={'/profile/' + u.id}>
                            <img src={u.photos.small ! = null ? u.photos.small : userPhoto}
                                 className={styles.userPhoto}/>
                            </NavLink>
                        </div>
                        <div>
                            {u.followed

                                ? <button
                                    disabled={followingInProgress.some(id => id === u.id)}
                                    onClick={() => {
                                        unfollow(u.id)
                                        /*    /!*props.toggleFollowingProgress(true, u.id)*!/
                                                /!*axios.delete(`https://social-network.samuraijs.com/api/1.0/follow${u.id}`,
                                                    {
                                                        withCredentials: true,
                                                        headers: {
                                                            'API-KEY':'065141aa-5aec-4cbf-85a6-d8a09e624b9e'
                                                        }
                                                    })
                                            usersAPI.unfollow(u.id)
                                                .then(response => {
                                                    if (response.data.resultCode === 0) {
                                                        props.unfollow(u.id)
                                                    }
                                                    props.toggleFollowingProgress(false, u.id)
                                                })*!/


                                            //props.unfollow(u.id)*/

                                    }}>Unfollow</button>

                                : <button
                                    disabled={followingInProgress
                                        .some(id => id === u.id)}
                                    onClick={() => {
                                        follow(u.id)
                                        /*props.toggleFollowingProgress(true, u.id)

                                        /!*axios.post(`https://social-network.samuraijs.com/api/1.0/follow${u.id}`, {}, {
                                            withCredentials: true,
                                            headers: {
                                                'API-KEY':'065141aa-5aec-4cbf-85a6-d8a09e624b9e'
                                            }
                                        })*!/
                                        usersAPI.follow(u.id)
                                            .then(response => {
                                                if (response.data.resultCode === 0) {
                                                    props.follow(u.id)
                                                }

                                                props.toggleFollowingProgress(false, u.id)
                                            })*/
                                        //props.follow(u.id)
                                    }}>Follow</button>}
                        </div>
                    </span>
                    <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{'u.location.city'}</div>
                        <div>{'u.location.country'}</div>
                    </span>
                    </span>
                </div>
                )
            )}
    </div>
}