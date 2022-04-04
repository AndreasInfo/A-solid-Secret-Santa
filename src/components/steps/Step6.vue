<template>
  <div class="columns is-marginless has-text-centered">
    <div class="column">
      <div class="title m-3">Fehlen nur noch die Adressen!</div>
      <div class="subtitle m-6">Bitte gib valide Mailadressen ein</div>

      <div class="columns is-centered is-mobile m-3">
        <div class="column is-narrow">
          <table class="table has-text-left">
            <tr v-for="(participant, index) in participants" :key="index">
              <td class="is-vcentered">{{ participant.name }}</td>
              <td>
                <input
                  class="input"
                  v-model="participant.mail"
                  type="email"
                  placeholder="Mail"
                  maxlength="50"
                />
              </td>
            </tr>
          </table>
        </div>
      </div>

      <button class="button is-danger m-3" @click="$emit('previous-page-s6')">
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
  name: "Step6",

  data() {
    return {
      participants: [...this.$store.state.participants],
    };
  },
  methods: {
    nextButton: function() {
      //all mails in array
      var mails = this.participants.map((participant) => participant.mail);

      //undefined, if all mails valid
      var invalidMails = mails.filter((mail) => !/^\S+@\S+$/.test(mail));

      if (invalidMails.length == 0) {
        this.$store.commit("updateParticipants", this.participants);
        this.$emit("next-page-s6");
      } else {
        let alert = {
          _title: "Sorry, hier ist ein Fehler!",
          _body: "Hier stimmt etwas nicht mit den Mailadressen.",
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
    },
  },
};
</script>

<style scoped></style>
