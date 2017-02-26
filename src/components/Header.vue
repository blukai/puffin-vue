<style scoped>
@import 'typography';
@import 'props';
@import 'colors';

header > section {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  & p {
    padding: calc(var(--indent) * 1.2) 0;
    line-height: 1.2;
    margin: 0;
    text-align: center;

    & > a {
      @apply --transitionOpacity;

      font-size: var(--fontSizeHuge);
      color: var(--textColorPrimary);

      &:hover {
        opacity: 0.7;
      }

      @media (--small-x) {
        font-size: calc(var(--fontSizeHuge) / 1.4);
      }

      @media (--tiny-x) {
        font-size: calc(var(--fontSizeHuge) / 1.8);
      }
    }

    & > span {
      display: block;
      font-size: var(--fontSizeNormal);
      font-weight: var(--fontWeightLight);
      color: var(--textColorSecondary);
    }
  }
}
</style>

<template>
  <header>
    <section>
      <p>
        <router-link to="/" exact>{{ author }}</router-link>
        <span v-if="subtitle">{{ subtitle }}</span>
      </p>
    </section>
  </header>
</template>

<script>
import { author, subtitle } from '../../config.json';

export default {
  data() {
    return {
      author,
      subtitle
    };
  }
};
</script>
