<template>
  <div class="mt-4">
    <h1>Komentar</h1>
    <div v-if="loggedIn">
      <v-row no-gutters>
        <v-textarea
          placeholder="Tambahkan komentar..."
          rows="2"
          auto-grow
          v-model="commentContent"
        />
      </v-row>
      <v-row no-gutters>
        <v-spacer />
        <v-btn plain :disabled="!commentContent" @click="commentContent = ''"
          >cancel</v-btn
        >
        <v-btn
          color="#1f3da1"
          :disabled="!commentContent"
          class="white--text"
          @click="handleCreateComment()"
          >comment</v-btn
        >
      </v-row>
    </div>
    <div v-else class="d-flex justify-center font-italic">
      Masuk untuk meninggalkan komentar!
    </div>
    <v-divider class="my-4" />
    <div v-if="comments.mainComments.length != 0">
      <div v-for="comment in comments.mainComments" :key="comment.id">
        <div class="mb-4">
          <comment-card :comment="comment" :user-detail="userDetailMap" v-on:delete-comment-event="openDeleteCommentDialog"/>
          <reply-section :replies="comments.commentRepliesMap[comment.id]" :chapterId=chapterId />
        </div>
      </div>
    </div>
    <div v-else class="d-flex justify-center font-italic">
      Masih belum ada komentar...
    </div>

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
import ReplySection from "./ReplySection.vue";
import commentService from "@/services/comment.service";
import { mapGetters } from "vuex";

export default {
  name: "CommentSection",
  components: {
    CommentCard,
    ReplySection,
  },
  props: ["chapterId"],
  data() {
    return {
      commentContent: "",
      deleteDialog: false,
      successDeleteAlert: false,
      errorDeleteAlert: false,
      deleteDialogId: null,
      errorMessage: null
    };
  },
  computed: {
    ...mapGetters("comment", ["comments"]),
    ...mapGetters("auth", ["loggedIn"]),
    userDetailMap() {
      return new Map(Object.entries(this.comments.usersMap));
    },
  },
  methods: {
    async handleCreateComment() {
      let req = {
        chapterId: this.chapterId,
        content: this.commentContent,
      };
      try {
        await commentService.createComment(req);
        await this.$store.dispatch("comment/getComments", this.chapterId);
        this.commentContent = "";
      } catch (error) {
        console.log("createComment error", error);
      }
    },
    openDeleteCommentDialog(payload) {
      this.deleteDialog = true;
      this.deleteDialogId = payload.id;
    },
    async handleDelete() {
      try {
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
  },
};
</script>

<style>
</style>
