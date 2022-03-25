import {newsAPI} from "../api/NewsAPI";
import {BaseThunkType, InferActionsTypes} from "./redux-store";

const initialState = {
    news: [] as ArticleType[],
    isFetching: false
}

export const newsReducer = (state: NewsPageType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'SN/NEWS/SET_NEWS':
            return {
                ...state,
                news: action.news
            }
        case 'SN/NEWS/TOGGLE_IS_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching
            }
        default:
            return state
    }
}

export const actions = {
    setNews: (news: ArticleType[]) =>
        ({type: 'SN/NEWS/SET_NEWS', news} as const),
    toggleIsFetching: (isFetching: boolean) =>
        ({type: 'SN/NEWS/TOGGLE_IS_FETCHING', isFetching} as const)

}

export const getNews = (params: ParamsType): ThunkType =>
    async (dispatch) => {
    dispatch(actions.toggleIsFetching(true))
    const data = await newsAPI.getNews(params)
        dispatch(actions.toggleIsFetching(false))
        console.log(data)
        dispatch(actions.setNews(data))
}

export type ParamsType = {
    cc?: string
    since?: string
    count?: string
}

export type ArticleType = {
    name: string
    url: string
    image: ImageType
    description: string
    provider: ProviderType[]
    datePublished: string
}

export type ImageType = {
    thumbnail?: ThumbnailType
}

type ThumbnailType = {
    contentUrl: string
    height?: number
    width?: number
}

export type ProviderType = Pick<ArticleType, 'name' | 'image'>

type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType, void>
export type NewsPageType = typeof initialState
