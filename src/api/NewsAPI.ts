import axios from 'axios';
import {ArticleType, ParamsType} from "../redux/news-reduser";

/*const options = {
    method: 'GET',
    url: 'https://bing-news-search1.p.rapidapi.com/news',
    params: {safeSearch: 'Off', textFormat: 'Raw'},
    headers: {
        'X-BingApis-SDK': 'true',
        'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
        'X-RapidAPI-Key': 'd2d6011bc5msh24db02195646d06p18d5b9jsnddeed7d2ae22'
    }
};

//@ts-ignore
export const getNews = () => axios.request(options).then(function (response) {
    console.log(response.data);
}).catch(function (error) {
    console.error(error);
});*/

const instance = axios.create({
    baseURL: `https://google-news.p.rapidapi.com/v1/`,
    headers: {
        'x-rapidapi-host': 'google-news.p.rapidapi.com',
        'x-rapidapi-key': '2175bd37c3mshc9db93a14129e53p1724b5jsnfc544ef0ab56'
    }
})

/*
const options = {

    }
*/


export const newsAPI = {
    async getNews( params: ParamsType) {
        const response = await instance.get<ArticleType[]>(`top_headlines`, {params})
        console.log(response.data)
        return response.data
    }
}


