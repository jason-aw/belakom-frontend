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
      <v-menu offset-y v-if="loggedIn" left>
        <template v-slot:activator="{ on }">
          <v-btn class="menu-button" icon x-large v-on="on" >
            <v-icon>
              mdi-menu
            </v-icon>
          </v-btn>
        </template>
        <v-list dense>
          <v-list-item v-if="!currentPathIsProfile" @click.prevent="goToProfile">
            <v-icon class="pr-2">mdi-account-outline</v-icon>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>
          <v-list-item v-else @click.prevent="goToTopic">
            <v-icon class="pr-2">mdi-home-outline</v-icon>
            <v-list-item-title>Menu</v-list-item-title>
          </v-list-item>
          <v-list-item @click.prevent="logout">
            <v-icon class="pr-2">mdi-logout</v-icon>
            <v-list-item-title>Logout</v-list-item-title>
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
    return {
      currentPathIsProfile : null,
    }
  },
  created() {
    this.checkPath();
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout").then(
        (response) => {
          console.log(response);
          this.$router.push("/login");
        },
        (error) => {
          console.log(error);
        }
      );
    },
    checkPath() {
      if (this.$router.currentRoute.path === "/profile") {
        console.log("profile")
        this.currentPathIsProfile = true;
      } else {
        console.log("topics")
        this.currentPathIsProfile = false;
      }
    },
    goToProfile() {
      this.$router.push("/profile");
    },
    goToTopic() {
      this.$router.push("/topics");
    }
  },
  watch: {
    $route (){
      this.checkPath();
    }
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
