import React from 'react'
import s from "./../Dialogs.module.css"

type MessagePropsType = {
    message: string
}

export const Message: React.FC<MessagePropsType> = ({message}) => {
    //let path = {}
    return(
        <div className={s.dialog}>
            {message}
        </div>
    )
}


