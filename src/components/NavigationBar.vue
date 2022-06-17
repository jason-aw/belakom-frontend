<template>
  <v-app-bar app absolute>
    <div class="d-flex align-center">
      <router-link to="/" class="d-flex align-center text-decoration-none">
        <v-img
          class="mx-2"
          src="@/assets/Navbar/logo-01.png"
          max-height="40"
          max-width="40"
          contain
        ></v-img>
        <div class="font-weight-light black--text text-h5">Belakom</div>
      </router-link>
    </div>

    <v-spacer></v-spacer>

    <div class="pr-5">
      <v-menu offset-y left>
        <template v-slot:activator="{ on }">
          <v-btn class="menu-button" icon x-large v-on="on">
            <v-icon> mdi-menu </v-icon>
          </v-btn>
        </template>
        <v-list dense v-if="loggedIn">
          <v-list-item @click.prevent="goToProfile">
            <v-icon class="pr-2">mdi-account-outline</v-icon>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>
          <v-list-item @click.prevent="goToTopic">
            <v-icon class="pr-2">mdi-file-document</v-icon>
            <v-list-item-title>Topics</v-list-item-title>
          </v-list-item>
          <v-list-item @click.prevent="logout">
            <v-icon class="pr-2">mdi-logout</v-icon>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
        <v-list dense v-else>
          <v-list-item @click.prevent="goToTopic">
            <v-icon class="pr-2">mdi-file-document</v-icon>
            <v-list-item-title>Topics</v-list-item-title>
          </v-list-item>
          <v-list-item @click.prevent="$router.push('/login')">
            <v-icon class="pr-2">mdi-login</v-icon>
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-app-bar>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "NavigationBar",
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout").then(
        () => {
          this.$router.push("/login");
        },
        () => {
          console.log(error);
        }
      );
    },
    goToProfile() {
      this.$router.push("/profile");
    },
    goToTopic() {
      this.$router.push("/topics");
    },
  },
  watch: {
    $route() {
      this.checkPath();
    },
  },
  computed: {
    ...mapGetters("auth", ["loggedIn"]),
  },
};
</script>

<style scoped lang="scss">
.logo {
  width: 20%;
  height: 20%;
}
</style>
