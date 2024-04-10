<!-- App.vue -->
<template>
  <v-app>
    <NavBar />
    <v-main>
      <router-view/>
    </v-main>
    <TabBar />
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar'
import TabBar from '@/components/TabBar'

export default {
  name: 'App',
  components: {
    NavBar,
    TabBar
  },

  data: () => ({
    //
  }),
}
</script>

<style>
a {
  text-decoration: none;
  line-height: 0;
}
h1 {
  display: flex;
  justify-content: center;
  margin: 20px auto;
  font-size: 1.6em;
  color: rgb(var(--v-theme-rec-secondary));
}
</style>