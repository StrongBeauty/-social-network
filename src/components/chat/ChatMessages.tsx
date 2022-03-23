import React from "react";
import {useSelector} from "react-redux";
import {selectMessages} from "../../redux/chat-selector";
import style from "../../pages/chat/ChatPage.module.css";
import {Message} from "./ChatMessage";

export const Messages: React.FC = () => {
    const messages = useSelector(selectMessages)

    return <div className={style.chat}>
        {messages
            .map((m, index) =>
                <Message key={index}
                         messagePack={m}
                />)
        }
    </div>
}
