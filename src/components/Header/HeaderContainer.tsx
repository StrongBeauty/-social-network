import React from "react";
import {Header} from "./Header";
import axios from "axios";
import {AuthType, DataType, setUsersData} from "../../redux/auth-reducer";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {authAPI} from "../../api/api";

class HeaderContainer extends React.Component<MapStateToPropsType & MapDispatchToPropsType> {

    componentDidMount() {
        authAPI.getAuthUser() //<AuthType>
            .then(data => {
                if (data.resultCode === 0) {
                    this.props.setAuthUsersData(data.data)
                }
            })
    }

    render() {
        return <Header {...this.props} />
    }
}

const mapStateToProps =(state: AppStateType): MapStateToPropsType => ({
    login: state.auth.data.login,
    isAuth: state.auth.isAuth,
})

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>
(mapStateToProps, {setAuthUsersData: setUsersData})(HeaderContainer)

export type MapStateToPropsType = {
    login: string
    isAuth: boolean
}

export type MapDispatchToPropsType = {
    setAuthUsersData: (data: DataType) => void
}