import Vue from 'vue'

import Vuex from 'vuex'
import {moduleLogin} from "./login";
import {moduleSearch} from "./search";
import {moduleFavorites} from "./favorites";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    login: moduleLogin,
    search: moduleSearch,
    favorites: moduleFavorites,
  }
})
