import React from 'react'
import {actions, DialogsPageType} from "../../redux/dialogs-reducer";
import {Dialogs} from './Dialogs'
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {compose, Dispatch} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";





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
    isAuth: boolean
}

export type MapDispatchToPropsType = {
    //updateNewMessageBody: (body: string) => void
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
/*        updateNewMessageBody: (body: string) => {
            dispatch(updateNewMessageBodyActionCreator(body))
        },*/
        sendMessage: (newMessage) => {
            dispatch(actions.sendMessageActionCreator(newMessage))
        }
    }
}

// let AuthRedirectComponent = withAuthRedirect(Dialogs)

export const DialogsContainer = compose<React.ComponentType>(
    withAuthRedirect,
    connect(mapStateToProps, mapDispatchToProps),
)(Dialogs)

/*export const DialogsContainer = compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsDialogsContainerType, AppStateType>(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs)*/

//const DialogsContainer = connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsDialogsContainerType, AppStateType>(mapStateToProps, mapDispatchToProps)(Dialogs)
