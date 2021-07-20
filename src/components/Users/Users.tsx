import React from "react";
import styles from "./Users.module.css"
import userPhoto from '../../../src/assets/images/user.jpg'
import {UserType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";
import axios from "axios";

export type UsersType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (p: number) => void
    users: Array<UserType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    followingInProgress: Array<number>
    toggleIsFollowingProgress: (isFetching: boolean, userId: number) => void
}

export const Users = (props: UsersType) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = []
    for (let i = 1; i < pagesCount; i++) {
        pages.push(i)
    }
    return <div>
        <div>
            {pages.map(p => {
                return <span className={props.currentPage === p ? styles.selectedPage : ''}
                             onClick={(e) => {
                                 props.onPageChanged(p)
                             }}>{p}</span>
            })}
        </div>
        {
            props.users.map(u => <div key={u.id}>
        <span>
            <div>
                <NavLink to={'/profile/' + u.id}>
                <img src={u.photos.small ! = null ? u.photos.small : userPhoto}
                     className={styles.userPhoto}/>
                </NavLink>
            </div>
            <div>
                {u.followed

                    ? <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                        props.toggleIsFollowingProgress(true, u.id)
                        axios.post(`https://social-network.samuraijs.com/api/1.0/unfollow${u.id}`,
                            {
                                withCredentials: true,
                                headers: {
                                    'API-KEY': '065141aa-5aec-4cbf-85a6-d8a09e624b9e'
                                }
                            })
                            .then(response => {
                                if (response.data.resultCode === 0) {
                                    props.unfollow(u.id)
                                }
                                props.toggleIsFollowingProgress(false, u.id)
                            })


                        props.unfollow(u.id)

                    }}>Unfollow</button>

                    : <button
                        disabled={props.followingInProgress.some(id => {
                            return id === u.id;
                        })}
                        onClick={() => {
                            //props.toggleIsFollowingProgress(true, u.id);
                            axios.post(`https://social-network.samuraijs.com/api/1.0/follow${u.id}`, {}, {
                                withCredentials: true,
                                headers: {'API-KEY': '065141aa-5aec-4cbf-85a6-d8a09e624b9e'}})
                                .then(response => {
                                    if (response.data.resultCode === 0) {
                                        props.follow(u.id)
                                    }

                                    props.toggleIsFollowingProgress(false, u.id)
                                })
                            props.follow(u.id)
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
        }

    </div>
}