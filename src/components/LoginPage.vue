<template>
  <div>
    <b-container class="outside">

      <div class="titleform">
        <h1> Halaman Masuk </h1>
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
                email:  ({ value }) => `'${value}' bukan e-mail yang valid`
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

        <FormulateInput type="submit" label="Login" @click="handleSubmit"/>

        <p> Atau kalau kamu punya e-mail google, kamu bisa log in dengan klik button dibawah ini </p>

        <button type="button" class="googlebutton">
          <img src="../assets/google.png" />
          <span> Google </span>
        </button>

      </FormulateForm>
      <h1> values: </h1>
      <h2> {{formValues}} </h2>

      <h1>reponse from backend</h1>
      <h2>{{responseValue}}</h2>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "LoginPage",
  data: () => ({
    formValues: {},
    url: 'http://localhost:8081/api/auth/login',
    responseValue: {},
    errorMessage: ''
  }),
  methods: {
    handleSubmit() {
      axios.post(this.url, this.formValues)
          .then(response => this.responseValue = response.data)
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
    }
  }
}
</script>

<style scoped>
@import '../assets/LoginRegister.css';

.titleform h1{
  margin-top: 10%;
  font-weight: 1000;
  font-size: 2.7em;
}

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
  display: block;
  width: 10%;
  height: auto;
  float: left;
}

</style>
