import React, {useEffect} from 'react';
import './App.css';
import {useDispatch} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import {Preloader} from "./components/common/preloader/preloader";
import {selectInitialized} from './redux/app-selector';
import {useSelector} from "react-redux";
import {Routing} from './routing/Routing';


export const App = () => {

    const initialized = useSelector(selectInitialized)
    const dispatch = useDispatch()

    const catchAllUnhandledErrors = (promiseRejectionEvent: any) => {
        alert('Some error')
    }

    useEffect(() => {
        dispatch(initializeApp())
        window.addEventListener('unhandledrejection', catchAllUnhandledErrors)
    }, [])

    if (!initialized) {
        return <Preloader/>
    }

    return (
        <Routing/>
    )
}
