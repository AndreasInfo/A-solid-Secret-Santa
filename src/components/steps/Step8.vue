<template>
  <div class="columns is-marginless has-text-centered">
    <div class="column">
      <div class="title m-3">Ist alles korrekt?</div>
      <div class="subtitle m-6">Bitte bestätige kurz deine Eingaben</div>

      <div class="columns is-centered is-mobile m-3">
        <div class="column is-narrow">
          <table class="table has-text-left">
            <tr
              v-for="(participant, index) in participants"
              :key="index + 'forParticipants'"
            >
              <td><i class="fas fa-user-check fa-lg"></i></td>
              <td>{{ participant.name }}</td>
              <td>{{ participant.mail }}</td>
            </tr>
            <tr
              v-for="(record, index) in restrictions"
              :key="index + 'forRestrictions'"
            >
              <td v-if="record.type == 'forced'">
                <i class="fas fa-gift fa-lg has-text-warning-dark"></i>
              </td>
              <td v-if="record.type == 'excluded'">
                <i class="fas fa-ban fa-lg has-text-warning-dark"></i>
              </td>
              <td colspan="2">
                {{ record.person_2 }}
                <span v-if="record.type == 'forced'">
                  beschenkt
                </span>
                <span v-if="record.type == 'excluded'">
                  beschenkt nicht
                </span>
                {{ record.person_1 }}
              </td>
            </tr>
            <tr>
              <td><i class="fas fa-euro-sign fa-lg has-text-info"></i></td>
              <td colspan="2">{{ budgetFormatted }}</td>
            </tr>
            <tr>
              <td>
                <i class="fas fa-calendar-alt fa-lg has-text-success"></i>
              </td>
              <td colspan="2">
                {{ dateFormatted }}
              </td>
            </tr>
            <tr>
              <td>
                <i class="fas fa-map-marker-alt fa-lg has-text-grey-light"></i>
              </td>
              <td colspan="2">{{ placeFormatted }}</td>
            </tr>
            <tr>
              <td>
                <i
                  class="fas fa-envelope fa-lg mt-1 mr-3 has-text-danger-dark"
                ></i>
              </td>
              <td colspan="2">{{ messageFormatted }}</td>
            </tr>
          </table>
        </div>
      </div>

      <div class="m-5">
        <input id="isValid" type="checkbox" v-model="isChecked" />
        <label for="isValid">
          Ich habe die Berechtigung meiner Wichtelfreunde erhalten, um ihnen
          über diese App Mails zu schicken.</label
        >
      </div>

      <button class="button is-danger m-3" @click="$emit('previous-page-s8')">
        <span class="icon">
          <i class="fas fa-backward fa-lg m-3"></i>
        </span>
      </button>
      <button class="button is-danger m-3" @click="nextButton()">
        <span class="icon">
          <i class="fas fa-forward fa-lg m-3"></i>
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import jQuery from "./../../../node_modules/jquery/dist/jquery.min.js";

export default {
  name: "Step8",

  data() {
    return {
      participants: [...this.$store.state.participants],
      restrictions: [...this.$store.state.restrictions],
      budget: this.$store.state.budget,
      date: this.$store.state.date,
      place: this.$store.state.place,
      message: this.$store.state.message,

      isChecked: false,
    };
  },

  computed: {
    dateFormatted: function() {
      var day = this.date.getDate();
      var month = this.date.getMonth() + 1;
      var year = this.date.getFullYear();
      return `${day}.${month}.${year}`;
    },

    budgetFormatted: function() {
      if (this.budget == "") {
        return "-";
      } else {
        return this.budget;
      }
    },

    placeFormatted: function() {
      if (this.place == "") {
        return "-";
      } else {
        return this.place;
      }
    },

    messageFormatted: function() {
      if (this.message == "") {
        return "-";
      } else {
        return this.message;
      }
    },
  },

  methods: {
    nextButton: function() {
      if (!this.isChecked) {
        let alert = {
          _title: "Sorry, hier ist ein Fehler!",
          _body: "Du musst noch bestätigen.",
          isActive: true,
          okFunction: () => {
            this.$store.commit("closeAlert");
          },
          closeFunction: () => {
            this.$store.commit("closeAlert");
          },
        };
        this.$store.commit("showAlert", alert);
      } else {
        let dialog = {
          _title: "Nur noch ein Klick.",
          _body: "Noch einmal klicken, und deine Party kann starten.",
          isActive: true,
          yesFunction: () => {
            var targetUrl =
              "https://handy-solutions.de/api/a-solid-secret-santa/send_santa";
            // var targetUrl = "http://localhost:5000/api/a-solid-secret-santa/send_santa"; //debugging only

            var targetData = {
              participants: this.participants,
              restrictions: this.restrictions,
              budget: this.budgetFormatted,
              date: this.dateFormatted,
              place: this.placeFormatted,
              message: this.messageFormatted,
              page: "A-solid-Secret-Santa",
            };

            //ajax call
            jQuery.ajax({
              type: "post",
              url: targetUrl,
              contentType: "application/json", //necessary for triggering preflight for cors
              dataType: "json",
              data: JSON.stringify(targetData),
              crossDomain: true,
              statusCode: {
                200: () => {
                  this.$store.commit("resetData");
                  this.$store.commit("closeDialog");
                  this.$emit("next-page-s8");
                },
                400: () => {
                  this.$store.commit("closeDialog");

                  let alert = {
                    _title: "Sorry, hier ist ein Fehler!",
                    _body: "Bitte kontaktiere den Administator.",
                    isActive: true,
                    okFunction: () => {
                      this.$store.commit("closeAlert");
                    },
                    closeFunction: () => {
                      this.$store.commit("closeAlert");
                    },
                  };
                  this.$store.commit("showAlert", alert);
                },
              },
              error: () => {
                this.$store.commit("closeDialog");

                let alert = {
                  _title: "Sorry, hier ist ein Fehler!",
                  _body: "Bitte überprüfe deine Internetverbindung.",
                  isActive: true,
                  okFunction: () => {
                    this.$store.commit("closeAlert");
                  },
                  closeFunction: () => {
                    this.$store.commit("closeAlert");
                  },
                };
                this.$store.commit("showAlert", alert);
              },
            });
          },
          noFunction: () => {
            this.$store.commit("closeDialog");
          },
          closeFunction: () => {
            this.$store.commit("closeDialog");
          },
        };
        this.$store.commit("showDialog", dialog);
      }
    },
  },
};
</script>

<style scoped></style>
