<template>
<div>
  <b-container>

    <div class="title">
      Mau belajar apa hari ini?
    </div>

    <div class="row mt-md-5">

      <div class="col-3 mt-md-5 mb-md-5" v-for="topic in topicData" :key="topic.id">
        <b-card no-body @mouseover="hovered = true" @mouseleave="hovered = false" class="topicCard" @click="goToTopicDetail(topic.topicName)">
          <div class="topicCardText">
            {{topic.topicName}}
          </div>
          <div class="deleteButtonArea">
            <transition name="deleteButtonFade">
              <b-button class="deleteButton" @click="handleDeleteTopicSubmit(topic.topicName)" v-if="hovered"> delete </b-button>
            </transition>
          </div>
        </b-card>
      </div>

      <div class="col-3 createNewTopicButton mt-md-5 mb-md-5">
        <b-card>
          <b-button v-b-modal.createNewTopicModal> + </b-button>
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
          <b-alert fade variant="success" v-model="successCreateAlert">Topic successfully added!</b-alert>
          <b-alert fade variant="danger" v-model="errorCreateAlert">Topic failed to add!</b-alert>
        </FormulateForm>
      </b-modal>

    </div>

  </b-container>
</div>
</template>

<script>
import topicServices from '@/services/topic.service'
import { mapGetters } from 'vuex'

export default {
  components: {  },
  name: "TopicPage",

  data: () => ({
    createTopicFormValue: {},
    errorMessage: {},
    successCreateAlert: false,
    errorCreateAlert: false,
    hovered: false
  }),
  created() {
      this.getAllTopics()
  },
  computed: {
    ...mapGetters('topic', ['topicData'])
  },
  methods: {
    getAllTopics() {
        this.$store.dispatch("topic/getAllTopics").then(
            () => {
              console.log("mak")
            },
            (error) => {
              console.log(error);
            }
        );
    },
    handleCreateTopicSubmit() {
      topicServices.createTopic(this.createTopicFormValue)
          .then((response) => {
                console.log(response)
                this.successCreateAlert = true;

                setTimeout(() => {
                  this.successCreateAlert = false;
                }, 2000);

                this.getAllTopics();
                return response;
              },
              (error) => {
                this.errorCreateAlert = true;

                setTimeout(() => {
                  this.errorCreateAlert = false;
                }, 2000);

                this.errorMessage = error;
              })
    },
    handleDeleteTopicSubmit(id) {
      topicServices.deleteTopic(id)
          .then((response) => {
            this.getAllTopics();
            return response;
          },
          (error) => {
            this.errorCreateAlert = true;
            this.errorMessage = error;
          })
    },
    goToTopicDetail(topicName) {
      this.$router.push('/topics/'+topicName)
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
.topicCard {
  background: #CED4E8;
  height: 8em;
  width: 100%;
  padding: 0;
  display: flex;
  align-items:center;
  justify-content:center;
  flex-direction: column;
}

.topicCardText {
  font-weight: bold;
  font-size: 1.5em;
  padding: 0;
}

.deleteButtonFade-enter-active, .deleteButtonFade-leave-active {
  transition: opacity .5s;
}
.deleteButtonFade-enter, .deleteButtonFade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.deleteButtonArea {
  width: 50%;
  display: flex;
  justify-content: flex-end;
  justify-self: flex-end;
}

.deleteButton {
  border: 0px;
  width: 100%;
  background-color: #F51414;
  color: white;
  transition: all 0.4s ease;
  font-size: 12px;
}

* {
  font-family: "Poppins", sans-serif;
}

</style>
