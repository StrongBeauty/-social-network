import React, {FC} from 'react'
import s from "./Dialogs.module.css"
import {Message} from "./Message/Message";
import {DialogItem} from "./DialogItem/DialogItem";
import {ActionsTypes, DialogsPageType} from "../../redux/state";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/DialogsReducer";

type  DialogsPagePropsType = {
    dialogsPage: DialogsPageType
    dispatch: (action: ActionsTypes) => void
}

export const Dialogs : React.FC<DialogsPagePropsType> = (props) => {
    let dialogsElements = props.dialogsPage.dialogs
        .map( d => <DialogItem name={d.name} id={d.id}/>)

    let messagesElements = props.dialogsPage.messages
        .map( m => <Message message={m.message} /> )



    // Не работает ввод, т.к. захордкоржэно значние!
    let newMessageBody = props.dialogsPage.newMessageBody



    let onSendMessageClick = () => {
        props.dispatch(sendMessageCreator())
    }

    const onNewMessageChange = (e: any) => {
        let body = e.currentTarget.value
        props.dispatch(updateNewMessageBodyCreator(body))
    }
      return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
               {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <div>
                    <textarea
                        value={newMessageBody}
                        onChange={onNewMessageChange}
                        placeholder='Enter your message' />
                </div>
                <div><button onClick={onSendMessageClick}>Send</button> </div>
                {/*<Message message={messagesData[0].message} />
                <Message message={messagesData[1].message} />*/}
            </div>
        </div>
      )
}