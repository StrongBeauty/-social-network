import axios from 'axios';
import {ArticleType, ParamsType} from "../redux/news-reducer";

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
    baseURL: `https://bing-news-search1.p.rapidapi.com/news`,
    headers: {
        'X-BingApis-SDK': 'true',
        'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
        'X-RapidAPI-Key': 'd2d6011bc5msh24db02195646d06p18d5b9jsnddeed7d2ae22',
        'Accept-Language': 'en-US'
    }
})

export const newsAPI = {
    async getNews( params?: ParamsType) {
        const response = await instance.get<ResponseType>(``, {params})
        console.log(response.data.value)
        return response.data.value
    }
}

 type ResponseType = {
    value: ArticleType[]
}




