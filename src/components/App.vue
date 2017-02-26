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
  }

  & a {
    color: var(--linkColor);
    text-decoration: none;

    &:hover {
      color: var(--linkColorHov);
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
    }

    & > main {
      flex-grow: 1;
      order: 2;
      padding-top: var(--indent);
      padding-bottom: var(--indent);

      & > div {
        @apply --appContainer;
      }
    }

    & > footer {
      order: 3;
    }

    & > header,
    & > main,
    & > footer {
      & > section {
        @apply --appContainer;
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
