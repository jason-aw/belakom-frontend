<template>
  <b-nav>
    <b-nav-item class="logo">
      <img src="../assets/logo_transparent_background.png" />
      <h1>LOGO</h1>
    </b-nav-item>
    <div v-if="isLoggedIn">
      <b-nav-item @click="logout"> logout </b-nav-item>
    </div>
  </b-nav>
</template>

<script>
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
    isLoggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
};
</script>

<style scoped>
.logo {
  width: 200px;
  height: auto;
}

.logo img {
  width: 50%;
  height: auto;
}
</style>
