import React from 'react'
import s from "./../Dialogs.module.css"
import {Link, useNavigate} from "react-router-dom";
import {DialogType} from "../../../redux/dialogs-reducer";
import {PhotosType} from "../../../redux/profile-reducer";
import avatarSmall from "../../../assets/images/avatarSmall.png";
import {MainUserInformation} from "../../common/mainUserInform/MainUserInformation";

type DialogItemPropsType =
    Omit<DialogType, 'hasNewMessages' | 'lastDialogActivityDate' | 'photos'>
    & Pick<PhotosType, 'small'> & {onClick: () => void}

export const DialogItem: React.FC<DialogItemPropsType> = ({
                                                              id,
                                                              small,
                                                              userName,
                                                              lastUserActivityDate,
                                                              newMessagesCount,
                                                              onClick
                                                          }: DialogItemPropsType) => {

    const allDate = new Date(lastUserActivityDate)
    const time = allDate.toLocaleString('en-Gb', {
        hour: '2-digit',
        minute: '2-digit',
    })
    const date = allDate.toLocaleString('en-Gb', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).replace(/\//g, '.')

    return (
        <span className={s.dialog + " " + s.active}>
            <Link to={`/profile/${id}`}>
                <MainUserInformation
                    photo={small}
                    name={userName}
                    avatar={avatarSmall}
                />
            </Link>
            <div>{time}</div>
            <div>{date}</div>
            <div>{newMessagesCount ? newMessagesCount : ''}</div>
            <button onClick={onClick}>Dialog</button>
        </span>
    )
}

