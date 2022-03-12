import React, {useEffect} from 'react';
import './App.css';
import {Navbar} from "./components/Navbar/Navbar";
import {BrowserRouter, Route, Outlet, Routes, Navigate} from "react-router-dom";
import {Header} from "./components/Header/Header";
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {Settings} from "./components/Settings/Settings";
import {LoginPage} from "./components/Login/LoginPage";
import {Provider} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import {store} from "./redux/redux-store";
import {Preloader} from "./components/common/preloader/preloader";
import {UserPage} from "./components/Users/UsersPage";
import {withSuspense} from "./hoc/withSuspense";
import {selectInitialized} from './redux/app-selector';
import {useSelector} from "react-redux";
import { selectAuthorizedUserId, selectIsAuth } from './redux/auth-selector';


const ChatPage = React.lazy(() => import("./pages/chat/ChatPage"))
const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsPage"))
const ProfilePage = React.lazy(() => import("./components/Profile/ProfilePage"))

const SuspendedChat = withSuspense(ChatPage)
const SuspendedDialogs = withSuspense(DialogsContainer)

const App = () => {
    const initialized = useSelector(selectInitialized)
    const userId = useSelector(selectAuthorizedUserId)
    const isAuth = useSelector(selectIsAuth)

    const catchAllUnhandledErrors = (promiseRejectionEvent: any) => {
        alert('Some error')
    }

    /*    useEffect(() => {
            initializeApp()
            window.addEventListener('unhandledrejection', catchAllUnhandledErrors)
        }, [])*/


    if (initialized) {
        return <Preloader/>
    }

        if (isAuth) {
        return (
            <Routes>
                <Route path='/' element={<Layout/>}>
                    <Route index element={<Navigate to={`profile/${userId}`} replace/>}/>
                    <Route path='dialogs' element={<SuspendedDialogs/>}/>
                    <Route path='profile/:userId' element={
                        <React.Suspense fallback={<div>loading..</div>}>
                            <ProfilePage/>
                        </React.Suspense> //render={() => <withSuspense(ProfileContainer) />}
                    }/>
                    <Route path='users' element={<UserPage pageTitle='SN'/>}/>
                    <Route path='chat' element={<SuspendedChat/>}/>
                    <Route path='news' element={<News/>}/>
                    <Route path='music' element={<Music/>}/>
                    <Route path='settings' element={<Settings/>}/>
                    <Route path='login' element={<LoginPage/>}/>
                    <Route path='*' element={<div>404 Not found</div>}/>
                </Route>
            </Routes>
        )
    }
    return (
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route index element={<Navigate to={'login'} replace />}/>

                <Route path='profile/:userId' element={
                    <React.Suspense fallback={<div>loading..</div>}>
                        <ProfilePage/>
                    </React.Suspense> //render={() => <withSuspense(ProfileContainer) />}
                }/>
                <Route path='users' element={<UserPage pageTitle='SN'/>}/>
                <Route path='login' element={<LoginPage/>}/>
                <Route path='*' element={<Navigate to={'login'} replace />}/>
            </Route>
        </Routes>
    )
}

//const AppContainer = withRouter(App)

export const SNApp = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>
}

const Layout = () => {
    return (
        <div className='app-wrapper'>
            <Header/>
            <Navbar/>
            <div className='app-wrapper-content'>
                <Outlet />
            </div>
        </div>
    );
}




/*
<div className='app-wrapper'>
    <Header/>
    <Navbar/>
    <div className='app-wrapper-content'>
        <Switch>
            <Route path='/dialogs'
                   render={() => <SuspendedDialogs/>}
            />
            <Route path='/profile/:userId?'
                   render={() => /!*<ProfilePage/>*!/ {
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
            <Redirect from="/" to="/profile"/>
            <Route path='/!*'
                   render={() =>
                       <div>404 Not found</div>}
            />
        </Switch>
    </div>
</div> */
