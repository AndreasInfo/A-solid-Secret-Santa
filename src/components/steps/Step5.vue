<template>
  <div class="columns is-marginless has-text-centered">
    <div class="column">
      <div class="title m-3">Wo soll Rudolph die Geschenke hinbringen?</div>
      <div class="subtitle m-6">Bitte gib den Ort des Festes ein</div>

      <div class="columns is-centered is-mobile m-3">
        <div class="column is-narrow">
          <div class="field has-addons">
            <div class="control">
              <i
                class="fas fa-map-marker-alt fa-2x mt-1 mr-3 has-text-grey-light"
              ></i>
            </div>
            <div class="control">
              <input
                class="input"
                v-model="place"
                type="text"
                placeholder="Ort"
                @input="validateAndUpdateInput()"
              />
            </div>
          </div>
        </div>
      </div>

      <button class="button is-danger m-3" @click="$emit('previous-page-s5')">
        <span class="icon">
          <i class="fas fa-backward fa-lg m-3"></i>
        </span>
      </button>
      <button class="button is-danger m-3" @click="$emit('next-page-s5')">
        <span class="icon">
          <i class="fas fa-forward fa-lg m-3"></i>
        </span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Step5",

  data() {
    return {
      previousInput: this.$store.state.place,
      place: this.$store.state.place,
    };
  },

  methods: {
    validateAndUpdateInput: function() {
      if (!/^.{0,50}?$/.test(this.place)) {
        this.place = this.previousInput;
      } else {
        this.previousInput = this.place;
        this.$store.commit("updatePlace", this.place);
      }
    },
  },
};
</script>

<style scoped></style>
