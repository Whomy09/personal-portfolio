import { createWebHistory, createRouter } from "vue-router";

import HomePage from "@/pages/HomePage.vue";
import BlogPage from "@/pages/BlogPage.vue";
import PostDetailPage from "@/pages/PostDetailPage.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/blog",
    name: "blog",
    component: BlogPage,
  },
  {
    path: "/post-detail/:id",
    name: "post-detail",
    component: PostDetailPage,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
