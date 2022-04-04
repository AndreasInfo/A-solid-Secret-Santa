<template>
  <div class="columns is-marginless has-text-centered">
    <div class="column">
      <div class="title m-3">Wer wichtelt mit?</div>
      <div class="subtitle m-6">Bitte wähle deine Teilnehmer</div>

      <div class="columns is-centered is-mobile m-3">
        <div class="column is-narrow">
          <form @submit.prevent="addParticipant()">
            <div class="field has-addons">
              <div class="control">
                <input
                  class="input"
                  v-model="newParticipant"
                  type="text"
                  placeholder="Neuer Teilnehmer"
                  maxlength="15"
                />
              </div>
              <div class="control">
                <button class="button is-danger">
                  <span class="icon">
                    <i class="fas fa-user-plus fa-lg"></i>
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div class="columns is-centered is-mobile m-3">
        <div class="column is-narrow">
          <table class="table has-text-left">
            <tr v-for="(participant, index) in participants" :key="index">
              <td><i class="fas fa-user-check fa-lg"></i></td>
              <td>{{ participant.name }}</td>
              <td>
                <i
                  @click="removeParticipant(index)"
                  class="far fa-times-circle fa-lg has-text-danger"
                ></i>
              </td>
            </tr>
          </table>
        </div>
      </div>

      <button class="button is-danger m-3" @click="backButton()">
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
export default {
  name: "Step1",

  data() {
    return {
      newParticipant: "",
      participants: [...this.$store.state.participants], //spread syntax for copying iterable object
    };
  },

  methods: {
    addParticipant: function () {
      //no input
      if (this.newParticipant == "") {
        let alert = {
          _title: "Sorry, hier ist ein Fehler!",
          _body: "Du hast keinen Teilnehmer eingegeben.",
          isActive: true,
          okFunction: () => {
            this.$store.commit("closeAlert");
          },
          closeFunction: () => {
            this.$store.commit("closeAlert");
          },
        };
        this.$store.commit("showAlert", alert);
      }
      //input already exists
      else if (
        this.participants.map((e) => e.name).indexOf(this.newParticipant) != -1
      ) {
        let alert = {
          _title: "Sorry, hier ist ein Fehler!",
          _body: "Nope, diesen Teilnehmer gibt es schon.",
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
        this.participants.push({ name: this.newParticipant });
        this.$store.commit("updateParticipants", this.participants);
        this.newParticipant = "";
      }
    },

    removeParticipant: function (index) {
      this.participants.splice(index, 1);
      this.$store.commit("updateParticipants", this.participants);
    },

    backButton: function () {
      this.$emit("previous-page-s1");
    },

    nextButton: function () {
      if (this.participants.length < 3) {
        var alert = {
          _title: "Sorry, hier ist ein Fehler!",
          _body: "Du brauchst mindestens 3 Teilnehmer.",
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
        this.$emit("next-page-s1");
      }
    },
  },
};
</script>

<style scoped></style>
