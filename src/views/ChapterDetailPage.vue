<template>
  <b-container>
    <h1>{{ chapterDetail.order+'. '+ chapterDetail.chapterName }}</h1>
    <p>{{ chapterDetail.description}}</p>
    <div class="content" v-html="chapterDetail.htmlContent"></div>
  </b-container>
</template>

<script>
import chapterService from '@/services/chapter.service';
export default {
  name: "ChapterDetailPage",
  data() {
    return {
      chapterDetail: {},
    };
  },
  created() {
    this.getChapterDetail(this.$route.params.chapterId);
  },
  methods: {
    getChapterDetail(chapterId) {
      chapterService.getChapterById(chapterId)
        .then((response) => (this.chapterDetail = Object.assign({}, response)))
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style>
</style>