<template>
  <v-container class="d-flex flex-column justify-center align-center">
    <div class="titleform mb-4">
      <h1>Halaman Masuk</h1>
    </div>
    <FormulateForm v-model="formValues" @submit="handleSubmit" class="form">
      <v-alert
        class="alert"
        text
        border="left"
        v-if="errorMessage"
        type="error"
        >{{ errorMessage }}</v-alert
      >
      <FormulateInput
        type="text"
        name="email"
        label="Email"
        placeholder="Email"
        validation="^required|email"
        error-behavior="submit"
        :validation-messages="{
          required: 'Email harus ada',
          email: ({ value }) => `'${value}' bukan e-mail yang valid`,
        }"
      />

      <FormulateInput
        type="password"
        name="password"
        label="Password"
        placeholder="Password"
        validation="required"
        error-behavior="submit"
        :validation-messages="{
          required: 'Password harus ada',
        }"
      />

      <FormulateInput type="submit" label="Login" />

      <v-responsive max-width="60%" class="mb-4">
        Atau kalau kamu punya e-mail google, kamu bisa log in dengan klik button
        dibawah ini
      </v-responsive>

      <button type="button" class="googlebutton" @click="handleGoogleLogin">
        <img src="@/assets/google.png" />
        <span> Google </span>
      </button>

      <v-responsive max-width="60%" class="mt-4">
        <router-link to="/forgot-password">Forgot Password?</router-link><br />
        Belum punya akun?
        <router-link to="/register">Daftar disini</router-link>
      </v-responsive>
    </FormulateForm>
  </v-container>
</template>

<script>
import { ApiPath } from "@/services/api-path";
import { mapGetters } from "vuex";
export default {
  name: "LoginPage",
  data: () => ({
    formValues: {},
    responseValue: {},
    errorMessage: "",
  }),
  computed: {
    ...mapGetters("auth", ["loggedIn"]),
  },
  methods: {
    handleSubmit() {
      this.$store.dispatch("auth/login", this.formValues).then(
        () => {
          this.$router.push("/topics");
        },
        (error) => {
          // console.log(error);
          this.errorMessage = error.response.data.message;
          setTimeout(() => {
            this.errorMessage = "";
          }, 5000);
        }
      );
    },
    handleGoogleLogin() {
      window.location.href = ApiPath.GOOGLE_AUTH_URL;
    },
  },
};
</script>

<style scoped>
.container {
  text-align: center;
  height: 100%;
}

.alert {
  width: 60%;
  text-align: left;
}

.titleform h1 {
  font-weight: 900;
  font-size: 2.7em;
}

.form {
  border-radius: 15px;
  box-shadow: 0px 0px 8px #1f3da1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff;
  width: 60%;
  padding-top: 4%;
  padding-bottom: 4%;
}

.googlebutton {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #1f3da1;
  width: 36%;
  padding: 10px;
  border-radius: 15px;
  position: relative;
  font-weight: bold;
  box-shadow: 0px 5px #243b88;
  transition: all 0.3s ease;
}

.googlebutton:hover {
  background: #ffffff;
}

.googlebutton:active {
  top: 3px;
}

.googlebutton img {
  display: block;
  width: 30px;
  margin-right: 10px;
  height: auto;
}
</style>
