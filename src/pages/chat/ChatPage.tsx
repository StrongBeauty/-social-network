import React, {useEffect} from 'react';
import style from "./ChatPage.module.css";
import {useDispatch} from "react-redux";
import {startMessagesListening, stopMessagesListening} from "../../redux/chat-reducer";
import {Messages} from "../../components/chat/ChatMessages";
import {AddMessagesForm} from "../../components/chat/MsessageForm";

const ChatPage: React.FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return <div className={style.page}>
        <Messages/>
        <AddMessagesForm/>
    </div>
}

export default ChatPage








