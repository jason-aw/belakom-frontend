<template>
  <div>
    <b-container>
      <b-row class="maincontent">
        <b-col cols="6" class="textandbutton">
          <b-row>
            <b-col cols="12">
              <h1>Apakah kamu sudah punya e-mail untuk daftar?</h1>
            </b-col>
          </b-row>

          <b-row>
            <b-col cols="12">
              <div class="buttonpilihan">
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
                  <button @click="navigate" class="pilihan">
                    Sudah, tapi saya belum mau daftar!
                  </button>
                </router-link>

                <router-link to="/login" v-slot="{ navigate }">
                  <button @click="navigate" class="pilihan">
                    Belum, ajarkan saya membuat e-mail!
                  </button>
                </router-link>
              </div>
            </b-col>
          </b-row>
        </b-col>

        <b-col cols="6">
          <div class="image">
            <img :src="mainImage" />
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "MauSignUpDuluPage",
  data() {
    return {
      staticImage: require("../assets/Lost-rafiki.png"),
      signUpImage: require("../assets/Mobile login-rafiki.png"),
      mainImage: require("../assets/Lost-rafiki.png"),
    };
  },
  methods: {
    changeImageToSignUp: function () {
      this.mainImage = this.signUpImage;
    },
    changeImageToStatic: function () {
      this.mainImage = this.staticImage;
    },
  },
  computed: {},
};
</script>

<style scoped>
.buttonpilihan {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

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
  margin-top: 0.5em;
}

.pilihan:hover {
  background-color: #1f3da1;
  color: #ffffff;
  display: inline-block;
  border: 2px solid #1f3da1;
}

.maincontent {
  padding-top: 20px;
  height: 50%;
}
</style>
