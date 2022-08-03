<template>
  <v-container>
    <v-overlay :value="loading">
      <v-progress-circular color="#1f3da1" indeterminate size="64" width="6" />
    </v-overlay>
    <div v-if="!loading">
      <v-btn @click="goToTopicPage" class="mb-4 mt-1" color="#1f3da1" dark
        ><v-icon dense>mdi-arrow-left</v-icon> Ke Halaman Chapters</v-btn
      >
      <div id="articleContent">
        <h1>{{ chapterDetail.chapterName }}</h1>
        <p>{{ chapterDetail.description }}</p>
        <div class="content" v-html="chapterDetail.htmlContent"></div>

        <div v-if="chapterDetail.enableQuiz">
          <v-btn color="#1f3da1" dark @click="goToQuizPage(chapterDetail.id)"
            >Akses Quiz</v-btn
          >
        </div>
      </div>

      <v-dialog
          transition="dialog-top-transition"
          max-width="600"
          v-model="quizAlert"
      >
        <template>
          <v-card>
            <v-row class="pa-3" no-gutters>
              <v-col>
                <v-alert
                    transition="fade-transition"
                    type="warning"
                    text
                    class="ma-0"
                >
                  Masuk untuk dapat akses ke Quiz!
                </v-alert>
              </v-col>
            </v-row>
            <v-card-actions class="justify-center">
              <v-btn
                  @click="quizAlert = false"
              >Cancel</v-btn
              >
              <v-btn
                  color="#1f3da1"
                  :dark="!successDeleteAlert && !errorDeleteAlert"
                  @click="goToLogin"
              >Masuk</v-btn
              >
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>

      <comment-section :chapterId="chapterDetail.id" />
    </div>
  </v-container>
</template>

<script>
import chapterService from "@/services/chapter.service";
import progressService from "@/services/progress.service";
import CommentSection from "@/components/CommentSection.vue";
import userService from "@/services/user.service";
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
      articlePosition: null,
      adminRole: false,
      quizAlert: false,
      update: false,
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
      console.log(error);
    }
    this.updateCurrentlyLearningTopic();
    this.adminRole = this.role?.includes("ROLE_ADMIN");
    document.title = `${this.chapterDetail.chapterName} | Belakom`;
    this.loading = false;
  },
  methods: {
    goToTopicPage() {
      this.$router.push(`/topics/${this.chapterDetail.topicId}`);
    },
    goToLogin() {
      this.$router.push(`/login`);
    },
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
      console.log(this.role?.includes("ROLE_USER"))

      if (this.role?.includes("ROLE_ADMIN") || this.role?.includes("ROLE_USER")) {
        this.$router.push("/chapters/" + id + "/quiz");
      } else {
        this.quizAlert = true;
      }
    },
    handleUpdateChapterProgress() {
      console.log("update")

      let req = {
        quizCompleted: null,
        chapterId: this.chapterDetail.id,
        articleCompleted: true,
        score: null,
      };
      progressService.updateChapterProgress(req);
    },
    updateCurrentlyLearningTopic() {
      if (!this.role?.includes("ROLE_USER")) {
        return;
      }
      let req = {
        lastSeenChapterId: this.chapterDetail.id,
      };
      userService.updateUserData(req).then(
          () => {
            // console.log(response);
          },
          (error) => {
            console.log(error);
          }
      );
    },
    endScroll() {
      //full page vs current height

      if (this.adminRole) {
        return;
      }

      this.articlePosition = document
        .getElementById("articleContent")
        .getBoundingClientRect();

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
      let bottomOfArticle =
        Math.max(
          window.pageYOffset,
          document.documentElement.scrollTop,
          document.body.scrollTop
        ) +
          window.innerHeight >=
        this.articlePosition.bottom;

      console.log(this.update)

      if (bottomOfArticle && this.update === false) {
        this.update = true;
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
