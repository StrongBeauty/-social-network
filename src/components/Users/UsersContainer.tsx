import React from 'react'
import {connect} from "react-redux";
import {Users} from "./Users";
import {AppStateType} from "../../redux/redux-store";
import {followAC, setUsersAC, unFollowAC, UserType} from "../../redux/UsersReducer";
import {Dispatch} from "redux";


const mapStateToProps =  (state: AppStateType): MapStateToPropsType => {
    return {
        users: state.usersPage.users
    }
}

const mapDispatchToProps =  (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        follow: (userId) => {
            dispatch(followAC(userId))
    },
        unFollow: (userId) => {
            dispatch(unFollowAC(userId))
        },
        setUsers: (users) => {
            dispatch(setUsersAC(users))
        }
    }
}

export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsDialogsContainerType, AppStateType>(mapStateToProps, mapDispatchToProps)(Users)

export type MapStateToPropsType = {
    users: Array<UserType>
}

export type MapDispatchToPropsType = {
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    setUsers: (users: Array<UserType>) => void
}

export type OwnPropsDialogsContainerType = {}