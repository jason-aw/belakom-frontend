<template>
  <div>
    <v-btn
      small
      plain
      class="pl-0 mb-2"
      :ripple="false"
      @click="replySection = !replySection"
      v-if="replies.length != 0"
      >{{
        replySection
          ? replies.length == 1
            ? "hide reply"
            : `hide ${replies.length} replies`
          : replies.length == 1
          ? "show reply"
          : `show ${replies.length} replies`
      }}
      <v-icon dense v-if="!replySection">mdi-menu-down</v-icon
      ><v-icon dense v-if="replySection">mdi-menu-up</v-icon></v-btn
    >
    <v-slide-y-transition hide-on-leave>
      <div v-if="replySection && replies">
        <div v-for="reply in replies" :key="reply.id">
          <comment-card
            :comment="reply"
            :user-detail="userDetailMap"
            class="mb-2"
            v-on:delete-comment-event="openDeleteCommentDialog"
          />
        </div>
      </div>
    </v-slide-y-transition>

    <v-dialog
        transition="dialog-top-transition"
        max-width="600"
        v-model="deleteDialog"
    >
      <template>
        <v-card>
          <v-card-text class="justify-center">
            <div class="text-center text-h5 pa-5">
              Apakah anda yakin ingin menghapus komen anda?
            </div>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn
                :disabled="successDeleteAlert || errorDeleteAlert"
                @click="deleteDialog = false"
            >Cancel</v-btn
            >
            <v-btn
                color="#F51414"
                :disabled="successDeleteAlert || errorDeleteAlert"
                :dark="!successDeleteAlert && !errorDeleteAlert"
                @click.stop="handleDelete"
            >Delete</v-btn
            >
          </v-card-actions>
          <v-row class="pa-3" no-gutters>
            <v-col>
              <v-alert
                  transition="fade-transition"
                  type="success"
                  text
                  v-model="successDeleteAlert"
              >
                Komen berhasil dihapus!
              </v-alert>
              <v-alert
                  transition="fade-transition"
                  type="error"
                  text
                  v-model="errorDeleteAlert"
              >
                Komen gagal dihapus! {{ errorMessage }}!
              </v-alert>
            </v-col>
          </v-row>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script>
import CommentCard from "./CommentCard.vue";
import commentService from "@/services/comment.service";

import { mapGetters } from "vuex";
export default {
  name: "ReplySection",
  props: ["replies", "chapterId"],
  components: {
    CommentCard,
  },
  data() {
    return {
      replySection: false,
      deleteDialogId: null,
      deleteDialog: false,
      successDeleteAlert: false,
      errorDeleteAlert: false,
    };
  },
  computed: {
    ...mapGetters("comment", ["comments"]),
    userDetailMap() {
      return new Map(Object.entries(this.comments.usersMap));
    },
  },
  methods: {
    openDeleteCommentDialog(payload) {
      this.deleteDialog = true;
      this.deleteDialogId = payload.id;
      console.log("anjay")
      console.log(payload.id)
    },
    async handleDelete() {
      try {
        console.log("deleting")
        console.log("commentId ", this.deleteDialogId);
        await commentService.deleteComment(this.deleteDialogId)
            .then((response) => {
                  this.successDeleteAlert = true;
                  let deleteAlertCounter = 3;
                  const x = setInterval(() => {
                    deleteAlertCounter = deleteAlertCounter - 1;
                    if (deleteAlertCounter === 0) {
                      this.successDeleteAlert = false;
                      this.deleteDialog = false;
                      clearInterval(x);
                    }
                  }, 1000);
                  return response;
                },
                (error) => {
                  this.errorDeleteAlert = true;
                  this.errorMessage = error;

                  let deleteAlertCounter = 3;
                  const x = setInterval(() => {
                    deleteAlertCounter = deleteAlertCounter - 1;
                    if (deleteAlertCounter === 0) {
                      this.errorDeleteAlert = false;
                      clearInterval(x);
                    }
                  }, 1000);

                  return error;
                });
        await this.$store.dispatch(
            "comment/getComments",
            this.chapterId
        );
        this.commentContent = "";
        this.showReplySection = false;
      } catch (error) {
        console.log("delete error", error);
      }
    },
  }
};
</script>

<style>
</style>
