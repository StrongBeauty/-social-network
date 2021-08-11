import React, {FC} from 'react'
import s from "./Dialogs.module.css"
import {Message} from "./Message/Message";
import {DialogItem} from "./DialogItem/DialogItem";
import {MapDispatchToPropsType, MapStateToPropsType, OwnPropsDialogsContainerType} from "./DialogsContainer";
import {Redirect} from "react-router-dom"
import {SubmitHandler, useForm} from "react-hook-form";

type  DialogsPagePropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsDialogsContainerType

export const Dialogs: React.FC<DialogsPagePropsType> = (props) => {
    //let state = props.dialogsPage

    let dialogsElements = props.dialogsPage.dialogs
        .map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>)

    let messagesElements = props.dialogsPage.messages
        .map(m => <Message message={m.message} key={m.id}/>)


    // Не работает ввод, т.к. захордкоржэно значние!
    //let newMessageBody = props.dialogsPage.newMessageBody


    /*    let onSendMessageClick = () => {
            props.sendMessage()
            //props.dispatch(sendMessageCreator())
        }*/

    /*const onNewMessageChange = (e: any) => {
        let body = e.currentTarget.value
        props.updateNewMessageBody(body)
        //props.dispatch(updateNewMessageBodyCreator(body))
    }*/

    // const addNewMessageChange = (values: string) => {
    //      alert(values.newMessage)
    // }

    // const {register, handleSubmit, formState: {errors}} = useForm<Inputs>()
    // const onSubmit: SubmitHandler<Inputs> = values => props.sendMessage(values.newMessageBody)

    if (!props.isAuth) return <Redirect to={'/login'}/>

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <TXT sendM={props.sendMessage} />
                {/*<form onSubmit={handleSubmit(onSubmit)}>*/}
                {/*    <div>*/}
                {/*        <input type='textarea'  {...register('newMessageBody', {required: true})}*/}
                {/*            // value={props.newMessageBody}*/}
                {/*            // onChange={onNewMessageChange}*/}
                {/*               placeholder='Enter your message'/>*/}
                {/*    </div>*/}
                {/*    {(errors.newMessageBody) && <span>Field is required</span>}*/}
                {/*    <div>*/}
                {/*        <button>Send</button>*/}
                {/*    </div>*/}
                {/*    /!*<div><button onClick={onSendMessageClick}>Send</button> </div>*!/*/}
                {/*</form>*/}
                {/*<Message message={messagesData[0].message} />
                <Message message={messagesData[1].message} />*/}
            </div>
        </div>
    )
}
type Inputs = {
    newMessageBody: string
}

type Type = {
    sendM: (newMessage: string) => void
}

export const TXT: FC<Type> = ({sendM}) => {
    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = values => sendM(values.newMessageBody)

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input type='textarea'  {...register('newMessageBody', {required: true})}
                    // value={props.newMessageBody}
                    // onChange={onNewMessageChange}
                       placeholder='Enter your message'/>
            </div>
            {(errors.newMessageBody) && <span>Field is required</span>}
            <div>
                <button>Send</button>
            </div>
            {/*<div><button onClick={onSendMessageClick}>Send</button> </div>*/}
        </form>
    )
}