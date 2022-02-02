import React from "react";
import {Header} from "./Header";
import {logout} from "../../redux/auth-reducer";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";


class HeaderContainer extends React.Component<MapStateToPropsType & MapDispatchToPropsType> {

/*    componentDidMount() {
        this.props.getAuthUserData()
        /!*authAPI.me() //<AuthType>
            .then(response => {
                if (response.data.resultCode === 0) {
                    this.props.setAuthUsersData(response.data.data)
                }
            })*!/
    }*/

    render() {

        return <Header {...this.props}  />
    }
}

const mapStateToProps =(state: AppStateType): MapStateToPropsType => {

    return {
        isAuth: state.auth.isAuth,
        login: state.auth.data.email,
    }
}

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>
(mapStateToProps, {/*setAuthUsersData: setUsersData*/  /*getAuthUserData,*/ logout})(HeaderContainer)

export type MapStateToPropsType = {
    login: string
    isAuth: boolean
}

export type MapDispatchToPropsType = {
    //setAuthUsersData: (data: DataType) => void
    //getAuthUserData: () => void
    logout: () => void
}
