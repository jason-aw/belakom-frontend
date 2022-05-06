<template>
  <b-container>
    <div class="title">
      {{ topicDetail.topicName }}
    </div>

    <div class="description">
      {{ topicDetail.description }}
    </div>
    <draggable :list="chapters" ghost-class="ghost" @end="onEnd">
      <transition-group type="transition" name="list">
        <div
          class="col-12 mt-md-5 mb-md-5 chapterCardGhost"
          v-for="(chapter, index) in chapters"
          :key="chapter.id"
        >
            <ChapterCard :chapter="chapter" :index="index+1"/>
        </div>
      </transition-group>
    </draggable>

    <div class="col-12 createNewChapterModal mt-md-5 mb-md-5">
      <b-card>
        <b-button v-b-modal.createNewChapterModal> + </b-button>
      </b-card>
    </div>

    <b-modal
      id="createNewChapterModal"
      hide-footer
      centered
      size="xl"
      title="Create New Chapter"
      content-class="modal-container"
      header-class="modal-header"
    >
      <template #modal-header="{ close }">
        <h5>Create New Topic</h5>
        <button @click="close">x</button>
      </template>
      <FormulateForm
        v-model="createChapterFormValue"
        @submit="handleCreateChapterSubmit"
      >
        <FormulateInput
          type="text"
          name="chapterName"
          label="Chapter Name"
          placeholder="Chapter Name"
          validation="^required"
          error-behavior="submit"
          :validation-messages="{
            required: 'Nama Chapter harus ada',
          }"
        />

        <FormulateInput
            type="checkbox"
            label="Enable Quiz"
            name="enableQuiz"
        />

        <FormulateInput
          type="textarea"
          name="description"
          label="Description"
          placeholder="Description"
          validation="^required"
          error-behavior="submit"
          :validation-messages="{
            required: 'Deskripsi harus ada',
          }"
        />

        <FormulateInput align="center" type="submit" label="Create Chapter" />
        <b-alert fade variant="success" v-model="successCreateAlert">
          Chapter successfully added!
        </b-alert>
        <b-alert fade variant="danger" v-model="errorCreateAlert">
          Chapter failed to add!
        </b-alert>
      </FormulateForm>
    </b-modal>
  </b-container>
</template>

<script>
import chapterService from "@/services/chapter.service";
import topicService from "@/services/topic.service";
import ChapterCard from "@/components/ChapterCard";
import { mapGetters } from "vuex";
import draggable from "vuedraggable";

export default {
  components: { ChapterCard, draggable },
  name: "TopicDetailPage",

  data: () => ({
    createChapterFormValue: {},
    errorMessage: {},
    successCreateAlert: false,
    errorCreateAlert: false,
    hovered: false,
  }),
  created() {
    this.getTopicDetail(this.$route.params.topicName);
  },
  computed: {
    ...mapGetters("topic", ["topicDetail"]),
    // ...mapGetters("chapter", ["chapters"]),
    chapters: {
      get() {
        return this.$store.state.chapter.chapters
      },
      set(value) {
        this.$store.commit('chapter/setChapters', value)
      }
    }
  },
  methods: {
    getTopicDetail(topicName) {
      this.$store
        .dispatch("topic/getTopicByName", { topicName: topicName })
        .then(
          () => {
            this.getAllChapters();
          },
          (error) => {
            console.log(error);
          }
        );
    },
    getAllChapters() {
      this.$store.dispatch("chapter/getAllChapters", {
        topicId: this.topicDetail.id,
      });
    },
    handleCreateChapterSubmit() {
      this.createChapterFormValue.topicId = this.topicDetail.id;

      chapterService.createChapter(this.createChapterFormValue).then(
        (response) => {
          this.getAllChapters();
          return response;
        },
        (error) => {
          return error;
        }
      );
    },
    onEnd() {
      topicService.updateTopicChapterOrder(this.$store.state.chapter.chapters).then(
          (response) => {
            console.log("updated")
            return response;
          },
          (error) => {
            return error;
          }
      );
    },
  },
  watch: {
    $route() {
      this.$store.commit("chapter/clearAllChapters");
      this.$store.commit("topic/clearTopicDetail");
    },
  },
  mounted() {
    this.$root.$on("deleteChapterEvent", () => {
      this.getAllChapters();
    });
  },
};
</script>

<style lang="scss">
.title {
  font-size: 3em;
  font-weight: bold;
  display: flex;
  justify-content: flex-start;
  padding-bottom: 0.75em;
}

.ghost {
  border-left: 6px solid #1F3DA1;
  box-shadow: 10px 10px 5px -1px rgba(0,0,0,0.14);
  opacity: 0.7;
  border-radius: 8px;
}

.list-move {
  transition: transform 0.5s
}

.description {
  font-size: 1.5em;
  display: flex;
  justify-content: flex-start;
  padding-bottom: 0.75em;
}

.chapterCardGhost-drag {
  opacity: 0;
}

.modal-container {
  font-family: "Plus Jakarta Sans", Helvetica, Arial, sans-serif;
  .modal-header {
    h5 {
      margin-bottom: 0;
    }
    button {
      border: none;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 2em;
      width: 2em;
      background: none;
      transition: all 0.2s ease;
      &:hover {
        background-color: #dbdada;
      }
      &:active {
        background-color: #acaaaa;
      }
    }
  }
}
</style>
