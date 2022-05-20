<template>
  <v-container>
    <v-overlay :value="loading">
      <v-progress-circular color="#1f3da1" indeterminate size="64" width="6" />
    </v-overlay>
    <div v-if="!loading">
      <div class="text-h2">{{ chapterDetail.chapterName }} Quiz</div>

      <v-progress-linear
        color="#1f3da1"
        :value="progressBarValue"
        height="10px"
        class="mt-6 rounded-pill"
        ></v-progress-linear
      >

      <v-row v-if="showScore" justify="center" no-gutters>
        <v-card title="Results" style="max-width: 20rem">
          You Scored {{ score }} of {{ chapterDetail.questions.length }}
          <v-btn @click="restartQuiz"> Restart Quiz </v-btn>
        </v-card>
      </v-row>
      <v-card v-else class="mt-6 mx-auto"  width="60%">
        <v-card-text class="black--text" :class="this.getClass">
          <v-row class="text-h5" no-gutters>
            {{ chapterDetail.questions[currentQuestion].questionPrompt }}
          </v-row>
          <v-divider class="my-4" />
            <v-row
              no-gutters
              v-if="
                chapterDetail.questions[currentQuestion].questionType ===
                'MULTIPLE_CHOICE'
              "
              class="justify-center py-5"
            >
              <v-btn-toggle v-model="toggledAnswer">
                <v-row>
                  <v-col
                    cols="6"
                    class="px-5 justify-center py-3"
                    :key="index"
                    v-for="(answer, index) in chapterDetail.questions[
                      currentQuestion
                    ].answers"
                  >
                    <v-btn block outlined class="mx-2" variant="primary">
                      {{ answer.answer }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-btn-toggle>
            </v-row>

            <v-row
              no-gutters
              v-if="
                chapterDetail.questions[currentQuestion].questionType ===
                'SHORT_ANSWER'
              "
            >
              <FormulateForm
                v-model="formValue"
                @submit="handleAnswerClick"
                class="form"
              >
                <FormulateInput
                  type="text"
                  name="shortAnswerValue"
                  placeholder="Jawaban"
                  validation="^required"
                  error-behavior="submit"
                  :validation-messages="{
                    required: 'Jawaban harus ada',
                  }"
                />
              </FormulateForm>
            </v-row>
<!--          <v-row no-gutters class="mt-4">-->
<!--            <v-btn text>skip</v-btn>-->
<!--            <v-spacer />-->
<!--            <v-btn color="#1f3da1" dark @click="handleAnswerClick"-->
<!--              >Check Question</v-btn-->
<!--            >-->
<!--          </v-row>-->
        </v-card-text>
      </v-card>
      <v-footer
        padless
        fixed
        height="180px"
        class="px-xl-10"
        v-bind="this.footerAttrs"
      >
        <v-row justify="center" no-gutters class="px-10">
          <v-spacer />
          <v-btn v-if="!showAnswer" text>skip</v-btn>
          <div v-if="correct === null">

          </div>
          <div v-else-if="correct">
            <h3>BENAR!</h3>
          </div>
          <div v-else>
            <v-card>
              <v-card-title> SALAH </v-card-title>
              <v-card-text> Jawaban seharusnya </v-card-text>
            </v-card>
          </div>
          <v-spacer />
          <v-btn
            v-if="!showAnswer"
            color="#1f3da1"
            dark
            @click="handleAnswerClick"
            >Check Question</v-btn
          >
          <v-btn v-if="showAnswer" color="#1f3da1" dark @click="handleContinue"
            >Continue</v-btn
          >
          <v-spacer />
        </v-row>
      </v-footer>
    </div>
  </v-container>
</template>

<script>
import chapterService from "@/services/chapter.service";
import progressService from "@/services/progress.service";
import { mapGetters } from "vuex";

export default {
  name: "QuizPage",
  data() {
    return {
      toggledAnswer: null,
      currentQuestion: 0,
      progressBarValue: 0,
      formValue: {},
      loading: true,
      showScore: false,
      questionAnswers: null,
      score: 0,
      chapterDetail: {},
      showAnswer: false,
      correct: null,
    };
  },
  created() {
    this.init(this.$route.params.chapterId);
  },
  computed: {
    ...mapGetters("auth", ["role"]),
    footerAttrs() {
      const attrs = {};
      console.log(this.correct);
      if (this.correct === null) {
        attrs.color = "grey";
      } else if (this.correct) {
        attrs.color = "#B2CF9C";
      } else {
        attrs.color = "#ffb3b3";
      }
      console.log(attrs)
      return attrs;
    },
    getClass() {
      console.log("dari card" + this.correct)

      if (this.correct === null) {
        return "quizNull"
      } else if (this.correct) {
        return "quizCorrect"
      } else {
        return "quizFalse"
      }

    }
  },
  methods: {
    init(chapterId) {
      chapterService
        .getChapterById(chapterId)
        .then((response) => {
          this.chapterDetail = response;
          this.chapterDetail.questions.forEach((question) => {
            this.shuffleArray(question.answers);
          });
          this.loading = false;
        })
        .catch((error) => console.log(error));
      return;
    },
    // Durstenfeld shuffle
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    },
    restartQuiz() {
      this.currentQuestion = 0;
      this.progressBarValue = 0;
      this.score = 0;
      this.showScore = false;
    },
    handleUpdateChapterProgress() {
      if (!this.role?.includes("ROLE_USER")) {
        return;
      }
      let req = {
        quizCompleted: true,
        chapterId: this.chapterDetail.id,
        articleCompleted: null,
        correct: this.score,
      };

      progressService.updateChapterProgress(req);
    },
    handleAnswerClick() {
      this.showAnswer = true;

      let question = this.chapterDetail.questions[this.currentQuestion];

      let answer;
      switch (question.questionType) {
        case "MULTIPLE_CHOICE":
          answer = question.answers[this.toggledAnswer];
          if (answer.correct) {
            this.score = this.score + 1;
            this.correct = true;
          } else {
            this.correct = false;
          }
          break;
        case "SHORT_ANSWER":
          // eslint-disable-next-line no-case-declarations
          let answers = Array.from(question.answers).map((answer) => {
            return answer.answer;
          });
          for (let answer of answers) {
            this.correct = false;
            if (answer === this.formValue.shortAnswerValue.toString()) {
              this.score = this.score + 1;
              this.correct = true;
            }
          }
          break;
      }
    },
    handleContinue() {
      this.showAnswer = false;
      this.correct = null;
      let nextQuestion = this.currentQuestion + 1;
      this.progressBarValue =
        (nextQuestion / this.chapterDetail.questions.length) * 100;

      if (nextQuestion < this.chapterDetail.questions.length) {
        this.currentQuestion = nextQuestion;
      } else {
        this.handleUpdateChapterProgress();
        this.showScore = true;
      }
      this.toggledAnswer = null;
    },
  },
};
</script>

<style lang="scss" scoped>
.v-btn-toggle .v-btn--active::before,
.v-btn-toggle .v-btn--active {
  background-color: #ced4e8;
}

.quizNull {

}

.quizCorrect {
  border: 2px solid #59CE02;
  box-shadow: 0 0 8px #59CE02;
}

.quizFalse {
  border: 2px solid #F51414;
  box-shadow: 0 0 8px #F51414;
}

</style>


