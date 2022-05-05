<template>
  <header>
    <b-nav>
      <b-nav-item class="logo"> Belakom </b-nav-item>
      <b-nav-item @click="logout" v-if="loggedIn"> logout </b-nav-item>
    </b-nav>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';
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
