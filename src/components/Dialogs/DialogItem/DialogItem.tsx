import React from 'react'
import s from "../../../pages/dialogs/DialogsPage.module.css"
import {Link} from "react-router-dom";
import {DialogType} from "../../../redux/dialogs-reducer";
import avatarSmall from "../../../assets/images/avatarSmall.png";
import {MainUserInformation} from "../../common/mainUserInform/MainUserInformation";

type DialogItemPropsType =
    Pick<DialogType, 'id' | 'userName' | 'newMessagesCount'>
    & {
    photo: string | null,
    date: string
    time: string
    onClick: () => void
}

export const DialogItem: React.FC<DialogItemPropsType> = ({
                                                              id,
                                                              photo,
                                                              userName,
                                                              date,
                                                              time,
                                                              newMessagesCount,
                                                              onClick
                                                          }: DialogItemPropsType) => {


    return (
        <span className={s.dialog + " " + s.active}>
            <Link to={`/profile/${id}`}>
                <MainUserInformation
                    photo={photo}
                    name={userName}
                    avatar={avatarSmall}
                />
            </Link>
            <div>{time}</div>
            <div>{date}</div>
            <div>
                {newMessagesCount
                    ? newMessagesCount
                    : ''
                }
            </div>
            <button onClick={onClick}>
                Dialog
            </button>
        </span>
    )
}

