import { createStore } from "vuex";

export default createStore({
  state: {
    participants: [
      // { name: "Hannes" },
      // { name: "Kristin" },
      // { name: "Andreas" },
    ],
    restrictions: [],
    budget: "0.00",
    date: new Date(),
    place: "",
    message: "",

    dialog: {
      _title: "",
      _body: "",
      isActive: false,
      yesFunction: () => {},
      noFunction: () => {},
      closeFunction: () => {},
    },

    alert: {
      _title: "",
      _body: "",
      isActive: false,
      okFunction: () => {},
      closeFunction: () => {},
    },
  },

  mutations: {
    showDialog: function(state, dialog) {
      state.dialog._title = dialog._title;
      state.dialog._body = dialog._body;
      state.dialog.isActive = dialog.isActive;
      state.dialog.yesFunction = dialog.yesFunction;
      state.dialog.noFunction = dialog.noFunction;
      state.dialog.closeFunction = dialog.closeFunction;
    },

    showAlert: function(state, alert) {
      state.alert._title = alert._title;
      state.alert._body = alert._body;
      state.alert.isActive = alert.isActive;
      state.alert.okFunction = alert.okFunction;
      state.alert.closeFunction = alert.closeFunction;
    },

    closeAlert: function(state) {
      state.alert.isActive = false;
    },

    closeDialog: function(state) {
      state.dialog.isActive = false;
    },

    updateParticipants: function(state, newParticipants) {
      state.participants = newParticipants;
    },

    updateRestrictions: function(state, newRestrictions) {
      state.restrictions = newRestrictions;
    },

    updateBudget: function(state, newBudget) {
      state.budget = newBudget;
    },

    updateDate: function(state, newDate) {
      state.date = newDate;
    },

    updatePlace: function(state, newPlace) {
      state.place = newPlace;
    },

    updateMessage: function(state, newMessage) {
      state.message = newMessage;
    },

    resetData: function(state) {
      state.participants = [];
      state.restrictions = [];
      state.budget = "0.00";
      state.date = new Date();
      state.place = "";
      state.message = "";
    },

    resetRestrictions: function(state) {
      state.restrictions = [];
    },
  },
  actions: {},
  modules: {},
});
