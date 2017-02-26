<style scoped>
@import 'props';

ul {
  margin: 0;
  padding: 0;
  line-height: 0;
  column-count: 3;
  column-gap: calc(var(--indent) * 1.5);
}
</style>

<template>
  <section>
    <div v-show="!route">
      <Loading v-if="posts.loading" />
      <Error v-else-if="posts.error" />
      <ul v-else>
        <Card v-for="post in posts" :post="post" />
      </ul>
    </div>
    <Preview v-if="view" :post="view" />
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

    route() {
      return this.$route.params.view;
    },

    view() {
      if (this.route) {
        const posts = this.posts;

        if (!posts.loading && !posts.error && posts.length) {
          const viewing = this.posts.find(post => post.link === this.route);

          if (viewing) {
            const raw = this.raw[viewing.file] && this.raw[viewing.file].metadata;

            if (raw) {
              return {
                ...viewing,
                raw
              };
            }
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
