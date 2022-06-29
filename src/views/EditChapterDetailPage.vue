<template>
  <v-container class="mt-4 mb-8">
    <v-overlay :value="loading">
      <v-progress-circular color="#1f3da1" indeterminate size="64" width="6" />
    </v-overlay>
    <div v-if="!loading">
      <v-alert border="left" text type="error" :value="timedAlert">
        {{ this.errorMsg }}
      </v-alert>
      <div class="mb-8">
        <div class="text-h2">
          <click-to-edit v-model="chapterDetail.chapterName" />
        </div>
        <p>
          <click-to-edit v-model="chapterDetail.description" textarea="true" />
        </p>
      </div>

      <div class="editor" id="my-editor">
        <VueEditor
          :editorOptions="editorSettings"
          useCustomImageHandler
          @image-added="imageHandler"
          @image-removed="imageRemovedHandler"
          v-model="chapterDetail.htmlContent"
        />
      </div>
      <v-row no-gutters>
        <v-spacer />
        <v-btn color="#1f3da1" dark @click="handlePublish" class="mr-4"
          >Simpan Article</v-btn
        >
        <v-btn color="#1f3da1" dark to="/chapter-preview"
          >Lihat Hasil Artikel</v-btn
        >
      </v-row>

      <div>
        <v-checkbox
          label="Enable Quiz"
          v-model="enableQuiz"
          @click="handleEnableQuiz()"
        />
      </div>

      <div v-if="enableQuiz">
        <div v-for="i in chapterDetail.questions.length" :key="i">
          <create-quiz-card :questionIndex="i - 1" />
        </div>
        <div class="mb-8">
          <v-btn color="#1f3da1" dark @click="handleAddQuestion">
            add question
          </v-btn>
        </div>
      </div>
    </div>

    <v-dialog
        transition="dialog-top-transition"
        max-width="600"
        v-model="publishDialog"
    >
      <template>
        <v-card>
          <v-row class="pa-3" no-gutters>
            <v-col>
              <v-alert
                  transition="fade-transition"
                  type="success"
                  text
                  v-model="successPublishAlert"
              >
                Artikel berhasil disimpan!
              </v-alert>
              <v-alert
                  transition="fade-transition"
                  type="success"
                  text
                  v-model="errorPublishAlert"
              >
                Artikel gagal disimpan! {{ errorMessage }}!
              </v-alert>
              <v-alert
                  transition="fade-transition"
                  type="warning"
                  text
                  v-model="notChangedAlert"
              >
                Artikel belum berubah!
              </v-alert>
            </v-col>
          </v-row>
        </v-card>
      </template>
    </v-dialog>
  </v-container>
</template>

<script>
import { VueEditor, Quill } from "vue2-editor";
import ImageResize from "quill-image-resize-module";
import VideoResize from "quill-video-resize-module";
import fileService from "@/services/files.service";
import { mapGetters } from "vuex";
import chapterService from "@/services/chapter.service";
import ClickToEdit from "@/components/ClickToEdit.vue";
import CreateQuizCard from "@/components/CreateQuizCard.vue";

Quill.register("modules/imageResize", ImageResize);
Quill.register("modules/VideoResize", VideoResize);
export default {
  name: "EditChapterDetailPage",
  components: {
    VueEditor,
    ClickToEdit,
    CreateQuizCard,
  },
  data() {
    return {
      errorMsg: "",
      enableQuiz: false,
      initialChapter: {},
      questionTypeValue: "",
      timedAlert: false,
      loading: true,
      successPublishAlert: false,
      errorPublishAlert: false,
      notChangedAlert:false,
      errorMessage: null,
      publishDialog: false,
      editorSettings: {
        modules: {
          imageResize: {},
          VideoResize: {},
        },
        bounds: ".editor",
      },
      createQuestionFormValue: {},
    };
  },
  created() {
    this.getChapterDetail(this.$route.params.chapterId);
    window.addEventListener("beforeunload", this.handleBeforeUnload);
  },
  beforeDestroy() {
    this.handlePublish();
  },
  destroyed() {
    window.removeEventListener("beforeunload", this.handleBeforeUnload);
  },
  computed: {
    ...mapGetters("chapter", ["chapterDetail"]),
    hasChanges() {
      return !(
        this.initialChapter.chapterName === this.chapterDetail.chapterName &&
        this.initialChapter.description === this.chapterDetail.description &&
        this.initialChapter.enableQuiz === this.chapterDetail.enableQuiz &&
        this.initialChapter.htmlContent === this.chapterDetail.htmlContent &&
        this.arraysEqual(
          this.initialChapter.questions,
          this.chapterDetail.questions
        ) &&
        this.arraysEqual(
          this.initialChapter.imageAttachments,
          this.chapterDetail.imageAttachments
        )
      );
    },
  },
  watch: {
    $route() {
      this.$store.dispatch("chapter/clearChapterData");
    },
    timedAlert(alertValue) {
      if (alertValue) {
        setTimeout(() => {
          this.timedAlert = false;
        }, 3000);
      }
    },
  },
  methods: {
    objectsEqual(o1, o2) {
      return typeof o1 === "object" && Object.keys(o1).length > 0
        ? Object.keys(o1).length === Object.keys(o2).length &&
            Object.keys(o1).every((p) => this.objectsEqual(o1[p], o2[p]))
        : o1 === o2;
    },
    arraysEqual(a1, a2) {
      return (
        a1.length === a2.length &&
        a1.every((o, idx) => this.objectsEqual(o, a2[idx]))
      );
    },
    handleBeforeUnload(event) {
      if (!this.hasChanges) {
        return;
      } else {
        event.returnValue = "";
      }
    },
    getChapterDetail(chapterId) {
      this.$store
        .dispatch("chapter/getChapterDetailById", chapterId)
        .then((response) => {
          this.initialChapter = Object.assign({}, response);
          this.enableQuiz = this.chapterDetail.enableQuiz;
          this.loading = false;
        })
        .catch((error) => {
          this.errorMsg = error;
          this.loading = false;
          this.timedAlert = true;
        });
    },
    imageHandler(file, Editor, cursorLocation, resetUploader) {
      fileService
        .uploadFile(file)
        .then((data) => {
          Editor.insertEmbed(cursorLocation, "image", data.url);
          this.chapterDetail.imageAttachments.push(data.name);
          resetUploader();
        })
        .catch((error) => console.log(error));
    },
    imageRemovedHandler(file) {
      fileService.deleteFile(file).then((data) => {
        this.chapterDetail.imageAttachments =
          this.chapterDetail.imageAttachments.filter((e) => e != data.filename);
      });
    },
    handlePublish() {
      if (!this.hasChanges) {

        this.notChangedAlert = true;
        this.publishDialog = true;

        setTimeout(() => {
          this.notChangedAlert = false;
          this.publishDialog = false;
        }, 2000);

        return;
      }
      chapterService
        .updateChapter(this.chapterDetail)
        .then((response) => {
          this.initialChapter = Object.assign({}, response);
          this.successPublishAlert = true;
          this.publishDialog = true;

          setTimeout(() => {
            this.successPublishAlert = false;
            this.publishDialog = false;
          }, 2000);

        })
        .catch((error) => {
          this.errorMsg = error
          this.errorPublishAlert = true;
          this.publishDialog = true;

          setTimeout(() => {
            this.errorPublishAlert = false;
            this.publishDialog = false;
          }, 2000);
        })
    },
    handleAddQuestion() {
      this.$store.commit("chapter/addQuestion");
    },
    handleEnableQuiz() {
      // console.log(this.enableQuiz);
      this.$store.commit("chapter/updateEnableQuiz", this.enableQuiz);
    },
  },
};
</script>

<style lang="scss">
.editor {
  height: auto;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  .quillWrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    iframe {
      pointer-events: none;
    }
  }

  .ql-container {
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: auto;
  }
}
</style>
