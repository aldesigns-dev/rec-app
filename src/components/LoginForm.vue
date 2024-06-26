<template>
  <v-form @submit.prevent="login">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="email" :rules="emailRules" label="E-mail" required>
          </v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="password" :rules="passwordRules" label="Wachtwoord" :type="showPassword ? 'text' : 'password'" required>
            <template v-slot:append-inner>
              <v-icon @click="showPassword = !showPassword">
                {{ showPassword ? 'mdi-eye' : 'mdi-eye-off' }}
              </v-icon>
            </template>
          </v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="verificationCode" :rules="verificationCodeRules" label="Verificatiecode" required>
          </v-text-field>
        </v-col>
        <v-col cols="12">
          <v-card class="simulatie">
            <v-card-title>Verificatiecode</v-card-title>
            <v-card-text>
              <strong>Simulatie 2-way authenticatie:</strong><br>
              De verificatiecode zou normaal gesproken via bijvoorbeeld sms naar de gebruiker worden gestuurd maar voor simulatiedoeleinden gebruiken we een automatisch gegenereerde code in de gebruikersinterface.
            </v-card-text>
            <v-col class="verification-btn-col">
              <v-btn @click="generateVerificationCode" class="verification-btn" block>Genereer verificatiecode</v-btn>
            </v-col>
            <v-col v-if="showGeneratedCode" class="generated-code">
              <v-card-text class="v-code">Verificatiecode: <strong>{{ generatedVerificationCode }}</strong>
              </v-card-text>
            </v-col>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-alert v-if="errorMessage" color="error" icon="$error" title="Fout bij het inloggen:">
            {{ errorMessage }}
          </v-alert>
        </v-col>
        <v-col>
          <v-btn type="submit" class="login-btn" block>Inloggen</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { useAppStore } from '@/stores/store'
import index from '@/router/index'

export default {
  name: 'LoginForm',
  data() {
    return {
      email: '',
      password: '',
      verificationCode: '',
      generatedVerificationCode: '',
      showGeneratedCode: false,
      errorMessage: '',
      showPassword: false,
      emailRules: [
        value => !!value || 'E-mail is verplicht',
        value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Ongeldig e-mailadres',
      ],
      passwordRules: [
        value => !!value || 'Wachtwoord is verplicht',
        value => value.length >= 6 || 'Wachtwoord moet minstens 6 tekens lang zijn',
      ],
      verificationCodeRules: [
        value => !!value || 'Verificatiecode is verplicht',
        value => value.length === 6 || 'Verificatiecode moet 6 tekens lang zijn'
      ],
    };
  },
  methods: {
    generateVerificationCode() {
      this.generatedVerificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      this.showGeneratedCode = true;
    },
    async login() {
      // Controleer of de velden zijn ingevuld
      if (!this.email || !this.password || !this.verificationCode) {
        this.errorMessage = 'Alle velden zijn verplicht.';
        return;
      }
      if (this.verificationCode !== this.generatedVerificationCode) {
        this.errorMessage = 'Verificatiecode is onjuist.';
        return;
      }
      try {
        const store = useAppStore();
        await store.fetchUsers();
        // Controleer of de opgegeven e-mail bestaat in de lijst met gebruikers
        const userExists = store.users.some(user => user.email === this.email);
        if (!userExists) {
          this.errorMessage = 'Gebruiker niet gevonden.';
          return;
        }
        // Probeer in te loggen als de gebruiker bestaat
        if (userExists) {
          await store.loginUser(this.email, this.password);
          console.log('LoginForm: Gebruiker is succesvol ingelogd.');
          index.push('/');
        }
      } catch (error) {
        console.error('Er is een fout opgetreden bij het inloggen:', error);
        if (error.code === 'auth/too-many-requests') {
          this.errorMessage = 'Firebase: Toegang tot dit account is tijdelijk uitgeschakeld vanwege te veel mislukte inlogpogingen.';
        } else if (error.code === 'auth/invalid-credential') {
          this.errorMessage = 'Onjuiste combinatie e-mail en wachtwoord.';
        } else {
          this.errorMessage = 'Er is een fout opgetreden bij het inloggen. Probeer het later opnieuw.';
        }
      }
    }
  }
}
</script>

<style scoped>
.v-col {
  padding: 0 12px 8px 12px;
}
.verification-btn-col {
  padding: 0 12px 12px 12px;
}
.verification-btn {
  background-color: rgb(var(--v-theme-surface-variant));
  font-size: 0.850rem;
  text-transform: initial;
}
.generated-code {
  padding: 0;
}
.login-btn {
  color: rgb(var(--v-theme-surface));
  background-color: rgb(var(--v-theme-primary));
}
.v-alert {
  margin-top: 25px;
}
</style>