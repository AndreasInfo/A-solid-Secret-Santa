<template>
  <div class="columns is-marginless has-text-centered">
    <div class="column">
      <div class="title m-3">Wann steigt die Fete?</div>
      <div class="subtitle m-6">Bitte wähle den Zeitpunkt des Festes</div>

      <!-- stick with fucking version bulma-calendar 6.0.0 -->
      <div class="container is-inline-block m-3">
        <input id="asssCalendar" type="date" />
      </div>

      <br />

      <button class="button is-danger m-3" @click="$emit('previous-page-s4')">
        <span class="icon">
          <i class="fas fa-backward fa-lg m-3"></i>
        </span>
      </button>
      <button class="button is-danger m-3" @click="$emit('next-page-s4')">
        <span class="icon">
          <i class="fas fa-forward fa-lg m-3"></i>
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import bulmaCalendar from "./../../../node_modules/bulma-calendar/dist/js/bulma-calendar.js";

export default {
  name: "Step4",

  data() {
    return { date: this.$store.state.date };
  },

  mounted: function() {
    var options = {
      type: "date",
      color: "success",
      dateFormat: "DD-MM-YYYY",
      startDate: this.date,
      displayMode: "inline",
    };
    const calendar = bulmaCalendar.attach("#asssCalendar", options)[0];

    calendar.on("select", () => {
      //template for parent-child-two-way-data-binding
      //https://medium.com/@jithilmt/vue-js-2-two-way-data-binding-in-parent-and-child-components-1cd271c501ba
      this.$store.commit("updateDate", calendar.date.start);
    });
  },
};
</script>

<style scoped></style>
