import React from 'react';
import {ArticleType} from "../../redux/news-reducer";

type NewsCardType = Omit<ArticleType, 'image' | 'provider' | 'datePublished'>
    & {
    image?: string,
    providerName: string,
    providerImage?: string
    date: string
    time: string
}

export const NewsCard = ({
                             name,
                             url,
                             image,
                             description,
                             date,
                             time,
                             providerName,
                             providerImage,
                         }: NewsCardType
) => {


    return (
        <>
            <img src={image} alt='loading...'/>
            <a href={url}><h3>
                {name}
            </h3></a>
            <div>{description}</div>
            <div>
                <img src={providerImage} alt='loading...'/>
                <span> {providerName} </span>
                <span> {time} </span>
                <span>{date}</span>
            </div>
        </>
    )
}
