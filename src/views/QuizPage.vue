<template>
  <v-container>
    <v-overlay :value="loading">
      <v-progress-circular color="#1f3da1" indeterminate size="64" width="6" />
    </v-overlay>
    <template v-if="!loading">
      <div class="text-h2">{{ chapterDetail.chapterName }} Quiz</div>

      <v-progress-linear
        color="#1f3da1"
        :value="progressBarValue"
        height="35px"
        dark
        class="mt-6 rounded-pill"
        > {{this.currentQuestion}} / {{this.chapterDetail.questions.length}} </v-progress-linear
      >

      <div v-if="showScore">
        <v-row justify="center" class="mt-5" no-gutters>
          <h3>Kamu berhasil menjawab benar {{ score }} dari {{ chapterDetail.questions.length }} pertanyaan!</h3>
        </v-row>
        <v-row justify="center" no-gutters>
          <v-img
              src="../assets/Quiz/Done-rafiki.png"
              width="50%"
              height="50%"
              max-height="50%"
              max-width="50%"
          ></v-img>
        </v-row>
        <v-row justify="center" no-gutters>
          <v-btn  @click="restartQuiz" color="#1f3da1" dark large> Ulang Quiz </v-btn>
        </v-row>
      </div>

      <v-card v-else class="mx-auto quizCard" elevation="0"  width="60%" >
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
        <v-card-actions v-if="correct === false">
          <h3>Jawaban yang benar adalah {{this.correctAnswer}}</h3>
        </v-card-actions>
      </v-card>
      <v-footer
        padless
        absolute
        height="100"
        class="px-xl-10"
        v-bind="this.footerAttrs"
        
      >
        <template v-if="!showScore">
          <v-row justify="center" no-gutters class="px-10">
            <v-spacer />
            <v-btn v-if="!showAnswer" text>skip</v-btn>
            <div v-if="correct === null">

            </div>
            <div v-else-if="correct">
              <h3>BENAR!</h3>
            </div>
            <div v-else>
              <h3>SALAH!</h3>
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
        </template>
      </v-footer>
    </template>
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
      showScore: true,
      questionAnswers: null,
      score: 0,
      chapterDetail: {},
      showAnswer: false,
      correct: null,
      correctAnswer: null,
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
      this.chapterDetail.questions.forEach((question) => {
        this.shuffleArray(question.answers);
      });
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


      switch (question.questionType) {
        case "MULTIPLE_CHOICE":
          // eslint-disable-next-line no-case-declarations
          let chosenAnswer;
          chosenAnswer = question.answers[this.toggledAnswer];

          for (let answer of question.answers) {
            if (answer.correct) {
              this.correctAnswer = answer.answer;
              break;
            }
          }

          if (chosenAnswer.correct) {
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
          this.correctAnswer = []
          for (let answer of answers) {
            this.correct = false;
            this.correctAnswer.push(answer)
            if (answer === this.formValue.shortAnswerValue.toString()) {
              this.score = this.score + 1;
              this.correct = true;
              break;
            }
          }
          break;
      }
    },
    handleContinue() {
      this.showAnswer = false;
      this.correct = null;
      this.correctAnswer = null;
      let nextQuestion = this.currentQuestion + 1;
      this.progressBarValue =
        (nextQuestion / this.chapterDetail.questions.length) * 100;

      this.currentQuestion = nextQuestion;
      if (nextQuestion >= this.chapterDetail.questions.length) {
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

.quizCard {
  margin-top: 13%;
  margin-bottom: 25%;
}

.endQuiz {
  margin-top: 13%;
  margin-bottom: 25%;
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


