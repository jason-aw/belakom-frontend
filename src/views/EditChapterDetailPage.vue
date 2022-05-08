<template>
  <div class="create-article">
    <div class="container">
      <div v-show="errorMsg" class="error-message">
        <p><span>Error: </span>{{ this.errorMsg }}</p>
      </div>
      <div class="article-info">
        <h1><click-to-edit v-model="chapterDetail.chapterName" /></h1>
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
      <div class="article-actions">
        <button @click="handlePublish">Publish Article</button>
        <router-link to="/chapter-preview">See Article Preview</router-link>
      </div>

      <FormulateInput
        type="checkbox"
        label="Enable Quiz"
        v-model="enableQuiz"
        @click="handleUpdateChapterEnableQuiz()"
      />

      <div v-if="enableQuiz" class="col-12 editQuestion mt-md-5 mb-md-5">
        <h1>Add Question</h1>

        <div
          class="col-12 mt-md-5 mb-md-5"
          v-for="question in questions"
          :key="question.id"
        >
          {{ question }}
        </div>

        <v-card>
          <v-btn v-b-modal.createNewQuestionModal> + </v-btn>
        </v-card>
      </div>

      <b-modal
        id="createNewQuestionModal"
        hide-footer
        centered
        size="xl"
        title="Create New Question"
      >
        <FormulateForm
          v-model="createQuestionFormValue"
          @submit="handleCreateQuestionSubmit"
          class="form"
        >
          <FormulateInput
            type="text"
            name="order"
            label="Urutan"
            placeholder=""
            validation="^required|number"
            error-behavior="submit"
            :validation-messages="{
              required: 'Input order harus ada',
              number: 'Input harus berupa angka',
            }"
          />

          <FormulateInput
            type="text"
            name="question"
            label="Question"
            placeholder="Question"
            validation="^required"
            error-behavior="submit"
            :validation-messages="{
              required: 'Soal harus ada',
            }"
          />

          <FormulateInput
            v-model="questionTypeValue"
            name="questionType"
            :options="{
              MPC: 'Multiple Choice',
              shortAnswer: 'Short Answer Text',
            }"
            type="select"
            placeholder="Select question Type"
            label="Select Question Type?"
          />

          <FormulateInput
            type="text"
            name="correctAnswer"
            label="Correct Answer"
            placeholder=""
            validation="^required"
            error-behavior="submit"
            :validation-messages="{
              required: 'Jawaban harus ada',
            }"
          />

          <div v-if="questionTypeValue === 'MPC'">
            <FormulateInput
              type="text"
              name="fakeAnswer1"
              label="fakeAnswer1"
              placeholder="Fake Answer 1"
              validation="^required"
              error-behavior="submit"
              :validation-messages="{
                required: 'Jawaban palsu 1 harus ada',
              }"
            />
            <FormulateInput
              type="text"
              name="fakeAnswer2"
              label="fakeAnswer2"
              placeholder="Fake Answer 2"
              validation="^required"
              error-behavior="submit"
              :validation-messages="{
                required: 'Jawaban palsu 2 harus ada',
              }"
            />
            <FormulateInput
              type="text"
              name="fakeAnswer3"
              label="fakeAnswer3"
              placeholder="Fake Answer 3"
              validation="^required"
              error-behavior="submit"
              :validation-messages="{
                required: 'Jawaban palsu 3 harus ada',
              }"
            />
          </div>

          <FormulateInput
            align="center"
            type="submit"
            label="Create Question"
          />
          <b-alert fade variant="success" v-model="successCreateAlert">
            Question successfully added!
          </b-alert>
          <b-alert fade variant="danger" v-model="errorCreateAlert">
            Question failed to add!
          </b-alert>
        </FormulateForm>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { VueEditor, Quill } from "vue2-editor";
import ImageResize from "quill-image-resize-module";
import fileService from "@/services/files.service";
import { mapGetters } from "vuex";
import chapterService from "@/services/chapter.service";
import questionService from "@/services/question.service";
import ClickToEdit from "@/components/ClickToEdit.vue";

Quill.register("modules/imageResize", ImageResize);
export default {
  name: "EditChapterDetailPage",
  components: {
    VueEditor,
    ClickToEdit,
  },
  data() {
    return {
      errorMsg: "",
      enableQuiz: false,
      initialChapter: {},
      questionTypeValue: "",
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
    enableQuiz() {
      //
      //if enable quiz is false, update to db
      //if enable quiz is true, update to db and
      //hit get all question based on chapterId

      //update db
      if (this.enableQuiz === true) {
        console.log("hit getQuestion");
        this.getAllQuestion(this.chapterDetail.id);
      }
    },
  },
  methods: {
    getChapterDetail(chapterId) {
      this.$store
        .dispatch("chapter/getChapterDetailById", chapterId)
        .then((response) => {
          this.initialChapter = Object.assign({}, response);
          this.enableQuiz = this.chapterDetail.enableQuiz;
        })
        .catch((error) => (this.errorMsg = error));
    },
    getAllQuestion(chapterId) {
      this.$store
        .dispatch("question/getQuestionsByChapterId", chapterId)
        .then((response) => {
          return response;
        })
        .catch((error) => (this.errorMsg = error));
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
    handleUpdateChapterEnableQuiz() {
      //belum tau setiap hit mau update langusng db apa gak usah
    },
    handleCreateQuestionSubmit() {
      this.createQuestionFormValue.chapterId = this.chapterDetail.id;
      this.createQuestionFormValue.topicId = this.chapterDetail.topicId;

      questionService.createQuestion(this.createQuestionFormValue).then(
        (response) => {
          this.getAllQuestion(this.chapterDetail.id);
          return response;
        },
        (error) => {
          return error;
        }
      );
    },
  },
};
</script>

<style lang="scss">
.create-article {
  position: relative;
  height: 100vh;

  .container {
    position: relative;
    height: 100%;
    padding: 10px 25px 60px;

    .fakeAnswer {
      padding: 0.75em;
    }
  }

  .error-message {
    width: 100%;
    color: #fff;
    margin-bottom: 15px;
    background-color: #303030;
    border-radius: 8px;
    transition: 0.5 ease all;
    padding: 12px;
    font-size: 14px;

    span {
      font-weight: 600;
    }
    p {
      margin: 0;
    }
  }

  .article-info {
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    // input {
    //   background: none;
    //   min-width: 300px;
    //   margin-left: 10px;
    //   border: none;
    //   border-bottom: 1px solid #303030;
    //   transition: 0.5s ease all;

    //   &:focus {
    //     outline: none;
    //     box-shadow: 0 1px 0 0 #303030;
    //   }
    // }
  }

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

  .article-actions {
    display: flex;
    flex-direction: row-reverse;

    a,
    button {
      margin: 0;
      transition: 0.3s ease all;
      align-self: center;
      font-size: 14px;
      cursor: pointer;
      border-radius: 20px;
      padding: 12px 24px;
      color: #fff;
      background-color: #1f3da1;
      text-decoration: none;

      &:hover {
        filter: brightness(130%);
      }
    }

    button {
      border: none;
      margin-left: 12px;
    }
  }
}
</style>
