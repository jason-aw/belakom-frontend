<template>
  <div class="mt-4">
    <h1>Comments</h1>
    <div v-if="loggedIn">
      <v-row no-gutters>
        <v-textarea
          placeholder="Add a comment..."
          rows="2"
          auto-grow
          v-model="commentContent"
        />
      </v-row>
      <v-row no-gutters>
        <v-spacer />
        <v-btn
          plain
          :disabled="commentContent ? false : true"
          @click="commentContent = ''"
          >cancel</v-btn
        >
        <v-btn
          color="#1f3da1"
          :disabled="commentContent ? false : true"
          class="white--text"
          @click="handleComment"
          >comment</v-btn
        >
      </v-row>
    </div>
    <div v-else class="d-flex justify-center font-italic">
      Login to leave a comment!
    </div>
    <v-divider class="my-4" />
    <div>
      <div v-for="comment in comments.mainComments" :key="comment.id">
        <div class="mb-4">
          <comment-card :comment="comment" />
          <reply-section :replies="comments.commentRepliesMap[comment.id]" />
        </div>
      </div>
    </div>
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
    };
  },
  computed: {
    ...mapGetters("comment", ["comments"]),
    ...mapGetters("auth", ["loggedIn"]),
  },
  methods: {
    async handleComment() {
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
  },
};
</script>

<style>
</style>