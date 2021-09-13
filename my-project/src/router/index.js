import Vue from 'vue'
import Router from 'vue-router'
import Tutorial from '@/components/Tutorial'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Tutorial',
            component: Tutorial
        }
    ]
})