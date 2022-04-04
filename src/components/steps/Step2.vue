<template>
  <div class="columns is-marginless has-text-centered">
    <div class="column">
      <div class="title m-3">Oh je, bloß nicht wieder Helmut!</div>
      <div class="subtitle m-6">Bitte wähle deine Restriktionen (optional)</div>

      <div class="columns is-centered is-mobile m-3">
        <div class="column is-narrow">
          <div class="field">
            <div class="control">
              <div class="select m-3">
                <select v-model="person_1">
                  <option
                    v-for="(participant, index) in participants"
                    :key="index"
                    >{{ participant.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="label">
              <span v-if="switcher">
                beschenkt
                <i class="fas fa-gift fa-lg has-text-warning-dark"></i>
              </span>
              <span v-if="!switcher">
                beschenkt nicht
                <i class="fas fa-ban fa-lg has-text-warning-dark"></i>
              </span>
            </div>
            <div class="control">
              <div class="select m-3">
                <select v-model="person_2">
                  <option
                    v-for="(participant, index) in participants"
                    :key="index"
                    >{{ participant.name }}</option
                  >
                </select>
              </div>
            </div>
          </div>

          <div class="columns is-desktop is-vcentered">
            <button class="button is-danger m-3" @click="switcher = !switcher">
              <span class="icon">
                <i class="fas fa-exchange-alt fa-2x m-3"></i>
              </span>
            </button>
            <span>klick! und wähle Restriktion hier</span>
          </div>

          <div class="columns is-desktop is-vcentered">
            <button class="button is-danger m-3" @click="addRestriction">
              <span class="icon">
                <i class="fas fa-plus-square fa-2x m-3 "></i>
              </span>
            </button>
            <span>klick! und füge Restriktion hinzu</span>
          </div>
        </div>
      </div>

      <div class="columns is-centered is-mobile m-3">
        <div class="column is-narrow">
          <table class="table has-text-left">
            <tr v-for="(record, index) in restrictions" :key="index">
              <td v-if="record.type == 'forced'">
                <i class="fas fa-gift fa-lg has-text-warning-dark"></i>
              </td>
              <td v-if="record.type == 'excluded'">
                <i class="fas fa-ban fa-lg has-text-warning-dark"></i>
              </td>
              <td>
                {{ record.person_1 }}
                <span v-if="record.type == 'forced'">
                  beschenkt
                </span>
                <span v-if="record.type == 'excluded'">
                  beschenkt nicht
                </span>
                {{ record.person_2 }}
              </td>
              <td>
                <i
                  @click="removeRestriction(index)"
                  class="far fa-times-circle fa-lg has-text-danger"
                ></i>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <button class="button is-danger m-3" @click="backButton">
        <span class="icon">
          <i class="fas fa-backward fa-lg m-3"></i>
        </span>
      </button>
      <button class="button is-danger m-3" @click="nextButton">
        <span class="icon">
          <i class="fas fa-forward fa-lg m-3"></i>
        </span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Step2",

  data() {
    return {
      restrictions: [...this.$store.state.restrictions],
      participants: [...this.$store.state.participants],
      person_1: [...this.$store.state.participants][0].name,
      person_2: [...this.$store.state.participants][0].name,
      switcher: true,
    };
  },

  methods: {
    removeElement: function(array, elem) {
      var newarray = array.slice();
      var index = newarray.indexOf(elem);
      if (index > -1) {
        newarray.splice(index, 1);
      }
      return newarray;
    },

    addElement: function(array, elem) {
      var newarray = array.slice();
      var index = newarray.indexOf(elem);
      if (index == -1) {
        newarray = newarray.concat(elem);
      }
      return newarray;
    },

    shuffleSantas: function(addNew) {
      var type;
      this.switcher ? (type = "forced") : (type = "excluded");

      let names = [];
      for (let i = 0; i < this.participants.length; i++) {
        names = this.addElement(names, this.participants[i].name);
      }
      // console.log(names)

      let no_constraints = [];
      let yes_constraints = [];

      for (let i = 0; i < this.restrictions.length; i++) {
        if (this.restrictions[i].type == "excluded")
          no_constraints = this.addElement(no_constraints, {
            giver: this.restrictions[i].person_1,
            taker: this.restrictions[i].person_2,
          });
        else if (this.restrictions[i].type == "forced")
          yes_constraints = this.addElement(yes_constraints, {
            giver: this.restrictions[i].person_1,
            taker: this.restrictions[i].person_2,
          });
      }

      // add new constraint
      if (addNew) {
        if (type == "excluded")
          no_constraints = this.addElement(no_constraints, {
            giver: this.person_1,
            taker: this.person_2,
          });
        else if (type == "forced")
          yes_constraints = this.addElement(yes_constraints, {
            giver: this.person_1,
            taker: this.person_2,
          });
      }

      // console.log(yes_constraints)
      // console.log(no_constraints)

      var givers = names.slice();
      var taker_options = [];

      //no gifts to yourself
      for (let i = 0; i < givers.length; i++) {
        taker_options[i] = this.removeElement(givers, givers[i]);
      }

      //input no-constraints
      for (let i = 0; i < no_constraints.length; i++) {
        let index = givers.indexOf(no_constraints[i].giver);
        taker_options[index] = this.removeElement(
          taker_options[index],
          no_constraints[i].taker
        );
      }

      //input yes-constraints
      for (let i = 0; i < yes_constraints.length; i++) {
        let index = givers.indexOf(yes_constraints[i].giver);
        if (
          taker_options[index].length == 1 &&
          taker_options[index][0] != yes_constraints[i].taker
        ) {
          // console.log('no possible combination, please relax your constraints')
          return false;
        }
        taker_options[index] = [yes_constraints[i].taker];
        for (let j = 0; j < taker_options.length; j++) {
          if (j != index) {
            taker_options[j] = this.removeElement(
              taker_options[j],
              yes_constraints[i].taker
            );
          }
        }
      }
      // console.log(taker_options)

      var taker_options_start = taker_options.slice();
      var taker_combo = [];
      var found = true;

      for (let i = 0; i < taker_options.length; i++) {
        if (taker_options[i].length == 0) {
          return false;
        }
      }

      for (let i = 0; i < taker_options.length; i++) {
        let taker =
          taker_options[i][Math.floor(Math.random() * taker_options[i].length)];
        taker_combo[i] = taker;

        let conflict = false;
        for (let j = i; j < taker_options.length; j++) {
          taker_options[j] = this.removeElement(taker_options[j], taker);
          if (j > i && taker_options[j].length == 0) conflict = true;
        }
        if (conflict == true) {
          if (i == 0) {
            // console.log('no solution possible');
            found = false;
            break;
          }
          // put options back in
          for (let j = i + 1; j < taker_options.length; j++) {
            if (taker_options_start[j].includes(taker_combo[i])) {
              taker_options[j] = this.addElement(
                taker_options[j],
                taker_combo[i]
              );
            }
          }
          // go back one level and try next possibility
          i -= 1;
          continue;
        }
      }

      // console.log('result:')
      if (found == false) {
        // console.log('no possible combination, please relax your constraints')
        return false;
      } else {
        for (var i = 0; i < givers.length; i++) {
          // console.log(givers[i],'gives to ',taker_combo[i]);
          this.participants[i].is_santa_for = taker_combo[i];
        }
        return true;
      }
    },

    addRestriction: function() {
      var type;
      this.switcher ? (type = "forced") : (type = "excluded");
      // check if person_1 and person_2 are the same
      if (this.person_1 == this.person_2) {
        let alert = {
          _title: "Sorry, hier ist ein Fehler!",
          _body: "Sich selbst beschenken ist langweilig!",
          isActive: true,
          okFunction: () => {
            this.$store.commit("closeAlert");
          },
          closeFunction: () => {
            this.$store.commit("closeAlert");
          },
        };
        this.$store.commit("showAlert", alert);

        return;
      }

      // check if restriction already exists
      for (let i = 0; i < this.restrictions.length; i++) {
        if (
          this.restrictions[i].person_1 == this.person_1 &&
          this.restrictions[i].type == type &&
          this.restrictions[i].person_2 == this.person_2
        ) {
          let alert = {
            _title: "Sorry, hier ist ein Fehler!",
            _body: "Die gleiche Restriktion hast du schon mal eingegeben!",
            isActive: true,
            okFunction: () => {
              this.$store.commit("closeAlert");
            },
            closeFunction: () => {
              this.$store.commit("closeAlert");
            },
          };
          this.$store.commit("showAlert", alert);

          return;
        }
      }

      // check if restrictions are trivially contradictive

      for (let i = 0; i < this.restrictions.length; i++) {
        if (
          (type == "forced" &&
            this.restrictions[i].type == "forced" &&
            this.restrictions[i].person_2 == this.person_2) ||
          (this.restrictions[i].type != type &&
            this.restrictions[i].person_1 == this.person_1 &&
            this.restrictions[i].person_2 == this.person_2)
        ) {
          let alert = {
            _title: "Sorry, hier ist ein Fehler!",
            _body: "Mit dieser Restriktion wird das nix!",
            isActive: true,
            okFunction: () => {
              this.$store.commit("closeAlert");
            },
            closeFunction: () => {
              this.$store.commit("closeAlert");
            },
          };
          this.$store.commit("showAlert", alert);

          return;
        }
      }

      // console.log(this.participants)

      var success = this.shuffleSantas(true);

      //wenn nicht geht dann:
      if (!success) {
        let alert = {
          _title: "Sorry, hier ist ein Fehler!",
          _body: "Mit dieser Restriktion wird das nix!",
          isActive: true,
          okFunction: () => {
            this.$store.commit("closeAlert");
          },
          closeFunction: () => {
            this.$store.commit("closeAlert");
          },
        };
        this.$store.commit("showAlert", alert);

        return;
      }
      //wenn geht dann:
      else {
        this.restrictions.push({
          person_1: this.person_1,
          type: type,
          person_2: this.person_2,
        });
        // console.log(this.participants)
        this.$store.commit("updateRestrictions", this.restrictions);
      }
    },

    removeRestriction: function(index) {
      this.restrictions.splice(index, 1);
      this.$store.commit("updateRestrictions", this.restrictions);
    },

    nextButton: function() {
      var success = this.shuffleSantas(false);

      if (!success) {
        let alert = {
          _title: "Sorry, hier ist ein Fehler!",
          _body: "Uups, da ist was schief gegangen!",
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
        // console.log(this.participants);
        this.$emit("next-page-s2");
      }
    },

    backButton: function() {
      if (this.restrictions.length > 0) {
        let dialog = {
          _title: "Sorry, hier ist ein Fehler!",
          _body: "Alle deine Restriktionen gehen verloren.",
          isActive: true,
          yesFunction: () => {
            this.$store.commit("resetRestrictions");
            this.$store.commit("closeDialog");
            this.$emit("previous-page-s2");
          },
          noFunction: () => {
            this.$store.commit("closeDialog");
          },
          closeFunction: () => {
            this.$store.commit("closeDialog");
          },
        };
        this.$store.commit("showDialog", dialog);
      } else {
        this.$emit("previous-page-s2");
      }
    },
  },
};
</script>

<style scoped></style>
