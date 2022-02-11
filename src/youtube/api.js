const libAxios = require('axios');

const YOUTUBE_API_URL = 'https://youtube.googleapis.com/youtube'
const YOUTUBE_API_KEY = 'AIzaSyDPQB0ORm-ld5iCfDVORrZAT5EVh1Sj_PY'

const axios = libAxios.create({
    baseURL: YOUTUBE_API_URL,
    timeout: 10000,
    headers: {'Accept': 'application/json'}
});

const searchV3Route = '/v3/search'

export function youtubeAPISearch(query, resultsCount, order) {
    const params = {
        key: YOUTUBE_API_KEY,
        part: 'snippet',
        maxResults: resultsCount,
        q: query,
    }
    if (order.length > 0) {
        params[order] = order
    }
    return axios.get(searchV3Route, {
        params: params
    }).then((response) => {
        if (response.status < 200 || response.status >= 300) {
            throw new Error('wrong request status')
        }
        if (!response.data || !response.data.items) {
            throw new Error('wrong response data')
        }
        return response.data
    })
}