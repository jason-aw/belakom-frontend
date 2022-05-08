<template>
  <v-container>
    <v-row class="maincontent">
      <v-col cols="6" class="textandbutton">
        <h1 class="font-weight-light">
          Belajar komputer menyenangkan bersama kami!
        </h1>

        <div class="signlog">
          <router-link to="/mausignupdulu" v-slot="{ navigate }">
            <button @click="navigate" class="mainbutton mulaibelajarbutton">
              Mulai belajar
            </button>
          </router-link>

          <router-link to="/login" v-slot="{ navigate }">
            <button
              @click="navigate"
              class="mainbutton sayasudahpunyaakunbutton"
            >
              Saya sudah punya akun
            </button>
          </router-link>
        </div>
      </v-col>

      <v-col cols="6">
        <div class="image">
          <img src="../assets/landingpagepicture.png" />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "LandingPage",
  components: {},
};
</script>

<style lang="scss" scoped>
.image {
  width: 80vh;
  height: auto;
}

.textandbutton {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  height: auto;
}

.image img {
  width: 100%;
  height: auto;
}

.maincontent {
  padding-top: 20px;
}

.signlog {
  display: flex;
  margin-top: 20px;
  justify-content: space-around;
}
.mainbutton {
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 15px;
  position: relative;
  box-shadow: 0px 5px #243b88;
  transition: all 0.3s ease;
}

.mainbutton:active {
  top: 3px;
}

.mulaibelajarbutton {
  border: 0px;
  width: 45%;
  background-color: #1f3da1;
  color: white;
  display: inline-block;
  transition: all 0.4s ease;
  font-size: 20px;
}

.mulaibelajarbutton:hover {
  filter: brightness(130%);
}

.sayasudahpunyaakunbutton {
  width: 45%;
  background-color: #ffffff;
  color: #1f3da1;
  display: inline-block;
  font-size: 20px;
  border: 2px solid #1f3da1;
}

.sayasudahpunyaakunbutton:hover {
  background-color: #1f3da1;
  color: #ffffff;
  display: inline-block;
  border: 2px solid #1f3da1;
}
</style>
