<template>
  <v-app>
    <navigation-bar v-if="navigation" />

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import NavigationBar from "@/components/NavigationBar";
export default {
  name: "App",
  data() {
    return {
      navigation: null,
    };
  },
  components: {
    NavigationBar,
  },
  created() {
    this.checkRoute();
  },
  computed: {
    ...mapGetters("auth", ["loggedIn"]),
  },
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
};
</script>

<style lang="scss">
@import "@/styles/variables.scss";
</style>
