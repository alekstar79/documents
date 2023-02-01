<template>
  <div id="app">
    <documents-list/>
  </div>
</template>

<script>
import DocumentsList from './components/DocumentsList.vue'

export default {
  name: 'App',
  components: {
    DocumentsList
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #576b80;
  margin-top: 60px;
}
</style>
