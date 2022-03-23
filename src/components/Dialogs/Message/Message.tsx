import React from 'react'
import s from "../../../pages/dialogs/DialogsPage.module.css"

type MessagePropsType = {
    message: string
}

export const Message: React.FC<MessagePropsType> = ({message}) => {
    return(
        <div className={s.dialog}>
            {message}
        </div>
    )
}


