<template>
  <div
    class="topicCard"
    @click.stop="goToTopicDetail(topic.topicName)"
  >

    <v-dialog
        transition="dialog-top-transition"
        max-width="600"
        persistent
        v-model="dialog"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            fab
            x-small
            color="#F51414"
            dark
            class="buttonDelete"
            v-if="!showProgressBar"
            v-bind="attrs"
            v-on="on"
        >
          <v-icon>mdi-trash-can</v-icon>
        </v-btn>
      </template>
      <template v-slot:default="dialog">
        <v-card>
          <v-card-text class="justify-center">
            <div class="text-center text-h5 pa-5">
              Apakah anda yakin ingin menghapus topic
              <span
                  style="font-weight: bold"> {{ topic.topicName }}
              </span>
              ?
            </div>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn
                @click="dialog.value = false"
            >Cancel</v-btn>
            <v-btn
                color="#F51414"
                dark
                @click="handleDeleteTopicSubmit(topic.id)"
            >Delete</v-btn>
          </v-card-actions>
          <v-row class="pa-3" no-gutters>
            <v-col>
              <v-alert
                  transition="fade-transition"
                  type="success"
                  text
                  v-model="successDeleteAlert"
              >
                Topic berhasil dihapus! Notifikasi akan ditutup dalam {{deleteAlertCounter}}!
              </v-alert>
              <v-alert
                  transition="fade-transition"
                  type="success"
                  text
                  v-model="errorDeleteAlert"
              >
                Topic gagal dihapus! {{errorMessage}} Notifikasi akan ditutup dalam {{deleteAlertCounter}}!
              </v-alert>
            </v-col>
          </v-row>
        </v-card>
      </template>
    </v-dialog>

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
import topicServices from "@/services/topic.service";
import { mapGetters } from "vuex";
export default {
  name: "TopicCard",
  props: ["topic"],
  data: () => ({
    user_role: "ROLE_USER",
    progressValue: 0,
    dialog: false,
    showProgressBar: false,
    successDeleteAlert: false,
    errorDeleteAlert: false,
    deleteAlertCounter: 0,
    disableDeleteDialogButton: false
  }),
  created() {
    this.showProgressBar = this.role?.includes(this.user_role);
    this.progressValue =
      this.topic.topicCompletion !== 0 ? this.topic.topicCompletion * 100 : 0;
  },
  computed: {
    ...mapGetters("auth", ["role"]),
  },
  methods: {
    handleDeleteTopicSubmit(id) {
      topicServices.deleteTopic(id).then(
        (response) => {
          console.log("deleted tpi tungu")
          this.successDeleteAlert = true;
          this.deleteAlertCounter = 5;
          const x = setInterval(() => {
            this.deleteAlertCounter  = this.deleteAlertCounter  - 1;
            if (this.deleteAlertCounter === 0) {
              clearInterval(x)
              this.$root.$emit("deleteTopicEvent");
            }
          }, 1000)
          return response;
        },
        (error) => {
          this.errorMessage = error;

          this.deleteAlertCounter = 5;
          const x = setInterval(() => {
            this.deleteAlertCounter  = this.deleteAlertCounter  - 1;
            if (this.deleteAlertCounter === 0) {
              clearInterval(x)
              this.$root.$emit("deleteTopicEvent");
            }
          }, 1000)
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
