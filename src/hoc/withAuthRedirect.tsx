import React, {ComponentType} from "react";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../redux/redux-store";
import {connect} from "react-redux";

export type MapStateToPropsRedirectType = {
    isAuth: boolean
}

let mapStateToPropsRedirect = (state: AppStateType): MapStateToPropsRedirectType => {
    return {
        isAuth: state.auth.isAuth,
    }
}


export function withAuthRedirect<T>(Component: ComponentType<T>) {
    const RedirectComponent = (props: MapStateToPropsRedirectType) => {
        let {isAuth, ...restProps} = props
        if (!isAuth) return <Redirect to={'/login'}/>
        return <Component  {...restProps as T} />
    }


    let  ConnectedAuthRedirectComponent = connect(mapStateToPropsRedirect)(RedirectComponent)
    return ConnectedAuthRedirectComponent
}
