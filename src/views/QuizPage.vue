<template>
  <b-container>
    <h1>QUIZ</h1>
    <!-- div#correctAnswers -->
    <hr class="divider" />
    <!-- question div -->

    <form v-if="currentQuestion">
      <button
          v-for="answer in currentQuestion.allanswers"
          :index="currentQuestion.key"
          :key="answer"
          v-html="answer"
          @click.prevent="handleAnswerClick"
      ></button>
    </form>

    <hr class="divider" />
  </b-container>
</template>

<script>
export default {
  name: "QuizPage",
  data() {
    return {
      questions: [],
      loading: true,
      index: 0
    }
  },
  created() {
    this.getAllQuestion(this.$route.params.chapterId);
  },
  computed: {
    currentQuestion() {
      if (this.questions !== []) {
        return this.questions[this.index];
      }
      return null;
    }
  },
  methods: {
    getAllQuestion(chapterId) {
      this.$store.dispatch("question/getQuestionsByChapterId", chapterId)
          .then((response) => {

            let questionNumber = 0; // index is used to identify single answer

            let data = response.data.map((question) => {
              // put answers on question into single array
              question.allanswers = [
                question.correctAnswer,
                ...question.fakeAnswers];
              question.key = questionNumber;
              questionNumber++;
              question.rightAnswer = null;
              return question;
            });

            this.questions = data

            return this.questions;
          })
          .catch((error) => (this.errorMsg = error));
    },
    handleAnswerClick: function(event) {
      /* Find index to identiy question object in data */
      console.log(event)
      let index = event.target.getAttribute("index");
      console.log(index)
      let pollutedUserAnswer = event.target.innerHTML; // innerHTML is polluted with decoded HTML entities e.g ' from &#039;
      /* Clear from pollution with ' */
      let userAnswer = pollutedUserAnswer.replace(/'/, "&#039;");

      /* Set userAnswer on question object in data */
      this.questions[index].userAnswer = userAnswer;

      /* Set class "clicked" on button with userAnswer -> for CSS Styles; Disable other sibling buttons */
      event.target.classList.add("clicked");
      let allButtons = document.querySelectorAll(`[index="${index}"]`);

      for (let i = 0; i < allButtons.length; i++) {
        if (allButtons[i] === event.target) continue;

        allButtons[i].setAttribute("disabled", "");
      }

      /* Invoke checkAnswer to check Answer */
      this.checkAnswer(event, index);
    },
    checkAnswer: function(event, index) {
      let question = this.questions[index];

      if (question.userAnswer) {
        if (this.index < this.questions.length - 1) {
          setTimeout(
              function() {
                this.index += 1;
              }.bind(this),
              3000
          );
        }
        if (question.userAnswer === question.correct_answer) {
          /* Set class on Button if user answered right, to celebrate right answer with animation joyfulButton */
          event.target.classList.add("rightAnswer");
          /* Set rightAnswer on question to true, computed property can track a streak out of 10 questions */
          this.questions[index].rightAnswer = true;
        } else {
          /* Mark users answer as wrong answer */
          event.target.classList.add("wrongAnswer");
          this.questions[index].rightAnswer = false;
          /* Show right Answer */
          let correctAnswer = this.questions[index].correct_answer;
          let allButtons = document.querySelectorAll(`[index="${index}"]`);
          allButtons.forEach(function(button) {
            if (button.innerHTML === correctAnswer) {
              button.classList.add("showRightAnswer");
            }
          });
        }
      }
    },
  }
}
</script>

<style scoped>

form {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

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

button:focus {
  outline: none;
}

button:active:enabled {
  transform: scale(1.05);
}

@keyframes flashButton {
  0% {
    opacity: 1;
    transform: scale(1.01);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.02);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

button.clicked {
  pointer-events: none;
}

button.rightAnswer {
  animation: flashButton;
  animation-duration: 700ms;
  animation-delay: 200ms;
  animation-iteration-count: 3;
  animation-timing-function: ease-in-out;
  color: black;
  background: linear-gradient(
      210deg,
      rgba(0, 178, 72, 0.25),
      rgba(0, 178, 72, 0.5)
  );
}

button.wrongAnswer {
  color: black;
  background: linear-gradient(
      210deg,
      rgba(245, 0, 87, 0.25),
      rgba(245, 0, 87, 0.5)
  );
}

button.showRightAnswer {
  animation: flashButton;
  animation-duration: 700ms;
  animation-delay: 200ms;
  animation-iteration-count: 2;
  animation-timing-function: ease-in-out;
  color: black;
  background: linear-gradient(
      210deg,
      rgba(0, 178, 72, 0.25),
      rgba(0, 178, 72, 0.5)
  );
}

</style>
