<template>
  <v-container>
    <h1>Topic Title Test</h1>
    <h3>Chapter Title Test</h3>
    <div class="question-card">
      <div class="question-prompt"></div>
      <div class="answers-container"></div>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "CreateQuizPage",
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.question-card {
  border-radius: 5px;
  padding: 1em;
  background-color: #ced4e8;
}
</style>
