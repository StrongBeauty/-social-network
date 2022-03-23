import React, {useEffect} from 'react'
import {getNews} from "../../redux/news-reduser";
import {selectNews} from "../../redux/news-selector";
import {useSelector} from "react-redux";

export const NewsPage = () => {

    useEffect(() => {
        getNews({lang: 'ru', country: 'US'} )
    }, [])

const news = useSelector(selectNews)

    return(
        <div>

        </div>
    )
}
