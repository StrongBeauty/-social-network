import React, {FC, useEffect} from 'react'
import s from "./Dialogs.module.css"
import {DialogItem} from "./DialogItem/DialogItem";
import {SubmitHandler, useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {selectDialogs, selectIsFetching} from "../../redux/dialogs-selector";
import {actions, requestDialogs} from "../../redux/dialogs-reducer";
import {Preloader} from "../common/preloader/preloader";
import {useNavigate} from "react-router-dom";

const DialogsPage: React.FC = () => {
    //const messages = useSelector(selectMessages)
    const dialogs = useSelector(selectDialogs)
    const isFetching = useSelector(selectIsFetching)

    const dispatch = useDispatch()
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(requestDialogs())
    }, [])

    let dialogsElements = dialogs
        .map(d => <DialogItem key={d.id}
                              id={d.id}
                              small={d.photos.small}
                              userName={d.userName}
                              lastUserActivityDate={d.lastUserActivityDate}
                              newMessagesCount={d.newMessagesCount}
                              onClick={() => {navigate(`/dialogs/${d.id}`)
                              }}
        />)

    const sendMessage = (newMessage: string) => {
        dispatch(actions.sendMessageActionCreator(newMessage))
        //dispatch(dialogsAPI.startDialog(21599))

    }

    return (
        <>
            {isFetching ? <Preloader/> : null}
            <div className={s.dialogs}>
                <div className={s.dialogsItems}>
                    {dialogsElements}
                </div>
            </div>
        </>
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
