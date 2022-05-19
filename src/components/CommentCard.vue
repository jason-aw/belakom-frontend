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
          {{this.userDetail.get(comment.userId).name}}
        </div>
        <div>
          {{ comment.content }}
        </div>
      </v-row>
      <v-menu offset-y>
        <v-btn class="menu-button" icon small v-if="this.showEdit"
          ><v-icon size="20">mdi-dots-vertical</v-icon></v-btn
        >
      </v-menu>

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
            @click="handleCreateComment"
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
import {mapGetters} from "vuex";

export default {
  name: "CommentCard",
  props: ["comment", "userDetail"],
  data() {
    return {
      showReplySection: false,
      commentContent: "",
      hovered: false,
      replyHovered: false,
    };
  },
  computed: {
    ...mapGetters("auth", ["userId"]),
    ...mapGetters("auth", ["role"]),
    showEdit() {
      if (this.role?.includes("ROLE_ADMIN")) {
        return true;
      } else if (this.role?.includes("ROLE_USER")) {
        return this.hovered && this.userId === this.comment.userId;
      }
      return false;
    }
  },
  methods: {
    async handleCreateComment() {
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
