import React from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, ProfileType, updateStatus} from "../../redux/profile-reducer";
import {AppStateType} from "../../redux/redux-store";
import {RouteComponentProps, withRouter} from 'react-router-dom'
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirec";




class ProfileContainer extends React.Component<MapStateToPropsType  & MapDispatchToPropsType & RouteComponentProps<{userId: string}>>{

    componentDidMount() {
        let userId = this.props.match.params.userId

        if (!userId) {
            userId = String(this.props.authorizedUserId)
            if (+userId) {
                this.props.history.push('/login')
            }
        }

        this.props.getUserProfile(+userId)
        this.props.getUserStatus(+userId)
        /*usersAPI.getProfileUser(+userId).then(data => {
                this.props.setUserProfile(data)
        })*/
    }

    render() {
        //if (!this.props.isAuth) return <Redirect to={'/login'} />

        return (
            <div>
                <Profile
                    {...this.props}
                    profile={this.props.profile}
                    status={this.props.status}
                    updateStatus={this.props.updateStatus}
                    // setUserProfile={this.props.setUserProfile}
                />
            </div>
        )
    }
}



let AuthRedirectComponent = withAuthRedirect(ProfileContainer)

/*const mapStateToPropsRedirect =(state: AppStateType): MapStateToPropsRedirectType => ({
    isAuth: state.auth.isAuth,
})

AuthRedirectComponent = connect(mapStateToPropsRedirect)(AuthRedirectComponent)*/
/*let AuthRedirectComponent = (props: any) => {
    if (!props.isAuth) return <Redirect to={'/login'} />
    return <ProfileContainer {...props}/>
}*/



const mapStateToProps =(state: AppStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.data.id
    //isAuth: state.auth.isAuth,
})

export default  compose<React.ComponentType>(
    connect
    (mapStateToProps, {/*setUserProfile*/ getUserProfile, getUserStatus: getStatus, updateStatus}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)

/*export default  compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>
    (mapStateToProps, {/!*setUserProfile*!/ getUserProfile, getUserStatus: getStatus, updateStatus}),
    withRouter<MapStateToPropsType & MapDispatchToPropsType & RouteComponentProps, any>(AuthRedirectComponent),
    //withAuthRedirect
)(ProfileContainer)*/

/*const withUrlDataContainerComponent = withRouter<MapStateToPropsType & MapDispatchToPropsType & RouteComponentProps, any>(AuthRedirectComponent)

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>
(mapStateToProps, {/!*setUserProfile*!/ getUserProfile})(withUrlDataContainerComponent)*/

export type MapStateToPropsType = {
    profile: ProfileType
    status: string
    authorizedUserId: number
    //isAuth: boolean
}



export type MapDispatchToPropsType = {
    //setUserProfile: (profile: ProfileType) => void
    getUserProfile: (userId: number) => void
    getUserStatus: (userId: number) => void
    updateStatus: (status: string) => void
}

// export type OwnPropsProfileContainerType = {}

