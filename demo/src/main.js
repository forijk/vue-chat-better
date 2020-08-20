import Vue from 'vue'
import App from './App.vue'
import router from './router'
import FlowChart from 'vue-flow-chart-better'
import chat from 'vue-chat-better'

Vue.use(chat)
Vue.use(FlowChart)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
