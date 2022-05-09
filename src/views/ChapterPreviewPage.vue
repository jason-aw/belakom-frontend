<template>
  <v-container>
    <h1>PREVIEW</h1>
    <h1>{{ chapterDetail.chapterName }}</h1>
    <p>{{ chapterDetail.description }}</p>
    <div class="content" v-html="chapterDetail.htmlContent"></div>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ChapterPreviewPage",
  computed: {
    ...mapGetters("chapter", ["chapterDetail"]),
  },
  created() {
    if (!this.chapterDetail.chapterName) {
      this.$router.back();
    }
  },
};
</script>

<style></style>
