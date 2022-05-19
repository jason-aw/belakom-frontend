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
    <div v-if="replySection && replies">
      <div v-for="reply in replies" :key="reply.id">
        <comment-card :comment="reply" :user-detail="userDetailMap"/>
      </div>
    </div>
  </div>
</template>

<script>
import CommentCard from "./CommentCard.vue";
import {mapGetters} from "vuex";
export default {
  name: "ReplySection",
  props: ["replies"],
  components: {
    CommentCard,
  },
  data() {
    return {
      replySection: false,
    };
  },
  computed: {
    ...mapGetters("comment", ["comments"]),
    userDetailMap() {
      return new Map(Object.entries(this.comments.usersMap));
    }
  },

};
</script>

<style>
</style>
