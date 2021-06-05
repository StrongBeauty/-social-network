import ReactDOM from "react-dom";
import React from "react";
import {App} from "./App";
import {addPost, RootStateType, updateNewPostText} from "./redux/state";


export let renderEntireTree = (state: RootStateType) => {
    ReactDOM.render(
        <React.StrictMode>
            <App state={state} addPost={addPost} updateNewPostText={updateNewPostText}/>
        </React.StrictMode>,
        document.getElementById('root')
    );
}