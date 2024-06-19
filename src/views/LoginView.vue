<template>
  <v-container>
    <h1>Login</h1>
    <LoginForm />
    <v-row>
      <v-col cols="12" md="4">
        <p>Heb je nog geen account?</p><br>
        <v-btn to="/aanmelden" block>Account maken</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LoginForm from '@/components/LoginForm'

export default {
  name: 'LoginView',
  components: {
    LoginForm
  }
}
</script>

<style scoped>
.v-btn {
  color: rgb(var(--v-theme-surface));
  background-color: rgb(var(--v-theme-primary));
}
</style>