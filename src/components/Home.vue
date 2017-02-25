<style scoped>
ul {
  margin: 0;
  padding: 0;

  & li {
    list-style: none;
    /*float: left;
    margin: 10px;

    &:nth-child(4n+1) {
      clear: left;
    }*/
  }
}
</style>

<template>
  <div>
    <p v-if="posts.loading">Loading...</p>
    <p v-else-if="posts.error">Whoops, something went wrong</p>
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
