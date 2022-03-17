import React, { useEffect } from "react"
import s from "./Header.module.css"
import {Link, NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectIsAuth, selectLogin} from "../../redux/auth-selector";
import {logoutThunk} from "../../redux/auth-reducer";
import { useNavigate } from "react-router-dom";


export const Header: React.FC = () => {
    const login = useSelector(selectLogin)
    const isAuth = useSelector(selectIsAuth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuth) {
            navigate('login', {replace: true})
        }
    }, [isAuth])

    const onLogout = () => {
        dispatch(logoutThunk())
    }

    return (
        <header className={s.header}>
            <img src='https://i.pinimg.com/originals/43/20/c8/4320c8f26cfd8a002bd4c0ce0bd53492.png'
                 alt='loading..'
            />
            <div className={s.loginBlock}>
                {isAuth
                    ? <div>{login}
                        <button onClick={onLogout}>Log out</button>
                    </div>
                    : <NavLink to={'login'}>Login</NavLink>
                }
            </div>
        </header>
    )
}
