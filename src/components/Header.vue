<style scoped>
@import 'typography';
@import 'props';
@import 'colors';

:root {
  --height: 75px;
  --heightSubtitled: 96px;
}

header > section > div {
  border-bottom: 6px solid black;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  height: var(--height);
  position: relative;

  &.subtitled {
    height: var(--heightSubtitled);
  }

  & > main,
  & > nav {
    padding: var(--indent) 0;
  }

  & > main {
    & a {
      font-size: var(--fontSizeLarge);
      font-weight: 700;
      text-transform: uppercase;
      color: var(--textColorPrimary);
    }

    & span {
      display: block;
      color: var(--textColorSecondary);
    }
  }

  & > nav {
    text-align: center;

    & ul {
      margin: 0;
      padding: 0;

      & li {
        list-style: none;
      }

      &.hamburger {
        display: none;
      }

      &.pages {
        & li {
          display: inline-block;
          padding: 0;
          margin-left: var(--indent);

          & a {
            color: var(--textColorSecondary);

            &:hover {
              color: var(--linkColor);
            }

            &.router-link-active {
              color: var(--linkColor);
            }
          }
        }
      }

      @media (--medium-x) {
        &.hamburger {
          width: 24px;
          height: 15px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          font-size: var(--fontSizeMedium);

          & li {
            height: 3px;
            width: 24px;
            background: var(--textColorPrimary);
            transition: transform 0.1s ease-in;
          }

          &.open {
            & li {
              &:first-child {
                transform: translate3d(0, 6px, 0) rotate(45deg);
              }

              &:last-child {
                transform: translate3d(0, -6px, 0) rotate(-45deg);
              }
            }
          }
        }

        &.pages {
          display: none;
          position: absolute;
          left: -var(--indentMedium);
          top: var(--height);
          background: var(--background);
          width: calc(100% + (var(--indentMedium) * 2));
          height: 100vh;
          padding-top: var(--indentMedium);

          & li {
            margin: 0;
            display: list-item;
            padding: var(--indentMedium);
            line-height: 1;
            color: var(--textColorPrimary);
            font-weight: var(--fontWeightMedium);
          }

          &.subtitled {
            top: var(--heightSubtitled);
          }

          &.open {
            display: block;
          }
        }
      }
    }
  }

  @media (--medium-x) {
    align-items: center;
  }
}

</style>

<template>
  <header>
    <section>
      <div :class="isSubtitled && 'subtitled'">
        <main @click="closeMenu">
          <router-link to="/" exact>{{ author }}</router-link>
          <span v-if="subtitle">{{ subtitle }}</span>
        </main>
        <nav>
          <ul
            :class="`
              hamburger
              ${isOpen ? 'open' : ''}
            `"
            @click="toggleMenu"
          >
            <li></li>
            <li></li>
          </ul>
          <ul
            :class="`
              pages
              ${isSubtitled ? 'subtitled' : ''}
              ${isOpen ? 'open' : ''}
            `"
            v-if="!pages.loading && !pages.error && pages"
          >
            <li
              v-for="page in pages"
              @click="closeMenu"
            >
              <router-link :to="`/page/${page.link}`">{{ page.title }}</router-link>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';

import { author, subtitle } from '../../config.json';

export default {
  data() {
    return {
      author,
      subtitle,
      isOpen: false
    };
  },

  computed: {
    ...mapGetters(['pages']),

    isSubtitled() {
      if (subtitle) {
        return true;
      }

      return false;
    }
  },

  methods: {
    getPages() {
      this.$store.dispatch('getPages');
    },

    toggleMenu() {
      this.isOpen = !this.isOpen;

      if (this.isOpen) {
        return (document.body.style.overflow = 'hidden');
      }

      return (document.body.style.overflow = 'scroll');
    },

    closeMenu() {
      this.isOpen = false;

      return (document.body.style.overflow = 'scroll');
    }
  },

  created() {
    const pages = this.pages;

    if (!pages.loading && !pages.error && !pages.length) {
      this.getPages();
    }
  }
};
</script>
