import Vue from 'vue'
import VueRouter from 'vue-router'
import LandingPage from "../components/LandingPage"
import LoginPage from "../components/LoginPage"
import RegisterPage from "../components/RegisterPage"
import MauSignUpDuluPage from "../components/MauSignUpDuluPage"
import HomePage from "../components/HomePage"
import OAuth2RedirectHandler from "../components/OAuth2RedirectHandler"
import store from '@/store'
import TopicPage from "../components/TopicPage"
import TopicDetailPage from "../components/TopicDetailPage"
import EditChapterDetailPage from "../components/EditChapterDetailPage"

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		component: LandingPage
	},
	{
		name: "Login",
		path: '/login',
		component: LoginPage,
		meta: { guest: true }
	},
	{
		name: "Register",
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
	},
	{
		path: '/topics',
		component: TopicPage,
		meta: { requiresAuth: false }
	},
	{
		path: '/topics/:topicName',
		component: TopicDetailPage,
		meta: { requiresAuth: false }
	},
	{
		path: '/chapters/:chapterId',
		component: EditChapterDetailPage,
		meta: { requiresAuth: true }
	},
	{
		path: '/oauth2/redirect',
		component: OAuth2RedirectHandler
	},
]

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
})

router.beforeEach((to, from, next) => {
	let isLoggedIn = store.state.auth.status.loggedIn
	if (to.matched.some((record) => record.meta.requiresAuth)) {
		if (isLoggedIn) {
			next()
		} else {
			next("/login")
		}
	} else if (to.matched.some((record) => record.meta.guest)) {
		if (isLoggedIn) {
			next("/home")
		} else {
			next()
		}
	} else {
		next()
	}
})

export default router
