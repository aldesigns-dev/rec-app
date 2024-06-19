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
  margin: 30px auto 30px auto;
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
  padding-left: 6%;
  padding-right: 6%;
}
.v-container {
  padding: 0;
  margin-bottom: 40px;
}
.v-card {
  width: 100%;
  border-radius: 15px;
  background: rgb(var(--v-theme-surface));
  padding: 20px;
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