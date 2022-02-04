import React from 'react';
import './App.css';
import {Navbar} from "./components/Navbar/Navbar";
import {BrowserRouter, Route, withRouter, Switch, Redirect} from "react-router-dom";
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {Settings} from "./components/Settings/Settings";
import HeaderContainer from "./components/Header/HeaderContainer";
import UsersContainer from "./components/Users/UsersContainer";
import Login from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import {AppStateType, store} from "./redux/redux-store";
import {Preloader} from "./components/common/preloader/preloader";


const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"))
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"))


class App extends React.Component<MapStateToPropsType & MapDispatchToPropsType> {

    catchAllUnhandledErrors = (promiseRejectionEvent: any) => {
        alert('Some error')
    }

    componentDidMount() {
        this.props.initializeApp()
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <Switch>
                <div className='app-wrapper-content'>
                    <Redirect from="/" to="/profile" />
                    <Route path='/dialogs'
                           render={() => {
                               return <React.Suspense fallback={<div>loading..</div>}>
                                   <DialogsContainer/>
                               </React.Suspense>
                           }
                               //render={withSuspense(DialogsContainer)}
                           }/>
                    <Route path='/profile/:userId?'
                           render={() => {
                               return <React.Suspense fallback={<div>loading..</div>}> <ProfileContainer />
                               </React.Suspense>
                           }
                           //render={withSuspense(ProfileContainer)}
                           }/>
                    <Route path='/users'
                           render={() => <UsersContainer />} />
                    <Route path='/news'
                           render={() => <News />} />
                    <Route path='/music'
                           render={() => <Music />} />
                    <Route path='/settings'
                           render={() => <Settings />} />
                    <Route path='/login'
                           render={() => <Login />} />
                    <Route path='/*'
                           render={() =>
                               <div>404 Not found</div>}
                    />
                </div>
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})
const AppContainer = compose<React.ComponentType>(
    withRouter,
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {initializeApp}))(App)

type MapDispatchToPropsType = {
    initializeApp: () => void
}

type MapStateToPropsType = {
    initialized: boolean
}

export const SNApp = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}
