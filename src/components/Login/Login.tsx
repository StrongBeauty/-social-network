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
    captcha?: string
}

export type MapStateToPropsType = {
    isAuth: boolean
    captchaUrl: string
}

export type MapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha?: string) => void
}

type LoginPropsType = MapStateToPropsType & MapDispatchToPropsType

const Login: React.FC<LoginPropsType> = ({login, isAuth, captchaUrl}) => {
    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = data =>
        login(data.email, data.password, data.rememberMe, data.captcha)

    if (isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div>
            <h2>login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input  {...register('email', {required: true})} placeholder={'login'}/>
                </div>
                <div>
                    <input {...register('password', {required: true})} placeholder={'password'}/>
                </div>
                {(errors.email || errors.password) && <span>Enter login and password</span>}
                <div>
                    <input type='checkbox' {...register('rememberMe')} /> remember me
                </div>
                {captchaUrl && <>
                    <img src={captchaUrl}/>
                    <div>
                        <input {...register('captcha', {required: true})} placeholder={'Symbols from image'}/>
                    </div>
                </>
                }
                <div>
                    <input type='submit' value='Login'/>
                </div>
            </form>
        </div>
    )
}


let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl
    }
}

export default connect(mapStateToProps, {login})(Login)

