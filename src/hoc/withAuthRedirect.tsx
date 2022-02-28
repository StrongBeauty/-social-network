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


export function withAuthRedirect<WCP>(WrappedComponent: ComponentType<WCP>) {
    const RedirectComponent = (props: MapStateToPropsRedirectType) => {
        let {isAuth, ...restProps} = props
        if (!isAuth) return <Redirect to={'/login'}/>
        return <WrappedComponent  {...restProps as WCP} />
    }


    let  ConnectedAuthRedirectComponent = connect(mapStateToPropsRedirect)(RedirectComponent)
    return ConnectedAuthRedirectComponent
}
