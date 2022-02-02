import React from "react";
import styles from "./Users.module.css"
import userPhoto from '../../../src/assets/images/user.jpg'
import {UserType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";


type UserPropsType = {
    user: UserType
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    followingInProgress: Array<number>
    isAuth: boolean
}

export const User: React.FC<UserPropsType> = ({
                                                  user,
                                                  follow,
                                                  unfollow,
                                                  followingInProgress,
                                                  isAuth
                                              }) => {


    return <div>
                    <span>
                        <div>
                            <NavLink to={'/profile/' + user.id}>
                            <img src={user.photos.small !== null ? user.photos.small : userPhoto} alt='avatar'

                                 className={styles.userPhoto}/>
                            </NavLink>
                        </div>
                        {isAuth &&
                            <div>
                                {user.followed

                                    ? <button
                                        disabled={followingInProgress.some(id => id === user.id)}
                                        onClick={() => {
                                            unfollow(user.id)

                                        }}>Unfollow</button>

                                    : <button
                                        disabled={followingInProgress
                                            .some(id => id === user.id)}
                                        onClick={() => {
                                            follow(user.id)
                                        }}>Follow</button>}
                            </div>
                        }
                    </span>
        <span>
                    <span>
                        <div>{user.name}</div>
                        <div>{user.status}</div>
                    </span>
                    <span>
                        <div>{'u.location.city'}</div>
                        <div>{'u.location.country'}</div>
                    </span>
                    </span>
    </div>
}
