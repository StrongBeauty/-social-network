import React from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";
import {Redirect} from "react-router-dom";


type Inputs = {
    email: string
    password: string
    rememberMe: boolean
}

export type MapStateToPropsType = {
    isAuth: boolean
}

export type MapDispatchToPropsType = {
    //setAuthUsersData: (data: DataType) => void
    login: (email: string, password: string, rememberMe: boolean) => void
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType

const Login : React.FC<PropsType> = ({login, isAuth}) => {
    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = data =>
        login(data.email, data.password, data.rememberMe)
    if (isAuth) {
        return <Redirect to={'/profile'} />
    }

    return (
        <div>
        <h2>login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input  {...register('email', {required: true})} placeholder={'login'} />
            </div>
            <div>
                <input {...register('password', {required: true})} placeholder={'password'} />
            </div>
            {(errors.email || errors.password) && <span>Enter login and password</span>}
            <div>
                <input type='checkbox' {...register('rememberMe')} /> remember me
            </div>
            <div>
                <input type='submit' value='Login' />
            </div>
        </form>
        </div>
    )
}

/*const Login1 = ()   => {


    return <div>
        <h2>login</h2>
        <LoginForm/>
    </div>
}*/

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth,
    }
}

export default connect(mapStateToProps, {login})(Login)

