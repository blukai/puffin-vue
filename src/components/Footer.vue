<style scoped>
@import 'colors';
@import 'typography';

footer > section {
  height: 65px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: var(--textColorSecondary);
  font-size: var(--fontSizeSmall);
  font-weight: var(--fontWeightLight);
}
</style>

<template>
  <footer>
    <section>
      <div>
        &copy; {{ author }} {{ currentYear }}
      </div>
      <div>View source on <a href="//github.com/blukai/puffin">GitHub</a></div>
    </section>
  </footer>
</template>

<script>
import { author } from '../../config.json';

export default {
  data() {
    return {
      author,
      currentYear: new Date().getFullYear()
    };
  }
};
</script>
