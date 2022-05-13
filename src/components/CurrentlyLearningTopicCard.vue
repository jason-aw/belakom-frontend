<template>
  <div
      class="topicCard"
      @mouseover="hovered = true"
      @mouseleave="hovered = false"
      @click.stop="goToTopicDetail(topic.topicName)"
  >
    <div class="topicCardText">
      {{ topic.topicName }}
    </div>

  </div>
</template>

<script>
export default {
  name: "CurrentlyLearningTopicCard",
  props: ["topic"],
  data: () => ({
    hovered: false,
  }),
  methods: {
    goToTopicDetail(topicName) {
      this.$router.push("/topics/" + topicName);
    },
  },
}
</script>

<style scoped>
.topicCard {
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-color: #ced4e8;
  min-height: 3em;
  height: 8em;
  letter-spacing: 1px;
  transition: 0.3s ease all;
  align-items: center;
  justify-content: center;
}
</style>
