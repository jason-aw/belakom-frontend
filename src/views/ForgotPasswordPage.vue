<template>
  <v-container class="d-flex flex-column align-center justify-center">
    <h1 class="mb-4">Lupa Password</h1>
    <v-alert
      text
      v-if="message"
      width="400px"
      :type="error ? 'error' : 'success'"
      >{{ message }}</v-alert
    >
    <FormulateForm v-model="formValue" @submit="handleSubmit" class="form">
      <FormulateInput
        type="text"
        name="email"
        label="E-mail"
        placeholder="E-mail"
        validation="^required|email"
        error-behavior="submit"
        :validation-messages="{
          required: 'E-mail harus ada',
          email: ({ value }) => `'${value}' bukan e-mail yang valid`,
        }"
      />

      <FormulateInput type="submit" label="Submit" />
    </FormulateForm>
  </v-container>
</template>

<script>
import authService from "@/services/auth.service";
export default {
  name: "ForgotPasswordPage",
  data() {
    return {
      formValue: {},
      message: "",
      error: false,
    };
  },
  methods: {
    handleSubmit() {
      authService
        .forgotPassword(this.formValue)
        .then((response) => {
          this.message = response.data.message;
          this.error = false;
        })
        .catch((error) => {
          this.message = error.response.data.message;
          this.error = true;
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
