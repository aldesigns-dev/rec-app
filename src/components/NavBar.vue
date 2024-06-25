<template>
  <nav>
    <v-app-bar :elevation="3">
      <v-app-bar-nav-icon @click="toggleMenu"></v-app-bar-nav-icon>
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
    <v-navigation-drawer v-model="menu" @input="menuSound" app temporary>
      <v-list>
        <v-list-item  v-for="item in menuItems" :key="item.text" router :to="item.route">
          <v-list-item-title><v-icon size="small">{{ item.icon }}</v-icon>{{ item.text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { mapState } from 'pinia'
import { useAppStore } from '@/stores/store'

export default {
  name: 'NavBar',
  data() {
    return {
      menu: false,
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
    const store = useAppStore();
    store.fetchAudioURLs();
    // Stel soundEnabled in op true als het niet is ingesteld
    if (localStorage.getItem('soundEnabled') === null) {
      localStorage.setItem('soundEnabled', 'true');
    }
  },
  computed: {
    // Map de state van de store naar de component
    ...mapState(useAppStore, ['loggedInUser', 'menuOpenSoundURL', 'menuCloseSoundURL']),
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
    toggleMenu() {
      this.menu = !this.menu;
      this.menuSound();
    },
    menuSound() {
      const soundEnabled = localStorage.getItem('soundEnabled') === 'true';
      if (soundEnabled) {
        if (this.menu) {
          new Audio(this.menuOpenSoundURL).play()
        } else {
          new Audio(this.menuCloseSoundURL).play()
        }
      }
    }
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