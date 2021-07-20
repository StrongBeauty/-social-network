import React from "react"
import s from "./Header.module.css"
import {NavLink} from "react-router-dom";

export const Header = (props:any) => {
    return(
        <header className={s.header}>
            <img
                src='https://i.pinimg.com/originals/43/20/c8/4320c8f26cfd8a002bd4c0ce0bd53492.png'/>
                <div className={s.loginBlock}>
                    {props.isauth ? props.login
                        : <NavLink to={'./login'}>Login</NavLink>
                    }
                        </div>
        </header>
    )
}

//export default Header