<template>
  <div class="topicCard" @click.stop="goToTopicDetail(topic.id)">
    <v-btn
      fab
      x-small
      color="#F51414"
      dark
      class="buttonDelete"
      v-if="showDelete"
      @click.stop="emitDeleteEvent()"
    >
      <v-icon>mdi-trash-can</v-icon>
    </v-btn>

    <div class="topicCardTextArea">
      {{ topic.topicName }}
    </div>

    <div class="progressBarArea" v-if="showProgressBar">
      <v-slide-x-transition>
        <v-progress-linear
          color="#1f3da1"
          v-model="this.progressValue"
          height="15"
          dark
          striped
          class="mt-6 rounded-pill"
        >
          <template v-slot:default="{ value }">
            <span class="progressText">{{ Math.ceil(value) }}%</span>
          </template>
        </v-progress-linear>
      </v-slide-x-transition>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "TopicCard",
  props: ["topic"],
  data: () => ({
    user_role: "ROLE_USER",
    admin_role: "ROLE_ADMIN",
    progressValue: 0,
    dialog: false,
    showProgressBar: false,
  }),
  created() {
    this.showProgressBar = this.role?.includes(this.user_role);
    this.progressValue =
      this.topic.topicCompletion !== 0 ? this.topic.topicCompletion * 100 : 0;
    this.showDelete = this.role?.includes(this.admin_role);
  },
  computed: {
    ...mapGetters("auth", ["role"]),
  },
  methods: {
    emitDeleteEvent() {
      this.$emit("delete-event-topic", {
        name: this.topic.topicName,
        id: this.topic.id,
      });
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
  outline: solid 1px #1f3da1;
}

.topicCardTextArea {
  font-weight: 500;
  font-size: 1.5em;
}

.deleteButtonFade-enter-active,
.deleteButtonFade-leave-active {
  transition: opacity 0.5s;
}
.deleteButtonFade-enter,
.deleteButtonFade-leave-to {
  opacity: 0;
}

.buttonDelete {
  position: absolute;
  top: 10px;
  right: 10px;
}

.progressBarArea {
  width: 50%;
  height: 30%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.progressText {
  font-size: 0.75em;
  font-weight: 700;
}
</style>
