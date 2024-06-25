<template>
  <v-container>
    <v-form @submit.prevent="signUp">
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="name" :rules="nameRules" :counter="10" label="Gebruikersnaam" required>
          </v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="email" :rules="emailRules" :counter="10" label="E-mail" required>
          </v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="password" :rules="passwordRules" :counter="10" label="Wachtwoord" :type="showPassword ? 'text' : 'password'" required>
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
              De verificatiecode zou normaal gesproken via e-mail of sms naar de gebruiker worden gestuurd maar voor simulatiedoeleinden gebruiken we een automatisch gegenereerde code in de gebruikersinterface.
            </v-card-text>
            <v-col>
              <v-btn @click="generateVerificationCode" block>Genereer verificatiecode</v-btn>
            </v-col>
            <v-col v-if="showGeneratedCode">
              <v-card-text class="v-code">Verificatiecode: <strong>{{ generatedVerificationCode }}</strong>
              </v-card-text>
            </v-col>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-alert v-if="errorMessage" color="error" icon="$error" title="Fout:">
            {{ errorMessage }}
          </v-alert>
          <v-alert v-if="successMessage" color="success" icon="$success" title="Succes!">
            {{ successMessage }}
          </v-alert>
        </v-col>
        <v-col>
          <v-btn type="submit" block>Aanmelden</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import { useAppStore } from '@/stores/store'
import index from '@/router/index'

export default {
  name: 'SignUpForm',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      verificationCode: '',
      generatedVerificationCode: '',
      showGeneratedCode: false,
      showPassword: false,
      successMessage: '',
      errorMessage: '',
      nameRules: [
        value => !!value || 'Gebruikersnaam is verplicht',
      ],
      emailRules: [
        value => !!value || 'E-mail is verplicht',
        value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Ongeldig e-mailadres',
      ],
      passwordRules: [
        value => !!value || 'Wachtwoord is verplicht',
        value => /\d/.test(value) || 'Wachtwoord moet minstens één nummer bevatten',
        value => value.length >= 6 || 'Wachtwoord moet minstens 6 tekens lang zijn'
      ],
      verificationCodeRules: [
        value => !!value || 'Verificatiecode is verplicht',
        value => value.length === 6 || 'Verificatiecode moet 6 tekens lang zijn'
      ],
    }
  },
  methods: {
    generateVerificationCode() {
      this.generatedVerificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      this.showGeneratedCode = true;
    },
    async signUp() {
      // Controleer of de velden zijn ingevuld
      if (!this.name || !this.email || !this.password || !this.verificationCode) {
        this.errorMessage = 'Alle velden zijn verplicht.';
        return;
      }
      if (this.verificationCode !== this.generatedVerificationCode) {
        this.errorMessage = 'Verificatiecode is onjuist.';
        return;
      }
      try {
        const store = useAppStore();
        const user = await store.createUser({
          name: this.name,
          email: this.email,
          password: this.password,
          verificationCode: this.verificationCode
        });
        if (user) {
          this.successMessage = 'Account is succesvol aangemaakt! Je wordt nu automatisch doorverwezen naar het inlogscherm.';
          this.errorMessage = '';
          setTimeout(() => {
            index.push('/login');
          }, 3000);
        } else {
          this.errorMessage = 'Er is iets fout gegaan bij het aanmaken van je account. Probeer het nogmaals.';
        }
      } catch (error) {
        console.error('Er is een fout opgetreden:', error);
        this.errorMessage = 'Er is een fout opgetreden bij het aanmaken van je account. Probeer het nogmaals.';
      }
    }
  }
}
</script>

<style scoped>
.v-col {
  padding: 0 12px 8px 12px;
}
.v-btn {
  color: rgb(var(--v-theme-surface));
  background-color: rgb(var(--v-theme-primary));
}
.simulatie {
  padding: 25px;
  background-color: rgb(var(--v-theme-surface));
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 15px;
  margin-bottom: 20px;
}
.simulatie .v-card-text {
  font-size: 0.85rem;
}
.v-code {
  padding-top: 20px;
  padding-bottom: 0;
}
</style>