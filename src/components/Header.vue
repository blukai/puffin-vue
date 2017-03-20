<style scoped>
@import 'typography';
@import 'props';
@import 'colors';

header > section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & p {
    padding-top: calc(var(--indent) * 1.2);
    padding-bottom: 0;
    line-height: 1.2;
    margin: 0;
    text-align: center;

    & > a {
      @apply --transitionOpacity;

      font-size: var(--fontSizeHuge);
      color: var(--textColorPrimary);

      &:hover {
        opacity: 0.7;
      }

      @media (--tiny-x) {
        font-size: calc(var(--fontSizeHuge) / 1.8);
      }
    }

    & > span {
      display: block;
      font-size: var(--fontSizeNormal);
      font-weight: var(--fontWeightLight);
      color: var(--textColorSecondary);
    }

    @media (--small-x) {
      padding-bottom: 0;

      & a {
        font-size: calc(var(--fontSizeHuge) / 1.4);
      }
    }
  }

  & ul {
    margin: var(--indent) 0 0;
    padding: 0;
    font-size: var(--fontSizeMedium);
    text-align: center;

    & li {
      list-style: none;
      display: inline-block;
      padding-left: var(--indentMedium);
      padding-right: var(--indentMedium);
    }

    @media (--small-x) {
      font-size: var(--fontSizeNormal);
    }
  }
}
</style>

<template>
  <header>
    <section>
      <p>
        <router-link to="/" exact>{{ author }}</router-link>
        <span v-if="subtitle">{{ subtitle }}</span>
      </p>
      <ul v-if="!pages.loading && !pages.error && pages">
        <li v-for="page in pages">
          <router-link :to="`/page/${page.link}`">{{ page.title }}</router-link>
        </li>
      </ul>
    </section>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';

import { author, subtitle } from '../../config.json';

export default {
  data() {
    return {
      author,
      subtitle
    };
  },

  computed: {
    ...mapGetters(['pages'])
  },

  methods: {
    getPages() {
      this.$store.dispatch('getPages');
    }
  },

  created() {
    const pages = this.pages;
    if (!pages.loading && !pages.error && !pages.length) {
      this.getPages();
    }
  }
};
</script>
