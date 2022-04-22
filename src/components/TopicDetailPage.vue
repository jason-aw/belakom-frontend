<template>

<div>
  <NavigationBar />
  <b-container>



  </b-container>
</div>



</template>

<script>
import NavigationBar from "./NavigationBar";

export default {
  components: NavigationBar,
  name: "TopicDetailPage",

  data: () => ({
    createTopicFormValue: {},
    errorMessage: {},
    successCreateAlert: false,
    errorCreateAlert: false,
    hovered: false
  }),
  created() {
    this.
  },

}
</script>

<style scoped>

</style>
