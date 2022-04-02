<template>
  <div>
    <b-container class="outside">
      <h1> Login Page </h1>
      <FormulateForm v-model="formValues" @submit="handleSubmit" class="form">
          <FormulateInput
              type="text"
              name="username"
              label="Username"
              placeholder="Username"
              validation="^required|min:3,length"
              error-behavior="submit"
              :validation-messages="{
                required: 'Username harus ada',
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

        <FormulateInput type="submit" label="Login" />

        <p> Atau kalau kamu punya e-mail google, kamu bisa log in dengan klik button dibawah ini </p>

        <button type="button" class="googlebutton">
          <img src="../assets/google.png" />
          <span> Google </span>
        </button>

      </FormulateForm>
      <h1> values: </h1>
      <h2> {{formValues}} </h2>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
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

.googlebutton {
  border: 2px solid #1F3DA1;
  width: 36%;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 15px;
  position: relative;
  font-weight: bold;
  box-shadow: 0px 5px #243B88;
  transition: all 0.3s ease;
}

.googlebutton:hover {
  background: #FFFFFF;
}

.googlebutton:active {
  top: 3px;
}

.googlebutton img{
  display: inline-block;
  width: 10%;
  height: auto;
  float: left;
}

</style>
