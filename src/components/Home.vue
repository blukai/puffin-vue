<style scoped>
@import 'props';

ul {
  margin: 0;
  padding: 0;
  line-height: 0;
  column-count: 3;
  column-gap: calc(var(--indent) * 1.5);

  @media (--medium-x) {
    column-gap: var(--indent);
  }

  @media (--small-x) {
    column-gap: var(--indentMedium);
  }
}
</style>

<template>
  <section>
    <div v-show="!view">
      <Loading v-if="posts.loading" />
      <Error v-else-if="posts.error" />
      <ul v-else>
        <Card v-for="post in posts" :post="post" />
      </ul>
    </div>
    <Preview v-if="view" :raw="view" />
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

import Card from 'components/Post/card';
import Preview from 'components/Post/preview';

export default {
  components: {
    Card,
    Preview
  },

  computed: {
    ...mapGetters(['posts', 'raw']),

    view() {
      const route = this.$route.params.view;

      if (route) {
        const posts = this.posts;

        if (!posts.loading && !posts.error && posts.length) {
          const viewing = this.posts.find(post => post.link === route);

          if (viewing) {
            const metadata = this.raw[viewing.file] && this.raw[viewing.file].metadata;

            return {
              ...metadata,
              title: viewing.title
            };
          }
        }
      }

      return null;
    }
  },

  methods: {
    getPosts() {
      this.$store.dispatch('getPosts');
    }
  },

  created() {
    const posts = this.posts;
    if (!posts.loading && !posts.error && !posts.length) {
      this.getPosts();
    }
  }
};
</script>
