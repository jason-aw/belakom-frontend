<template>
  <v-container>
    <v-row class="maincontent">
      <v-col cols="6" class="d-flex flex-column justify-center text-center">
        <h1>Apakah kamu sudah punya e-mail untuk daftar?</h1>

        <div class="d-flex flex-column">
          <router-link to="/register" v-slot="{ navigate }">
            <button
              @click="navigate"
              class="pilihan"
              @mouseover="changeImageToSignUp"
              @mouseleave="changeImageToStatic"
            >
              Sudah, ayo daftar!
            </button>
          </router-link>

          <router-link to="/login" v-slot="{ navigate }">
            <button
              @click="navigate"
              class="pilihan"
              @mouseover="changeImageToNoSignUp"
              @mouseleave="changeImageToStatic"
            >
              Sudah, tapi saya belum mau daftar!
            </button>
          </router-link>

          <router-link to="/login" v-slot="{ navigate }">
            <button
              @click="navigate"
              class="pilihan"
              @mouseover="changeImageLearnEmail"
              @mouseleave="changeImageToStatic"
            >
              Belum, ajarkan saya membuat e-mail!
            </button>
          </router-link>
        </div>
      </v-col>

      <v-col cols="6">
        <div class="image">
          <img :src="mainImage" />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "MauSignUpDuluPage",
  data() {
    return {
      staticImage: require("../assets/Lost-rafiki.png"),
      signUpImage: require("../assets/Computer login-rafiki.png"),
      noSignUpImage: require("../assets/Deadline-rafiki.png"),
      learnEmailImage: require("../assets/Questions-rafiki.png"),
      mainImage: require("../assets/Lost-rafiki.png"),
    };
  },
  methods: {
    changeImageToSignUp: function () {
      this.mainImage = this.signUpImage;
    },
    changeImageToNoSignUp: function () {
      this.mainImage = this.noSignUpImage;
    },
    changeImageLearnEmail: function () {
      this.mainImage = this.learnEmailImage;
    },
    changeImageToStatic: function () {
      this.mainImage = this.staticImage;
    },
  },
};
</script>

<style scoped>
.image img {
  width: 80vh;
  height: auto;
}

.image img {
  width: 100%;
  height: auto;
}

.pilihan {
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 15px;
  position: relative;
  box-shadow: 0px 5px #243b88;
  transition: all 0.3s ease;
  background-color: #ffffff;
  color: #1f3da1;
  display: inline-block;
  font-size: 20px;
  border: 2px solid #1f3da1;
  margin: 1em 0;
}

.pilihan:hover {
  background-color: #1f3da1;
  color: #ffffff;
  display: inline-block;
  border: 2px solid #1f3da1;
}

.pilihan:active {
  top: 3px;
}

.maincontent {
  padding-top: 20px;
  height: 50%;
}
</style>
