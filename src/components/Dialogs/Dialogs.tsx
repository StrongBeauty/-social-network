import React, {FC} from 'react'
import s from "./Dialogs.module.css"
import {Message} from "./Message/Message";
import {DialogItem} from "./DialogItem/DialogItem";
import {DialogsPageType} from "../../redux/state";




type  DialogsPagePropsType = {
    dialogsPage: DialogsPageType
}

export const Dialogs : React.FC<DialogsPagePropsType> = (props) => {

    let dialogsElements = props.dialogsPage.dialogs
        .map( d => <DialogItem name={d.name} id={d.id}/>)

    let messagesElements = props.dialogsPage.messages
        .map( m => <Message message={m.message} /> )

      return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
               {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
                {/*<Message message={messagesData[0].message} />
                <Message message={messagesData[1].message} />*/}
            </div>
        </div>
      )
}