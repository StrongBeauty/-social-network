import React from "react";
import s from "./MyPosts.module.css"
import {Post} from "./Post/Post";
import {SubmitHandler, useForm} from "react-hook-form";
import {actions} from "../../../redux/profile-reducer";
import {useDispatch, useSelector} from "react-redux";
import {selectPosts} from "../../../redux/profile-selector";

type Inputs = {
    newPostText: string
}

export const MyPosts: React.FC = React.memo(() => {
    const posts = useSelector(selectPosts)
    const dispatch = useDispatch()

    let postsElements = posts
        .map(p =>
            <Post key={p.message}
                  message={p.message}
                  likesCount={p.likesCount}
            />)

    const {register, handleSubmit, formState: {errors}, reset} = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = values => {
        dispatch(actions.addPost(values.newPostText))
        reset()
    }

    return (
        <div className={s.postsBlock}>
            <h3>My post</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input type='textarea'
                           {...register('newPostText', {required: true})}
                    />
                </div>
                {(errors.newPostText)
                    && <span>Field is required</span>}
                <div>
                    <button>
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

