<template>
  <div>
    <b-container class="outside">
      <h1> Register Page </h1>
      <FormulateForm v-model="formValues" @submit="handleSubmit" class="form">
        <FormulateInput
            type="text"
            name="email"
            label="E-mail"
            placeholder="E-mail"
            validation="^required|email"
            error-behavior="submit"
            :validation-messages="{
                required: 'E-mail harus ada',
                min: 'Username minimal 3 huruf'
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
            label="Konfirmasi Password (Masukkan password yang sama)"
            placeholder="Konfirmasi Password"
            validation="required|confirm"
            error-behavior="submit"
            :validation-messages="{
                required: 'Password harus ada',
                confirm: 'Password harus sama dengan Konfirmasi Password'
            }"
        />

        <FormulateInput type="submit" label="Login" />

      </FormulateForm>
      <h1> values: </h1>
      <h2> {{formValues}} </h2>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "RegisterPage",
  data: () => ({
    formValues: {}
  }),
  methods: {
    handleSubmit() {}
  }
}
</script>

<style scoped>
@import '../assets/LoginRegister.css';

.form {
  border-radius: 15px;
  box-shadow: 0px 0px 8px #1F3DA1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #FFFFFF;
  margin-top: 5%;
  margin-left: 20%;
  margin-right: 20%;
  padding-top: 4%;
  padding-bottom: 4%;
}

</style>
