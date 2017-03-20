<style scoped>
@import 'props';

.home {
  display: flex;
  flex-direction: column;
  align-items: center;
}

ul:not(.sections) {
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

ul.sections {
  padding: 0;
  margin: 0;
  margin-bottom: var(--indent);

  & li {
    list-style: none;
    display: inline-block;
    text-align: center;
    padding: var(--indentMedium);
    text-transform: lowercase;

    & a {
      padding: 0.2em 0.9em;
      background-color: color(#def a(65%));
      border-radius: 3px;

      &.router-link-active {
        background-color: #def;
      }
    }
  }
}
</style>

<template>
  <section>
    <div v-show="!view">
      <Loading v-if="posts.loading" />
      <Error v-else-if="posts.error" />
      <div v-else class="home">
        <ul class="sections">
          <li v-for="section in sections">
            <router-link :to="`#${section}`">{{ section }}</router-link>
          </li>
        </ul>
        <ul>
          <Card v-for="post in displayPosts" :post="post" />
        </ul>
      </div>
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
            const raw = this.raw[viewing.file];
            const data = raw && raw.data && raw.data.image && raw.data;
            return {
              ...data,
              title: viewing.title
            };
          }
        }
      }

      return null;
    },

    sections() {
      const raw = this.raw;

      if (raw) {
        const sections = Object.keys(raw).map((key) => {
          const post = raw[key];

          if (post && post.data) {
            return post.data.section || null;
          }

          return null;
        });

        return [
          ...new Set(
            [].concat(
              ...sections.map(sec => sec && sec
                .split(',')
                .map(item => item.trim())
              )
            ).filter(Boolean)
          )
        ];
      }

      return null;
    },

    displayPosts() {
      const hash = this.$route.hash.replace('#', '');
      const posts = this.posts;
      const raw = this.raw;

      if (!posts.loading && !posts.error && posts.length && hash && raw) {
        const hashed = Object.keys(raw).map((key) => {
          const post = raw[key];

          if (post.data && post.data.section) {
            return post.data.section.includes(hash) && key;
          }

          return null;
        }).filter(Boolean);

        return posts.filter(post => hashed.includes(post.file) && post);
      }

      return posts;
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
