import Vue from 'vue'
import Router from 'vue-router'
import Tutorial from '@/components/Tutorial'
import Signup from '@/components/Signup'
import Signin from '@/components/Signin'
import { getAuth, onAuthStateChanged } from "firebase/auth";


Vue.use(Router)

let router = new Router({
    routes: [
        {
            path: '*',
            redirect: 'signin'
        },
        {
            path: '/',
            name: 'Tutorial',
            component: Tutorial,
            meta: { requiresAuth: true }
        },
        {
            path: '/signup',
            name: 'Signup',
            component: Signup
        },
        {
            path: '/signin',
            name: 'Signin',
            component: Signin
        }
    ]
})

router.beforeEach((to, from, next) => {
    //console.log("kiteru");
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    if (requiresAuth) {
        // このルートはログインされているかどうか認証が必要です。
        // もしされていないならば、ログインページにリダイレクトします。
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                next()
            } else {
                next({
                    path: '/signin',
                    query: { redirect: to.fullPath }
                })
            }
        })

    } else {
        next() // next() を常に呼び出すようにしてください!
    }
})

export default router
