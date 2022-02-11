<template>
  <div class="modal">
    <div id="modal_overlay" class="modal__overlay" @click="onOverlayClick"></div>
    <div class="modal__dialog">
      <div class="modal__title">{{ editable? 'Изменить запрос' : 'Сохранить запрос' }}</div>
      <div class="modal__form">
        <div class="modal__form__wrapper">
          <div class="modal__subtitle">Запрос</div>
          <el-input placeholder="" v-model="query" :disabled="!editable"></el-input>
        </div>
        <div class="modal__form__wrapper">
          <div class="modal__subtitle">* Название</div>
          <el-input placeholder="Укажите название" v-model="name"></el-input>
        </div>
        <div class="modal__form__wrapper">
          <div class="modal__subtitle">Сортировать по</div>
          <el-select class="modal__selector" v-model="order" placeholder="Без сортировки">
            <el-option
                v-for="item in orderOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="modal__slider">
          <div class="modal__subtitle">Максимальное количество</div>
          <div class="modal__slider__wrapper">
            <el-slider class="modal__slider__select" :max="50" v-model="resultsCount"></el-slider>
            <el-input class="modal__slider__number" placeholder="" v-model="resultsCount"></el-input>
          </div>
          <div class="modal__bottom">
            <el-button type="primary" plain @click="onCancelClick">Не сохранять</el-button>
            <el-button type="primary" @click="onSaveClick" :disabled="!isNameValid">Сохранять</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "ModalFavorite",
  data: function () {
    return {
      query: '',
      name: '',
      orderOptions: [
        {
          value: '',
          label: 'Без сортировки'
        }, {
          value: 'relevance',
          label: 'relevance'
        }, {
          value: 'date',
          label: 'date'
        }, {
          value: 'rating',
          label: 'rating'
        }, {
          value: 'title',
          label: 'title'
        }, {
          value: 'videoCount',
          label: 'videoCount'
        }, {
          value: 'viewCount',
          label: 'viewCount'
        }
      ],
      order: '',
      resultsCount: 12,
    }
  },
  props: {
    favorite: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      default: -1
    },
    editable: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    isNameValid() {
      return this.name.length > 0
    }
  },
  methods: {
    ...mapActions(['ADD_FAVORITE', 'EDIT_FAVORITE']),
    closeModalFavorite() {
      this.$emit('onClose')
    },
    onOverlayClick() {
      this.closeModalFavorite()
    },
    onSaveClick() {
      if (this.editable) {
        this.EDIT_FAVORITE({query: this.query, name: this.name, resultsCount: this.resultsCount, order: this.order, index: this.index})
      } else {
        this.ADD_FAVORITE({query: this.query, name: this.name, resultsCount: this.resultsCount, order: this.order})
      }
      this.closeModalFavorite()
    },
    onCancelClick() {
      this.closeModalFavorite()
    }
  },
  created() {
    this.query = this.favorite.query
    this.name = this.favorite.name || ''
    this.resultsCount = this.favorite.resultsCount
    this.order = this.favorite.order
  }
}
</script>

<style scoped>

.modal {
  display: flex;
  flex-direction: column;
}

.modal__overlay {
  position: fixed;
  z-index: 1000;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
  visibility: visible;
  opacity: 1;
  transition: opacity 0.2s;
}

.modal__dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 510px;
  max-height: 100%;
  transform: translate(-50%, -50%);
  padding: 36px 40px;
  background-color: #FFFFFF;
  border-radius: 10px;
  z-index: 1001;
  transition: opacity 0.2s;
  overflow: auto;
  visibility: visible;
  opacity: 1;
  text-align: start;
}

.modal__title {
  display: flex;
  justify-content: center;
  font-size: 18px;
  line-height: 28px;
  font-weight: 500;
  margin-bottom: 36px;
}

.modal__subtitle {
  font-size: 16px;
  line-height: 22px;
  color: #272727;
}

.modal__form {
  display: flex;
  flex-direction: column;
}

.modal__form__wrapper {
  width: 100%;
  margin-bottom: 24px;
}

.modal__slider {

}

.modal__slider__wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 36px;
}

.modal__selector {
  width: 100%;
}

.modal__slider__select {
  width: 310px;
}

.modal__slider__number {
  width: 100px;
}

.modal__bottom {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>