<template>
  <v-container class="mt-3">
    <v-overlay :value="loading">
      <v-progress-circular color="#1f3da1" indeterminate size="64" width="6" />
    </v-overlay>
    <div v-if="!loading">
      <div class="text-h4">Mau belajar apa hari ini?</div>

      <div v-if="currentLearnTopic">
        <CurrentlyLearningTopicCard :topic="currentLearnTopic" />
      </div>

      <div class="row mt-md-5">
        <div
          class="col-3 mt-md-5 mb-md-5 px-3"
          v-for="topic in topicData"
          :key="topic.id"
        >
          <TopicCard :topic="topic" />
        </div>

        <v-dialog v-model="dialog" width="70%">
          <template #activator="{ on, attrs }">
            <div class="col-3 mt-md-5 mb-md-5">
              <v-card class="createNewTopicButton">
                <v-btn height="100%" width="100%" v-bind="attrs" v-on="on">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-card>
            </div>
          </template>
          <v-card>
            <v-card-title class="text-h5"> Create New Topic </v-card-title>
            <v-divider />
            <v-card-text class="black--text">
              <v-container>
                <FormulateForm
                  v-model="createTopicFormValue"
                  @submit="handleCreateTopicSubmit"
                >
                  <FormulateInput
                    type="text"
                    name="topicName"
                    label="Topic Name"
                    placeholder="Topic Name"
                    validation="^required"
                    error-behavior="submit"
                    :validation-messages="{
                      required: 'Topic harus ada',
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
                      required: 'Deskripsi harus ada',
                    }"
                  />

                  <FormulateInput
                    align="center"
                    type="submit"
                    label="Create Topic"
                  />
                  <v-alert
                    transition="fade-transition"
                    type="success"
                    v-model="successCreateAlert"
                    text
                  >
                    Topic successfully added!
                  </v-alert>
                  <v-alert
                    transition="fade-transition"
                    type="error"
                    v-model="errorCreateAlert"
                    text
                  >
                    Topic failed to add!
                  </v-alert>
                </FormulateForm>
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>
      </div>
    </div>
  </v-container>
</template>

<script>
import topicServices from "@/services/topic.service";
import userService from "@/services/user.service";
import progressService from "@/services/progress.service";
import TopicCard from "@/components/TopicCard";
import { mapGetters } from "vuex";
import CurrentlyLearningTopicCard from "@/components/CurrentlyLearningTopicCard";

export default {
  components: { CurrentlyLearningTopicCard, TopicCard },
  name: "TopicPage",

  data: () => ({
    dialog: false,
    currentLearnTopic: null,
    createTopicFormValue: {},
    errorMessage: {},
    successCreateAlert: false,
    errorCreateAlert: false,
    topicProgress: null,
    hovered: false,
    loading: true,
  }),
  async created() {
    await this.getAllTopics();
    await this.getCurrentUserDetail();
    // await this.getTopicProgressByUserId();
  },
  computed: {
    ...mapGetters("topic", ["topicData"]),
  },
  mounted() {
    this.$root.$on("deleteTopicEvent", () => {
      this.getAllTopics();
    });
  },
  methods: {
    async getAllTopics() {
      return this.$store
        .dispatch("topic/getAllTopics")
        .then(() => Promise.resolve())
        .catch((error) => Promise.reject(error));
    },
    async getTopicProgressByUserId() {
      progressService.getTopicProgressByUserId()
          .then((response) => {
            console.log(response)
            Promise.resolve();
          })
          .catch((error) => Promise.reject(error));
    },
    getCurrentLearnTopicById(topicId) {
      let topics = Array.from(this.topicData).map((topic) =>
        Object.assign({}, topic)
      );

      for (let topic of topics) {
        if (topicId === topic.id) {
          this.currentLearnTopic = Object.assign({}, topic);
          console.log(this.currentLearnTopic);
        }
      }
    },
    async getCurrentUserDetail() {
      return userService.getCurrentUserDetail().then(
        (response) => {
          this.getCurrentLearnTopicById(response.data.currentlyLearningTopic);
          this.loading = false;
          return Promise.resolve();
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    },
    handleCreateTopicSubmit() {
      topicServices.createTopic(this.createTopicFormValue).then(
        (response) => {
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
        }
      );
    },
  },
};
</script>

<style lang="scss">
.createNewTopicButton {
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-color: #ced4e8;
  min-height: 3em;
  height: 8em;
  letter-spacing: 1px;
  transition: 0.3s ease all;
  align-items: center;
  justify-content: center;
}

.modal-container {
  font-family: "Plus Jakarta Sans", Helvetica, Arial, sans-serif;
  .modal-header {
    h5 {
      margin-bottom: 0;
    }
    button {
      border: none;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 2em;
      width: 2em;
      background: none;
      transition: all 0.2s ease;
      &:hover {
        background-color: #dbdada;
      }
      &:active {
        background-color: #acaaaa;
      }
    }
  }
}
</style>
