<template>
  <div class="item-grid">
    <img :src="url" class="item-grid__preview">
    <div class="item-grid__title">{{ title }}</div>
    <div class="item-grid__description">{{ description }}</div>
  </div>
</template>

<script>
export default {
  name: "ItemGrid",
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
.item-grid {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 245px;
  height: 226px;
  text-align: start;
}

.item-grid__preview {
  width: 100%;
  height: 138px;
  background: #FFFFFF;
  border: 1px solid #1390E5;
}

.item-grid__title {
  font-weight: 500;
}

.item-grid__description {
  color: rgba(23, 23, 25, 0.3);
}
</style>