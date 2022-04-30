<template>
  <b-container>
    <h1>{{ chapterDetail.order+'. '+ chapterDetail.chapterName }}</h1>
    <p>{{ chapterDetail.description}}</p>
    <div class="content" v-html="chapterDetail.htmlContent"></div>
  </b-container>
</template>

<script>
export default {

}
</script>

<style>

</style>