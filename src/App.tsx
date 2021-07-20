import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header"
import {Navbar} from "./components/Navbar/Navbar";
import {Route} from "react-router-dom";
import {BrowserRouter} from "react-router-dom";
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {Settings} from "./components/Settings/Settings";
import {DialogsContainer} from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import {Login} from "./components/Login/Login";



/*type AppPropsType = {

    //state: RootStateType
    // store: any
    //addPost: () => void
    //updateNewPostText: (newText: string) => void
    //dispatch: (action: ActionsTypes) => void
}*/

export const App = () => {

    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path='/dialogs'
                           render={() => <DialogsContainer
                               //state={props.state}
                               //dispatch={props.dispatch}
                               //Dialogs
                               //dialogsPage={props.state.dialogsPage}
                               //dispatch={props.dispatch}
                           />}/>
                    <Route path='/profile/:userId?'
                           render={() => <ProfileContainer  //state={props.state}
                               //profilePage={props.state.profilePage}
                               //                  dispatch={props.dispatch}
                               /*addPost={props.addPost}
                                updateNewPostText={props.updateNewPostText}*/
                           />}/>
                    <Route path='/users'
                           render={() => <UsersContainer />}/>
                    <Route path='/news'
                           render={() => <News />}/>
                    <Route path='/music'
                           render={() => <Music />}/>
                    <Route path='/settings'
                           render={() => <Settings />}/>
                    <Route path='/login'
                           render={() => <Login />}/>

                    {/*<Route path='/dialogs' component={Dialogs} />
                <Route path='/profile' component={Profile} />
                <Route path='/news' component={News} />
                <Route path='/music' component={Music} />
                <Route path='/settings' component={Settings} />*/}
                </div>
            </div>
        </BrowserRouter>
    );
}
//export default App;
