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
        <v-btn color="#1f3da1" dark @click="goToQuizPage(chapterDetail.id)"
          >Access Quiz</v-btn
        >
      </div>

      <comment-section :chapterId="chapterDetail.id" />
    </div>
  </v-container>
</template>

<script>
import chapterService from "@/services/chapter.service";
import progressService from "@/services/progress.service";
import CommentSection from "@/components/CommentSection.vue";
import { mapGetters } from "vuex";

export default {
  name: "ChapterDetailPage",
  components: {
    CommentSection,
  },
  data() {
    return {
      chapterDetail: {},
      loading: true,
    };
  },
  computed: {
    ...mapGetters("auth", ["role"]),
  },
  mounted() {
    setTimeout(this.endScroll, 500);
  },
  async created() {
    try {
      await Promise.all([
        this.getChapterDetail(this.$route.params.chapterId),
        this.getComments(this.$route.params.chapterId),
      ]);
    } catch (error) {
      // console.log(error);
    }
    document.title = `${this.chapterDetail.chapterName} | Belakom`;
    this.loading = false;
  },
  methods: {
    async getChapterDetail(chapterId) {
      return chapterService
        .getChapterById(chapterId)
        .then((response) => {
          this.chapterDetail = Object.assign({}, response);
          return Promise.resolve(response);
        })
        .catch((error) => {
          console.log(error);
          return Promise.reject(error);
        });
    },
    goToQuizPage(id) {
      this.$router.push("/chapters/" + id + "/quiz");
    },
    handleUpdateChapterProgress() {
      if (!this.role?.includes("ROLE_USER")) {
        return;
      }
      let req = {
        quizCompleted: null,
        chapterId: this.chapterDetail.id,
        articleCompleted: true,
        score: null,
      };
      console.log(this.chapterDetail);
      console.log(req);
      progressService.updateChapterProgress(req);
    },
    endScroll() {
      //full page vs current height
      let unscrollablePage =
        document.documentElement.scrollHeight ===
        Math.max(
          window.pageYOffset,
          document.documentElement.scrollTop,
          document.body.scrollTop
        ) +
          window.innerHeight;
      if (unscrollablePage) {
        this.handleUpdateChapterProgress();
      } else {
        window.addEventListener("scroll", this.checkEndOfScroll);
      }
    },
    checkEndOfScroll() {
      let bottomOfWindow =
        Math.max(
          window.pageYOffset,
          document.documentElement.scrollTop,
          document.body.scrollTop
        ) +
          window.innerHeight ===
        document.documentElement.offsetHeight;
      if (bottomOfWindow) {
        this.handleUpdateChapterProgress();
      }
    },
    async getComments(id) {
      try {
        await this.$store.dispatch("comment/getComments", id);
      } catch (error) {
        console.log(error);
      }
    },
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.checkEndOfScroll);
  },
};
</script>

<style></style>
