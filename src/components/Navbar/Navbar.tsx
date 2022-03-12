import React from "react"
import s from "./Navbar.module.css"
import {NavLink} from "react-router-dom";
import { selectAuthorizedUserId } from "../../redux/auth-selector";
import {useSelector} from "react-redux";


export const Navbar = () => {
    const userId = useSelector(selectAuthorizedUserId)

    return(
        <nav className={s.nav}>
            <div className={s.item}>
                <NavLink to={`profile/${userId}`}>Profile</NavLink>
            </div>
            <div className={`${s.item} ${s.active}`}>
                <NavLink to='dialogs'>Messages</NavLink>
            </div>
            <div className={`${s.item} ${s.active}`}>
                <NavLink to='users'>Users</NavLink>
            </div>
            <div className={`${s.item} ${s.active}`}>
                <NavLink to='chat'>Chat</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='news'>News</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='music'>Music</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='settings'>Settings</NavLink>
            </div>
        </nav>
    )
}

//export default Navbar;
