<template>
  <div class="create-article">
    <div class="container">
      <div v-show="errorMsg" class="error-message">
        <p><span>Error: </span>{{ this.errorMsg }}</p>
      </div>
      <div class="article-info">
        <h1><click-to-edit v-model="chapterDetail.chapterName" /></h1>
        <p><click-to-edit v-model="chapterDetail.description" textarea="true" /></p>
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
        <button @click="handleSeeChapterPreview">See Article Preview</button>
      </div>
    </div>
  </div>
</template>

<script>
import { VueEditor, Quill } from "vue2-editor";
import ImageResize from "quill-image-resize-module";
import fileService from "@/services/files.service";
import { mapGetters } from "vuex";
import chapterService from "@/services/chapter.service";
import ClickToEdit from "@/components/ClickToEdit.vue";

Quill.register("modules/imageResize", ImageResize);
export default {
  name: "EditChapterDetailPage",
  components: {
    VueEditor,
    ClickToEdit
  },
  data() {
    return {
      errorMsg: "test message",
      initialChapter: {},
      imagesToUpload: [],
      editorSettings: {
        modules: {
          imageResize: {},
        },
        bounds: ".editor",
      },
    };
  },
  created() {
    this.getChapterDetail(this.$route.params.chapterId);
  },
  computed: {
    ...mapGetters("chapter", ["chapterDetail"]),
  },
  watch: {
    $route() {
      this.$store.dispatch("chapter/clearChapterData");
    },
  },
  methods: {
    getChapterDetail(chapterId) {
      this.$store
        .dispatch("chapter/getChapterDetailById", chapterId)
        .then((response) => {
          this.initialChapter = Object.assign({}, response);
        })
        .catch((error) => (this.errorMsg = error));
    },
    imageHandler(file, Editor, cursorLocation, resetUploader) {
      fileService
        .uploadFile(file)
        .then((data) => {
          Editor.insertEmbed(cursorLocation, "image", data.imageUrl);
          this.imagesToUpload.push({
            url: data.imageUrl,
            filename: data.filename,
          });
          resetUploader();
        })
        .catch((error) => console.log(error));
    },
    imageRemovedHandler(file) {
      fileService.deleteFile(file);
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
    handleSeeChapterPreview() {
      
    }
  },
};
</script>

<style lang="scss">
.create-article {
  position: relative;
  height: 100%;

  .container {
    position: relative;
    height: 100%;
    padding: 10px 25px 60px;
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