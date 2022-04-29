<template>

<div>
  <b-container>

    <div class="title">
      {{topicDetail.topicName}}
    </div>

    <div class="description">
      {{topicDetail.description}}
    </div>

    <div class="col-12 mt-md-5 mb-md-5 " v-for="chapter in chapters" :key="chapter.id">

      <ChapterCard :chapter="chapter">
      </ChapterCard>

    </div>

    <div class="col-12 createNewChapterModal mt-md-5 mb-md-5">
      <b-card>
        <b-button v-b-modal.createNewChapterModal> + </b-button>
      </b-card>
    </div>

    <b-modal id="createNewChapterModal" hide-footer centered size="xl" title="Create New Chapter">
      <FormulateForm v-model="createChapterFormValue" @submit="handleCreateChapterSubmit" class="form">
        <FormulateInput
            type="text"
            name="chapterName"
            label="Chapter Name"
            placeholder="Chapter Name"
            validation="^required"
            error-behavior="submit"
            :validation-messages="{
            required: 'Nama Chapter harus ada'
          }"
        />

        <FormulateInput
            type="text"
            name="order"
            label="Urutan"
            placeholder=""
            validation="^required|number"
            error-behavior="submit"
            :validation-messages="{
            required: 'Nama Chapter harus ada',
            number: 'input harus berupa angka'
          }"
        />

        <FormulateInput
            type="textarea"
            name="description"
            label="Description"
            placeholder="Description"
            validation="^required"
            error-behavior="submit"
            :validation-messages="{
            required: 'Deskripsi harus ada'
          }"
        />

        <FormulateInput align="center" type="submit" label="Create Chapter" />
        <b-alert fade variant="success" v-model="successCreateAlert">Chapter successfully added!</b-alert>
        <b-alert fade variant="danger" v-model="errorCreateAlert">Chapter failed to add!</b-alert>
      </FormulateForm>
    </b-modal>

  </b-container>
</div>



</template>

<script>
import chapterService from '@/services/chapter.service'
import ChapterCard from "./ChapterCard";
import {mapGetters} from "vuex";

export default {
  components: { ChapterCard },
  name: "TopicDetailPage",

  data: () => ({
    createChapterFormValue: {},
    errorMessage: {},
    successCreateAlert: false,
    errorCreateAlert: false,
    hovered: false
  }),
  created() {
    this.getTopicDetail(this.$route.params.topicName)
  },
  computed: {
    ...mapGetters('topic', ['topicDetail']),
    ...mapGetters('chapter', ['chapters'])
  },
  methods: {
    getTopicDetail(topicName) {
      this.$store.dispatch("topic/getTopicByName", {topicName: topicName}).then(
          () => {
            console.log("mak")
            this.getAllChapters()
          },
          (error) => {
            console.log(error);
          }
      );
    },
    getAllChapters() {
      this.$store.dispatch("chapter/getAllChapters", {topicId: this.topicDetail.id})
    },
    handleCreateChapterSubmit() {
      this.createChapterFormValue.topicId = this.topicDetail.id

      chapterService.createChapter(this.createChapterFormValue)
          .then(response => {
            this.getAllChapters();
            return response;
          },
          error => {
            return error;
          })

    }
  },
  watch:{
    $route (){
      this.$store.commit("chapter/clearAllChapters");
      this.$store.commit("topic/clearTopicDetail");
    }
  },
  mounted() {
    this.$root.$on('deleteChapterEvent', () => {
      this.getAllChapters();
    })
  },

}
</script>

<style scoped>

.title {
  font-size: 3em;
  font-weight: bold;
  display: flex;
  justify-content: flex-start;
  padding-bottom: 0.75em;
}

.description {
  font-size: 1.5em;
  display: flex;
  justify-content: flex-start;
  padding-bottom: 0.75em;
}

</style>
