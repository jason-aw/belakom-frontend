<template>
  <v-app-bar app absolute>
    <div class="d-flex align-center">
      <router-link class="font-weight-light text-decoration-none" to="/">
        <h2>Belakom</h2>
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
.nav {
  height: 75px;
  width: 100%;
  padding: 0 30px;
  display: flex;
  align-items: center;

  .logo {
    height: auto;
    width: 10%;
    color: #1f3da1;
    font-size: 20pt;
  }
}
</style>
