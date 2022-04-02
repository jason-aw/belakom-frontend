<template>
  <div>
    <NavigationBar />
    <b-container>
      <b-row class="maincontent">
        <b-col cols="6" class="textandbutton">

            <b-row>
              <b-col cols="12">
                  <h1>
                    Belajar komputer menyenangkan bersama kami!
                  </h1>
              </b-col>
            </b-row>

            <b-row>
              <b-col cols="12">
                <div class="signlog">

                  <router-link to="/mausignupdulu" v-slot="{navigate}">
                    <button @click="navigate" class="mainbutton mulaibelajarbutton">
                      Mulai belajar
                    </button>
                  </router-link>

                  <router-link to="/login" v-slot="{ navigate}">
                    <button @click="navigate" class="mainbutton sayasudahpunyaakunbutton">
                      Saya sudah punya akun
                    </button>
                  </router-link>

                </div>
              </b-col>
            </b-row>

        </b-col>

        <b-col cols="6">
          <div class="image">
            <img src="../assets/landingpagepicture.png">
          </div>
        </b-col>

      </b-row>
    </b-container>
  </div>
</template>

<script>
import NavigationBar from "./NavigationBar";

export default {
  name: "LandingPage",
  components: {
    NavigationBar
  }
}
</script>

<style scoped>


  .image {
    width: 80vh;
    heigh: auto;
  }

  .textandbutton {
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    height: auto;
  }

  .image img{
    width: 100%;
    heigh: auto;
  }

  .maincontent{
    padding-top: 20px;
  }

  .signlog {
    display: flex;
    margin-top: 20px;
    justify-content: space-around;
  }
  .mainbutton{
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 15px;
    position: relative;
    box-shadow: 0px 5px #243B88;
    transition: all 0.3s ease;
  }

  .mainbutton:active {
    top: 3px;
  }

  .mulaibelajarbutton {
    border: 0px;
    width: 45%;
    background-color: #1F3DA1;
    color: white;
    display: inline-block;
    transition: all 0.3s ease;
    font-size: 20px;
  }

  .mulaibelajarbutton:hover {
    filter: brightness(80%);
  }

  .sayasudahpunyaakunbutton {
    width: 45%;
    background-color: #FFFFFF;
    color: #1F3DA1;
    display: inline-block;
    font-size: 20px;
    border: 2px solid #1F3DA1;
  }

  .sayasudahpunyaakunbutton:hover {
    background-color: #1F3DA1;
    color: #FFFFFF;
    display: inline-block;
    border: 2px solid #1F3DA1;
  }



  * {
    font-family: 'Poppins', sans-serif;
  }
</style>
