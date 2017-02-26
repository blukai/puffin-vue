<style scoped>
@import 'props';
@import 'colors';
@import 'typography';

li {
  list-style: none;
  display: inline-block;
  text-align: center;

  & img {
    max-width: 100%;
    max-height: 100%;
  }

  & p {
    font-weight: var(--fontWeightMedium);
    font-size: var(--fontSizeLarge);
    line-height: var(--lineHeight);

    & span {
      color: var(--textColorPrimary);
      padding: 0 5px;
      box-shadow: inset 0 -7px 0 yellow;
    }
  }

  & a {
    display: block;

    &:hover {
      border: none;

      & span {
        background-color: yellow;
      }
    }
  }
}
</style>

<template>
  <li v-if="!data.loading && !data.error && data">
    <router-link :to="post.link">
      <img :src="image">
      <p><span>{{ post.title }}</span></p>
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
