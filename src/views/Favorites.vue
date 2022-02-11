<template>
  <div class="favorite">
    <Header/>
    <div class="container">
      <h2 class="favorite__title">Избранное</h2>
      <div class="favorite__grid">
        <ItemFavorite v-for="(item, index) in GET_FAVORITES" :key=index :item="item" :index="index"/>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import {mapGetters} from "vuex";
import ItemFavorite from "../components/ItemFavorite";

export default {
  name: "Favorite",
  components: {ItemFavorite, Header},
  computed: {
    ...mapGetters(['GET_FAVORITES'])
  }
}
</script>

<style>
.favorite__title {
  font-size: 28px;
  line-height: 40px;
  margin: 40px 0;
}

.favorite__grid {
  margin-bottom: 40px;
}
</style>