<style scoped>
@import 'props';

ul {
  margin: 0;
  padding: 0;
  line-height: 0;
  column-count: 3;
  column-gap: var(--indent);
}
</style>

<template>
  <div>
    <Loading v-if="posts.loading" />
    <Error v-else-if="posts.error" />
    <ul v-else>
      <Card v-for="post in posts" :post="post" />
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Card from 'components/Post/card';

export default {
  components: {
    Card
  },

  computed: {
    ...mapGetters(['posts'])
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
