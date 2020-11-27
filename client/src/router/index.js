import Vue from "vue";
import Router from "vue-router";

import { initCurrentUserStateMiddleware } from "./middlewares";
import { routes } from "./routes";

Vue.use(Router);

const router = new Router({
  linkActiveClass: "is-active",
  linkExactActiveClass: "nav-item active",
  // mode: "history",
  routes
});

router.beforeEach(initCurrentUserStateMiddleware);
// router.beforeEach(checkAccessMiddleware)
// router.beforeEach(setPageTitleMiddleware)

export default router;
