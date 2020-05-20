import Launcher from './Launcher.vue'
import VTooltip from 'v-tooltip'

const defaultComponentName = 'vue-chat'

const Plugin = {
  install (Vue, options = {}) {
    
    if (this.installed) {
      return
    }

    this.installed = true
    this.event = new Vue()
    this.dynamicContainer = null
    this.componentName = options.componentName || defaultComponentName
    /**
     * Plugin API
     */
    Vue.prototype.$chat = {
      _setDynamicContainer (dynamicContainer) {
        Plugin.dynamicContainer = dynamicContainer
      }
    }
    
    Vue.component(this.componentName, Launcher)
    Vue.use(VTooltip)
  }
}

export default Plugin
