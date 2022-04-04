<template>
  <div class="columns is-marginless has-text-centered">
    <div class="column">
      <div class="title m-3">Wie viel darf es kosten?</div>
      <div class="subtitle m-6">Bitte wähle das Budget</div>

      <div class="columns is-centered is-mobile m-3">
        <div class="column is-narrow">
          <div class="field has-addons">
            <div class="control">
              <i class="fas fa-euro-sign fa-2x mt-1 mr-3 has-text-info"></i>
            </div>
            <div class="control">
              <input
                class="input"
                v-model="budget"
                type="text"
                placeholder="Budget"
                @input="validateAndUpdateInput()"
              />
            </div>
            <div class="control">
              <button
                class="button is-danger"
                @mousedown="incrementDecrementStart(1)"
                @mouseup="incrementDecrementStop()"
              >
                <span class="icon">
                  <i class="fas fa-plus-square fa-lg"></i
                ></span>
              </button>
            </div>
            <div class="control">
              <button
                class="button is-danger"
                @mousedown="incrementDecrementStart(-1)"
                @mouseup="incrementDecrementStop()"
              >
                <span class="icon">
                  <i class="fas fa-minus-square fa-lg"></i>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <button class="button is-danger m-3" @click="$emit('previous-page-s3')">
        <span class="icon">
          <i class="fas fa-backward fa-lg m-3"></i>
        </span>
      </button>
      <button class="button is-danger m-3" @click="$emit('next-page-s3')">
        <span class="icon">
          <i class="fas fa-forward fa-lg m-3"></i>
        </span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Step3",

  data() {
    return {
      interval: false,
      previousInput: this.$store.state.budget,
      budget: this.$store.state.budget,
    };
  },

  methods: {
    validateAndUpdateInput: function() {
      if (!/^-?([0]?|[1-9]{1}\d{0,15})([.]{1}\d{0,2})?$/.test(this.budget)) {
        this.budget = this.previousInput;
        //alert("Das ist kein gültiger Geldbetrag!");
      } else {
        this.previousInput = this.budget;
        this.$store.commit("updateBudget", this.budget);
      }
    },

    incrementDecrementStart: function(step) {
      this.incrementDecrementStep(step);

      if (!this.interval) {
        this.interval = setInterval(() => {
          this.incrementDecrementStep(step);
        }, 250);
      }
    },

    incrementDecrementStop: function() {
      clearInterval(this.interval);
      this.interval = false;
    },

    incrementDecrementStep: function(step) {
      if (isNaN(this.budget)) {
        this.budget = 0;
      }

      this.budget = (parseFloat(this.budget.replace(",", ".")) + step)
        .toFixed(2)
        .toString();
      this.validateAndUpdateInput();
    },
  },
};
</script>

<style scoped>
input {
  max-width: 150px;
}
</style>
