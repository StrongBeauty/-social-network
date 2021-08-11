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


class UsersContainer extends React.Component<MapStateToPropsType & MapDispatchToPropsType> {
    constructor(props: MapStateToPropsType & MapDispatchToPropsType) {
        super(props)
        if (this.props.users.length === 0) {
            usersAPI.getNoUsers().then(data => {
                this.props.setUsers(data.items)
            })
        }
    }

    componentDidMount() {

        this.props.requestUsers(this.props.currentPage, this.props.pageSize)

        /*this.props.toggleIsFetching(true)
        usersAPI.getUsers(this.props.currentPage, this.props.pageSize)
            .then(data => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(data.items)
                this.props.setTotalUsersCount(data.totalCount)
            })*/
    }

    onPageChanged = (pageNumber: number) => {

        this.props.requestUsers(pageNumber, this.props.pageSize)

        /*
                this.props.setCurrentPage(pageNumber)
                this.props.toggleIsFetching(true)
                usersAPI.getUsers(pageNumber, this.props.pageSize)
                    .then(data => {
                    this.props.setUsers(data.items)
                })
        */

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
    }
}

/*const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
    }
}*/

/*const mapDispatchToProps =  (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        follow: (userId) => {
            dispatch(followAC(userId))
    },
        unfollow: (userId) => {
            dispatch(unfollowAC(userId))
        },
        setUsers: (users) => {
            dispatch(setUsersAC(users))
        },
        setCurrentPage: (pageNumber) => {
            dispatch(setCurrentPageAC(pageNumber))
        },
        setTotalUsersCount: (totalCount) => {
            dispatch(setTotalUsersCountAC(totalCount))
        },
        toggleIsFetching: (isFetching) => {
            dispatch(toggleIsFetchingAC(isFetching))
        },
    }
}*/

/*
default withAuthRedirect(connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsDialogsContainerType, AppStateType>
(mapStateToProps, {follow: followThunk, unfollow: unfollowThunk, setUsers, setCurrentPage,/!* setTotalUsersCount,*!/ /!*toggleIsFetching,*!/ toggleIsFollowingProgress: toggleFollowingProgress,/!* getUsers:*!/ getUsers})(UsersContainer)) //, toggleIsFollowingProgress
*/

export default compose<React.ComponentType>(
    //withAuthRedirect,
    connect(mapStateToProps, {
        follow: followThunk,
        unfollow: unfollowThunk,
        setUsers: actions.setUsers,
        setCurrentPage: actions.setCurrentPage,/* setTotalUsersCount,*/ /*toggleIsFetching,*/
        toggleIsFollowingProgress: actions.toggleFollowingProgress,/* getUsers:*/
        requestUsers: requestUsers
    })
)(UsersContainer)

/*export default compose<React.ComponentType>(
    withAuthRedirect,
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsDialogsContainerType, AppStateType>
    (mapStateToProps, {follow: followThunk, unfollow: unfollowThunk, setUsers, setCurrentPage,/!* setTotalUsersCount,*!/ /!*toggleIsFetching,*!/ toggleIsFollowingProgress: toggleFollowingProgress,/!* getUsers:*!/ getUsers})
)(UsersContainer)*/


export type MapStateToPropsType = {
    users: Array<UserType>,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: number[],
}

export type MapDispatchToPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: Array<UserType>) => void
    setCurrentPage: (pageNumber: number) => void
    /*setTotalUsersCount: (totalCount: number) => void
    toggleIsFetching: (isFetching: boolean) => void*/
    toggleIsFollowingProgress: (isFetching: boolean, userId: number) => void
    requestUsers: (currentPage: number, pageSize: number) => void
}

export type OwnPropsDialogsContainerType = {}