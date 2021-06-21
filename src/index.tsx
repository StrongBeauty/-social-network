import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';
import reportWebVitals from './reportWebVitals';
import {store} from "./redux/redux-store";
import {Provider} from "react-redux";


//let renderEntireTree = (state: any) => {
    ReactDOM.render(
        <React.StrictMode>
            <Provider store={store}>
            <App
                /*state={state}
                 dispatch={store.dispatch.bind(store)}
                addPost={store.addPost.bind(store)}
                 updateNewPostText={store.updateNewPostText.bind(store)}*/
            />
            </Provider>
        </React.StrictMode>,
        document.getElementById('root')
    );
/*}

renderEntireTree(store.getState())
    store.subscribe(() => {
    let state = store.getState()
    renderEntireTree(state)
})*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
