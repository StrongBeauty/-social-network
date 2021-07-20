import React from "react";
import {Profile} from "./Profile";
import {connect, useDispatch, useSelector} from "react-redux";
import {ProfileType, setUserProfile} from "../../redux/profile-reducer";
import {AppStateType} from "../../redux/redux-store";
import axios from "axios";
import {Redirect, RouteComponentProps, withRouter} from 'react-router-dom'
import {profileAPI} from "../../api/api";


class ProfileContainer extends React.Component<MapStateToPropsType & MapDispatchToPropsType & RouteComponentProps<{userId: string}>>{

    componentDidMount() {
        let userId = this.props.match.params.userId

        if (!userId) {
            userId = '2'
        }

        profileAPI.getProfileUser(+userId) //<ProfileType>
            .then(data => {
                this.props.setUserProfile(data)
        })
    }

    render() {
        if (!this.props.isAuth) return <Redirect to={'/login'} />

        return (
            <div>
                <Profile
                    {...this.props}
                    profile={this.props.profile}
                    // setUserProfile={this.props.setUserProfile}
                />
            </div>
        )
    }
}

const mapStateToProps =(state: AppStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth,
})


const withUrlDataContainerComponent = withRouter<MapStateToPropsType & MapDispatchToPropsType & RouteComponentProps, any>(ProfileContainer)

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>
(mapStateToProps, {setUserProfile})(withUrlDataContainerComponent)

export type MapStateToPropsType = {
    profile: ProfileType
    isAuth: boolean
}

export type MapDispatchToPropsType = {
    setUserProfile: (profile: ProfileType) => void
}

// export type OwnPropsProfileContainerType = {}

