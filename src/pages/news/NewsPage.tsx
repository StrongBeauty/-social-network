import React, {useEffect, useLayoutEffect} from 'react'
import {getNews} from "../../redux/news-reducer";
import {selectNews} from "../../redux/news-selector";
import {useDispatch, useSelector} from "react-redux";
import { NewsCard } from '../../components/News/NewsCard';
import {dateConverter, timeConverter} from "../../utils/date-helpers";

export const NewsPage = () => {
    const dispatch = useDispatch()

    useLayoutEffect(() => {
        dispatch(getNews({cc: 'US', since: '1', count: '20'}))
        console.log('-')
    }, [])

    const news = useSelector(selectNews)
    console.log(news)


    return (

        <div>
            {news.map(n =>
                <NewsCard key={n.name}
                          name={n.name}
                          url={n.url}
                          image={n.image?.thumbnail?.contentUrl}
                          description={n.description}
                          providerImage={n.provider[0].image?.thumbnail?.contentUrl}
                          providerName={n.provider[0].name}
                          date={dateConverter(n.datePublished)}
                          time={timeConverter(n.datePublished)}
                />
            )}

        </div>
    )
}
