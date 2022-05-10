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
        >defeat is tragic</v-progress-linear
      >

      <v-row v-if="showScore" justify="center" no-gutters>
        <v-card title="Results" style="max-width: 20rem">
          You Scored {{ score }} of {{ chapterDetail.questions.length }}
        </v-card>
      </v-row>
      <v-card v-else class="mt-6 mx-auto" width="60%">
        <v-card-text class="black--text">
          <v-row class="text-h5" no-gutters>
            {{ chapterDetail.questions[currentQuestion].questionPrompt }}
          </v-row>
          <v-divider class="my-4" />
          <div>
            <v-row
              no-gutters
              v-if="
                chapterDetail.questions[currentQuestion].questionType ===
                'MULTIPLE_CHOICE'
              "
              class="justify-center"
            >
              <v-btn
                :key="index"
                v-for="(answer, index) in chapterDetail.questions[
                  currentQuestion
                ].answers"
                @click="handleAnswerClick(answer)"
                class="mx-2"
                variant="primary"
              >
                {{ answer.answer }}
              </v-btn>
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
                @submit="handleAnswerClick(formValue.shortAnswerValue)"
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
          </div>
          <v-row no-gutters class="mt-4">
            <v-btn text>skip</v-btn>
            <v-spacer />
            <v-btn color="#1f3da1" dark>next</v-btn>
          </v-row>
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import chapterService from "@/services/chapter.service";
export default {
  name: "QuizPage",
  data() {
    return {
      currentQuestion: 0,
      progressBarValue: 0,
      formValue: {},
      loading: true,
      showScore: false,
      score: 0,
      chapterDetail: {},
    };
  },
  created() {
    this.init(this.$route.params.chapterId);
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
    handleAnswerClick(answer) {
      let nextQuestion = this.currentQuestion + 1;

      if (answer.correct) {
        this.score = this.score + 1;
      }

      this.progressBarValue =
        (nextQuestion / this.chapterDetail.questions.length) * 100;

      if (nextQuestion < this.chapterDetail.questions.length) {
        this.currentQuestion = nextQuestion;
      } else {
        this.showScore = true;
      }
      console.log(this.progressBarValue);
    },
  },
};
</script>