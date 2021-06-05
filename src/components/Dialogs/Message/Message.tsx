import React, {FC} from 'react'
import s from "./../Dialogs.module.css"

type MessagePropsType = {
    message: string
}


export const Message: React.FC<MessagePropsType> = (props) => {
    //let path = {}
    return(
        <div className={s.dialog}>
            {props.message}
        </div>
    )
}


