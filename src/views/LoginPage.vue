<template>
  <v-container>
    <div class="titleform">
      <h1>Halaman Masuk</h1>
    </div>
    <FormulateForm v-model="formValues" @submit="handleSubmit" class="form">
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
    </FormulateForm>
    <h1>values:</h1>
    <h2>{{ formValues }}</h2>

    <h1>reponse from backend</h1>
    <h2>{{ responseValue }}</h2>
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
          this.$router.push("/home");
        },
        (error) => {
          console.log(error);
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
@import "../assets/LoginRegister.css";

.container {
  text-align: center;
}

.titleform h1 {
  margin-top: 10%;
  font-weight: 1000;
  font-size: 2.7em;
}

.form {
  border-radius: 15px;
  box-shadow: 0px 0px 8px #1f3da1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff;
  margin-top: 5%;
  margin-left: 20%;
  margin-right: 20%;
  padding-top: 4%;
  padding-bottom: 4%;
}

.googlebutton {
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
  width: 10%;
  height: auto;
  float: left;
}
</style>
