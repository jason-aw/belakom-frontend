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
        >Publish Article</v-btn
        >
        <v-btn color="#1f3da1" dark to="/chapter-preview"
        >See Article Preview</v-btn
        >
      </v-row>

      <div>
        <v-checkbox label="Enable Quiz" v-model="enableQuiz" />
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
  </v-container>
</template>

<script>
import { VueEditor, Quill } from "vue2-editor";
import ImageResize from "quill-image-resize-module";
import fileService from "@/services/files.service";
import { mapGetters } from "vuex";
import chapterService from "@/services/chapter.service";
import ClickToEdit from "@/components/ClickToEdit.vue";
import CreateQuizCard from "@/components/CreateQuizCard.vue";

Quill.register("modules/imageResize", ImageResize);
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
      editorSettings: {
        modules: {
          imageResize: {},
        },
        bounds: ".editor",
      },
      createQuestionFormValue: {},
    };
  },
  created() {
    this.getChapterDetail(this.$route.params.chapterId);
  },
  computed: {
    ...mapGetters("chapter", ["chapterDetail"]),
    ...mapGetters("question", ["questions"]),
  },
  watch: {
    $route() {
      this.$store.dispatch("chapter/clearChapterData");
    },
    timedAlert(alertValue){
      if (alertValue) {
        setTimeout(()=>{this.timedAlert=false},3000)
      }
    }
  },
  methods: {
    getChapterDetail(chapterId) {
      this.$store
        .dispatch("chapter/getChapterDetailById", chapterId)
        .then((response) => {
          this.initialChapter = Object.assign({}, response);
          this.enableQuiz = this.chapterDetail.enableQuiz;
          this.loading = false
        })
        .catch((error) => {
          (this.errorMsg = error)
          this.loading = false
          this.timedAlert = true
        });
    },
    imageHandler(file, Editor, cursorLocation, resetUploader) {
      fileService
        .uploadFile(file)
        .then((data) => {
          Editor.insertEmbed(cursorLocation, "image", data.imageUrl);
          this.chapterDetail.imageAttachments.push(data.filename);
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
      if (this.initialChapter == this.chapterDetail) {
        return;
      }

      // this.chapterDetail.htmlContent = this.$sanitize(this.chapterDetail.htmlContent)
      chapterService
        .updateChapter(this.chapterDetail)
        .then((response) => console.log(response))
        .catch((error) => (this.errorMsg = error));
    },
    handleAddQuestion() {
      this.$store.commit("chapter/addQuestion");
    },
  },
};
</script>

<style lang="scss">
.editor {
  height: 60vh;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  .quillWrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .ql-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: auto;
  }
}
</style>
