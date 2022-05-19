import Vue from "vue";
import VueRouter from "vue-router";
import LandingPage from "@/views/LandingPage";
import LoginPage from "@/views/LoginPage";
import RegisterPage from "@/views/RegisterPage";
import MauSignUpDuluPage from "@/views/MauSignUpDuluPage";
import HomePage from "@/views/HomePage";
import OAuth2RedirectHandler from "@/components/OAuth2RedirectHandler";
import store from "@/store";
import TopicPage from "@/views/TopicPage";
import TopicDetailPage from "@/views/TopicDetailPage";
import EditChapterDetailPage from "@/views/EditChapterDetailPage";
import ChapterDetailPage from "@/views/ChapterDetailPage";
import ChapterPreviewPage from "@/views/ChapterPreviewPage";
import QuizPage from "@/views/QuizPage";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: LandingPage,
  },
  {
    name: "Login",
    path: "/login",
    component: LoginPage,
    meta: { guest: true },
  },
  {
    name: "Register",
    path: "/register",
    component: RegisterPage,
    meta: { guest: true },
  },
  {
    path: "/mausignupdulu",
    component: MauSignUpDuluPage,
    meta: { guest: true },
  },
  {
    path: "/home",
    component: HomePage,
    meta: { requiresAuth: true },
  },
  {
    path: "/topics",
    component: TopicPage,
    meta: { requiresAuth: false },
  },
  {
    path: "/topics/:topicName",
    component: TopicDetailPage,
    meta: { requiresAuth: false },
  },
  {
    path: "/chapters/:chapterId",
    component: ChapterDetailPage,
  },
  {
    path: "/chapters/:chapterId/quiz",
    component: QuizPage,
  },
  {
    path: "/chapters/:chapterId/edit",
    component: EditChapterDetailPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/oauth2/redirect",
    component: OAuth2RedirectHandler,
    meta: { guest: true },
  },
  {
    path: "/chapter-preview",
    component: ChapterPreviewPage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  let isLoggedIn = store.getters["auth/loggedIn"];
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    console.log("to", to);
    console.log(isLoggedIn);
    if (isLoggedIn) {
      next();
    } else {
      next("/login");
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (isLoggedIn) {
      next("/");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
