import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/font/index.css'
import './assets/iconfont/iconfont.css'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: window.sessionStorage.getItem('lang') || "zh",
  messages: {
    'zh': require("@/lang/zh.js"),
    'en': require("@/lang/en.js"),
    'ja': require("@/lang/ja.js")
  }
})
Vue.use(element)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
