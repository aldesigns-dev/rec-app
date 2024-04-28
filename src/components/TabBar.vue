<template>
    <v-bottom-navigation elevation="3" grow>
      <v-btn to="/">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn>
        <v-icon>mdi-camera</v-icon>
      </v-btn>
      <v-btn to="/instellingen" >
        <v-icon>mdi-cog</v-icon>
      </v-btn>
    </v-bottom-navigation>
</template>

<script>
export default {
  name: 'TabBar'
}
</script>

<style scoped>
.v-bottom-navigation {
  background: rgb(var(--v-theme-background));
  border-top: 1px solid rgb(var(--v-theme-surface));
}
.v-btn--active {
  background: rgb(var(--v-theme-surface));
}
</style>