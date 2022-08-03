<template>
  <v-container class="d-flex flex-column align-center justify-center">
    <h1 class="mb-4">Reset Password</h1>
    <v-alert
      text
      v-if="message"
      width="400px"
      :type="error ? 'error' : 'success'"
      >{{ message }}
      <router-link to="/login" v-if="success"
        >Masuk ke Login Page.</router-link
      ></v-alert
    >
    <FormulateForm v-model="formValue" @submit="handleSubmit" class="form">
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

      <FormulateInput
        type="password"
        name="password_confirm"
        label="Konfirmasi Password"
        placeholder="Konfirmasi Password"
        validation="^required|confirm"
        error-behavior="submit"
        :validation-messages="{
          required: 'Konfirmasi Password harus ada',
          confirm: 'Konfirmasi Password harus sama dengan Password',
        }"
      />

      <FormulateInput type="submit" label="Reset Password" />
    </FormulateForm>
  </v-container>
</template>

<script>
import authService from "@/services/auth.service";
export default {
  name: "ResetPasswordPage",
  data() {
    return {
      formValue: {},
      message: "",
      error: false,
      success: false,
    };
  },
  created() {
    if (!this.$route.query.token) {
      this.$router.push("/login");
    }
  },
  methods: {
    handleSubmit() {
      let req = {
        password: this.formValue.password,
        token: this.$route.query.token,
      };
      authService
        .resetPassword(req)
        .then((response) => {
          this.message = response.data.message;
          this.error = false;
          this.success = true;
        })
        .catch((error) => {
          this.message = error.response.data.message;
          this.error = true;
          this.success = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  .form {
    width: 400px;
    border-radius: 15px;
    box-shadow: 0 0 8px #1f3da1;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #ffffff;
    padding: 20px;
    border: solid 2px #1f3da1;
    .formulate-input {
      width: 100%;
    }
    ::v-deep button {
      width: 100%;
    }
  }
}
</style>
