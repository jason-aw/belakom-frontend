<template>
  <div>
    <v-container class="text-center">
      <div class="titleform">
        <h1>Halaman Daftar</h1>
      </div>

      <FormulateForm v-model="formValues" @submit="handleSubmit" class="form">
        <FormulateInput
            type="text"
            name="name"
            label="Nama"
            placeholder="Nama"
            validation="^required|min:5, length"
            error-behavior="submit"
            :validation-messages="{
            required: 'E-mail harus ada',
            min: 'Nama minimum 5 karakter'
          }"
        />

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

        <FormulateInput type="submit" label="Register" />
      </FormulateForm>
      <h1>values:</h1>
      <h2>{{ formValues }}</h2>

      <h1>reponse from backend</h1>
      <h2>{{ responseValue }}</h2>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import authService from "@/services/auth.service";

export default {
  name: "RegisterPage",
  data: () => ({
    formValues: {},
    responseValue: {},
  }),
  computed: {
    ...mapGetters("auth", ["loggedIn"]),
  },
  methods: {
    handleSubmit() {
      authService.register(this.formValues).then(
        (response) => {
          this.responseValue = response;
          alert("registered successfully");
          this.$router.push("/login");
        },
        (error) => {
          this.responseValue = error;
        }
      );
    },
  },
};
</script>

<style scoped>
.titleform h1 {
  margin-top: 10%;
  font-weight: 1000;
  font-size: 2.7em;
}

.form {
  border-radius: 15px;
  box-shadow: 0 0 8px #1f3da1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff;
  margin-top: 5%;
  margin-left: 20%;
  margin-right: 20%;
  padding-top: 4%;
  padding-bottom: 4%;
  border: solid 2px #1f3da1;
}
</style>
