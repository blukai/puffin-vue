<style>
@import 'markdown';
</style>

<template>
  <section>
    {{ getRaw() }}
    <article v-if="compiledMarkdown" v-html="compiledMarkdown" class="compiledMarkdown" />
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import marked from 'marked';

export default {
  computed: {
    ...mapGetters(['pages', 'raw']),

    pageFile() {
      const route = this.$route.params.page;

      if (route) {
        const pages = this.pages;

        if (!pages.loading && !pages.error && pages.length) {
          const viewing = this.pages.find(page => page.link === route);

          if (viewing) {
            return viewing.file;
          }
        }
      }

      return null;
    },

    compiledMarkdown() {
      const page = this.raw[this.pageFile];

      if (page && !page.loading && !page.error && page.data) {
        return marked(page.data, { sanitize: true });
      }

      return null;
    }
  },

  methods: {
    getRaw() {
      const pf = this.pageFile;

      if (pf && !this.raw[pf]) {
        this.$store.dispatch('getRaw', this.pageFile);
      }
    }
  }
};
</script>
