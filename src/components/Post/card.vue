<template>
  <li>
    <Loading v-if="data.loading" />
    <Error v-else-if="data.error" />
    <div v-else>
      {{ post.title }}
      {{ data }}
    </div>
  </li>
</template>

<script>
import { mapGetters } from 'vuex';

import { objectize } from 'utility';

export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapGetters(['raw']),

    data() {
      const item = this.raw[this.post.file];

      if (!item.loading && !item.error && item.data && item.data.length > 0) {
        return objectize(item.data);
      }

      return item;
    }
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
