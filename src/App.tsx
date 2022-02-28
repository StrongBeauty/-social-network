import React from 'react';
import './App.css';
import {Navbar} from "./components/Navbar/Navbar";
import {BrowserRouter, Route, withRouter, Switch, Redirect} from "react-router-dom";
import {Header} from "./components/Header/Header";
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {Settings} from "./components/Settings/Settings";
import {LoginPage} from "./components/Login/LoginPage";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import {AppStateType, store} from "./redux/redux-store";
import {Preloader} from "./components/common/preloader/preloader";
import {UserPage} from "./components/Users/UsersPage";
import {withSuspense} from "./hoc/withSuspense";


const ChatPage = React.lazy(() => import("./pages/chat/ChatPage"))
const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsPage"))
const ProfilePage= React.lazy(() => import("./components/Profile/ProfilePage"))

const SuspendedChat = withSuspense(ChatPage)
const SuspendedDialogs = withSuspense(DialogsContainer)

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
                <Header/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Switch>
                        <Route path='/dialogs'
                                   render={() => <SuspendedDialogs /> }
                        />
                        <Route path='/profile/:userId?'
                               render={() => /*<ProfilePage/>*/ {
                                   return <React.Suspense fallback={<div>loading..</div>}> <ProfilePage/>
                                   </React.Suspense>
                               }
                                   //render={() => <withSuspense(ProfileContainer) />}
                               }/>
                        <Route path='/users'
                               render={() => <UserPage pageTitle='SN'/>}/>
                        <Route path='/news'
                               render={() => <News/>}/>
                        <Route path='/music'
                               render={() => <Music/>}/>
                        <Route path='/settings'
                               render={() => <Settings/>}/>
                        <Route path='/login'
                               render={() => <LoginPage/>}/>
                        <Route path='/chat'
                               render={() => <SuspendedChat/>}/>
                        <Redirect from="/" to="/profile" />
                        <Route path='/*'
                               render={() =>
                                   <div>404 Not found</div>}
                        />
                    </Switch>
                </div>
            </div>
        );
    }
}

// export default withRouter(App)

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
