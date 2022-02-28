import {Redirect} from "react-router-dom";
import React from "react";

export const loginRedirect = (isAuth: boolean) => {
    if (!isAuth) {
        return <Redirect to={'/profile'}/>
    }
}
