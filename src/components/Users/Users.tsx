import React from 'react'
import {
    MapDispatchToPropsType,
    MapStateToPropsType,
    OwnPropsDialogsContainerType
} from "./UsersContainer"

type UsersPagePropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsDialogsContainerType

export const Users = (props: UsersPagePropsType) => {
    return <div> {
        props.users.map(u => <div key={u.id}>
        <span>
            <div>
                <img src={u.photoURL}/>
            </div>
            <div>
                <button>Follow</button>
            </div>
        </span>
        <span>
            <span>
                <div>{u.fullName}</div>
                <div>{u.status}</div>
            </span>
            <span>
                <div>{u.location.city}</div>
                <div>{u.location.country}</div>
            </span>
        </span>
        </div>
        )
    }

    </div>
}