<template>
  <div>
    <transition name="fade" mode="out-in">
      <component
        :is="view"
        @previous-page-s1="backToMainPage"
        @next-page-s1="updateView('Step2')"
        @previous-page-s2="updateView('Step1')"
        @next-page-s2="updateView('Step3')"
        @previous-page-s3="updateView('Step2')"
        @next-page-s3="updateView('Step4')"
        @previous-page-s4="updateView('Step3')"
        @next-page-s4="updateView('Step5')"
        @previous-page-s5="updateView('Step4')"
        @next-page-s5="updateView('Step6')"
        @previous-page-s6="updateView('Step5')"
        @next-page-s6="updateView('Step7')"
        @previous-page-s7="updateView('Step6')"
        @next-page-s7="updateView('Step8')"
        @previous-page-s8="updateView('Step7')"
        @next-page-s8="$router.replace({ name: 'FinalPage' })"
      ></component>
    </transition>
  </div>
</template>

<script>
import Step1 from "../components/steps/Step1.vue";
import Step2 from "../components/steps/Step2.vue";
import Step3 from "../components/steps/Step3.vue";
import Step4 from "../components/steps/Step4.vue";
import Step5 from "../components/steps/Step5.vue";
import Step6 from "../components/steps/Step6.vue";
import Step7 from "../components/steps/Step7.vue";
import Step8 from "../components/steps/Step8.vue";

export default {
  name: "Event",

  components: {
    Step1,
    Step2,
    Step3,
    Step4,
    Step5,
    Step6,
    Step7,
    Step8,
  },

  data() {
    return {
      view: Step1,
    };
  },

  methods: {
    updateView: function(page) {
      this.view = page;
    },

    backToMainPage: function() {
      let dialog = {
        _title: "Bist du sicher?",
        _body: "Alle deine Eingaben gehen verloren.",
        isActive: true,
        yesFunction: () => {
          this.$store.commit("closeDialog");
          this.$router.replace({ name: "MainPage" });
        },
        noFunction: () => {
          this.$store.commit("closeDialog");
        },
        closeFunction: () => {
          this.$store.commit("closeDialog");
        },
      };
      this.$store.commit("showDialog", dialog);
    },
  },

  // beforeRouteLeave: function(to, from, next) {},

  mounted: function() {
    window.addEventListener("beforeunload", (event) => {
      event.preventDefault(); // stop navigation
      event.returnValue = ""; // Chrome requires returnValue to be set
    });
  },

  unmounted: function() {
    this.$store.commit("resetData");
    window.beforeunload = null;
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
