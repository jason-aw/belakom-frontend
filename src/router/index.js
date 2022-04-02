import Vue from 'vue'
import VueRouter from 'vue-router'
import LandingPage from "../components/LandingPage";
import LoginPage from "../components/LoginPage";
import RegisterPage from "../components/RegisterPage";
import MauSignUpDuluPage from "../components/MauSignUpDuluPage";

Vue.use(VueRouter)

const routes = [
    {path: '/', component: LandingPage},
    {path: '/login', component: LoginPage},
    {path: '/register', component: RegisterPage},
    {path: '/mausignupdulu', component: MauSignUpDuluPage}
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
