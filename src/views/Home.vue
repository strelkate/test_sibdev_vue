<template>
  <div class="home">
    <Header/>
    <div class="container">
      <h1 class="home__title">Поиск видео</h1>
      <form action="#" class="search home__search">
        <el-input class="search__input" placeholder="Что хотите посмотреть?" v-model="query"
                  @keypress="onSearchKeyPress"
        ></el-input>
        <svg @click="onFavoriteClick" class="search__favorite">
          <use xlink:href="../assets/sprite.svg#heart"></use>
        </svg>
        <el-button type="primary" @click="onSearchClick">Найти</el-button>
      </form>
      <div class="filter home__filter">
        <div class="filter__title">
          <span class="filter__label">Видео по запросу «<b>{{ query }}</b>» </span>
          <span class="filter__amount">{{ GET_TOTAL_RESULTS }}</span>
        </div>
        <div class="filter__icon">
          <svg @click="onFilterListClick" class="filter__button" :class="isPreviewList?'filter__button__active':''">
            <use xlink:href="../assets/sprite.svg#icon-list"></use>
          </svg>

          <svg @click="onFilterGridClick" class="filter__button" :class="isPreviewGrid?'filter__button__active':''">
            <use xlink:href="../assets/sprite.svg#icon-grid"></use>
          </svg>
        </div>
      </div>

      <div v-if="isPreviewList" v-loading="loading" class="home__list">
        <ItemList v-for="(video, index) in videos" :key="index" :video="video"/>
      </div>

      <div v-if="isPreviewGrid" v-loading="loading" class="home__grid">
        <ItemGrid v-for="(video, index) in videos" :key="index" :video="video"/>
      </div>
    </div>
    <ModalFavorite v-if="showModalFavorite" :favorite="favorite" @onClose="closeModalFavorite"/>
  </div>
</template>

<script>
import Header from "../components/Header";
import ItemGrid from "../components/ItemGrid";
import ItemList from "../components/ItemList";
import {mapActions, mapGetters} from "vuex";
import ModalFavorite from "./ModalFavorite";

const PREVIEW_GRID = 'grid'
const PREVIEW_LIST = 'list'

export default {
  name: 'Home',
  data() {
    return {
      query: '',
      loading: false,
      currentPreview: PREVIEW_GRID,
      showModalFavorite: false,
      favorite: {
        query: '',
        resultsCount: 12,
        order: ''
      }
    }
  },
  components: {
    ModalFavorite,
    ItemList,
    ItemGrid,
    Header
  },
  computed: {
    ...mapGetters(['GET_VIDEOS', 'GET_TOTAL_RESULTS']),
    videos() {
      return this.GET_VIDEOS
    },
    isPreviewGrid() {
      return this.currentPreview === PREVIEW_GRID
    },
    isPreviewList() {
      return this.currentPreview === PREVIEW_LIST
    }
  },
  methods: {
    ...mapActions(['SEARCH_VIDEOS']),
    search(query, resultCount = 12, order = '') {
      if (query.length === 0) return
      this.loading = true;
      this.SEARCH_VIDEOS({query: query, resultsCount: resultCount, order: order}).then(() => {
        this.loading = false;
      }).catch((err) => {
        this.loading = false;
        // print error
      })
    },
    onSearchClick() {
      this.search(this.query)
    },
    onSearchKeyPress(target) {
      if (target.charCode === 13) {
        this.onSearchClick()
      }
    },
    onFilterListClick() {
      this.currentPreview = PREVIEW_LIST

    },
    onFilterGridClick() {
      this.currentPreview = PREVIEW_GRID
    },
    onFavoriteClick() {
      this.showModalFavorite = true
      this.favorite = {
        query: this.query,
        resultsCount: 12,
        order: ''
      }
    },
    closeModalFavorite() {
      this.showModalFavorite = false
    }
  },
  created() {
    const query = this.$route.query.query || ''
    const resultsCount = this.$route.query.resultsCount || 12
    const order = this.$route.query.order || ''
    if (query.length > 0) {
      this.query = query
      this.search(query, resultsCount, order)
    }
  }
}
</script>
<style>
.home {
  text-align: center;
}

.home__title {
  font-size: 36px;
  line-height: 52px;
}

.search {
  display: flex;
  position: relative;
}

.home__grid {
  padding: 20px 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
}

.home__list {
  display: flex;
  flex-direction: column;
}

.home__filter {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 40px;
  font-size: 16px;
  line-height: 24px;
}

.filter__icon {
  width: 63px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.filter__amount {
  color: rgba(23, 23, 25, 0.3);
  margin-left: 15px;
}

.filter__button {
  opacity: 0.3;
  stroke: #272727;
  width: 24px;
  height: 24px;
}

.filter__button__active {
  stroke: #000000;
  opacity: 1;
}

.filter__button:hover {
  cursor: pointer;
  stroke: #000000;
  opacity: 1;
}

.search__favorite {
  position: absolute;
  cursor: pointer;
  stroke: #1390E5;
  fill: none;
  width: 24px;
  height: 24px;
  right: 100px;
  top: 50%;
  transform: translateY(-50%);
}

.search__favorite:hover {
  fill: #C5E4F9;
}

.search__favorite__active {
  fill: #C5E4F9;
}
</style>