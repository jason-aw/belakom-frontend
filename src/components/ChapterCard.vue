<template>
  <div
    class="chapterCard px-3 py-3 my-7"
    @click.stop="goToChapterDetail(chapter.id)"
  >
    <div class="chapterTitle">
      {{ index }}. {{ chapter.chapterName }}
      <template v-if="!adminRole">
        {{ chapter.chapterCompletion * 100 }}%
      </template>
    </div>

    <div class="chapterDescription">
      {{ chapter.description }}
    </div>

    <div class="action-buttons" v-if="this.adminRole">

      <v-btn
          fab
          x-small
          color="#1f3da1"
          dark
          @click.stop="goToEditChapterDetail(chapter.id)"
      >
        <v-icon>mdi-pencil-box</v-icon>
      </v-btn>

      <v-btn
          fab
          x-small
          color="#F51414"
          class="ml-2"
          dark
          @click.stop="$emit('delete-chapter-event', {name: chapter.chapterName, id: chapter.id})"
      >
        <v-icon>mdi-trash-can</v-icon>
      </v-btn>

    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "ChapterCard",
  props: ["chapter", "index"],
  components: {},
  computed: {
    ...mapGetters("auth", ["role"]),
  },
  data: () => ({
    adminRole : null,
    successDeleteAlert : false,
    errorDeleteAlert : false,
    deleteAlertCounter : 0,
    dialog : false
  }),
  created() {
    this.adminRole = (!this.role?.includes("ROLE_USER"));
  },
  methods: {
    goToChapterDetail(id) {
      this.$router.push("/chapters/" + id);
    },
    goToEditChapterDetail(id) {
      this.$router.push("/chapters/" + id + "/edit");
    },
  },
};
</script>

<style lang="scss">
.chapterCard {
  position: relative;
  display: flex;
  border-radius: 8px;
  flex-direction: column;
  background-color: #ced4e8;
  min-height: 4em;
  height: 9em;
  letter-spacing: 1px;
  transition: 0.3s ease all;

  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06);
    outline: solid 1px #1f3da1;
  }

  .chapterTitle {
    font-size: 1.5em;
    font-weight: bold;
  }

  .action-buttons {
    display: flex;
    position: absolute;
    top: 0.75em;
    right: 0.75em;
    z-index: 99;
  }
}
</style>
