import { createRouter, createWebHashHistory } from "vue-router";

import MainPage from "../views/MainPage.vue";
import Event from "../views/Event.vue";
import FinalPage from "../views/FinalPage.vue";

const routes = [
  {
    path: "/",
    name: "MainPage",
    component: MainPage,
  },
  {
    path: "/event",
    name: "Event",
    component: Event,
  },
  {
    path: "/final",
    name: "FinalPage",
    component: FinalPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
