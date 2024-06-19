<template>
  <v-container>
    <h1>Instellingen</h1>
    <v-row>
      <v-col cols="12">
        <v-card class="mx-auto">
          <v-card-title>Accountgegevens</v-card-title>
          <v-card-item v-if="loggedInUser">
            <v-row align="center">
              <v-col cols="auto">
                <v-avatar :size="50">
                  <template v-if="hasAvatar">
                    <v-img :src="userAvatar" />
                  </template>
                  <template v-else>
                    <v-icon size="50">mdi-account</v-icon>
                  </template>
                </v-avatar>
              </v-col>
              <v-col>
                <v-card-text>
                  <p v-if="loggedInUser.name"><strong>Gebruikersnaam:</strong> {{ loggedInUser.name }}</p>
                  <p v-if="loggedInUser.email"><strong>Emailadres:</strong> {{ loggedInUser.email }}</p>
                  <p><strong>Wachtwoord:</strong> ******</p> 
                </v-card-text>
              </v-col>
            </v-row>
          </v-card-item>
          <v-card-item v-else>
            <v-btn to="/login" block>Inloggen</v-btn>
          </v-card-item>
          <v-col v-if="loggedInUser">
            <v-btn @click="logout" class="logout-btn" block>Uitloggen</v-btn>
          </v-col>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="loggedInUser">
      <v-col cols="12">
        <v-card class="mx-auto">
          <v-card-title>Kies een avatar</v-card-title>
          <v-card-item>
            <v-row>
              <v-col v-for="(avatar, index) in avatars" :key="index" cols="3">
                <v-avatar class="avatar-option" :size="50">
                  <v-img :src="avatar" @click="selectAvatar(avatar)" />
                </v-avatar>
              </v-col>
            </v-row>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card class="mx-auto">
          <v-card-item>
            <v-card-title>Licht / Donker mode</v-card-title>
            <ToggleTheme />
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card class="mx-auto">
          <v-card-title>Geluiden aan / uit</v-card-title>
          <ToggleSound />
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="loggedInUser">
      <v-col cols="12">
        <v-card class="mx-auto">
          <v-card-title>Wachtwoord wijzigen</v-card-title>
          <v-card-item>
            <v-text-field 
              v-model="password" 
              label="Huidig wachtwoord" 
              :type="showCurrentPassword ? 'text' : 'password'">
              <template v-slot:append-inner>
                <v-icon @click="showCurrentPassword = !showCurrentPassword">
                  {{ showCurrentPassword ? 'mdi-eye' : 'mdi-eye-off' }}
                </v-icon>
              </template>
            </v-text-field>
            <v-text-field 
              v-model="newPassword" 
              label="Nieuw wachtwoord" 
              :type="showNewPassword ? 'text' : 'password'">
              <template v-slot:append-inner>
                <v-icon @click="showNewPassword = !showNewPassword">
                  {{ showNewPassword ? 'mdi-eye' : 'mdi-eye-off' }}
                </v-icon>
              </template>
            </v-text-field>
            <v-text-field 
              v-model="confirmNewPassword" 
              label="Bevestig nieuw wachtwoord" 
              :type="showConfirmPassword ? 'text' : 'password'">
              <template v-slot:append-inner>
                <v-icon @click="showConfirmPassword = !showConfirmPassword">
                  {{ showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off' }}
                </v-icon>
              </template>
            </v-text-field>
          </v-card-item>
          <v-alert v-if="errorMessage" color="error" icon="$error" title="Fout:">
            {{ errorMessage }}
          </v-alert>
          <v-alert v-if="successMessage" color="success" icon="$success" title="Succes!">
            {{ successMessage }}
          </v-alert>
          <v-col>
            <v-btn @click="changePassword" block>Wachtwoord wijzigen</v-btn>
          </v-col>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useAppStore } from '@/stores/store'
import ToggleTheme from '@/components/ToggleTheme'
import ToggleSound from '@/components/ToggleSound'
import index from '@/router/index'

export default {
  components: {
    ToggleTheme,
    ToggleSound
  },
  data() {
    return {
      password: '',
      newPassword: '',
      confirmNewPassword: '',
      errorMessage: '',
      successMessage: '',
      showCurrentPassword: false,
      showNewPassword: false,
      showConfirmPassword: false,
      selectedAvatar: null,
      avatars: [
        'https://cdn.vuetifyjs.com/images/john.jpg',
        'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        'https://cdn.vuetifyjs.com/images/lists/4.jpg',
        'https://cdn.vuetifyjs.com/images/lists/5.jpg',
        'https://cdn.vuetifyjs.com/images/lists/6.jpg'
      ]
    }
  },
  computed: {
    loggedInUser() {
      const store = useAppStore();
      return store.loggedInUser;
    },
    userAvatar() {
      return this.loggedInUser && this.loggedInUser.avatar ? this.loggedInUser.avatar : '';
    },
    hasAvatar() {
      return !!(this.loggedInUser && this.loggedInUser.avatar);
    }
  },
  methods: {
    async changePassword() {
      try {
        const store = useAppStore();
        // Her-authenticate de gebruiker met het huidige wachtwoord
        const reauthSuccess = await store.reauthenticateUser(this.loggedInUser.email, this.password);
        // Controleer of het huidige wachtwoord juist is
        if (!reauthSuccess) {
          this.errorMessage = 'Het ingevoerde huidige wachtwoord is onjuist.';
          return;
        }
        // Controleer of het nieuwe wachtwoord overeenkomt met het nieuwe wachtwoord
        if (this.newPassword !== this.confirmNewPassword) {
          this.errorMessage = 'Het nieuwe wachtwoord komt niet overeen met de bevestiging.';
          return;
        }
        // Wijzig het wachtwoord van de gebruiker
        const isSuccess = await store.changePassword(this.newPassword);
        console.log('Wachtwoord wijziging voltooid:', isSuccess);
        if (isSuccess) {
          this.successMessage = 'Wachtwoord succesvol gewijzigd. Je wordt nu automatisch doorverwezen naar het inlogscherm.';
          this.errorMessage = '';
          setTimeout(() => {
            store.logoutUser();
            index.push('/login');
          }, 2000);
        } else {
          this.errorMessage = 'isSucces: Er is een fout opgetreden bij het wijzigen van het wachtwoord. Probeer het opnieuw.';
        }
      } catch (error) {
        console.error('Er is een fout opgetreden bij het wijzigen van het wachtwoord:', error);
        this.errorMessage = 'Er is een fout opgetreden bij het wijzigen van het wachtwoord. Probeer het opnieuw.';
      }
    },
    async logout() {
      try {
        const store = useAppStore();
        await store.logoutUser();
        console.log('Gebruiker is uitgelogd');
        index.push('/login');
      } catch (error) {
        console.error('Er is een fout opgetreden bij het uitloggen:', error);
        this.errorMessage = 'Er is een fout opgetreden bij het uitloggen. Probeer het opnieuw.';
      }
    },
    async selectAvatar(selectedAvatar) {
      try {
        const store = useAppStore();
        // Haal de ingelogde gebruiker op
        const userId = this.loggedInUser.uid;
        // Roep de updateUser methode van de store aan
        await store.updateUser(userId, { 
          avatar: selectedAvatar 
        });
        // Werk de store bij met de bijgewerkte gebruiker gegevens
        const updatedUser = { ...this.loggedInUser, avatar: selectedAvatar };
        store.saveLoggedInUser(updatedUser);
        console.log('InstellingenView selectAvatar(): Avatar succesvol toegevoegd aan de gebruiker');
        this.selectedAvatar = selectedAvatar;
      } catch (error) {
        console.error('InstellingenView selectAvatar(): Er is een fout opgetreden bij het toevoegen van de avatar aan de gebruiker:', error);
      }
    }
  }
}
</script>

<style scoped>
.v-card-text {
  padding: 0;
  line-height: 1.75;
}
.v-card-item .toggle-btn {
  text-align: center;
}
.v-btn {
  color: rgb(var(--v-theme-surface));
  background-color: rgb(var(--v-theme-primary));
}
.avatar-option {
  cursor: pointer;
}
</style>