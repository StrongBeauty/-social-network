import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {selectIsAuth} from "../../redux/auth-selector";
import {LoginForm} from "../../components/Login/LoginForm";


export const LoginPage: React.FC = () => {

    const isAuth = useSelector(selectIsAuth)

    const navigate = useNavigate()

    useEffect(() => {
        if (isAuth) {
           navigate('/', {replace: true})
       }
   }, [isAuth])

    return (
        <div>
            <h2>login</h2>
            <LoginForm />
        </div>
    )
}


