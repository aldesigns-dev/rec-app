<!-- App.vue -->
<template>
  <v-app>
    <NavBar />
    <v-main>
      <ToggleTheme />
      <router-view/>
    </v-main>
    <TabBar />
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar'
import TabBar from '@/components/TabBar'
import ToggleTheme from '@/components/ToggleTheme'

export default {
  name: 'App',
  components: {
    NavBar,
    TabBar,
    ToggleTheme
  }
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
  margin: 20px auto 30px auto;
  font-size: 1.6em;
  color: rgb(var(--v-theme-primary));
}
h3 {
  color: rgb(var(--v-theme-primary));
}
li, ul {
  list-style: none;
}
.v-main {
  padding-left: 5%;
  padding-right: 5%;
}
.v-container {
  padding: 0;
  margin-bottom: 50px;
}
.v-card-title {
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: -0.25px;
  text-align: center;
  white-space: normal;
  color: rgb(var(--v-theme-primary));
}
</style>