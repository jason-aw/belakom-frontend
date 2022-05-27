<template>
  <v-container>
    <h1>
      PROFILE PAGE
    </h1>
    <v-row no-gutters style="height: 75vh;">
      <v-col cols="12" align-self="center" align="center">
        <v-card width="50%" height="50%">
          <v-card-title class="justify-center">
            <v-avatar color="#1f3da1" size="120">
              <v-icon size="75" dark v-if="!this.showImage">
                mdi-account-outline
              </v-icon>
              <template v-else>
                <img
                    src="https://cdn.vuetifyjs.com/images/john.jpg"
                    alt="John"
                >
              </template>
            </v-avatar>
          </v-card-title>
          <v-card-text>
            Nama : {{this.userDetail.name}}
          </v-card-text>
          <v-card-text>
            Email : {{this.userDetail.email}}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import userService from "@/services/user.service";

export default {
  name: "ProfilePage",
  data() {
    return {
      loading : true,
      userDetail : {}
    }
  },
  async created() {
    try {
      let response = await this.getUserDetail();
      this.userDetail = response.data.value;
      this.showImage = !!this.userDetail.imageUrl;
    } catch (error) {
      // console.log(error);
    }
    this.loading = false;
  },
  methods: {
    async getUserDetail() {
      return userService.getCurrentUserDetail()
          .then((response) => Promise.resolve(response))
          .catch((error) => {
            console.log("getUserDetail", error);
            Promise.reject(error);
          })
    }
  },
}
</script>

<style scoped>

.page {
  justify-content: center;
  align-content: center;
}

</style>
