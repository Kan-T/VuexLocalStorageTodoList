// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

// 1. npm install vue-router --save
// 2. import vue-router
import Router from 'vue-router'
import routes from './routes'

import Vuex from 'vuex'
import storeData from './storeData'

// 3. use vue-router
Vue.use(Router).use(Vuex)

// 4. 实例化router构造函数
const router = new Router({
    // 6. Define router detail
    routes
})

const store =  new Vuex.Store(storeData)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // 5. add router into Vue instance
  // router: router,    //In ES6, if key&value are the same, we can write as below.
  router,
  store,
  template: '<App/>',
  components: { App }
})
