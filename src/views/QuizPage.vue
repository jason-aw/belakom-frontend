<template>
  <b-container>
    <h1>{{chapterDetail.chapterName}} Quiz</h1>
    <!-- div#correctAnswers -->
    <hr class="divider" />
    <!-- question div -->

    <b-progress
        variant="primary"
        :max="this.questions.length"
        :value="this.progressBarValue"
        height="4px"
    ></b-progress>

    <div v-if="showScore">
      <b-card
          title="Results"
          style="max-width: 20rem;"
      >
        You Scored {{score}} of {{questions.length}}
      </b-card>
    </div>

    <b-card-text>
      {{questions[currentQuestion].question}}
    </b-card-text>

    <div class="answer-section">

      <div v-if="questions[currentQuestion].type === 'MPC'">
        <b-button :key="index" v-for="(option, index) in questions[currentQuestion].allanswers"
                  @click="handleAnswerClick(option)" class="ans-option-btn"
                  variant="primary">{{ option }}
        </b-button>
      </div>

      <div v-if="questions[currentQuestion].type === 'shortAnswer'">
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

    <hr class="divider" />
  </b-container>
</template>

<script>
import chapterService from '@/services/chapter.service';
export default {
  name: "QuizPage",
  data() {
    return {
      chapterDetail: {},
      currentQuestion: 0,
      progressBarValue: 0,
      questions: [],
      formValue: {},
      loading: true,
      showScore: false,
      score:0,
    }
  },
  created() {
    this.getChapterDetail(this.$route.params.chapterId);
    this.getAllQuestion(this.$route.params.chapterId);
  },
  computed: {

  },
  methods: {
    getChapterDetail(chapterId) {
      chapterService.getChapterById(chapterId)
          .then((response) => (this.chapterDetail = Object.assign({}, response)))
          .catch((error) => console.log(error));
    },
    getAllQuestion(chapterId) {
      this.$store.dispatch("question/getQuestionsByChapterId", chapterId)
          .then((response) => {

            let data = response.data.map((question) => {
              // put answers on question into single array
              question.allanswers = [
                question.correctAnswer,
                ...question.fakeAnswers];

              console.log(question)
              this.shuffleArray(question.allanswers)

              return question;
            });

            this.questions = data
            console.log(this.questions)
            return this.questions;
          })
          .catch((error) => (this.errorMsg = error));
    },
    //Durstenfeld shuffle
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    },
    handleAnswerClick(answer) {

      let nextQuestion = this.currentQuestion + 1;

      let isCorrect = (answer === this.questions[this.currentQuestion].correctAnswer)

      if(isCorrect){
        console.log("benar")
        this.score = this.score + 1;
      }

      console.log('panjang ' +this.questions.length)
      console.log('currently at ' +this.currentQuestion)

      this.progressBarValue = nextQuestion;

      if(nextQuestion < this.questions.length) {
        this.currentQuestion = nextQuestion;
      } else {
        this.showScore = true;
      }
    }
  }
}
</script>

<style scoped>

button {
  font-size: 1.1rem;
  box-sizing: border-box;
  padding: 1rem;
  margin: 0.3rem;
  width: 47%;
  background-color: rgba(100, 100, 100, 0.3);
  border: none;
  border-radius: 0.4rem;
  box-shadow: 3px 5px 5px rgba(0, 0, 0, 0.2);
}

button:hover:enabled {
  transform: scale(1.02);
  box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.14), 0 1px 7px 0 rgba(0, 0, 0, 0.12),
  0 3px 1px -1px rgba(0, 0, 0, 0.2);
}

button:active:enabled {
  transform: scale(1.05);
}

</style>
