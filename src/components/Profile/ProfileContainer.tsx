import React from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, ProfileType, savePhoto, updateStatus} from "../../redux/profile-reducer";
import {AppStateType} from "../../redux/redux-store";
import {RouteComponentProps, withRouter} from 'react-router-dom'
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";




class ProfileContainer extends React.Component<MapStateToPropsType  & MapDispatchToPropsType & RouteComponentProps<{userId: string}>>{

    refreshProfile() {
        let userId = this.props.match.params.userId ? this.props.match.params.userId : '11851'

        if (!userId) {
            userId = String(this.props.authorizedUserId)
            if (+userId) {
                this.props.history.push('/login')
            }
        }

        this.props.getUserProfile(+userId)
        this.props.getUserStatus(+userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<MapStateToPropsType & MapDispatchToPropsType & RouteComponentProps<{ userId: string }>>): void {
        if (this.props.match.params.userId !== prevProps.match.params.userId){
            this.refreshProfile()
        }
    }

    render() {

        return (
            <div>
                <Profile
                    {...this.props}
                    isOwner={!this.props.match.params.userId}
                    profile={this.props.profile}
                    status={this.props.status}
                    updateStatus={this.props.updateStatus}
                    savePhoto={this.props.savePhoto}
                />
            </div>
        )
    }
}

const mapStateToProps =(state: AppStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.data.id
})

export default  compose<React.ComponentType>(
    connect
    (mapStateToProps, { getUserProfile, getUserStatus: getStatus, updateStatus, savePhoto}),
    withRouter,
    withAuthRedirect,
)(ProfileContainer)

export type MapStateToPropsType = {
    profile: ProfileType
    status: string
    authorizedUserId: number
}



export type MapDispatchToPropsType = {
    getUserProfile: (userId: number) => void
    getUserStatus: (userId: number) => void
    updateStatus: (status: string) => void
    savePhoto: (photo: File) => void
}

