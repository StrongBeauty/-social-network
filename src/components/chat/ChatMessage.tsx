import React from "react";
import {ChatMessageType} from "../../api/chat-api";
import style from "../../pages/chat/ChatPage.module.css";

export const Message: React.FC<{ messagePack: ChatMessageType }> = ({messagePack}) => {

    const {photo, userName, message} = messagePack

    return <div>
        <img
            className={style.chat__photo}
            src={photo}
        />
        <b>{userName}</b>
        <br/>
        {message}
        <hr/>
    </div>
}
