// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'

export default createVuetify({
  // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
  theme: {
    defaultTheme: 'myCustomTheme',
    themes: {
      myCustomTheme: {
        dark: false,
        colors: {
          background: '#ffffff',
          'rec-grey': '#f2f3f4',
          'rec-primary': '#141B1F',
          'rec-secondary': '#00aaa0'
        }
      }
    }
  }
})
