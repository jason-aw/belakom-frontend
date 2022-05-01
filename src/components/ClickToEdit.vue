<template>
  <!-- @blur="save"
        @keyup.esc="cancel" -->
  <div
    class="content"
    @click="edit = true"
    @mouseover="showIcon = true"
    @mouseleave="showIcon = false"
  >
    <div v-if="edit" class="editable">
      <b-form-textarea
        rows="5"
        v-if="textarea"
        v-model="valueLocal"
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
      <div class="edit-actions" v-if="textarea">
        <b-icon-check class="confirm-icon" @click.stop="handleSave"></b-icon-check>
        <b-icon-x class="cancel-icon" @click.stop="handleCancel"></b-icon-x>
      </div>
    </div>
    <div v-else>
      {{ valueLocal }}
    </div>
    <b-icon-pencil-square
      class="edit-icon"
      v-if="showIcon && !edit"
    ></b-icon-pencil-square>
  </div>
</template>

<script>
import { BIconPencilSquare, BIconCheck, BIconX } from "bootstrap-vue";
export default {
  props: ["value", "textarea"],
  name: "ClickToEdit",
  components: {
    BIconPencilSquare,
    BIconCheck,
    BIconX,
  },
  data() {
    return {
      edit: false,
      valueLocal: this.value,
      oldValue: `${this.value}`,
      showIcon: false,
    };
  },
  methods: {
    save(event) {
      this.valueLocal = event.target.value;
      this.oldValue = `${this.valueLocal}`;
      this.edit = false;
      this.$emit("input", this.valueLocal);
    },
    cancel(event) {
      this.valueLocal = this.oldValue;
      event.target.value = this.oldValue;
      this.edit = false;
      this.$emit("input", this.valueLocal);
    },
    handleSave() {
      this.oldValue = `${this.valueLocal}`;
      this.edit = false;
      this.$emit("input", this.valueLocal);
    },
    handleCancel() {
      console.log("valueLocal, oldValue", this.valueLocal, this.oldValue)
      this.valueLocal = this.oldValue;
      this.edit = false;
      this.$emit("input", this.valueLocal);
    }
  },
  watch: {
    value() {
      this.valueLocal = this.value;
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
  align-items: center;
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
  .edit-actions {
    display: flex;
    justify-content: flex-end;
    height: auto;
    .confirm-icon, .cancel-icon {
      height: 28px;
      width: auto;
      transition: 0.3s ease all;
      &:hover {
        color: white;
      }
    }
    .confirm-icon:hover {
      background-color: rgb(31, 61, 161);
    }
    .cancel-icon:hover {
      background-color: rgb(230, 0, 0);
    }
  }
  .edit-icon {
    height: 16px;
    width: auto;
  }
}
</style>