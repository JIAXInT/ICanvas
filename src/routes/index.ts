import { createWebHistory, createRouter } from "vue-router";

import Home from "../views/Home.vue";
import Editor from "../views/Editor.vue";
import templateDetail from "../views/TemplateDetail.vue";
import Index from "../views/Index.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "index",
      component: Index,
      children: [
        {
          path: "",
          name: "home",
          component: Home,
        },
        {
          path: "template/:id",
          name: "template",
          component: templateDetail,
        },
      ],
    },
    {
      path: "/editor",
      name: "editor",
      component: Editor,
    },
  ],
});

export default router;
