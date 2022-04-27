<template>
  <header>
    <b-nav>
      <b-nav-item class="logo">
        Belakom
      </b-nav-item>
      <b-nav-item @click="logout" v-if="isLoggedIn"> logout </b-nav-item>
    </b-nav>
  </header>
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

<style scoped lang="scss">
@import "@/assets/main.scss";

.nav {
  height: 75px;
  width: 100%;
  padding: 0 30px;
  display: flex;
  align-items: center;

  .logo {
    height: auto;
    width: 10%;
    color: $primary-blue;
    font-size: 20pt;
  }
}
</style>
