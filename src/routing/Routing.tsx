import React from "react"
import {useSelector} from "react-redux"
import {Navigate, Route, Routes} from "react-router-dom"
import {LoginPage} from "../components/Login/LoginPage"
import {Music} from "../components/Music/Music"
import {NewsPage} from "../components/News/NewsPage"
import {Settings} from "../components/Settings/Settings"
import {UserPage} from "../components/Users/UsersPage"
import {withSuspense} from "../hoc/withSuspense"
import {selectAuthorizedUserId, selectIsAuth} from "../redux/auth-selector"
import {Layout} from "./Layout"
import {withRequireAuth} from '.././hoc/WithRequireAuth'
const ChatPage = React.lazy(() => import(".././pages/chat/ChatPage"))
const DialogsContainer = React.lazy(() => import("../components/Dialogs/DialogsPage"))
const ProfilePage = React.lazy(() => import("../components/Profile/ProfilePage"))

const SuspendProfile = withSuspense(ProfilePage)
const RequiredAuthDialogs = withRequireAuth(withSuspense(DialogsContainer))
const RequiredAuthChat = withRequireAuth(withSuspense(ChatPage))
const RequiredAuthNews = withRequireAuth(NewsPage)
const RequiredAuthMusic = withRequireAuth(Music)
const RequiredAuthSettings = withRequireAuth(Settings)

export const Routing = () => {
    const userId = useSelector(selectAuthorizedUserId)
    //const isAuth = useSelector(selectIsAuth)

    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<Navigate to={`profile/${userId}`} replace />} />
                <Route path='dialogs' element={<RequiredAuthDialogs />} />
                <Route path='profile/:userId' element={<SuspendProfile />}
                    /* <React.Suspense fallback={<div>loading..</div>}>
                            <ProfilePage/>
                        </React.Suspense>*/
                />
                <Route path='users/*' element={<UserPage pageTitle='SN'/>} />
                <Route path='chat' element={<RequiredAuthChat />} />
                <Route path='news' element={<RequiredAuthNews />} />
                <Route path='music' element={<RequiredAuthMusic />} />
                <Route path='settings' element={<RequiredAuthSettings />} />
                <Route path='login' element={<LoginPage />} />
                <Route path='*' element={<div>404 Not found</div>} />
            </Route>
        </Routes>
/*              <>
                    {isAuth
                        ? <Routes>
            <Route path='/' element={<Layout/>}>
                <Route index element={<Navigate to={`profile/${userId}`} replace/>}/>
                <Route path='dialogs' element={<SuspendedDialogs/>}/>
                <Route path='profile/:userId' element={
                        <React.Suspense fallback={<div>loading..</div>}>
                            <ProfilePage/>
                        </React.Suspense>
                    //render={() => <withSuspense(ProfileContainer) />}
                }/>
                <Route path='users/!*' element={<UserPage pageTitle='SN'/>}/>
                <Route path='chat' element={<SuspendedChat/>}/>
                <Route path='news' element={<News/>}/>
                <Route path='music' element={<Music/>}/>
                <Route path='settings' element={<Settings/>}/>
                <Route path='login' element={<LoginPage/>}/>
                <Route path='*' element={<div>404 Not found</div>}/>
            </Route>
        </Routes>
                     : <Routes>
                          <Route path='/' element={<Layout/>}>
                              <Route index element={<Navigate to={'login'} replace/>}/>

                              <Route path='profile/:userId' element={
                                  <React.Suspense fallback={<div>loading..</div>}>
                                      <ProfilePage/>
                                  </React.Suspense> //render={() => <withSuspense(ProfileContainer) />}
                              }/>
                              <Route path='users' element={<UserPage pageTitle='SN'/>}/>
                              <Route path='login' element={<LoginPage/>}/>
                              <Route path='*' element={<Navigate to={'login'} replace/>}/>
                          </Route>
                      </Routes>
                  }
              </>*/
    )
}
