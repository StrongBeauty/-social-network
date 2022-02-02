import React from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, ProfileType, updateStatus} from "../../redux/profile-reducer";
import {AppStateType} from "../../redux/redux-store";
import {RouteComponentProps, withRouter} from 'react-router-dom'
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";




class ProfileContainer extends React.Component<MapStateToPropsType  & MapDispatchToPropsType & RouteComponentProps<{userId: string}>>{

    componentDidMount() {
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

    render() {

        return (
            <div>
                <Profile
                    {...this.props}
                    profile={this.props.profile}
                    status={this.props.status}
                    updateStatus={this.props.updateStatus}
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
    (mapStateToProps, { getUserProfile, getUserStatus: getStatus, updateStatus}),
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
}

