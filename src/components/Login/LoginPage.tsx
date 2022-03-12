import React, { useEffect } from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import {loginThunk} from "../../redux/auth-reducer";
import {selectCaptchaUrl, selectIsAuth} from "../../redux/auth-selector";


type Inputs = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

export const LoginPage: React.FC = () => {

    const isAuth = useSelector(selectIsAuth)
    const captchaUrl = useSelector(selectCaptchaUrl)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = data =>
        dispatch(loginThunk(data.email, data.password, data.rememberMe, data.captcha))

   useEffect(() => {
       if (isAuth) {
           navigate('/', {replace: true})
       }
   }, [isAuth])

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
                    <img src={captchaUrl} alt='loading...'/>
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


