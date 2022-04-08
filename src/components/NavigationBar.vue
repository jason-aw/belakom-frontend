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
    async logout (){
      await this.$store.dispatch('logOut')
      this.$router.push('/login')
    }
  },
  computed : {
    isLoggedIn : function() {
      return this.$store.getters.isAuthenticated
    }
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
