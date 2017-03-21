<style>
@import 'colors';
@import 'typography';
@import 'props';

:global {
  & * {
    box-sizing: border-box;
    word-wrap: break-word;
  }

  & html,
  & body {
    margin: 0;
    padding: 0;
    height: 100%;
  }

  & body {
    font-family: var(--fontFamily);
    font-size: var(--fontSizeNormal);
    font-weight: var(--fontWeigthNormal);
    color: var(--textColorPrimary);
    background-color: var(--background);
    line-height: var(--lineHeight);
    overflow-y: scroll;
    overflow-x: hidden;
  }

  & a {
    color: var(--linkColor);
    text-decoration: none;
    transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);

    &:hover {
      color: var(--linkColorHov);
    }

    &.router-link-active {
      color: var(--textColorSecondary);
    }

    & * {
      @apply --transitionBackground;
    }
  }

  & #app {
    min-height: 100%;
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    align-items: stretch;

    & > header {
      order: 1;
      padding-bottom: calc(var(--indent) * 1.5);
    }

    & > main {
      flex-grow: 1;
      order: 2;
    }

    & > footer {
      order: 3;
      padding-top: calc(var(--indent) * 2);
    }

    & > header,
    & > main,
    & > footer {
      & > section {
        @apply --appContainer;
      }
    }

    & > header,
    & > footer {
      & > section {
        @media (--small-x) {
          padding-left: var(--indentMedium);
          padding-right: var(--indentMedium);
        }
      }
    }
  }
}
</style>

<template>
  <div id="app">
    <AppHeader />
    <main>
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from 'components/Header';
import AppFooter from 'components/Footer';

export default {
  components: {
    AppHeader,
    AppFooter
  }
};
</script>
