<template>
  <div class="header">
    <div class="container">
      <div class="header__wrapper">
        <div class="header__left">
          <svg class="header__logo">
            <use xlink:href="../assets/sprite.svg#sibdev-logo"></use>
          </svg>
          <div class="tab header__tab" @click="onSearchClick">
            <span class="tab__text">Поиск</span>
            <div class="tab__line" :class="isTabSearch? 'tab__line__active' : ''"></div>
          </div>
          <div class="tab header__tab" @click="onFavoriteClick">
            <span class="tab__text">Избранное</span>
            <div class="tab__line" :class="isTabFavorites? 'tab__line__active' : ''"></div>
          </div>
        </div>
        <div class="header__login" @click="onLogoutClick">Выйти</div>
      </div>
    </div>
    <div class="header__line"></div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

const ROUTE_HOME = 'Home'
const ROUTE_FAVORITES = 'Favorites'

export default {
  name: "Header",
  data() {
    return {
    }
  },
  methods: {
    ...mapActions(['LOGOUT']),
    onLogoutClick() {
      this.LOGOUT()
      this.$router.push({name: 'Login'})
    },
    onSearchClick() {
      if (this.isTabSearch) {
        return
      }
      this.$router.push({name:ROUTE_HOME})
    },
    onFavoriteClick() {
      if (this.isTabFavorites) {
        return
      }
      this.$router.push({name: ROUTE_FAVORITES})
    }
  },
  computed: {
    isTabSearch() {
      return this.$route.name === ROUTE_HOME
    },
    isTabFavorites() {
      return this.$route.name === ROUTE_FAVORITES
    },
  }
}
</script>

<style>
.header {
  width: 100%;
  background: #ffffff;
  color: #1390E5;
  font-size: 18px;
  line-height: 28px;
}

.header__logo {
  width: 48px;
  height: 48px;
}

.container {
  max-width: 1040px;
  margin: auto;
}

.header__wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header__left {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header__logo {
  margin-right: 20px;
}

.header__tab {
  padding: 26px 20px;
  position: relative;
  cursor: pointer;
}

.tab__line__active {
  position: absolute;
  width: 100%;
  height: 2px;
  background: #1390E5;
  left: 0;
  bottom: 0;
}

.header__line {
  width: 100%;
  height: 1px;
  background: #F1F1F1;
}

.header__login {
  cursor: pointer;
  text-decoration: none;
  color: #000;
}
</style>