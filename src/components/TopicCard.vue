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

    <div class="progressBarArea" v-if="this.role[0] === this.user_role">
      <v-slide-x-transition>
        <v-progress-linear
            width="1000px"
            color="#1f3da1"
            v-model="this.progressValue"
            height="25"
            dark
            class="mt-6 rounded-pill"
            background-color="none"
        >
          <template v-slot:default="{ value }">
            <strong>{{ Math.ceil(value) }}%</strong>
          </template>
        </v-progress-linear>
      </v-slide-x-transition>
    </div>

    <div class="deleteButtonArea" v-else>
      <transition name="deleteButtonFade">
        <v-btn
          width="100%"
          color="error"
          @click.stop="handleDeleteTopicSubmit(topic.id)"
          v-if="hovered"
        >
          <v-icon> mdi-trash-can </v-icon>
          delete
        </v-btn>
      </transition>
    </div>


  </div>
</template>

<script>
import topicServices from "@/services/topic.service";
import {mapGetters} from "vuex";
export default {
  name: "TopicCard",
  props: ["topic"],
  created() {
    // this.setProgressValue();
  },
  data: () => ({
    hovered: false,
    current_user_role: this,
    user_role : "ROLE_USER",
    progressValue : 0,
  }),
  computed: {
    ...mapGetters("auth", ["role"]),
  },
  watch: {
    hovered(value) {
      if (value === true) {
        this.progressValue = this.topic.topicCompletion !== 0 ? (this.topic.topicCompletion / 1) * 100 : 0
      } else {
        this.progressValue = 0
      }
    }
  },
  methods: {
    setProgressValue() {
      this.progressValue = this.topic.topicCompletion !== 0 ? (this.topic.topicCompletion / 1) * 100 : 0
    },
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
.deleteButtonFade-enter,
.deleteButtonFade-leave-to {
  opacity: 0;
}

.deleteButtonArea {
  width: 50%;
  position: relative;
  display: flex;
  justify-content: flex-end;
  justify-self: flex-end;
}

.progressBarArea {
  width: 50%;
  position: relative;
  display: flex;
  justify-content: flex-end;
  justify-self: flex-end;
}
</style>
