import React, {FC} from 'react'
import s from "./Dialogs.module.css"
import {Message} from "./Message/Message";
import {DialogItem} from "./DialogItem/DialogItem";
//
import {SubmitHandler, useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {selectDialogs, selectMessages} from "../../redux/dialogs-selector";
import {selectIsAuth} from "../../redux/auth-selector";
import {actions} from "../../redux/dialogs-reducer";
import { dialogsAPI } from '../../api/dialogs-api';

const DialogsPage: React.FC = () => {
    const messages = useSelector(selectMessages)
    const dialogs = useSelector(selectDialogs)
    const isAuth = useSelector(selectIsAuth)
    const dispatch = useDispatch()

    let dialogsElements = dialogs
        .map(d => <DialogItem name={d.name} key={d.id + Math.random()} id={d.id}/>)

    let messagesElements = messages
        .map(m => <Message message={m.message} />)

/*    if (!isAuth) {
        return <Redirect to={'/login'}/>
    }*/

    const sendMessage = (newMessage: string) => {
        dispatch(actions.sendMessageActionCreator(newMessage))
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <TXT sendM={sendMessage} />
            </div>
        </div>
    )
}

export default DialogsPage

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
                       placeholder='Enter your message'/>
            </div>
            {(errors.newMessageBody) && <span>Field is required</span>}
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}
