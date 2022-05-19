<template>
  <div
    class="chapterCard px-3 py-3"
    @click.stop="goToChapterDetail(chapter.id)"
  >
    <div class="chapterTitle">
      {{ index }}. {{ chapter.chapterName }}
      {{ chapter.chapterCompletion * 100 }}%
    </div>

    <div class="chapterDescription">
      {{ chapter.description }}
    </div>

    <div class="action-buttons">
      <v-btn
        fab
        x-small
        color="#1f3da1"
        dark
        @click.stop="goToEditChapterDetail(chapter.id)"
      >
        <v-icon>mdi-pencil-box</v-icon>
      </v-btn>
      <v-btn
        fab
        x-small
        color="red darken-1"
        class="ml-2"
        dark
        @click.stop="handleDeleteChapterSubmit(chapter.id)"
      >
        <v-icon>mdi-trash-can</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import chapterService from "@/services/chapter.service";

export default {
  name: "ChapterCard",
  props: ["chapter", "index"],
  components: {},
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

<style lang="scss">
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
  }
}
</style>
