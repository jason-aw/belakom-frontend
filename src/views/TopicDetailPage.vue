<template>
  <v-container>
    <v-overlay :value="loading">
      <v-progress-circular color="#1f3da1" indeterminate size="64" width="6" />
    </v-overlay>
    <div v-if="!loading">
      <v-btn
        @click="$router.push('/topics')"
        class="mb-4 mt-1"
        color="#1f3da1"
        dark
        ><v-icon dense>mdi-arrow-left</v-icon> Ke Halaman Topics</v-btn
      >

      <div class="mb-8" v-if="adminRole">
        <div class="text-h2">
          <click-to-edit v-model="topicDetail.topicName" />
        </div>
        <div class="text-h5">
          <click-to-edit v-model="topicDetail.description" />
        </div>
      </div>

      <div v-if="!adminRole">
        <div class="title">
          <h1>{{ topicDetail.topicName }}</h1>
        </div>

        <div class="description">
          {{ topicDetail.description }}
        </div>
      </div>

      <draggable
        :list="chapters"
        ghost-class="ghost"
        @end="onEnd"
        :disabled="!adminRole"
      >
        <transition-group type="transition" name="list">
          <div
            class="col-12 ma-0 pa-0 chapterCardGhost"
            v-for="(chapter, index) in chapters"
            :key="chapter.id"
          >
            <ChapterCard
              :chapter="chapter"
              :index="index + 1"
              v-on:delete-chapter-event="openDeleteDialog"
            />
          </div>
        </transition-group>
      </draggable>
      <template v-if="adminRole">
        <v-dialog v-model="dialog" width="70%">
          <template #activator="{ on, attrs }">
            <div class="col-12 mt-md-5 mb-md-5">
              <v-card class="createNewTopicButton">
                <v-btn height="100%" width="100%" v-bind="attrs" v-on="on">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-card>
            </div>
          </template>
          <v-card>
            <v-card-title class="text-h5"> Create New Chapter </v-card-title>
            <v-divider />
            <v-card-text class="black--text">
              <v-container>
                <FormulateForm
                  v-model="createChapterFormValue"
                  @submit="handleCreateChapterSubmit"
                >
                  <FormulateInput
                    type="text"
                    name="chapterName"
                    label="Chapter Name"
                    placeholder="Chapter Name"
                    validation="^required"
                    error-behavior="submit"
                    :validation-messages="{
                      required: 'Nama Chapter harus ada',
                    }"
                  />

                  <FormulateInput
                    type="checkbox"
                    label="Enable Quiz"
                    name="enableQuiz"
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
                    label="Create Chapter"
                  />

                  <v-alert
                    transition="fade-transition"
                    text
                    type="success"
                    v-model="successCreateAlert"
                  >
                    Chapter berhasil dibuat!
                  </v-alert>
                  <v-alert
                    transition="fade-transition"
                    text
                    type="error"
                    v-model="errorCreateAlert"
                  >
                    Chapter gagal dibuat!
                  </v-alert>
                </FormulateForm>
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>
      </template>
    </div>

    <v-dialog
      transition="dialog-top-transition"
      max-width="600"
      v-model="deleteDialog"
    >
      <template>
        <v-card>
          <v-card-text class="justify-center">
            <div class="text-center text-h5 pa-5">
              Apakah anda yakin ingin menghapus chapter
              <span style="font-weight: bold"> {{ deleteDialogName }} </span> ?
            </div>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn
              :disabled="successDeleteAlert || errorDeleteAlert"
              @click="deleteDialog = false"
              >Cancel</v-btn
            >
            <v-btn
              color="#F51414"
              :disabled="successDeleteAlert || errorDeleteAlert"
              :dark="!successDeleteAlert && !errorDeleteAlert"
              @click.stop="handleDeleteChapterSubmit"
              >Delete</v-btn
            >
          </v-card-actions>
          <v-row class="pa-3" no-gutters>
            <v-col>
              <v-alert
                transition="fade-transition"
                type="success"
                text
                v-model="successDeleteAlert"
              >
                Chapter berhasil dihapus!
              </v-alert>
              <v-alert
                transition="fade-transition"
                type="error"
                text
                v-model="errorDeleteAlert"
              >
                Chapter gagal dihapus! {{ errorMessage }}!
              </v-alert>
            </v-col>
          </v-row>
        </v-card>
      </template>
    </v-dialog>
  </v-container>
</template>

<script>
import chapterService from "@/services/chapter.service";
import topicService from "@/services/topic.service";
import ChapterCard from "@/components/ChapterCard";
import userService from "@/services/user.service";
import { mapGetters } from "vuex";
import draggable from "vuedraggable";
import ClickToEdit from "../components/ClickToEdit";

export default {
  components: { ChapterCard, draggable, ClickToEdit },
  name: "TopicDetailPage",

  data: () => ({
    createChapterFormValue: {},
    errorMessage: {},
    dialog: false,
    initialTopic: {},
    deleteDialog: false,
    successCreateAlert: false,
    errorCreateAlert: false,
    deleteDialogName: null,
    deleteDialogId: null,
    successDeleteAlert: false,
    errorDeleteAlert: false,
    hovered: false,
    loading: true,
    adminRole: false,
  }),
  async created() {
    await this.getTopicDetail(this.$route.params.topicName);
    this.updateCurrentlyLearningTopic();
    document.title = `${this.topicDetail.topicName} | Belakom`;
    this.loading = false;
    this.adminRole = this.role?.includes("ROLE_ADMIN");
    window.addEventListener("beforeunload", this.handleBeforeUnload);
  },
  computed: {
    ...mapGetters("topic", ["topicDetail"]),
    ...mapGetters("auth", ["role", "loggedIn"]),
    chapters: {
      get() {
        return this.$store.state.chapter.chapters;
      },
      set(value) {
        this.$store.commit("chapter/setChapters", value);
      },
    },
    topicName() {
      return this.topicDetail.topicName;
    },
    topicDesc() {
      return this.topicDetail.description;
    },
    hasChanges() {
      return !(
          this.initialTopic.topicName === this.topicDetail.topicName &&
          this.initialTopic.description === this.topicDetail.description
      );
    },
  },
  methods: {
    async getTopicDetail(topicName) {
      this.loading = true;
      return this.$store
        .dispatch("topic/getTopicByName", { topicName: topicName })
        .then(
          (response) => {
            this.initialTopic = Object.assign({}, response.data.value);
            this.getAllChapters();
            return Promise.resolve();
          },
          (error) => {
            console.log(error);
            return Promise.reject(error);
          }
        );
    },
    getAllChapters() {
      if (this.loggedIn) {
        return this.$store
          .dispatch("chapter/getAllChaptersByUserId", {
            topicId: this.topicDetail.id,
          })
          .then(() => Promise.resolve())
          .catch((error) => {
            Promise.reject(error);
          });
      }
      return this.$store
        .dispatch("chapter/getAllChapters", {
          topicId: this.topicDetail.id,
        })
        .then(() => Promise.resolve())
        .catch((error) => {
          Promise.reject(error);
        });
    },
    handleCreateChapterSubmit() {
      this.createChapterFormValue.topicId = this.topicDetail.id;

      chapterService.createChapter(this.createChapterFormValue).then(
        (response) => {
          this.successCreateAlert = true;

          setTimeout(() => {
            this.successCreateAlert = false;
          }, 2000);

          this.getAllChapters();
          return response;
        },
        (error) => {
          this.errorMessage = error;
          this.errorCreateAlert = true;

          setTimeout(() => {
            this.errorCreateAlert = false;
          }, 2000);

          return error;
        }
      );
    },
    handleBeforeUnload(event) {
      console.log("before unload", this.hasChanges);
      if (!this.hasChanges) {
        return;
      } else {
        event.returnValue = "";
      }
    },
    openDeleteDialog(payload) {
      this.deleteDialog = true;
      this.deleteDialogName = payload.name;
      this.deleteDialogId = payload.id;
    },
    handleDeleteChapterSubmit() {
      console.log("delete");
      chapterService
        .deleteChapter(this.deleteDialogId)
        .then(
          (response) => {
            this.successDeleteAlert = true;
            let deleteAlertCounter = 3;
            const x = setInterval(() => {
              deleteAlertCounter = deleteAlertCounter - 1;
              if (deleteAlertCounter === 0) {
                this.successDeleteAlert = false;
                this.deleteDialog = false;
                clearInterval(x);
              }
            }, 1000);
            return response;
          },
          (error) => {
            this.errorDeleteAlert = true;
            this.errorMessage = error;

            let deleteAlertCounter = 3;
            const x = setInterval(() => {
              deleteAlertCounter = deleteAlertCounter - 1;
              if (deleteAlertCounter === 0) {
                this.errorDeleteAlert = false;
                clearInterval(x);
              }
            }, 1000);

            return error;
          }
        )
        .then(this.getAllChapters);
    },
    onEnd() {
      topicService
        .updateTopicChapterOrder(this.$store.state.chapter.chapters)
        .then(
          (response) => {
            console.log("updated");
            return response;
          },
          (error) => {
            return error;
          }
        );
    },
    updateCurrentlyLearningTopic() {
      if (!this.role?.includes("ROLE_USER")) {
        return;
      }
      let req = {
        currentlyLearningTopic: this.topicDetail.id,
      };
      userService.updateUserData(req).then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
  beforeDestroy() {
    this.handlePublish();
  },
  destroyed() {
    window.removeEventListener("beforeunload", this.handleBeforeUnload);
  },
  watch: {
    $route() {
      this.$store.commit("chapter/clearAllChapters");
      this.$store.commit("topic/clearTopicDetail");
    },
    topicName(newValue) {
      topicService.updateTopic({id: this.topicDetail.id, topicName: newValue, description: this.topicDetail.description})
    },
    topicDesc(newValue) {
      topicService.updateTopic({id: this.topicDetail.id, topicName: this.topicDetail.topicName, description: newValue})
    }
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 3em;
  font-weight: bold;
  display: flex;
  justify-content: flex-start;
  padding-bottom: 0.75em;
}

.ghost {
  border-left: 5px solid #1f3da1;
  box-shadow: 10px 10px 5px -1px rgba(0, 0, 0, 0.14);
  opacity: 0.7;
  border-radius: 8px;
}

.list-move {
  transition: transform 0.5s;
}

.description {
  font-size: 1.5em;
  display: flex;
  justify-content: flex-start;
  padding-bottom: 0.75em;
}

.chapterCardGhost-drag {
  opacity: 0;
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
