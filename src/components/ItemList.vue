<template>
<div class="item-list">
    <img :src="url" class="item-list__preview">
  <div class="item-list__text">
    <div class="item-list__title">{{ title }}</div>
    <div class="item-list__description">{{ description }}</div>
  </div>
</div>
</template>

<script>
export default {
  name: "ItemList",
  props: {
    video: {
      type: Object,
      required: true,
    },
  },
  computed: {
    title() {
      return this.video.snippet ? this.video.snippet.title ? this.video.snippet.title : '' : ''
    },
    description() {
      return this.video.snippet ? this.video.snippet.description ? this.video.snippet.description : '' : ''
    },
    url() {
      return this.video.snippet ?
          this.video.snippet.thumbnails ?
              this.video.snippet.thumbnails.medium ?
                  this.video.snippet.thumbnails.medium.url ? this.video.snippet.thumbnails.medium.url : ''
                  : ''
              : ''
          : ''
    }
  }
}
</script>

<style>
.item-list{
  width: 100%;
  max-width: 687px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
  padding-top: 20px;
}
.item-list__preview{
  width: 157px;
  height: 88px;
  margin-right: 20px;
  background: #FFFFFF;
  border: 1px solid #1390E5;
}
.item-list__text{
  width: 510px;
  font-size: 16px;
  line-height: 20px;
  display: flex;
  flex-direction: column;
  text-align: start;
  justify-content: space-between;
}
.item-list__title{
  font-weight: 500;
  margin-bottom: 8px;
}
.item-list__description{
  color: rgba(23, 23, 25, 0.3);
}

</style>