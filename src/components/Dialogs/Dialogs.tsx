import React, {FC} from 'react'
import s from "./Dialogs.module.css"
import {Message} from "./Message/Message";
import {DialogItem} from "./DialogItem/DialogItem";
import {DialogsPageType, sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/state";




type  DialogsPagePropsType = {
    dialogsPage: DialogsPageType
}

export const Dialogs : React.FC<DialogsPagePropsType> = (props) => {

    let dialogsElements = props.dialogsPage.dialogs
        .map( d => <DialogItem name={d.name} id={d.id}/>)

    let messagesElements = props.dialogsPage.messages
        .map( m => <Message message={m.message} /> )
    let newMessageBody = props.dialogsPage.newMessageBody

    let onSendMessageClick = () => {
        props.store.dispatch(sendMessageCreator())
    }

    onNewMessageChange = (e) => {
        let body = e.currentTarget.value
        props.store.dispatch(updateNewMessageBodyCreator(body))
    }
      return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
               {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <div><texteria value={newMessageBody} onChange={onNewMessageChange} placeholder='Enter your message'></texteria></div>
                <div><button onClick={onSendMessageClick}>Send</button> </div>
                {/*<Message message={messagesData[0].message} />
                <Message message={messagesData[1].message} />*/}
            </div>
        </div>
      )
}