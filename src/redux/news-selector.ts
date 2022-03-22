import {AppStateType} from "./redux-store";

export const selectNews = (state: AppStateType) => state.newsPage.news

