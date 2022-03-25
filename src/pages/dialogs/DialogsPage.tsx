import React, {useEffect} from 'react'
import s from "./DialogsPage.module.css"
import {DialogItem} from "../../components/Dialogs/DialogItem/DialogItem";
import {useDispatch, useSelector} from "react-redux";
import {selectDialogs} from "../../redux/dialogs-selector";
import {requestDialogs} from "../../redux/dialogs-reducer";
import {useNavigate} from "react-router-dom";
import {dateConverter, timeConverter} from "../../utils/date-helpers";

const DialogsPage: React.FC = () => {
    const dialogs = useSelector(selectDialogs)

    const dispatch = useDispatch()
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(requestDialogs())
    }, [])

    return (
        <>
            <div className={s.dialogs}>
                <div className={s.dialogsItems}>
                    {dialogs.map(d =>
                        <DialogItem key={d.id}
                                    id={d.id}
                                    photo={d.photos.small}
                                    userName={d.userName}
                                    date={dateConverter(d.lastUserActivityDate)}
                                    time={timeConverter(d.lastUserActivityDate)}
                                    newMessagesCount={d.newMessagesCount}
                                    onClick={() => {
                                        navigate(`/dialogs/${d.id}`)
                                    }}
                        />)}
                </div>
            </div>
        </>
    )
}
export default DialogsPage


