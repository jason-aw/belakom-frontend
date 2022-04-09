<template>
  <div>
    <navigation-bar />
    <b-container>
      <!-- <img src="../assets/rhknzsvgxlg81.jpg" width="auto" height="50%" /> -->
      <h2>current user</h2>
      <p>{{ currentUser }}</p>
    </b-container>
  </div>
</template>

<script>
import NavigationBar from "./NavigationBar.vue";
export default {
  components: { NavigationBar },
  name: "HomePage",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
};
</script>

<style scoped>
</style>
