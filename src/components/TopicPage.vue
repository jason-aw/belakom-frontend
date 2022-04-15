<template>
  <b-container>
    <NavigationBar />

    <div class="title">
      Mau belajar apa hari ini?
    </div>

    <div class="row">

      <div class="col-3" v-for="topic in allTopics" :key="topic">
        <b-card>
          <b-card-text>
            {{topic}}
          </b-card-text>
        </b-card>
      </div>

    </div>

  </b-container>
</template>

<script>
//import topicServices from '@/services/topic.service'
import NavigationBar from "./NavigationBar";

export default {
  components: { NavigationBar },
  name: "TopicPage",

  data: () => ({
    allTopics: ['email', 'zoom', 'emaklu', 'bakalu', 'cibai'],
    errorMessage: {}
  }),
  // created() {
  //   this.$watch(
  //     () => this.$route.params,
  //     () => {
  //       this.getAllTopics()
  //     },
  //     // fetch the data when the view is created and the data is
  //     // already being observed
  //     { immediate: true }
  //   )
  // },
  // methods: {
  //   getAllTopics() {
  //     topicServices.getAllTopics()
  //         .then((response) => {
  //               this.allTopics = response;
  //             },
  //             (error) => {
  //               this.errorMessage = error;
  //             })
  //   }
  // }
}
</script>

<style scoped>

.title {
  font-size: 2.5em;

}

* {
  font-family: "Poppins", sans-serif;
}

</style>
