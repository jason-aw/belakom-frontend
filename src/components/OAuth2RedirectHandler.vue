<template>
  <div></div>
</template>

<script>
export default {
  name: "OAuth2RedirectHandler",
  created() {
    let urlParams = new URLSearchParams(window.location.search);
    let token = urlParams.get("token");
    let error = urlParams.get("error");
    if (token) {
      let user = {
        accessToken: token,
        role: ["ROLE_USER"],
      };
      this.$store.commit("auth/loginSuccess", user);
      this.$router.push("/home");
    } else if (error) {
      this.$store.commit("auth/loginFailure");
      this.$router.push("/login");
    }
  },
};
</script>
