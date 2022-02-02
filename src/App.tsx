import React from 'react';
import './App.css';
import {Navbar} from "./components/Navbar/Navbar";
import {Route, withRouter} from "react-router-dom";
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {Settings} from "./components/Settings/Settings";
import HeaderContainer from "./components/Header/HeaderContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import {DialogsContainer} from "./components/Dialogs/DialogsContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import {AppStateType} from "./redux/redux-store";
import {Preloader} from "./components/common/preloader/preloader";





/*type AppPropsType = {

    //state: RootStateType
    // store: any
    //addPost: () => void
    //updateNewPostText: (newText: string) => void
    //dispatch: (action: ActionsTypes) => void
}*/

class App extends React.Component<MapStateToPropsType & MapDispatchToPropsType> {

    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
                <div className='app-wrapper'>
                    <HeaderContainer/>
                    <Navbar/>
                    <div className='app-wrapper-content'>
                        <Route path='/dialogs'
                               render={() => <DialogsContainer
                               />}/>
                        <Route path='/profile/:userId?'
                               render={() => <ProfileContainer />} />
                        <Route path='/users'
                               render={() => <UsersContainer />} />
                        <Route path='/news'
                               render={() => <News/>}/>
                        <Route path='/music'
                               render={() => <Music/>}/>
                        <Route path='/settings'
                               render={() => <Settings/>}/>
                        <Route path='/login'
                               render={() => <Login/>}/>


                        {/*<Route path='/dialogs' component={Dialogs} />
                <Route path='/profile' component={Profile} />
                <Route path='/news' component={News} />
                <Route path='/music' component={Music} />
                <Route path='/settings' component={Settings} />*/}
                    </div>
                </div>
        );
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})

export default compose<React.ComponentType>(
    withRouter,
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {initializeApp}))(App)

type MapDispatchToPropsType = {
initializeApp: () => void
}

type MapStateToPropsType = {
    initialized: boolean
}

//export default App;
