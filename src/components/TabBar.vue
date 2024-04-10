<template>
    <v-bottom-navigation grow color="primary">
      <v-btn to="/" color="rec-secondary">
        <v-icon color="rec-primary">mdi-home</v-icon>
      </v-btn>
   
      <v-btn color="rec-secondary">
        <v-icon color="rec-primary">mdi-camera</v-icon>
      </v-btn>

      <v-btn to="/instellingen" color="rec-secondary">
        <v-icon color="rec-primary">mdi-cog</v-icon>
      </v-btn>
      
    </v-bottom-navigation>
</template>

<script>
export default {
  name: 'TabBar',
  data() {
    return {
      drawer: false,
      menuItems: [
        { icon: 'mdi-home', route: '/' },
        { icon: 'mdi-camera', route: '/' },
        { icon: 'mdi-cog', text: 'Instellingen', route: '/instellingen' },
      ]
    };
  }
}
</script>

<style scoped>
</style>