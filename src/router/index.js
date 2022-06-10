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
import ForgotPasswordPage from "@/views/ForgotPasswordPage";
import ResetPasswordPage from "@/views/ResetPasswordPage";
import ProfilePage from "../views/ProfilePage";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: LandingPage,
    meta: { guest: true },
  },
  {
    name: "Login",
    path: "/login",
    component: LoginPage,
    meta: { guest: true, title: "Login" },
  },
  {
    name: "Register",
    path: "/register",
    component: RegisterPage,
    meta: { guest: true, title: "Register" },
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
    path: "/profile",
    component: ProfilePage,
    meta: { requiresAuth: true },
  },
  {
    path: "/topics",
    component: TopicPage,
    meta: { requiresAuth: false, title: "Topics" },
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
  {
    name: "ForgotPassword",
    path: "/forgot-password",
    component: ForgotPasswordPage,
    meta: { guest: true, title: "Forget Password" }
  },
  {
    name: "ResetPassword",
    path: "/reset-password",
    component: ResetPasswordPage,
    meta: { guest: true, title: "Reset Password" }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = `${to.meta.title} | Belakom`;
  } else {
    document.title = "Belakom";
  }
  next();
})

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
      next("/topics");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
