import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {sendMessage} from "../../redux/chat-reducer";

export const AddMessagesForm: React.FC = () => {
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

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
            <textarea
                onChange={(e) =>
                    setMessage(e.currentTarget.value)}
                value={message}
            >
            </textarea>
        </div>
        <div>
            <button
                disabled={false}
                onClick={sendMessageHandler}
            >
                Send
            </button>
        </div>
    </>
}
