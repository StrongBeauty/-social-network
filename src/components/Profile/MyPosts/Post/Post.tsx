import React from "react";
import s from "./Post.module.css"

type PostPropsType = {
    message: string
    likesCount: number
}

export const Post: React.FC<PostPropsType> = ({
                                                  message,
                                                  likesCount
                                              }: PostPropsType) => {
    return (
        <div className={s.item}>
            <img src='https://mobila.guru/wp-content/uploads/2018/10/5-13.jpg'
                 alt='loading..'
            />
            {message}
            <div>
                <span>Like-</span>
                {likesCount}
            </div>
        </div>
    )
}
