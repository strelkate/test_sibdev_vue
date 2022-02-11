<template>
  <div class="item-favorite">
    <div class="item-favorite__wrapper">
      <div class="item-favorite__request" @click="onItemClick(item)">{{ item.name }}</div>
      <div class="item-favorite__buttons">
        <el-button type="text" @click="onEditItemClick">Изменить</el-button>
        <el-button class="item-favorite__delete" type="text" color="red" @click="onDeleteItemClick">Удалить
        </el-button>
      </div>
    </div>
    <div class="item-favorite__line"></div>
    <ModalFavorite v-if="showModalFavorite" :editable="true" :favorite="item" :index="index"
                   @onClose="closeModalFavorite"/>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import ModalFavorite from "../views/ModalFavorite";

export default {
  name: "ItemFavorite",
  components: {ModalFavorite},
  props: {
    item: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      showModalFavorite: false,
    }
  },
  methods: {
    ...mapActions(['DELETE_FAVORITE']),
    onItemClick(item) {
      this.$router.push({name: 'Home', query: {query: item.query, resultsCount: item.resultsCount, order: item.order}})
    },
    onEditItemClick() {
      this.openModalFavorite()
    },
    onDeleteItemClick() {
      this.DELETE_FAVORITE(this.index)
    },
    openModalFavorite() {
      this.showModalFavorite = true
    },
    closeModalFavorite() {
      this.showModalFavorite = false
    }
  }
}
</script>

<style scoped>

.item-favorite__wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  width: 100%;
  background: #FFFFFF;
  padding: 0 20px 0 0;
}

.item-favorite__line {
  width: 100%;
  height: 1px;
  background: #F1F1F1;
}

.item-favorite__delete {
  color: red;
}

.item-favorite__request {
  padding: 13px 0 13px 20px;
  width: 100%;
  cursor: pointer;
}

.item-favorite__buttons {
  display: flex;
}
</style>