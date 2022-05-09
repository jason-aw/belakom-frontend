<template>
  <v-card class="my-4">
    <v-card-text class="pa-6">
      <v-row no-gutters>
        <v-col class="flex-grow-1">
          <v-textarea
            auto-grow
            rows="1"
            :value="question.questionPrompt"
            @input="updateQuestionPrompt($event)"
          />
        </v-col>
        <v-col class="flex-grow-0">
          <v-file-input prepend-icon="mdi-image" hide-input />
        </v-col>
        <v-col class="flex-shrink-0 col-3">
          <v-select
            :items="questionTypeSelection"
            :value="question.questionType"
            @input="updateQuestionType"
            label="Question Type"
          />
        </v-col>
      </v-row>
      <div>
        <v-row
          v-for="(answer, i) in question.answers"
          :key="i"
          no-gutters
          class="mt-2"
        >
          <v-checkbox
            v-if="isMultipleChoice"
            :input-value="answer.correct"
            @change="updateAnswerCorrect($event, answer, i)"
            hide-details
            class="ma-0 pb-4"
          />
          <v-text-field
            :value="answer.answer"
            @input="updateAnswerText($event, answer, i)"
            class="ma-0 pa-0"
          />
          <v-btn icon color="red" @click="handleRemoveAnswer(i)"
            ><v-icon color="grey darken-2">mdi-minus</v-icon></v-btn
          >
        </v-row>
      </div>
    </v-card-text>
    <v-card-actions class="pa-6 pt-0">
      <v-btn color="#1f3da1" dark @click="handleAddAnswer">Add Answer</v-btn>
      <v-btn color="#f51414" dark @click="handleRemoveQuestion"
        >Remove Question</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "CreateQuizCard",
  props: ["questionIndex"],
  data() {
    return {
      questionTypeSelection: [
        {
          text: "Multiple Choice",
          value: "MULTIPLE_CHOICE",
        },
        {
          text: "Short Answer",
          value: "SHORT_ANSWER",
        },
      ],
    };
  },
  computed: {
    question: {
      get() {
        return this.$store.state.chapter.chapterDetail.questions[
          this.questionIndex
        ];
      },
      set(payload) {
        this.$store.commit("chapter/updateQuestion", payload);
      },
    },
    isMultipleChoice() {
      return this.question.questionType === "MULTIPLE_CHOICE";
    },
  },
  methods: {
    handleAddAnswer() {
      let payload = {
        questionIndex: this.questionIndex,
        questionType: this.question.questionType,
      };
      this.$store.commit("chapter/addAnswer", payload);
    },
    handleRemoveAnswer(answerIndex) {
      const payload = {
        questionIndex: this.questionIndex,
        answerIndex: answerIndex,
      };
      this.$store.commit("chapter/removeAnswer", payload);
    },
    handleRemoveQuestion() {
      this.$store.commit("chapter/removeQuestion", this.questionIndex);
    },
    updateAnswerText(value, answer, answerIndex) {
      let payload = {
        questionIndex: this.questionIndex,
        answerIndex,
        ...answer,
        answer: value,
      };
      this.$store.commit("chapter/updateAnswer", payload);
    },
    updateAnswerCorrect(value, answer, answerIndex) {
      let payload = {
        questionIndex: this.questionIndex,
        answerIndex,
        ...answer,
        correct: value,
      };
      this.$store.commit("chapter/updateAnswer", payload);
    },
    updateQuestionPrompt(value) {
      let payload = {
        ...this.question,
        questionIndex: this.questionIndex,
        questionPrompt: value,
      };
      console.log("update question payload", payload);
      this.$store.commit("chapter/updateQuestion", payload);
    },
    updateQuestionType(value) {
      let payload = {
        ...this.question,
        questionIndex: this.questionIndex,
        questionType: value,
      };
      this.$store.commit("chapter/updateQuestion", payload);
    },
  },
};
</script>
