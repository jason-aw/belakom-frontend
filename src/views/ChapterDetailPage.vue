<template>
  <v-container>
    <v-overlay :value="loading">
      <v-progress-circular color="#1f3da1" indeterminate size="64" width="6" />
    </v-overlay>
    <div v-if="!loading">
      <h1>{{ chapterDetail.chapterName }}</h1>
      <p>{{ chapterDetail.description }}</p>
      <div class="content" v-html="chapterDetail.htmlContent"></div>

      <div v-if="chapterDetail.enableQuiz">
        <v-btn color="#1f3da1" dark @click="goToQuizPage(chapterDetail.id)">Access Quiz</v-btn>
      </div>
    </div>
  </v-container>
</template>

<script>
import chapterService from "@/services/chapter.service";
export default {
  name: "ChapterDetailPage",
  data() {
    return {
      chapterDetail: {},
      chapterIndex: "",
      loading: true
    };
  },
  created() {
    this.getChapterDetail(this.$route.params.chapterId);
    this.chapterIndex = this.$route.params.chapterIndex;
  },
  methods: {
    getChapterDetail(chapterId) {
      chapterService
        .getChapterById(chapterId)
          .then((response) => {
            (this.chapterDetail = Object.assign({}, response));
            this.loading = false;
          })
          .catch((error) => console.log(error));
    },
    goToQuizPage(id) {
      this.$router.push("/chapters/" + id + "/quiz");
    },
  },
};
</script>

<style></style>
