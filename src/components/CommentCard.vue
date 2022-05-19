<template>
  <div :class="comment.parentCommentId ? 'pl-6' : ''">
    <div
      class="d-flex rounded"
      @mouseover="hovered = true"
      @mouseleave="hovered = false"
      :class="hovered ? 'grey lighten-5' : ''"
    >
      <v-row no-gutters class="flex-column">
        <div class="font-weight-bold">
          {{ comment.userId }}
        </div>
        <div>
          {{ comment.content }}
        </div>
      </v-row>
      <v-btn class="menu-button" icon small v-if="hovered"
        ><v-icon size="20">mdi-dots-vertical</v-icon></v-btn
      >
    </div>
    <v-row no-gutters>
      <v-btn
        plain
        small
        class="pl-0"
        :ripple="false"
        v-if="!showReplySection"
        @click="showReplySection = !showReplySection"
      >
        reply
      </v-btn>
      <v-row no-gutters v-if="showReplySection" class="d-flex flex-column pl-6">
        <v-textarea
          placeholder="Reply..."
          rows="2"
          auto-grow
          v-model="commentContent"
          class="mt-0"
        />
        <v-row no-gutters>
          <v-spacer />
          <v-btn plain @click="showReplySection = false" small :ripple="false"
            >Cancel</v-btn
          >
          <v-btn
            color="#1f3da1"
            :disabled="commentContent ? false : true"
            class="white--text ml-2"
            @click="handleComment"
            small
            >Reply</v-btn
          >
        </v-row>
      </v-row>
    </v-row>
  </div>
</template>

<script>
import commentService from "@/services/comment.service";

export default {
  name: "CommentCard",
  props: ["comment"],
  data() {
    return {
      showReplySection: false,
      commentContent: "",
      hovered: false,
      replyHovered: false,
    };
  },
  methods: {
    async handleComment() {
      let req = {
        chapterId: this.comment.chapterId,
        content: this.commentContent,
        parentCommentId: this.comment.parentCommentId
          ? this.comment.parentCommentId
          : this.comment.id,
      };
      try {
        console.log("comment:", this.comment);
        await commentService.createComment(req);
        await this.$store.dispatch(
          "comment/getComments",
          this.comment.chapterId
        );
        this.commentContent = "";
        this.showReplySection = false;
      } catch (error) {
        console.log("createComment error", error);
      }
    },
  },
};
</script>