import {youtubeAPISearch} from "../youtube/api";

export const moduleSearch = {
    state:{
        videos: [],
        totalResults: 0
    },
    mutations: {
        SET_VIDEOS(state, videos) {
            state.videos = videos
        },
        SET_TOTAL_RESULTS(state, total) {
            state.totalResults = total
        },
    },
    getters: {
        GET_VIDEOS: state => state.videos,
        GET_TOTAL_RESULTS: state => state.totalResults
    },
    actions: {
        SEARCH_VIDEOS({commit}, {query, resultsCount = 12, order = ''}) {
            return youtubeAPISearch(query, resultsCount, order).then((data)=>{
                commit('SET_VIDEOS', data.items)
                commit('SET_TOTAL_RESULTS', data.pageInfo.totalResults)
            })
        }
    },
}