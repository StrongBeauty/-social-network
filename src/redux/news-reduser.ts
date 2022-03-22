import {newsAPI} from "../api/NewsAPI";
import {BaseThunkType, InferActionsTypes} from "./redux-store";

const initialState = {
    news: [] as ArticleType[]
}

export const newsReducer = (state: NewsPageType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'SN/NEWS/SET_NEWS':
            return {
                ...state,
                news: action.news
            }
        default:
            return state
    }
}

export const actions = {
    setNews: (news: ArticleType[]) =>
        ({type: 'SN/NEWS/SET_NEWS', news} as const)
}

export const getNews = (params: ParamsType): ThunkType =>
    async (dispatch) => {
    const data = await newsAPI.getNews(params)
        dispatch(actions.setNews(data))
}

export type ParamsType = {
    lang: string
    country: string
}

export type ArticleType = {
    id: string
    link: string
    published: Date
    source: SourceType
    subArticles: SubArticleType[]
}

export type SourceType = {
    href: string
    title: string
}

export type SubArticleType = {
    publisher: string
    title: string
    url: string
}

type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType, void>
export type NewsPageType = typeof initialState
