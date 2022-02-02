import React from "react";
import s from "./MyPosts.module.css"
import {Post} from "./Post/Post";
import {MapDispatchToPropsType, MapStateToPropsType, OwnPropsDialogsContainerType} from "./MyPostsContainer";
import {SubmitHandler, useForm} from "react-hook-form";


type MyPostsPagePropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsDialogsContainerType

export const MyPosts : React.FC<MyPostsPagePropsType> = React.memo((props ) => {

    let postsElements = props.posts
        .map(p => <Post key={p.message} message = {p.message} likesCount={p.likesCount} />)

    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = values => props.addPost(values.newPostText)

    return (
        <div className={s.postsBlock}>
            <h3>My post</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input type='textarea'  {...register('newPostText', {required: true})}
                    />
                </div>
                {(errors.newPostText) && <span>Field is required</span>}
                <div>
                    <button
                        >
                        Add post
                    </button>
                </div>
            </form>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
})

type Inputs = {
    newPostText: string
}

