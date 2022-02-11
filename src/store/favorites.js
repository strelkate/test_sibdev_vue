import Vue from "vue";

export const moduleFavorites = {
    state: {
        favorites: localStorage.getItem('favorites') ?
            JSON.parse(localStorage.getItem('favorites').toString()) : []
    },
    mutations: {
        ADD_FAVORITE(state, {favorite, token}) {
            let inserted = false
            state.favorites.forEach((fav)=>{
                if (fav.token === token) {
                    fav.items.push(favorite)
                    inserted = true
                }
            })
            if (!inserted) {
                state.favorites.push({token: token, items: [favorite]})
            }
            localStorage.setItem('favorites', JSON.stringify(state.favorites))
        },
        EDIT_FAVORITE(state, {favorite, token}) {
            state.favorites.forEach((fav)=>{
                if (fav.token === token) {
                    Vue.set(fav.items, favorite.index, favorite) // instead of force update
                }
            })
            localStorage.setItem('favorites', JSON.stringify(state.favorites))
        },
        DELETE_FAVORITE(state, {index, token}) {
            state.favorites.forEach((fav)=>{
                if (fav.token === token) {
                    fav.items.splice(index, 1)
                }
            })
            localStorage.setItem('favorites', JSON.stringify(state.favorites))
        },
    },
    getters: {
        GET_FAVORITES: (state, getters) => {
            const token = getters.GET_TOKEN
            let fav = null
            state.favorites.forEach((el)=>{
                if (el.token === token) {
                    fav = el
                }
            })
            if (!fav) return []
            return fav.items
        }
    },
    actions: {
        ADD_FAVORITE({commit, getters}, favorite) {
            const token = getters.GET_TOKEN
            commit('ADD_FAVORITE', {favorite: favorite, token: token})
        },
        EDIT_FAVORITE({commit, getters}, favorite) {
            const token = getters.GET_TOKEN
            commit('EDIT_FAVORITE', {favorite: favorite, token: token})
        },
        DELETE_FAVORITE({commit, getters}, index) {
            const token = getters.GET_TOKEN
            commit('DELETE_FAVORITE', {index: index, token: token})
        }
    },
}