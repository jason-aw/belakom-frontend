<template>
  <v-container class="mt-3">
    <v-overlay :value="loading">
      <v-progress-circular color="#1f3da1" indeterminate size="64" width="6" />
    </v-overlay>
    <div v-if="!loading">
      <div class="text-h4 mb-4">Mau belajar apa hari ini?</div>

      <div v-if="lastSeenChapter">
        <v-row no-gutters class="align-center">
          <v-btn-toggle v-model="showHistory" borderless color="deep-purple accent-3">
            <v-btn large
                   plain
                   :ripple="false"
                   class="pa-0"
                   >
              Terakhir kali kamu sedang belajar ini!
              <v-icon dense v-if="showHistory === undefined">mdi-menu-down</v-icon>
              <v-icon dense v-if="showHistory === 0">mdi-menu-up</v-icon>
            </v-btn>
          </v-btn-toggle>
        </v-row>
        <v-expand-transition>
          <v-sheet
              v-if="showHistory === 0"
              class="mx-auto"
          >
            <v-slide-group
                v-model="indexCarousel"
                center-active
                show-arrows
            >
              <v-slide-item v-for="chapter in lastSeenChapter" :key="chapter.id" v-slot="{ active, toggle }">
                <v-card
                    :color="active ? '#1f3da1' : '#ced4e8'"
                    @click="toggle"
                    class="chapterCard ma-4"
                >
                  <v-row
                      class="fill-height chapterCardTextArea"
                      align="center"
                      justify="center"
                  >
                    <template v-if="active">
                      <p class="ma-0" style="color: #FFFFFF"> Chapter : {{chapter.chapterName}} </p>
                      <p class="ma-0" style="color: #FFFFFF"> Topic : {{chapter.topicName}} </p>
                    </template>
                    <template v-else>
                      <p class="ma-0" style="color: #000000"> Chapter : {{chapter.chapterName}} </p>
                      <p class="ma-0" style="color: #000000"> Topic : {{chapter.topicName}} </p>
                    </template>
                  </v-row>
                </v-card>
              </v-slide-item>
            </v-slide-group>
          </v-sheet>

        </v-expand-transition>

        <v-expand-transition>
          <v-sheet
              v-if="indexCarousel != null"
              height="100"
          >
            <h3 class="text-h6">
              Topic : {{ lastSeenChapter[indexCarousel].topicName  }}
            </h3>

            <v-btn
                color="#1f3da1"
                dark
                @click="goToTopic(lastSeenChapter[indexCarousel].topicId)"
            >Masuk ke Topic</v-btn>

            <h3 class="text-h6">
              Chapter : {{ lastSeenChapter[indexCarousel].chapterName  }}
            </h3>

            <v-btn
                color="#1f3da1"
                dark
                @click="goToChapter(lastSeenChapter[indexCarousel].chapterId)"
            >Masuk ke Chapter</v-btn>
          </v-sheet>
        </v-expand-transition>
      </div>

      <div class="row mt-md-5">
        <div
          class="col-3 mt-md-5 mb-md-5 px-3"
          v-for="topic in topicData"
          :key="topic.id"
        >
          <TopicCard :topic="topic" v-on:delete-event-topic="openDeleteDialog"/>
        </div>

        <v-dialog v-model="dialog" width="70%">
          <template #activator="{ on, attrs }">
            <div class="col-3 mt-md-5 mb-md-5">
              <v-card class="createNewTopicButton" v-if="adminRole">
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


        <v-dialog
            transition="dialog-top-transition"
            max-width="600"
            v-model="deleteDialog"
        >
          <template>
            <v-card>
              <v-card-text class="justify-center">
                <div class="text-center text-h5 pa-5">
                  Apakah anda yakin ingin menghapus topic
                  <span
                      style="font-weight: bold"> {{ deleteDialogName }}
              </span>
                  ?
                </div>
              </v-card-text>
              <v-card-actions class="justify-center">
                <v-btn
                    :disabled="successDeleteAlert || errorDeleteAlert"
                    @click="deleteDialog = false"
                >Cancel</v-btn>
                <v-btn
                    color="#F51414"
                    :dark="!successDeleteAlert && !errorDeleteAlert"
                    :disabled="successDeleteAlert || errorDeleteAlert"
                    @click="handleDeleteTopicSubmit(deleteDialogId)"
                >Delete</v-btn>
              </v-card-actions>
              <v-row class="pa-3" no-gutters>
                <v-col>
                  <v-alert
                      transition="fade-transition"
                      type="success"
                      text
                      v-model="successDeleteAlert"
                  >
                    Topic berhasil dihapus!
                  </v-alert>
                  <v-alert
                      transition="fade-transition"
                      type="success"
                      text
                      v-model="errorDeleteAlert"
                  >
                    Topic gagal dihapus!
                  </v-alert>
                </v-col>
              </v-row>
            </v-card>
          </template>
        </v-dialog>

      </div>
    </div>
  </v-container>
</template>

<script>
import topicServices from "@/services/topic.service";
import userService from "@/services/user.service";
import TopicCard from "@/components/TopicCard";
import { mapGetters } from "vuex";

export default {
  components: { TopicCard },
  name: "TopicPage",

  data: () => ({
    indexCarousel: null,
    showHistory: undefined,
    dialog: false,
    currentLearnTopic: null,
    lastSeenChapter: null,
    createTopicFormValue: {},
    errorMessage: {},
    successCreateAlert: false,
    errorCreateAlert: false,
    successDeleteAlert: false,
    errorDeleteAlert: false,
    deleteDialog: false,
    deleteDialogName: null,
    deleteDialogId: null,
    hovered: false,
    loading: true,
    adminRole: false
  }),
  async created() {
    try {
      await this.getAllTopics();
      this.adminRole = this.role?.includes("ROLE_ADMIN");
      if (!this.adminRole) {
        await this.getCurrentUserDetail();
      }
    } catch (error) {
      // console.log(error);
    }
    this.loading = false;
  },
  computed: {
    ...mapGetters("topic", ["topicData"]),
    ...mapGetters("auth", ["role", "loggedIn"]),
  },
  mounted() {
    // this.$on("deleteTopicEvent", (payload) => {
    //   this.deleteDialogName = payload.name;
    //   this.deleteDialogId = payload.id;
    //   this.deleteDialog = true;
    // });
  },
  methods: {
    async getAllTopics() {
      if (this.loggedIn) {
        return this.$store
        .dispatch("topic/getAllTopicsByUserId")
        .then(() => Promise.resolve())
        .catch((error) => {
          Promise.reject(error);
        });
      }
      return this.$store
        .dispatch("topic/getAllTopics")
        .then(() => Promise.resolve())
        .catch((error) => {
          // console.log("getAllTopics", error);
          Promise.reject(error);
        });
    },
    getCurrentLearnTopicById(topicId) {
      let topics = Array.from(this.topicData).map((topic) =>
        Object.assign({}, topic)
      );

      for (let topic of topics) {
        if (topicId === topic.id) {
          this.currentLearnTopic = Object.assign({}, topic);
        }
      }
    },
    openDeleteDialog(payload) {
      this.deleteDialog = true;
      this.deleteDialogName = payload.name;
      this.deleteDialogId = payload.id;
    },
    goToChapter(chapterId) {
      this.$router.push("/chapters/"+chapterId)
    },
    goToTopic(topicId) {
      this.$router.push("/topics/"+topicId)
    },
    handleDeleteTopicSubmit() {
      topicServices.deleteTopic(this.deleteDialogId).then(
          (response) => {
            this.successDeleteAlert = true;
            let deleteAlertCounter = 3;
            const x = setInterval(() => {
              deleteAlertCounter  = deleteAlertCounter  - 1;
              if (deleteAlertCounter === 0) {
                this.successDeleteAlert = false;
                this.deleteDialog = false
                clearInterval(x)
              }
            }, 1000)
            return response;
          },
          (error) => {
            this.errorDeleteAlert = true;
            this.errorMessage = error;

            let deleteAlertCounter = 3;
            const x = setInterval(() => {
              deleteAlertCounter  = deleteAlertCounter  - 1;
              if (deleteAlertCounter === 0) {
                this.errorDeleteAlert = false;
                clearInterval(x)
              }
            }, 1000)
          }
      ).then(this.getAllTopics);
    },
    async getCurrentUserDetail() {
      if (!this.role?.includes("ROLE_USER")) {
        return Promise.resolve();
      }
      return userService.getCurrentUserChapterHistory().then(
        (response) => {
          // this.getCurrentLearnTopicById(response.data.value.currentlyLearningTopic);
          this.lastSeenChapter = response;
          // console.log(this.lastSeenChapter);
          return Promise.resolve();
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    },
    handleCreateTopicSubmit() {
      this.loading = true;
      topicServices.createTopic(this.createTopicFormValue).then(
        (response) => {
          this.successCreateAlert = true;

          setTimeout(() => {
            this.successCreateAlert = false;
          }, 2000);

          this.getAllTopics();
          this.loading = false;
          return response;
        },
        (error) => {
          this.errorCreateAlert = true;

          setTimeout(() => {
            this.errorCreateAlert = false;
          }, 2000);
          this.loading = false;
          this.errorMessage = error;
        }
      );
    },
  },
  watch: {
    showHistory(newValue) {
      if (newValue === undefined) {
        this.indexCarousel = null;
      }
    },
  }
};
</script>

<style lang="scss" scoped>
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

.chapterCard {
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-color: #ced4e8;
  letter-spacing: 1px;
  transition: 0.3s ease all;
  width: 250px;
  height: 100px;
}

.chapterCard:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06);
  outline: solid 1px #1f3da1;
}

.chapterCardTextArea {
  font-weight: 500;
  font-size: 0.85em;
  display: block;
  overflow: hidden;
  white-space: initial;
  text-overflow: ellipsis;
  margin: 10px;
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
