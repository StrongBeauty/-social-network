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
        debugger
        return <Header {...this.props}  />
    }
}

const mapStateToProps =(state: AppStateType): MapStateToPropsType => ({
    login: state.auth.data.email,
    isAuth: state.auth.isAuth,
})

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