<template>
  <div></div>
</template>

<script>
export default {
  name: "OAuth2RedirectHandler",
  async created() {
    let urlParams = new URLSearchParams(window.location.search);
    let token = urlParams.get("token");
    let error = urlParams.get("error");
    if (token) {
      let user = {
        accessToken: token,
      };
      await this.$store.dispatch("auth/googleLogin", user);
      this.$router.push("/topics");
    } else if (error) {
      this.$store.commit("auth/logout");
      this.$router.push("/login");
    }
  },
};
</script>
