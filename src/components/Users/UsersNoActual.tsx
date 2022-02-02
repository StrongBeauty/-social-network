import React from 'react'
import styles from "./Users.module.css"
import {
    MapDispatchToPropsType,
    MapStateToPropsType,
    OwnPropsDialogsContainerType
} from "./UsersContainer"
import * as axios from "axios";
import userPhoto from '../../../src/assets/images/user.jpg'

type UsersPagePropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsDialogsContainerType

//export
const Users = (props: UsersPagePropsType) => {
    const getUsers = () => {
        if (props.users.length === 0) {
            //@ts-ignore
            axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response => {
                //@ts-ignore
                props.setUsers(response.date.items)
            })
        }
    }
    /*    props.setUsers( [
            {id: 1, photoURL:'', followed: false, status: 'Boss', fullName: 'A', location: {city:'Minsk', country: 'Blr'}},
            {id: 2, photoURL:'', followed: true, status: 'Boss', fullName: 'B', location: {city:'M', country: 'Blr'}},
            {id: 3, photoURL:'', followed: true, status: 'Boss', fullName: 'C', location: {city:'Msk', country: 'Rus'}},
            {id: 4, photoURL:'', followed: false, status: 'Boss', fullName: 'D', location: {city:'Spb', country: 'Rus'}},
        ] )*/


    return <div>
        <button onClick={getUsers}>GetUsers</button>
        {
            props.users.map(u => <div key={u.id}>
        <span>
            <div>
                {/*//@ts-ignore*/}
                <img src={u.photos.small ! = null ? u.photos.small : userPhoto} className={styles.userPhoto}/>
            </div>
            <div>
                {u.followed
                    ? <button onClick={() => {
                        props.unfollow(u.id)
                    }}>Unfollow</button>
                    : <button onClick={() => {
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
