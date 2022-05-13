<template>
  <v-container class="mt-4">
    <h1>Comments</h1>
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
      <v-btn plain :disabled="commentContent ? false : true">cancel</v-btn>
      <v-btn
        color="#1f3da1"
        :disabled="commentContent ? false : true"
        class="white--text"
        >comment</v-btn
      >
    </v-row>
    <v-divider class="my-4" />
    <div>
      <v-row no-gutters v-for="comment in mainComments" :key="comment.id">
        <div>{{ comment.userId }}</div>
        <div>
          <p>{{ comment.content }}</p>
        </div>
      </v-row>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "CommentSection",
  data() {
    return {
      commentContent: "",
      mainComments: [
        {
          id: "1",
          userId: "user1",
          content: "comment1 comment1",
        },
        {
          id: "2",
          userId: "user1",
          content: "comment1 comment1",
        },
        {
          id: "3",
          userId: "user2",
          content: "comment2 comment2",
        },
        {
          id: "4",
          userId: "user3",
          content: "comment3 comment3",
        },
      ],
    };
  },
};
</script>

<style>
</style>