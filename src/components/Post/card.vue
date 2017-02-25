<style scoped>
@import 'props';

li {
  list-style: none;
  display: inline-block;
  margin-bottom: 20px;

  & img {
    max-width: 100%;
    max-height: 100%;
  }

  & p {
    text-align: center;
    line-height: 1.5;
    margin-top: 10px;
    margin-bottom: 10px;
  }
}
</style>

<template>
  <li v-if="!data.loading && !data.error && data">
    <router-link :to="post.link">
      <img :src="image">
      <p>{{ post.title }}</p>
    </router-link>
  </li>
</template>

<script>
import { mapGetters } from 'vuex';

import { getImgUrl } from 'utility';

export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapGetters(['raw']),

    data() {
      const item = this.raw[this.post.file];

      if (!item.loading && !item.error && item.metadata) {
        return item.metadata;
      }

      return item;
    },

    image() {
      return getImgUrl(this.data.image);
    }
  },

  methods: {
    getRaw() {
      this.$store.dispatch('getRaw', this.post.file);
    }
  },

  created() {
    if (!this.raw[this.post.file]) {
      this.getRaw();
    }
  }
};
</script>
