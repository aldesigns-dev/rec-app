// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'

const customLightTheme = {
  light: true,
  colors: {
    background: '#FFFFFF',
    surface: '#f1f2f3',
    'surface-variant': '#e4e5e6',
    primary: '#00aaa0',
    secondary: '#141B1F',
  },
};

const customDarkTheme = {
  dark: true,
  colors: {
    background: '#141B1F',
    surface: '#2e3d46',
    'surface-variant': '#475965',
    primary: '#00aaa0',
    secondary: '#FFFFFF',
  },
};

export default createVuetify({
  theme: {
    defaultTheme: "customLightTheme",
    themes: {
      customLightTheme,
      customDarkTheme,
    },
  },
});