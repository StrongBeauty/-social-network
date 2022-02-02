import React from "react"
import s from "./Header.module.css"
import {NavLink} from "react-router-dom";


type HeaderPropsType = {
    login: string
    isAuth: boolean
    logout: () => void
}

export const Header = (props: HeaderPropsType) => {

    return(
        <header className={s.header}>
            <img src='https://i.pinimg.com/originals/43/20/c8/4320c8f26cfd8a002bd4c0ce0bd53492.png' alt='loading..'/>
                <div className={s.loginBlock}>
                    {props.isAuth
                        ? <div>{props.login}  <button onClick={props.logout}>Log out</button></div>
                        : <NavLink to={'./login'}>Login</NavLink>
                    }
                        </div>
        </header>

    )
}

//export default Header
