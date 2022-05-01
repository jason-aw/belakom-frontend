<template>
  <b-container>
    <div class="title">Mau belajar apa hari ini?</div>

    <div class="row mt-md-5">
      <div
        class="col-3 mt-md-5 mb-md-5 px-3"
        v-for="topic in topicData"
        :key="topic.id"
      >
        <TopicCard :topic="topic" />
      </div>

      <div class="col-3 mt-md-5 mb-md-5">
        <b-card no-body class="createNewTopicButton">
          <b-button class="addButton" v-b-modal.createNewTopicModal>
            +
          </b-button>
        </b-card>
      </div>

      <b-modal
        id="createNewTopicModal"
        hide-footer
        centered
        size="xl"
        title="Create New Topic"
      >
        <FormulateForm
          v-model="createTopicFormValue"
          @submit="handleCreateTopicSubmit"
          class="form"
        >
          <FormulateInput
            type="text"
            name="topicName"
            label="Topic Name"
            placeholder="Topic Name"
            validation="^required"
            error-behavior="submit"
            :validation-messages="{
              required: 'Topic harus ada',
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
              required: 'Deskripsi harus ada',
            }"
          />

          <FormulateInput align="center" type="submit" label="Create Topic" />
          <b-alert fade variant="success" v-model="successCreateAlert"
            >Topic successfully added!</b-alert
          >
          <b-alert fade variant="danger" v-model="errorCreateAlert"
            >Topic failed to add!</b-alert
          >
        </FormulateForm>
      </b-modal>
    </div>
  </b-container>
</template>

<script>
import topicServices from "@/services/topic.service";
import TopicCard from "@/components/TopicCard";
import { mapGetters } from "vuex";

export default {
  components: { TopicCard },
  name: "TopicPage",

  data: () => ({
    createTopicFormValue: {},
    errorMessage: {},
    successCreateAlert: false,
    errorCreateAlert: false,
    hovered: false,
  }),
  created() {
    this.getAllTopics();
  },
  computed: {
    ...mapGetters("topic", ["topicData"]),
  },
  mounted() {
    this.$root.$on("deleteTopicEvent", () => {
      this.getAllTopics();
    });
  },
  methods: {
    getAllTopics() {
      this.$store.dispatch("topic/getAllTopics").then(
        () => {
          console.log("mak");
        },
        (error) => {
          console.log(error);
        }
      );
    },
    handleCreateTopicSubmit() {
      topicServices.createTopic(this.createTopicFormValue).then(
        (response) => {
          this.successCreateAlert = true;

          setTimeout(() => {
            this.successCreateAlert = false;
          }, 2000);

          this.getAllTopics();
          return response;
        },
        (error) => {
          this.errorCreateAlert = true;

          setTimeout(() => {
            this.errorCreateAlert = false;
          }, 2000);

          this.errorMessage = error;
        }
      );
    },
  },
};
</script>

<style scoped>
.title {
  font-size: 2.5em;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 4%;
}

.createNewTopicButton {
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-color: #ced4e8;
  min-height: 3em;
  height: 8em;
  letter-spacing: 1px;
  transition: 0.3s ease all;
  align-items: center;
  justify-content: center;
}

.addButton {
  width: 100%;
  height: 100%;
  color: #000000;
  transition: 0.3s ease all;
  background-color: #f3f3f3;
}

.addButton:hover {
  background-color: #bfbbbb;
}

</style>
