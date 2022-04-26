<template>
  <div class="create-article">
    <div class="container">
      <div v-show="errorMsg" class="error-message">
        <p><span>Error: </span>{{ this.errorMsg }}</p>
      </div>
      <div class="article-info">
        <label for="chapterTitle">Chapter Title</label>
        <input
          type="text"
          placeholder="Enter Chapter Title..."
          name="chapterTitle"
        />
      </div>
      <div class="editor">
        <VueEditor :editorOptions="editorSettings" />
      </div>
      <div class="article-actions">
        <button>Publish Article</button>
        <router-link class="router-button" to="#"
          >See Article Preview</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { VueEditor, Quill } from "vue2-editor"
import ImageResize from "quill-image-resize-module"
Quill.register("modules/imageResize", ImageResize)
export default {
  name: "CreateArticlePage",
  data() {
    return {
      errorMsg: "test message",
      editorSettings: {
        modules: {
          imageResize: {}
        },
        bounds: ".editor"
      }
    };
  },
  components: {
    VueEditor,
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

    input {
      background: none;
      min-width: 300px;
      margin-left: 10px;
      border: none;
      border-bottom: 1px solid #303030;
      transition: 0.5s ease all;

      &:focus {
        outline: none;
        box-shadow: 0 1px 0 0 #303030;
      }
    }
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

    button,
    .router-button {
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