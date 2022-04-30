<template>
  <div
    class="chapterCard px-3 py-3"
    @click.stop="goToChapterDetail(chapter.id)"
  >
    <div class="chapterTitle">
      {{ chapter.order }}. {{ chapter.chapterName }}
    </div>

    <div class="chapterDescription">
      {{ chapter.description }}
    </div>

    <div class="action-buttons">
      <b-button
        class="edit-button"
        @click.stop="goToEditChapterDetail(chapter.id)"
      >
        <b-icon-pencil-square class="icon"></b-icon-pencil-square>
      </b-button>
      <b-button
        class="delete-button"
        @click.stop="handleDeleteChapterSubmit(chapter.id)"
      >
        <b-icon-trash-fill class="icon"></b-icon-trash-fill>
      </b-button>
    </div>
  </div>
</template>

<script>
import chapterService from "@/services/chapter.service";
import { BIconTrashFill, BIconPencilSquare } from "bootstrap-vue";

export default {
  name: "ChapterCard",
  props: ["chapter"],
  components: {
    BIconTrashFill,
    BIconPencilSquare,
  },
  methods: {
    handleDeleteChapterSubmit(id) {
      chapterService.deleteChapter(id).then(
        (response) => {
          this.$root.$emit("deleteChapterEvent");
          return response;
        },
        (error) => {
          return error;
        }
      );
    },
    goToChapterDetail(id) {
      this.$router.push("/chapters/" + id);
    },
    goToEditChapterDetail(id) {
      this.$router.push("/chapters/" + id + "/edit");
    },
  },
};
</script>

<style lang="scss" scoped>
.chapterCard {
  position: relative;
  display: flex;
  border-radius: 8px;
  flex-direction: column;
  background-color: #ced4e8;
  min-height: 4em;
  height: 9em;
  letter-spacing: 1px;
  transition: 0.3s ease all;

  .chapterTitle {
    font-size: 1.5em;
    font-weight: bold;
  }

  .action-buttons {
    display: flex;
    position: absolute;
    top: 0.75em;
    right: 0.75em;
    z-index: 99;

    .delete-button,
    .edit-button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 2.25em;
      height: 2.25em;
      border-radius: 50%;
      border: none;
      background-color: #fff;
      color: #303030;
      transition: 0.4s ease all;

      &:hover {
        width: 2.75em;
        height: 2.75em;
        box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.3);
      }

      .icon {
        height: 1em;
        width: auto;
      }
    }
    .edit-button {
      margin-right: 0.5em;
      &:hover {
        background-color: rgb(31, 61, 161);
        color: white;
      }
    }
    .delete-button:hover {
      background-color: rgb(230, 0, 0);
      color: white;
    }
  }
}
</style>
