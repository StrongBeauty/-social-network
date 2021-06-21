import React from 'react'
import {DialogsPageType, sendMessageActionCreator, updateNewMessageBodyActionCreator} from "../../redux/DialogsReducer";
import {Dialogs} from './Dialogs'
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";


/*export const DialogsContainer: React.FC<DialogsPagePropsType> = (props) => {


    // Не работает ввод, т.к. захордкоржэно значние!
    /*let state = props.store.getState().dialogsPage



     let onSendMessageClick = () => {
         props.store.dispatch(sendMessageCreator())
     }

     const onNewMessageChange = (body: string) => {
         //let body = e.currentTarget.value
         props.store.dispatch(updateNewMessageBodyCreator(body))
     }*/
/* return <StoreContext.Consumer>
         { (store) => {
             let state = store.getstate().dialogsPage

             let onSendMessageClick = () => {
                 store.dispatch(sendMessageCreator())
             }

             const onNewMessageChange = (body: string) => {
                 //let body = e.currentTarget.value
                 store.dispatch(updateNewMessageBodyCreator(body))
             }
             return <Dialogs updateNewMessageBody={onNewMessageChange}
                      sendMessage={onSendMessageClick}
                      dialogsPage={state}/>
         }
         }
     </StoreContext.Consumer>
}
*/

export type MapStateToPropsType = {
    dialogsPage: DialogsPageType
}

export type MapDispatchToPropsType = {
    updateNewMessageBody: (body: string) => void
    sendMessage: () => void
}

export type OwnPropsDialogsContainerType = {}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage
    }
}

let mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        updateNewMessageBody: (body: string) => {
            dispatch(updateNewMessageBodyActionCreator(body))
        },
        sendMessage: () => {
            dispatch(sendMessageActionCreator())
        }
    }
}

export const DialogsContainer = connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsDialogsContainerType, AppStateType>(mapStateToProps, mapDispatchToProps)(Dialogs)