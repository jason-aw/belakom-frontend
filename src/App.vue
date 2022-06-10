<template>
  <v-app>
    <navigation-bar v-if="navigation" />

    <v-main>
      <router-view />

      <v-snackbar
          v-model="snackbar"
          :timeout="5000"
      >
        {{snackbarText}}

        <template v-slot:action="{ attrs }">
          <v-btn
              text
              v-bind="attrs"
              @click="snackbar = false"
          >
            Tutup
          </v-btn>
        </template>
      </v-snackbar>
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
      snackbar: false,
      snackbarText: null,
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
  mounted(){
    this.$root.$on("global-snackbar-notification", this.successRegistrationEvent)
  },
  methods: {
    checkRoute() {
      if (this.hideNavBar.includes(this.$route.name)) {
        this.navigation = false;
      } else {
        this.navigation = true;
      }
    },
    successRegistrationEvent(payload) {
      this.snackbar = true;
      this.snackbarText = payload;
    }
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
