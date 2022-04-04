<template>
  <div class="columns is-marginless has-text-centered">
    <div class="column">
      <div class="title m-3">Willst du noch etwas sagen?</div>
      <div class="subtitle m-6">Bitte trage eine Nachricht ein</div>

      <div class="columns is-centered is-mobile m-3">
        <div class="column is-narrow">
          <textarea
            class="textarea has-fixed-size"
            v-model="message"
            placeholder="Nachricht"
            rows="10"
            @input="validateAndUpdateInput()"
          />
        </div>
      </div>

      <button class="button is-danger m-3" @click="$emit('previous-page-s7')">
        <span class="icon">
          <i class="fas fa-backward fa-lg m-3"></i>
        </span>
      </button>
      <button class="button is-danger m-3" @click="$emit('next-page-s7')">
        <span class="icon">
          <i class="fas fa-forward fa-lg m-3"></i>
        </span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Step7",

  data() {
    return {
      previousInput: this.$store.state.message,
      message: this.$store.state.message,
    };
  },

  methods: {
    validateAndUpdateInput: function() {
      if (!/^.{0,400}?$/.test(this.message)) {
        this.message = this.previousInput;
      } else {
        this.previousInput = this.message;
        this.$store.commit("updateMessage", this.message);
      }
    },
  },
};
</script>

<style scoped></style>
