<template>
  <li>
    {{ post.title }}
    <br>
    <br>
    {{ raw[post.file] }}
  </li>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapGetters(['raw'])
  },

  methods: {
    getRaw() {
      this.$store.dispatch('getRaw', this.post.file);
    }
  },

  created() {
    this.getRaw();
  }
};
</script>
