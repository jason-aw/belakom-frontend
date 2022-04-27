<template>
  <div id="app">
    <navigation-bar v-if="navigation"/>
    <router-view />
  </div>
</template>

<script>
import NavigationBar from './components/NavigationBar.vue'
export default {
  name: 'App',
  data() {
    return {
      navigation: null
    }
  },
  components: {
    NavigationBar
  },
  created() {
    this.checkRoute();
  },
  mounted() {},
  methods: {
    checkRoute() {
      if (this.$route.name === "Login" || this.$route.name === "Register") {
        this.navigation = false;
      } else {
        this.navigation = true;
      }
    },
  },
  watch: {
    $route() {
      this.checkRoute();
    },
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700&display=swap');
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: "Plus Jakarta Sans", Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  height: 100vh;
}
</style>
