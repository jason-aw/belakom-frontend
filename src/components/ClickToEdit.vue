<template>
  <div
    class="content"
    @click="edit = true"
    @mouseover="showIcon = true"
    @mouseleave="showIcon = false"
  >
    <div v-if="edit" class="editable">
      <v-textarea
        auto-grow
        v-if="textarea"
        v-model="valueLocal"
        @keyup.esc="cancel"
        v-focus
      />
      <input
        type="text"
        :value="valueLocal"
        @blur="save"
        @keyup.enter="save"
        @keyup.esc="cancel"
        v-focus
        v-else
      />
      <div class="error-msg">
        {{ errorMsg }}
      </div>
      <div class="edit-actions" v-if="textarea">
        <v-btn @click.stop="handleSave" text color="#1f3da1">
          <v-icon>mdi-check</v-icon>
        </v-btn>
        <v-btn @click.stop="handleCancel" text color="red">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
    </div>
    <v-row v-else no-gutters>
      {{ valueLocal }}
      <v-icon v-if="showIcon && !edit" color="grey darken-3" dense
        >mdi-pencil-box</v-icon
      >
    </v-row>
  </div>
</template>

<script>
export default {
  props: ["value", "textarea"],
  name: "ClickToEdit",
  components: {},
  data() {
    return {
      edit: false,
      valueLocal: this.value,
      oldValue: "",
      showIcon: false,
      errorMsg: "",
    };
  },
  created() {
    this.oldValue = `${this.valueLocal}`;
  },
  methods: {
    save(event) {
      if (event.target.value) {
        this.valueLocal = event.target.value;
        this.oldValue = `${this.valueLocal}`;
        this.edit = false;
        this.$emit("input", this.valueLocal);
      } else {
        this.errorMsg = "Cannot be empty";
        setTimeout(() => {
          this.errorMsg = "";
        }, 2000);
      }
    },
    cancel(event) {
      this.valueLocal = this.oldValue;
      event.target.value = this.oldValue;
      this.edit = false;
      this.$emit("input", this.valueLocal);
    },
    handleSave() {
      if (this.valueLocal && this.valueLocal.trim()) {
        this.oldValue = `${this.valueLocal}`;
        this.edit = false;
        this.$emit("input", this.valueLocal);
      } else {
        this.errorMsg = "Cannot be empty";
        setTimeout(() => {
          this.errorMsg = "";
        }, 2000);
      }
    },
    handleCancel() {
      this.valueLocal = this.oldValue;
      this.edit = false;
      this.$emit("input", this.valueLocal);
    },
  },
  watch: {
    value() {
      this.valueLocal = this.value;
      if (this.value && this.value.trim()) {
        this.oldValue = `${this.value}`;
      }
    },
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-items: center;
  transition: 0.3s ease all;
  word-wrap: break-word;
  height: auto;
  width: 100%;
  &:hover {
    background-color: #ced4e8;
  }

  .editable {
    width: 100%;
    input {
      width: 100%;
    }
  }
  div {
    max-width: 100%;
  }
  .error-msg {
    margin: 12px 0;
    line-height: 1em;
    font-size: 1rem;
    font-weight: 700;
    color: rgb(230, 0, 0);
  }
}
</style>
