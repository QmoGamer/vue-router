import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

// component
import Menu from './components/Menu.vue';
import A from './components/HelloWorld.vue';
import B from './components/HelloWorld.vue';
import Axios from './components/Axios.vue';
import Address from './components/Address.vue';

// init
Vue.use(VueRouter)

Vue.config.productionTip = false

const routes = [
  { path: '/a', component: A },
  { path: '/b', component: B },
  { path: '/axios', component: Axios },
  { path: '/address', component: Address },
  { path: '*', component: Menu }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
