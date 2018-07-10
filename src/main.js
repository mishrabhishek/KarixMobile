// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
require('bootstrap/dist/css/bootstrap.css')

import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  template: `<div id="app" class="container">
              <strong>Please select an option</strong>
                <ul class="select-options">
                  <li><router-link class="btn btn-primary" to="/signup">Signup</router-link></li>
                  <li><router-link class="btn btn-primary" to="/login">Signin</router-link></li>
                </ul>
                <router-view></router-view>
              </div>
  `,
}).$mount('#app');
