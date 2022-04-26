<template>
  <div>
    <b-container>
      <!-- <img src="../assets/rhknzsvgxlg81.jpg" width="auto" height="50%" /> -->
      <h2>current user</h2>
      <p>{{ currentUser }}</p>
    </b-container>
  </div>
</template>

<script>
export default {
  components: {  },
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
