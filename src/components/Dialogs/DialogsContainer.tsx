import React from 'react'
import {actions, DialogsPageType} from "../../redux/dialogs-reducer";
import {Dialogs} from './Dialogs'
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {compose, Dispatch} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";


export type MapStateToPropsType = {
    dialogsPage: DialogsPageType
    isAuth: boolean
}

export type MapDispatchToPropsType = {
    sendMessage: (newMessage: string) => void
}

export type OwnPropsDialogsContainerType = {}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage,
        isAuth: state.auth.isAuth,
    }
}

let mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        sendMessage: (newMessage) => {
            dispatch(actions.sendMessageActionCreator(newMessage))
        }
    }
}


const DialogsContainer = compose<React.ComponentType>(
    withAuthRedirect,
    connect(mapStateToProps, mapDispatchToProps),
)(Dialogs)

export default DialogsContainer;

