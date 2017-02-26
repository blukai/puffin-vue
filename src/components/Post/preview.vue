<style scoped>
@import 'props';
@import 'colors';
@import 'typography';

article {
  text-align: center;

  & img {
    @apply --centering;
    
    display: block;
    margin-bottom: var(--indent);
  }

  & > ul {
    margin: 0;
    padding: 0;

    & li {
      list-style: none;
      display: inline-block;
      padding: var(--indent);
        padding-bottom: 0;

      &:last-child {
        padding-right: 0;
      }

      &:first-child {
        padding-left: 0; 
      }

      & span:first-child {
        font-weight: var(--fontWeightLight);
        font-size: var(--fontSizeSmall);
        display: block
      }
    }
  }

  & > div {
    font-size: var(--fontSizeMedium);
    padding-top: var(--indent);
  }

  & > h1 {
    font-size: calc(var(--fontSizeHuge) - 10px);
    font-weight: var(--fontWeightNormal);
    margin: 0;;
    line-height: 1.2;
  }
}
</style>

<template>
  <article>
    <img :src="imageUrl" :style="{ maxHeight: `calc(100vh - (${headerHeight}px + 20px))` }">
    <h1>{{ raw.title }}</h1>
    <ul>
      <li v-for="(value, key) in props">
        <span>{{ key }}</span>
        <span>{{ value }}</span>
      </li>
    </ul>
    <div v-if="raw.text">
      {{ raw.text }}
    </div>
  </article>
</template>

<script>
import { getImgUrl } from 'utility';

export default {
  props: {
    raw: {
      type: Object,
      required: true
    }
  },

  computed: {
    imageUrl() {
      const raw = this.raw;

      if (raw.image) {
        return getImgUrl(raw.image);
      }
    },

    headerHeight() {
      return document
        .getElementById('app')
        .getElementsByTagName('header')[0]
        .offsetHeight;
    },

    props() {
      const raw = { ...this.raw };

      delete raw.image;
      delete raw.text;
      delete raw.title;

      return raw;
    }
  },

  created() {
    window.scrollTo(0, 0);
  }
};
</script>
