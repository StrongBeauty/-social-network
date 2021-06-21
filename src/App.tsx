import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header"
import {Navbar} from "./components/Navbar/Navbar";
import {Profile} from "./components/Profile/Profile";
import {Dialogs} from "./components/Dialogs/Dialogs";
import {Route} from "react-router-dom";
import {BrowserRouter} from "react-router-dom";
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {Settings} from "./components/Settings/Settings";
import {ActionsTypes, RootStateType, StoreType,} from './redux/store'
import {DialogsContainer} from "./components/Dialogs/DialogsContainer";
import {store} from "./redux/redux-store";


type AppPropsType ={

  //state: RootStateType
  // store: any
  //addPost: () => void
  //updateNewPostText: (newText: string) => void
  //dispatch: (action: ActionsTypes) => void
}

export const App = ()  => {

  return (
      <BrowserRouter>
        <div className='app-wrapper'>
          <Header/>
          <Navbar/>
          <div className = 'app-wrapper-content'>
            <Route path='/dialogs'
                   render={ () => <DialogsContainer
                       //state={props.state}
                       //dispatch={props.dispatch}
                       //Dialogs
                       //dialogsPage={props.state.dialogsPage}
                       //dispatch={props.dispatch}
                   />} />
            <Route path='/profile'
                   render={ () => <Profile //state={props.state}
                       //profilePage={props.state.profilePage}
                         //                  dispatch={props.dispatch}
                                           /*addPost={props.addPost}
                                            updateNewPostText={props.updateNewPostText}*/
                   />} />
            <Route path='/news'
                   render={ () => <News />} />
            <Route path='/music'
                   render={ () => <Music />} />
            <Route path='/settings'
                   render={ () => <Settings />} />

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
