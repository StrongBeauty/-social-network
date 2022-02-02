import React from 'react'
import {connect} from "react-redux";
import {Users} from "./Users";
import {AppStateType} from "../../redux/redux-store";
import {
    actions,
    requestUsers, unfollowThunk, followThunk,
    UserType
} from "../../redux/users-reducer";
import {Preloader} from "../common/preloader/preloader";
import {compose} from "redux";
import {usersAPI} from "../../api/users-api";
import {
    getPageSize,
    getTotalUsersCount,
    getCurrentPage, getIsFetching, getFollowingInProgress, getUsers
} from "../../redux/users-selector";
import {getIsAuth} from "../../redux/auth-selector";


class UsersContainer extends React.Component<MapStateToPropsType & MapDispatchToPropsType> {
    constructor(props: MapStateToPropsType & MapDispatchToPropsType) {
        super(props)
        if (this.props.users.length === 0) {
            usersAPI.getNoUsers()
                .then(data => {
                this.props.setUsers(data.items)
            })
        }
    }

    componentDidMount() {
        const {currentPage, pageSize} = this.props
        this.props.requestUsers(currentPage, pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize} = this.props
        this.props.requestUsers(pageNumber, pageSize)
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   followingInProgress={this.props.followingInProgress}
                   toggleFollowingProgress={this.props.toggleIsFollowingProgress}
                   isAuth={this.props.isAuth}
            />
        </>
    }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        isAuth: getIsAuth(state),
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        follow: followThunk,
        unfollow: unfollowThunk,
        setUsers: actions.setUsers,
        setCurrentPage: actions.setCurrentPage,/* setTotalUsersCount,*/ /*toggleIsFetching,*/
        toggleIsFollowingProgress: actions.toggleFollowingProgress,/* getUsers:*/
        requestUsers: requestUsers
    })
)(UsersContainer)

export type MapStateToPropsType = {
    users: Array<UserType>,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: number[],
    isAuth: boolean,
}

export type MapDispatchToPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: Array<UserType>) => void
    setCurrentPage: (pageNumber: number) => void
    toggleIsFollowingProgress: (isFetching: boolean, userId: number) => void
    requestUsers: (currentPage: number, pageSize: number) => void
}

export type OwnPropsDialogsContainerType = {}
