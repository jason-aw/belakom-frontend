<template>
  <v-container>
    <v-row
      v-if="loading"
      no-gutters
      justify="center"
      align="center"
      class="mt-8"
    >
      <v-progress-circular color="#1f3da1" indeterminate size="100" width="6" />
    </v-row>
    <div v-else>
      <div class="text-h2">{{ chapterDetail.chapterName }} Quiz</div>
      <v-divider />

      <v-progress-linear color="#1f3da1" :value="progressBarValue" height="10px"
        >defeat is tragic</v-progress-linear
      >

      <v-row v-if="showScore" justify="center" no-gutters>
        <v-card title="Results" style="max-width: 20rem">
          You Scored {{ score }} of {{ chapterDetail.questions.length }}
        </v-card>
      </v-row>
      <div v-else>
        <h1>
          {{ chapterDetail.questions[currentQuestion].questionPrompt }}
        </h1>

        <div class="answer-section">
          <div
            v-if="
              chapterDetail.questions[currentQuestion].questionType ===
              'MULTIPLE_CHOICE'
            "
          >
            <v-btn
              :key="index"
              v-for="(answer, index) in chapterDetail.questions[currentQuestion]
                .answers"
              @click="handleAnswerClick(answer)"
              class="ans-option-btn"
              variant="primary"
            >
              {{ answer.answer }}
            </v-btn>
          </div>

          <div
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
          </div>
        </div>
      </div>
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