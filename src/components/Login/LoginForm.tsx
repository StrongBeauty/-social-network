import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectCaptchaUrl} from "../../redux/auth-selector";
import {SubmitHandler, useForm} from "react-hook-form";
import {loginThunk} from "../../redux/auth-reducer";

type Inputs = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

export const LoginForm = () => {

    const captchaUrl = useSelector(selectCaptchaUrl)

    const dispatch = useDispatch()
    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = data =>
        dispatch(loginThunk(data.email, data.password, data.rememberMe, data.captcha))

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input
                    {...register('email', {required: true})}
                    placeholder={'login'}
                />
            </div>
            <div>
                <input
                    {...register('password', {required: true})}
                    placeholder={'password'}
                />
            </div>
            {(errors.email || errors.password)
             && <span>
                    Enter login and password
                </span>
            }
            <div>
                <input
                    type='checkbox' {...register('rememberMe')}
                />
                remember me
            </div>
            {captchaUrl
                && <>
                    <img src={captchaUrl}
                         alt='loading...'
                    />
                    <div>
                        <input {...register('captcha', {required: true})}
                               placeholder={'Symbols from image'}
                        />
                    </div>
                </>
            }
            <div>
                <input
                    type='submit'
                    value='Login'
                />
            </div>
        </form>
    )
}
