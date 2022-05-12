<template>
  <v-container>
    <v-overlay :value="loading">
      <v-progress-circular color="#1f3da1" indeterminate size="64" width="6" />
    </v-overlay>
    <div v-if="!loading">
      <div class="title">
        {{ topicDetail.topicName }}
      </div>

      <div class="description">
        {{ topicDetail.description }}
      </div>
      <draggable :list="chapters" ghost-class="ghost" @end="onEnd">
        <transition-group type="transition" name="list">
          <div
              class="col-12 mt-md-5 mb-md-5 chapterCardGhost"
              v-for="(chapter, index) in chapters"
              :key="chapter.id"
          >
            <ChapterCard :chapter="chapter" :index="index + 1" />
          </div>
        </transition-group>
      </draggable>

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
                  Chapter successfully added!
                </v-alert>
                <v-alert
                    transition="fade-transition"
                    text
                    type="error"
                    v-model="errorCreateAlert"
                >
                  Chapter failed to add!
                </v-alert>
              </FormulateForm>
            </v-container>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false"> I accept </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-container>
</template>

<script>
import chapterService from "@/services/chapter.service";
import topicService from "@/services/topic.service";
import ChapterCard from "@/components/ChapterCard";
import { mapGetters } from "vuex";
import draggable from "vuedraggable";

export default {
  components: { ChapterCard, draggable },
  name: "TopicDetailPage",

  data: () => ({
    createChapterFormValue: {},
    errorMessage: {},
    dialog: false,
    successCreateAlert: false,
    errorCreateAlert: false,
    hovered: false,
    loading: true
  }),
  created() {
    this.getTopicDetail(this.$route.params.topicName);
  },
  computed: {
    ...mapGetters("topic", ["topicDetail"]),
    chapters: {
      get() {
        return this.$store.state.chapter.chapters;
      },
      set(value) {
        this.$store.commit("chapter/setChapters", value);
      },
    },
  },
  methods: {
    getTopicDetail(topicName) {
      this.loading = true;
      this.$store
        .dispatch("topic/getTopicByName", { topicName: topicName })
        .then(
          () => {
            this.getAllChapters();
            this.loading = false;
          },
          (error) => {
            console.log(error);
          }
        );
    },
    getAllChapters() {
      this.$store.dispatch("chapter/getAllChapters", {
        topicId: this.topicDetail.id,
      });
    },
    handleCreateChapterSubmit() {
      this.createChapterFormValue.topicId = this.topicDetail.id;

      chapterService.createChapter(this.createChapterFormValue).then(
        (response) => {
          this.getAllChapters();
          return response;
        },
        (error) => {
          return error;
        }
      );
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
  },
  watch: {
    $route() {
      this.$store.commit("chapter/clearAllChapters");
      this.$store.commit("topic/clearTopicDetail");
    },
  },
  mounted() {
    this.$root.$on("deleteChapterEvent", () => {
      this.getAllChapters();
    });
  },
};
</script>

<style lang="scss">
.title {
  font-size: 3em;
  font-weight: bold;
  display: flex;
  justify-content: flex-start;
  padding-bottom: 0.75em;
}

.ghost {
  border-left: 6px solid #1f3da1;
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
