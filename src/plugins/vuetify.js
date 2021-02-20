import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#84a59d',
        secondary: '#f6bd60',
        error: '#f28482'
      }
    }
  }
})
