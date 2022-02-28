import React from 'react'
import s from "./../Dialogs.module.css"
import {NavLink} from "react-router-dom";

type DialogItemPropsType = {
    id: number
    name: string
}

export const DialogItem: React.FC<DialogItemPropsType> = ({
                                                              id,
                                                              name
                                                          }: DialogItemPropsType) => {
    let path = "/dialogs/" + id
    return (
        <div className={s.dialog + " " + s.active}>
            <NavLink to={path}>{name}</NavLink>
        </div>
    )
}

