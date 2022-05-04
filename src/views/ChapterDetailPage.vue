<template>
  <b-container>
    <h1>{{ chapterDetail.order+'. '+ chapterDetail.chapterName }}</h1>
    <p>{{ chapterDetail.description}}</p>
    <div class="content" v-html="chapterDetail.htmlContent"></div>

    <div v-if="chapterDetail.enableQuiz">
      <button @click="goToQuizPage(chapterDetail.id)">Access Quiz</button>
    </div>
  </b-container>
</template>

<script>
import chapterService from '@/services/chapter.service';
export default {
  name: "ChapterDetailPage",
  data() {
    return {
      chapterDetail: {},
    };
  },
  created() {
    this.getChapterDetail(this.$route.params.chapterId);
  },
  methods: {
    getChapterDetail(chapterId) {
      chapterService.getChapterById(chapterId)
        .then((response) => (this.chapterDetail = Object.assign({}, response)))
        .catch((error) => console.log(error));
    },
    goToQuizPage(id) {
      this.$router.push("/chapters/" + id + "/quiz");
    },
  },
};
</script>

<style>
</style>
