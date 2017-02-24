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
    line-height: 1.55;
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
      padding-top: 20px;
      padding-bottom: 20px;
    }

    & > footer {
      order: 3;
    }

    & > header,
    & > main,
    & > footer {
      & > div {
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
      Hey!
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
