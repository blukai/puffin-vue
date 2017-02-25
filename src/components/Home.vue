<style scoped>
ul {
  margin: 0;
  padding: 0;
  column-count: 3;
  column-gap: 20px;

  & li {
    list-style: none;
    margin-bottom: 20px;
  }
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
    this.getPosts();
  }
};
</script>
