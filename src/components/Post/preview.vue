<template>
  <div>
    <img :src="image">
    {{ post }}
  </div>
</template>

<script>
import { getImgUrl } from 'utility';

export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },

  computed: {
    image() {
      return getImgUrl(this.post.raw.image);
    }
  }
};
</script>
