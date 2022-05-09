<template>
  <v-app-bar app absolute>
    <div class="d-flex align-center">
      <router-link to="/">
        <v-img
          class="mx-2"
          src="../assets/Navbar/logo-01.png"
          max-height="50"
          max-width="50"
          contain
        ></v-img>
      </router-link>
    </div>

    <v-spacer></v-spacer>

    <v-btn text @click="logout" v-if="loggedIn">
      <span class="mr-2">Logout</span>
      <v-icon small>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "NavigationBar",
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
