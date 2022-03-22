import React from "react";
import {UserType} from "../../redux/users-reducer";
import {MainUserInformation} from "../common/mainUserInform/MainUserInformation";
import avatarSmall from "../../assets/images/avatarSmall.png";
import { Link } from "react-router-dom";
import styles from "./User.module.css";


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

    return <span>
        <>
            <Link to={`/profile/${user.id}`}
                  className={styles.name}>
                <MainUserInformation
                    photo={user.photos.small}
                    name={user.name}
                    avatar={avatarSmall}
                />
            </Link>
            <div>{user.status}</div>
            {isAuth &&
                <>
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
                                }}>
                                Follow</button>
                        }
                    </div>
                    <div>
                        <button
                            onClick={() => {
                            }}
                        >
                            Message
                        </button>
                    </div>
                </>
            }
        </>
    </span>
}


