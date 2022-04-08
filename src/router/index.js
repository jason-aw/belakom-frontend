import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store';
import LandingPage from "../components/LandingPage";
import LoginPage from "../components/LoginPage";
import RegisterPage from "../components/RegisterPage";
import MauSignUpDuluPage from "../components/MauSignUpDuluPage";
import HomePage from "../components/HomePage";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: LandingPage,
        meta: { guest: true }
    },
    {
        path: '/login',
        component: LoginPage,
        meta: { guest: true }
    },
    {
        path: '/register',
        component: RegisterPage,
        meta: { guest: true }
    },
    {
        path: '/mausignupdulu',
        component: MauSignUpDuluPage,
        meta: { guest: true }
    },
    {
        path: '/home',
        component: HomePage,
        meta: { requiresAuth: true }
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        console.log("checking for auth page, authentication is " + store.getters.isAuthenticated)
        if (store.getters.isAuthenticated) {
            next();
            return;
        }
        next("/login");
    } else {
        next();
    }
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.guest)) {
        console.log("checking for guest page, authentication is " + store.getters.isAuthenticated)
        if (store.getters.isAuthenticated) {
            next("/home");
            return;
        }
        next();
    } else {
        next();
    }
});

export default router;
