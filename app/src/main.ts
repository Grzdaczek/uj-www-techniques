import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './components/App.vue'
import HomeView from './components/HomeView.vue'
import CreateView from './components/CreateView.vue'
import ResultsView from './components/ResultsView.vue'
import AnswerView from './components/AnswerView.vue'
import './style.css'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:9001/'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { name: 'home', path: '/', component: HomeView },
        { name: 'create', path: '/create', component: CreateView },
        { name: 'answer', path: '/answer/:code', component: AnswerView },
        { name: 'results', path: '/results/:code', component: ResultsView },
        { path: '/:pathMatch(.*)*', redirect: { path: '/' } },
    ],
})

const app = createApp(App)
app.use(router)
app.mount('#app')
