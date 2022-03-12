import React, {useEffect, useState} from 'react';
import style from "./ChatPage.module.css";
import {ChatMessageType} from "../../api/chat-api";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/chat-reducer";
import {selectMessages} from "../../redux/chat-selector";
import { selectIsAuth } from '../../redux/auth-selector';
//import {Redirect} from "react-router-dom"


export const ChatPage: React.FC = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector(selectIsAuth)

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])


/*    if (!isAuth) {
        return <Redirect to={'/login'}/>
    }*/

    return <div className={style.page}>
        <Messages/>
        <AddMessagesForm/>
    </div>
}

export default ChatPage


export const Messages: React.FC = () => {
    const messages = useSelector(selectMessages)

    return <div className={style.chat}>
        {messages.map((m, index) => <Message key={index} messagePack={m}/>)}
    </div>
}


export const Message: React.FC<{ messagePack: ChatMessageType }> = ({messagePack}) => {

    const {photo, userName, message} = messagePack

    return <div>
        <img className={style.chat__photo} src={photo}/> <b>{userName}</b>
        <br/>
        {message}
        <hr/>
    </div>
}

export const AddMessagesForm: React.FC = () => {

    const dispatch = useDispatch()

    const [message, setMessage] = useState('')

    const sendMessageHandler = () => {
        if (message) {
            dispatch(sendMessage(message))
        } else {
            return
        }
        setMessage('')
    }

    return <>
        <div>
            <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
        </div>
        <div>
            <button disabled={false} onClick={sendMessageHandler}>Send</button>
        </div>
    </>
}
