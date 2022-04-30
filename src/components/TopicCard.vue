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

    <div class="deleteButtonArea">
      <transition name="deleteButtonFade">
        <b-button
          class="deleteButton"
          @click.stop="handleDeleteTopicSubmit(topic.id)"
          v-if="hovered"
        >
          delete
        </b-button>
      </transition>
    </div>
  </div>
</template>

<script>
import topicServices from "@/services/topic.service";
export default {
  name: "TopicCard",
  props: ["topic"],
  data: () => ({
    hovered: false,
  }),
  methods: {
    handleDeleteTopicSubmit(id) {
      topicServices.deleteTopic(id).then(
        (response) => {
          this.$root.$emit("deleteTopicEvent");
          return response;
        },
        (error) => {
          this.errorMessage = error;
        }
      );
    },
    goToTopicDetail(topicName) {
      this.$router.push("/topics/" + topicName);
    },
  },
};
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

.topicCard:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06);
  letter-spacing: 2px;
  outline: solid 1px #1f3da1;
}

.topicCardText {
  font-weight: 500;
  font-size: 1.5em;
  padding: 0;
}

.deleteButtonFade-enter-active,
.deleteButtonFade-leave-active {
  transition: opacity 0.5s;
}
.deleteButtonFade-enter, .deleteButtonFade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.deleteButtonArea {
  width: 50%;
  position: relative;
  display: flex;
  justify-content: flex-end;
  justify-self: flex-end;
  z-index: 99;
}

.deleteButton {
  border: 0px;
  width: 100%;
  background-color: #f51414;
  color: white;
  transition: all 0.4s ease;
  font-size: 12px;
}
</style>
