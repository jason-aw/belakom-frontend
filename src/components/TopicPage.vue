<template>
<div>
  <NavigationBar />

  <b-container>
    
    <div class="title">
      Mau belajar apa hari ini?
    </div>

    <div class="row mt-md-5">

      <div class="col-3 mt-md-5 mb-md-5" v-for="(topic, index) in allTopics" :key="topic.id">
        <b-card>
          <b-card-text>
            <h4> {{allTopics[index].topicName}} </h4>
          </b-card-text>
        </b-card>
      </div>

      <div class="col-3 createNewTopicButton mt-md-5 mb-md-5">
        <b-card>
          <b-button v-b-modal.createNewTopicModal>Launch demo modal</b-button>
        </b-card>
      </div>

      <b-modal id="createNewTopicModal" hide-footer centered size="xl" title="Create New Topic">
        <FormulateForm v-model="createTopicFormValue" @submit="handleCreateTopicSubmit" class="form">
          <FormulateInput
              type="text"
              name="topicName"
              label="Topic Name"
              placeholder="Topic Name"
              validation="^required"
              error-behavior="submit"
              :validation-messages="{
            required: 'Topic harus ada'
          }"
          />

          <FormulateInput
              type="textarea"
              name="description"
              label="Description"
              placeholder="Description"
              validation="^required"
              error-behavior="submit"
              :validation-messages="{
            required: 'Deskripsi harus ada'
          }"
          />

          <FormulateInput align="center" type="submit" label="Create Topic" />
          <b-alert :show="success" variant="success">Topic successfully added!</b-alert>
          <b-alert :show="error" variant="danger">Topic failed to add!</b-alert>
        </FormulateForm>
      </b-modal>

    </div>

  </b-container>
</div>
</template>

<script>
import topicServices from '@/services/topic.service'
import NavigationBar from "./NavigationBar";

export default {
  components: { NavigationBar },
  name: "TopicPage",

  data: () => ({
    allTopics: [],
    createTopicFormValue: {},
    errorMessage: {},
    success: false,
    error: false
  }),
  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        this.getAllTopics()
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    )
  },
  methods: {
    getAllTopics() {
      topicServices.getAllTopics()
          .then((response) => {
            this.allTopics = response.data
          })
          .catch((error) => {
            this.errorMessage = error
          })
    },
    handleCreateTopicSubmit() {
      topicServices.createTopic(this.createTopicFormValue)
          .then((response) => {
            console.log(response)
            this.success = true
            this.getAllTopics()
            return response
          })
          .catch((error) => {
            this.false = true;
            this.errorMessage = error
          })
    }
  }
}
</script>

<style scoped>

.title {
  font-size: 2.5em;

}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 4%;
}

* {
  font-family: "Poppins", sans-serif;
}

</style>
