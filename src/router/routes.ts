import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: () => import('../Login.vue') },
  { path: "/mfa", component: () => import('../Codigo.vue') },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;