import React, {FC} from "react";
import s from "./MyPosts.module.css"
import {Post} from "./Post/Post";
import {addPost, PostType, ProfilePageType} from "../../../redux/state";




type MyPostsPropsType = {
    posts: Array<PostType>
    newPostText: string
    addPost: () => void
    updateNewPostText: (newText: string) => void
}

export let MyPosts : React.FC<MyPostsPropsType> = (props ) => {

    let postsElements = props.posts.
        map(p => <Post message = {p.message} likesCount={p.likesCount} />)

    let newPostElement = React.createRef<HTMLTextAreaElement>()

    const addPost = () => {
        if(newPostElement.current)
        props.addPost()
        //newPostElement.current && newPostElement.current.value
        //or
        //newPostElement.current?.value

    }

    let onPostChange = () => {
    let text = newPostElement.current?.value as string
        props.updateNewPostText(text)
    }


    return (
        <div className={s.postsBlock}>
            <h3>My post</h3>
            <div>
                <div>
                    <textarea ref={newPostElement} onChange={onPostChange} value={props.newPostText} />
                </div>
                <div>
                    <button onClick={addPost}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {/*<Post message={postData[0].message} likeCount={postData[0].likesCount}/>
                <Post message={postData[1].message} likeCount={postData[1].likesCount}/>*/}
                {postsElements}
            </div>
        </div>
    )
}


