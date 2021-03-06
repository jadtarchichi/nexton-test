import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import Details from "@/views/Details.vue";

const routes = [
  {
    path: '/details/:mode/:id',
    name: 'Details',
    component: Details
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/'
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;