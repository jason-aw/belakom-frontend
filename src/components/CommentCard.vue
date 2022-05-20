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
        <div v-if="!this.editComment">
          {{ comment.content }}
        </div>
        <div v-else-if="this.editComment">
          <v-row no-gutters>
            <v-textarea
                placeholder=comment.content
                rows="2"
                auto-grow
                v-model="editCommentContent"
            />
          </v-row>
          <v-row no-gutters>
            <v-spacer />
            <v-btn
                plain
                @click="handleCancelEdit()"
            >cancel</v-btn
            >
            <v-btn
                color="#1f3da1"
                :disabled="!editCommentContent"
                class="white--text"
                @click="handleEditComment()"
            >Edit Comment</v-btn
            >
          </v-row>
        </div>
      </v-row>
      <v-menu offset-y v-if="this.showEditMenu">
        <template v-slot:activator="{ on, attrs }">
          <v-btn id="managecommentbutton" class="menu-button" icon small v-bind="attrs" v-on="on">
            <v-icon size="20">mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list dense>
          <v-list-item @click.prevent="handleDelete()">
            <v-icon class="pr-2">mdi-delete-empty-outline</v-icon>
            <v-list-item-title>Delete</v-list-item-title>
          </v-list-item>
          <v-list-item @click.prevent="handleEdit()">
            <v-icon class="pr-2">mdi-pencil-outline</v-icon>
            <v-list-item-title>Edit</v-list-item-title>
          </v-list-item>
        </v-list>
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
      editComment: false,
      editCommentContent: null,
      item: [
        { title: "Edit" },
        { title: "Delete" },
      ]
    };
  },
  computed: {
    ...mapGetters("auth", ["userId"]),
    ...mapGetters("auth", ["role"]),
    showEditMenu() {
        if (this.role?.includes("ROLE_ADMIN")) {
          return true;
        } else if (this.role?.includes("ROLE_USER")) {
          return this.userId === this.comment.userId;
        }
      return false;
    },
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
    async handleDelete() {
      try {
        console.log("commentId ", this.comment.id);
        await commentService.deleteComment(this.comment.id);
        await this.$store.dispatch(
            "comment/getComments",
            this.comment.chapterId
        );
        this.commentContent = "";
        this.showReplySection = false;
      } catch (error) {
        console.log("delete error", error);
      }
    },
    handleEdit() {
      this.editComment = true;
      this.editCommentContent = this.comment.content
    },
    async handleEditComment() {
      console.log("edited")
      let req = {
        commentId: this.comment.id,
        content: this.editCommentContent,
      };
      try {
        await commentService.editComment(req);
        await this.$store.dispatch(
            "comment/getComments",
            this.comment.chapterId
        );
        this.editComment = false;
        this.editCommentContent = '';
      } catch (error) {
        console.log("edit error", error);
      }

    },
    handleCancelEdit() {
      this.editComment = false;
      this.editCommentContent = '';
    }
  },

};
</script>
