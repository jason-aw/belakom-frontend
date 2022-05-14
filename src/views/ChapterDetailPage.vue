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
import progressService from "@/services/progress.service";

export default {
  name: "ChapterDetailPage",
  data() {
    return {
      chapterDetail: {},
      loading: true
    };
  },
  mounted() {
    setTimeout(this.endScroll, 250)
  },
  created() {
    this.getChapterDetail(this.$route.params.chapterId);
  },
  methods: {
    getChapterDetail(chapterId) {
      return chapterService
        .getChapterById(chapterId)
          .then((response) => {
            (this.chapterDetail = Object.assign({}, response));
            this.loading = false;
            return Promise.resolve()
          })
          .catch((error) => {
            console.log(error)
            return Promise.reject()
          });
    },
    goToQuizPage(id) {
      this.$router.push("/chapters/" + id + "/quiz");
    },
    handleUpdateChapterProgress() {
      let req = {
        quizCompleted: null,
        chapterId: this.chapterDetail.id,
        articleCompleted: true,
        score: null
      }

      progressService.updateChapterProgress(req)
    },
    endScroll() {
      //full page vs current height
      let unscrollablePage = (document.documentElement.scrollHeight === Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight);
      if (unscrollablePage) {
        this.handleUpdateChapterProgress()
      } else {
        window.addEventListener('scroll', this.checkEndOfScroll);
      }
    },
    checkEndOfScroll() {
      let bottomOfWindow =
          (Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight === document.documentElement.offsetHeight)
      if (bottomOfWindow) {
        this.handleUpdateChapterProgress()
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.checkEndOfScroll);
  }
};
</script>

<style></style>
