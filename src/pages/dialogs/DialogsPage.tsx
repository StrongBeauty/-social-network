import React, {useEffect} from 'react'
import s from "./DialogsPage.module.css"
import {DialogItem} from "../../components/Dialogs/DialogItem/DialogItem";
import {useDispatch, useSelector} from "react-redux";
import {selectDialogs, selectIsFetching} from "../../redux/dialogs-selector";
import {requestDialogs} from "../../redux/dialogs-reducer";
import {Preloader} from "../../components/common/preloader/preloader";
import {useNavigate} from "react-router-dom";

const DialogsPage: React.FC = () => {
    const dialogs = useSelector(selectDialogs)

    const dispatch = useDispatch()
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(requestDialogs())
    }, [])

    let dialogsElements = dialogs
        .map(d => <DialogItem key={d.id}
                              id={d.id}
                              photo={d.photos.small}
                              userName={d.userName}
                              lastUserActivityDate={d.lastUserActivityDate}
                              newMessagesCount={d.newMessagesCount}
                              onClick={() => {navigate(`/dialogs/${d.id}`)
                              }}
        />)

    return (
        <>
            <div className={s.dialogs}>
                <div className={s.dialogsItems}>
                    {dialogsElements}
                </div>
            </div>
        </>
    )
}

export default DialogsPage


