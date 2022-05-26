<template>
  <v-container>
    <h1>PREVIEW</h1>
    <v-btn @click="$router.back()"
      ><v-icon dense>mdi-arrow-left</v-icon> Ke Halaman Edit</v-btn
    >
    <h1>{{ chapterDetail.chapterName }}</h1>
    <p>{{ chapterDetail.description }}</p>
    <div class="content" v-html="chapterDetail.htmlContent"></div>
    <v-btn
      color="#1f3da1"
      dark
      @click="goToQuizPage(chapterDetail.id)"
      v-if="chapterDetail.enableQuiz"
      >Access Quiz</v-btn
    >
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
  methods: {
    goToQuizPage(id) {
      this.$router.push("/chapters/" + id + "/quiz");
    },
  },
};
</script>

<style></style>
