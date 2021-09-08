import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import Details from "@/views/Details.vue";

const routes = [
  {
    path: "/details/:id/:mode",
    name: "Details",
    component: Details
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;