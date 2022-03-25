import React from "react"
import s from "./Navbar.module.css"
import {selectAuthorizedUserId} from "../../redux/auth-selector";
import {useSelector} from "react-redux";
import {CustomLink} from "../../features/CustomLink";

/*type stylePropsType = {
    isActive: boolean
}*/

export const Navbar = () => {
    const userId = useSelector(selectAuthorizedUserId)
/*    const setActive = ({isActive}: stylePropsType) => {
        return isActive ? s.activeLink : ''
    }*/

    return(
        <nav className={s.nav}>
            <div className={s.item}>
                <CustomLink to={!{userId} ?`profile/${userId}` : '/login'}
                         //className={setActive}
                >
                    Profile
                </CustomLink>
            </div>
            <div className={s.item}>
                <CustomLink to='dialogs'>
                    Messages
                </CustomLink>
            </div>
            <div className={s.item}>
                <CustomLink  to='users'>
                    Users
                </CustomLink >
            </div>
            <div className={s.item}>
                <CustomLink  to='chat'>
                    Chat
                </CustomLink >
            </div>
            <div className={s.item}>
                <CustomLink  to='news'>
                    News
                </CustomLink >
            </div>
            <div className={s.item}>
                <CustomLink  to='music'>
                    Music
                </CustomLink >
            </div>
            <div className={s.item}>
                <CustomLink  to='settings'>
                    Settings
                </CustomLink >
            </div>
        </nav>
    )
}
