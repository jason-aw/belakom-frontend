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
      hideNavBar: ["Login", "Register", "ResetPassword", "ForgotPassword"],
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
      if (this.hideNavBar.includes(this.$route.name)) {
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
@import "@/styles/LoginRegister.css";
</style>
