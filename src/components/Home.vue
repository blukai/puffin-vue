<template>
  <div>
    Welcome Home Son!
    {{ posts }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
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
