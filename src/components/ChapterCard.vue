<template>
  <div class="chapterCard px-3 py-3" @click.stop="goToChapterDetail(chapter.id)">
    <div class="chapterTitle">
      {{chapter.order}}. {{chapter.chapterName}}
    </div>

    <div class="chapterDescription">
      {{chapter.description}}
    </div>

    <div class="deleteButtonArea">
        <b-button class="deleteButton" @click.stop="handleDeleteChapterSubmit(chapter.id)"> delete </b-button>
    </div>
  </div>
</template>

<script>
import chapterService from '@/services/chapter.service'

export default {
  name: "ChapterCard",
  props: ["chapter"],
  methods: {
    handleDeleteChapterSubmit(id) {
      chapterService.deleteChapter(id)
          .then(response => {
                this.$root.$emit('deleteChapterEvent');
                return response;
              },
              error => {
                return error;
              })
    },
    goToChapterDetail(id) {
      this.$router.push('/chapters/' + id)
    }
  }
}
</script>

<style scoped>

.chapterCard {
  position: relative;
  display: flex;
  border-radius: 8px;
  flex-direction: column;
  background-color: #CED4E8;
  min-height: 4em;
  height: 9em;
  letter-spacing: 1px;
  transition: .3s ease all;
}

.chapterTitle {
  font-size: 1.5em;
  font-weight: bold;
}

.deleteButtonArea {
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}

.deleteButton {
  border: 0px;
  display: flex;
  align-items: center;
  width: 25%;
  background-color: #F51414;
  color: white;
  transition: all 0.4s ease;
  font-size: 12px;
}

</style>
