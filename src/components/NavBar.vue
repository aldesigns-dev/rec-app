<template>
  <nav>
    <v-app-bar :elevation="3">
      <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <img :src="require('@/assets/rec-logo-icon-left-light.png')" alt="Real Estate Care logo" class="rec-logo-light">
      <v-spacer></v-spacer>
      <v-btn v-if="isUserLoggedIn" icon :to="'/instellingen'">
        <v-avatar>
          <template v-if="hasAvatar">
            <img :src="userAvatar" alt="avatar" class="user-img">
          </template>
          <template v-else>
            <v-icon>mdi-account</v-icon>
          </template>
        </v-avatar>
      </v-btn>
      <v-btn v-else icon :to="'/login'">
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" @input="drawerSound" app temporary>
      <v-list>
        <v-list-item  v-for="item in menuItems" :key="item.text" router :to="item.route">
          <v-list-item-title><v-icon size="small">{{ item.icon }}</v-icon>{{ item.text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { mapState } from 'pinia';
import { useAppStore } from '@/stores/store'

export default {
  name: 'NavBar',
  data() {
    return {
      drawer: false,
      drawerOpenSound: null,
      drawerCloseSound: null,
      menuItems: [
        { icon: 'mdi-home', text: 'Dashboard', route: '/' },
        { icon: 'mdi-file-outline', text: 'Toegewezen rapportages', route: '/toegewezen-rapportages' },
        { icon: 'mdi-file-check-outline', text: 'Uitgevoerde rapportages', route: '/uitgevoerde-rapportages' },
        { icon: 'mdi-text-box-search-outline', text: 'Documentatie', route: '/documentatie' },
        { icon: 'mdi-cog', text: 'Instellingen', route: '/instellingen' },
      ]
    };
  },
  created() {
    this.drawerOpenSound = new Audio(require('@/assets/menu-open.mp3'));
    this.drawerCloseSound = new Audio(require('@/assets/menu-close.mp3'));
  },
  computed: {
    // Map de state van de store naar de component
    ...mapState(useAppStore, ['loggedInUser']),
    isUserLoggedIn() {
      return !!this.loggedInUser;
    },
    userAvatar() {
      return this.loggedInUser && this.loggedInUser.avatar ? this.loggedInUser.avatar : '';
    },
    hasAvatar() {
      return !!(this.loggedInUser && this.loggedInUser.avatar);
    }
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
      this.drawerSound();
    },
    drawerSound() {
      const soundEnabled = localStorage.getItem('soundEnabled') === 'true';
      if (soundEnabled) {
        if (this.drawer) {
          this.drawerOpenSound.play();
        } else {
          this.drawerCloseSound.play();
        }
      }
    },
  }
}
</script>

<style scoped>
.v-app-bar {
  background: rgb(var(--v-theme-background));
  border-bottom: 1px solid rgb(var(--v-theme-surface));
}
.rec-logo-light {
  width: 100%;
  max-width: 150px;
  mix-blend-mode: difference;
}
.user-img {
  width: 100%;
}
.v-list-item {
  height: 55px;
}
.v-list-item-title {
  color: rgb(var(--v-theme-primary));
}
.v-list-item-title i {
  padding: 5px;
}
</style>