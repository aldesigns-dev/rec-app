<template>
  <v-container>
    <h1>Toegewezen rapportages</h1>
    <v-row v-if="loggedInUser">
      <!-- Weergave inspecties -->
      <CollapsibleSection v-for="(inspection, inspectionIndex) in filterInspections" :key="inspectionIndex" :title="`${formatDate(inspection.date)} -- ${inspection.address}`">
        <v-card  class="inspection-card">
          <v-list>
            <!-- Itereren over elk inspectiedoel van de inspectie -->
            <v-list-item v-for="(goal, goalIndex) in inspection.inspection_goals" :key="goalIndex">
              <v-list-item-title>{{ goal.goal }}</v-list-item-title>
              <ul>
                <!-- Itereren over de opties van het inspectiedoel -->
                <li v-for="option in goal.options" :key="option.key" class="v-list-items">
                  {{ vertalingen[option.key] }}: 
                  <span v-if="optionType(option.key) !== 'image' && optionType(option.key) !== 'date'" class="option-value">{{ option.value }}</span>
                  <span v-if="optionType(option.key) === 'date' && option.value !== ''" class="option-value">{{ formatDate(option.value) }}</span>
                  <img v-if="optionType(option.key) === 'image'" :src="option.value" class="option-image" @click="openImage(option.value)"/>
                </li>
              </ul>
              <v-btn @click="editGoal(inspection.id, goal)" variant="flat" class="icard-edit-btn">Bewerk</v-btn>
            </v-list-item>
          </v-list>
          <v-col cols="12">
            <v-alert v-if="errorSaveInspection" color="error" icon="$error" title="Fout:">
              {{ errorSaveInspection }}
            </v-alert>
          </v-col>
          <v-col>
            <v-btn @click="saveInspection(inspection.id)" variant="flat" class="icard-modal-save-btn" block>Inspectie opslaan</v-btn>
          </v-col>
        </v-card>
      </CollapsibleSection>

      <!-- Weergave afbeelding -->
      <v-dialog v-model="imageDialog" max-width="600">
        <v-img :src="selectedImage" contain></v-img>
      </v-dialog>

      <!-- Modal voor inspectiedoelen bewerken -->
      <v-dialog v-model="showModalEditGoal">
        <v-card>
          <v-card-title>{{ inspectionAddress }}<br>Bewerk inspectiedoel: {{ currentGoal?.goal }}</v-card-title>
          <v-card-text>
            <v-form>
              <v-container>
                <v-row class="edit-goals-row">
                  <!-- Itereer over de opties van het geselecteerde inspectiedoel -->
                  <v-col v-for="option in currentGoal?.options" :key="option.key" class="edit-goals-col">
                    <!-- Toon label -->
                    <div>{{ vertalingen[option.key] }}</div>
                    <!-- Toon velden -->
                    <template v-if="optionType(option.key) === 'link'">
                      <v-text-field v-model="option.value" label="Link"></v-text-field>
                    </template>
                    <template v-if="optionType(option.key) === 'textfield'">
                      <v-text-field v-model="option.value"></v-text-field>
                    </template>
                    <template v-if="optionType(option.key) === 'textarea'">
                      <v-textarea v-model="option.value"></v-textarea>
                    </template>
                    <template v-else-if="optionType(option.key) === 'radio'">
                      <v-radio-group v-model="option.value" inline>
                        <v-radio v-for="option in optionOptions(option.key)" :key="option" :label="option" :value="option"></v-radio>
                      </v-radio-group>
                    </template>
                    <template v-else-if="optionType(option.key) === 'dropdown'">
                      <v-select v-model="option.value" :items="optionOptions(option.key)"></v-select>
                    </template>
                    <template v-else-if="optionType(option.key) === 'date'">
                      <v-date-picker v-model="currentGoalDate" color="primary" hide-header></v-date-picker>
                    </template>
                    <template v-else-if="optionType(option.key) === 'image'">
                      <v-file-input @change="onImageChange($event, option)" prepend-icon="mdi-camera" accept="image/*"></v-file-input>
                      <img v-if="option.value" :src="option.value" class="image-preview" />
                    </template>
                  </v-col>
                </v-row>
              </v-container>
              <v-row class="btn-row">
                <v-btn @click="saveGoal" variant="flat" class="icard-modal-save-btn">Opslaan</v-btn>
                <v-btn @click="resetGoal" variant="flat" class="icard-modal-reset-btn">&#x21BA;</v-btn>
                <v-btn @click="cancelEditGoal" variant="flat" class="icard-modal-cancel-btn">Annuleren</v-btn>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>

      <!-- Modal voor nieuwe inspectie -->
      <v-dialog v-model="showModalNewInspection">
        <v-card>
          <v-card-title>Voer adres en datum in</v-card-title>
          <v-card-text class="show-modal">
            <v-form @submit.prevent="saveNewInspection">
              <v-text-field v-model="newInspection.address" label="Stad, Straatnaam + huisnummer" required></v-text-field>
              <v-date-picker v-model="newInspection.date" color="primary" hide-header required></v-date-picker>
              <v-row justify="space-between" align="center">
                <v-btn type="submit" class="icard-modal-save-btn" variant="flat">Opslaan</v-btn>
                <v-btn @click="cancelNewInspection" class="icard-modal-cancel-btn" variant="flat" >Annuleren</v-btn>
              </v-row>
              <v-row>
                <v-col class="modal-message" >
                  <v-alert v-if="errorMessage" color="error" icon="$error" title="Fout:">
                    {{ errorMessage }}
                  </v-alert>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-col cols="12">
        <v-alert v-if="successNewInspection" color="success" icon="$success" title="Succes!">
          {{ successNewInspection }}
        </v-alert>
        <v-alert v-if="errorNewInspection" color="error" icon="$error" title="Fout:">
          {{ errorNewInspection }}
        </v-alert>
        <v-alert v-if="successSaveInspection" color="success" icon="$success" title="Succes!">
          {{ successSaveInspection }}
        </v-alert>
      </v-col>

      <v-col v-if="!errorNewInspection" cols="12" class="simulatie-container">
        <v-card class="simulatie">
          <v-card-title>Simulatie toegewezen inspectie:</v-card-title>
          <v-card-text>
            Nieuwe inspecties zouden in werkelijkheid wellicht via de backend aan de app kunnen worden toegevoegd en/of direct aan een inspecteur worden toegewezen maar voor simulatiedoeleinden genereren we nu zelf een nieuwe inspectie in de gebruikersinterface.
          </v-card-text>
          <v-col>
            <v-btn @click="showModalNewInspection = true" class="icard-modal-save-btn" variant="flat" block>Nieuwe inspectie genereren</v-btn>
          </v-col>
        </v-card>
      </v-col>
    </v-row>
    
    <v-row v-if="!loggedInUser">
      <v-col>
        <p>Log in om de toegewezen inspecties te kunnen inzien.</p><br>
        <v-btn to="/login" class="login-btn" block>Inloggen</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useAppStore } from '@/stores/store'
import VertalingenMixin from '@/mixins/vertalingenMixin'
import CollapsibleSection from '@/components/CollapsibleSection.vue'

export default {
  name: 'ToegewezenView',
  components: {
    CollapsibleSection,
  },
  mixins: [VertalingenMixin],
  data() {
    return {
      showModalNewInspection: false,
      showModalEditGoal: false,
      imageDialog: false,
      selectedImage: null,
      currentGoalDate: new Date(),
      imageFiles: {},
      successNewInspection: '',
      errorNewInspection: '',
      successSaveInspection: '',
      errorMessage: '',
      errorSaveInspection: '',
      newInspection: {
        address: '',
        date: new Date(),
        new_inspection: true
      },
    }
  },
  created() {
    const store = useAppStore();
    store.fetchInspections();
    store.fetchOptions();
  },
  computed: {
    loggedInUser() {
      const store = useAppStore();
      return store.loggedInUser;
    },
    inspections() {
      const store = useAppStore();
      return store.inspections;
    },
    options() {
      const store = useAppStore();
      return store.options;
    },
    filterInspections() {
      const store = useAppStore();
      // Filter inspecties op new_inspection: true
      const filteredInspections = store.inspections.filter(inspection => inspection.new_inspection === true);
      // Sorteer de inspecties op datum
      const sortedInspections = filteredInspections.sort((a, b) => {
        // Zet de datum om naar JavaScript Date-objecten
        const dateA = a.date.toDate();
        const dateB = b.date.toDate();
        // Sorteer op datum van oud naar nieuw
        return dateA - dateB;
      });
      return sortedInspections;
    },
    formatDate() {
      // Datum weergave CollapsibleSection
      return (timestamp) => {
        if (timestamp !== null) { // Controleer of timestamp niet null is
        let date;
        if (typeof timestamp.toDate === 'function') {
          date = timestamp.toDate();
        } else {
          date = new Date(timestamp);
        }
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return date.toLocaleDateString('nl-NL', options);
        } else {
          return ''; // Geef een lege string terug als timestamp null is
        }
      }
    }
  },
  methods: {
    async saveNewInspection() {
      // Controleer of alle velden zijn ingevuld voordat het formulier wordt verzonden
      if (!this.newInspection.address || !this.newInspection.date) {
        this.errorMessage = 'Vul alle velden in voordat u de inspectie opslaat.';
        return;
      }
      try {
        const store = useAppStore();
        // Roep createInspection() in de store aan om een inspectie te maken
        const newInspectionObject  = await store.createInspection({
          address: this.newInspection.address,
          date: this.newInspection.date,
          new_inspection: true,
          inspection_goals: [
            {
              goal: "Schade opnemen",
              options: [
                { key: "location", value: "" },
                { key: "new_damage", value: "" },
                { key: "type_of_damage", value: "" },
                { key: "date", value: "" },
                { key: "urgent_action_required", value: "" },
                { key: "description", value: "" },
                { key: "photos", value: [] }
              ]
            },
            {
              goal: "Achterstallig onderhoud opnemen",
              options: [
                { key: "location", value: "" },
                { key: "type_of_maintenance", value: "" },
                { key: "urgent_action_required", value: "" },
                { key: "cost_indication", value: "" },
                { key: "photos", value: [] }
              ]
            },
            {
              goal: "Technische installaties inspecteren",
              options: [
                { key: "location", value: "" },
                { key: "type_of_installation", value: "" },
                { key: "reported_malfunctions", value: "" },
                { key: "test_procedure", value: "" },
                { key: "approved", value: "" },
                { key: "comments", value: "" },
                { key: "photos", value: [] },
              ]
            },
            {
              goal: "Modificaties inspecteren",
              options: [
                { key: "existing_modifications", value: "" },
                { key: "location", value: "" },
                { key: "installer", value: "" },
                { key: "description_modification", value: "" },
                { key: "action_required", value: "" },
                { key: "comments", value: "" },
                { key: "photos", value: [] },
              ]
            }
          ]
        });

        if (newInspectionObject) {
          // Sluit de modal
          this.showModalNewInspection = false;
          // Reset de velden
          this.newInspection.address = '';
          this.newInspection.date = new Date();
          // Toon een succesbevestiging
          this.successNewInspection = 'Nieuwe inspectie is succesvol aangemaakt!';
          this.errorNewInspection = '';
          setTimeout(async () => {
              // Reset de bevestiging na 3 seconden
              this.successNewInspection = '';
              // Ophalen van bijgewerkte inspectielijst
              await store.fetchInspections();
          }, 3000);
        } else {
          this.errorNewInspection = 'Er is iets fout gegaan bij het aanmaken van een inspectie. Probeer het nogmaals.';
        }
      } catch (error) {
        console.error('Er is een fout opgetreden bij het opslaan van de nieuwe inspectie:', error);
        throw error;
      }
    },
    cancelNewInspection() {
      // Sluit de modal
      this.showModalNewInspection = false;
      // Reset de velden
      this.newInspection.address = '';
      this.newInspection.date = new Date();
    },
    optionType(optionKey) {
      const option = this.options[optionKey];
      if (optionKey === 'date') return 'date';
      if (optionKey === 'image') return 'image';
      return option.type;
    },
    optionOptions(key) {
      const option = this.options[key];
      return option.options;
    },
    async editGoal(inspectionId, goal) {
      const store = useAppStore();
      // Zoek de inspectie met de bijbehorende inspectie-ID in de ingevulde inspecties
      const inspection = store.inspections.find(inspection => inspection.id === inspectionId);
      console.log("editGoal() inspectie:", inspection);
      console.log("editGoal() inspectiedoel:", goal);

      if (inspection) {
        // Adres weergave in de modal
        this.inspectionAddress = inspection.address;
        // Als de datum al is ingesteld, behoud selectie. Anders new Date
        if (!this.currentGoalDate) {
          this.currentGoalDate = goal.date ? new Date(goal.date) : new Date();
          console.log("editGoal():", this.currentGoalDate);
          console.log("editGoal():", typeof this.currentGoalDate);
        }
        // Kopieer alle eigenschappen van het huidige doel
        this.currentGoal = { ...goal };
        this.showModalEditGoal = true;
      }
    },
    onImageChange(event, option) {
      const file = event.target.files[0];
      if (file) {
        // Maak een URL voor het geselecteerde bestand
        option.value = URL.createObjectURL(file);
        // Sla het bestand op zodat het later kan worden opgehaald
        option.file = file;
      }
    },
    openImage(imageSrc) {
      this.selectedImage = imageSrc;
      this.imageDialog = true;
    },
    saveGoal() {
      console.log("SaveGoal(): Current goal date:", this.currentGoalDate);
      // Sla de geselecteerde datum op in option.value van het doel
      this.currentGoal.options.forEach(option => {
        if (option.key === 'date') {
          option.value = this.currentGoalDate;
        }
      });
      // Sluit de modal
      this.showModalEditGoal = false;
    },
    resetGoal() {
      // Reset de velden
      this.currentGoal.options.forEach(option => {
        if (option.key === 'date') {
          // Reset de geselecteerde datum naar de standaarddatum
          this.currentGoalDate = null;
        } else if (typeof option.value === 'string') {
          option.value = ''; // Reset naar een lege string
        } else if (option.key === 'image') {
          // Reset de afbeelding naar een lege string
          option.value = '';
        } else if (Array.isArray(option.value)) {
          option.value = []; // Reset naar een lege array
        }
      });
    },
    cancelEditGoal() {
      // Sluit de modal
      this.showModalEditGoal = false;
    },
    async saveInspection(inspectionId) {
      try {
        const store = useAppStore();
        // Zoek de inspectie op ID
        const inspection = store.inspections.find(inspection => inspection.id === inspectionId);
        if (inspection) { 
          // Controleer of ten minste een veld is ingevuld
          const hasData = inspection.inspection_goals.some(goal =>
            goal.options.some(option => {
              if (typeof option.value === 'string' && option.value.trim() !== '') {
                return true; // Return true als option value niet leeg is
              }
              if (Array.isArray(option.value) && option.value.length > 0) {
                return true; // Return true als option value een array is met minstens een element
              }
              if (option.value instanceof File) {
                return true; // Return true als option value een File object is
              }
              return false; // Return false indien geen van de condities
            })
          );
          if (!hasData) {
            this.errorSaveInspection = 'Inspectierapport kan niet worden opgeslagen. Vul ten minste een inspectiedoel in.';
            setTimeout(() => {
              this.errorSaveInspection = '';
            }, 3000);
            return;
          }
          // Zet de new_inspection vlag op false
          inspection.new_inspection = false;
          // Upload eventuele afbeeldingen
          for (const goal of inspection.inspection_goals) {
            for (const option of goal.options) {
              if (option.file) {
                option.value = await store.uploadImage(option.file);
                delete option.file; // Verwijder bestand uit het object na uploaden
              }
            }
          }
          // Opslaan inspectierapport in firebase
          await store.saveInspection(inspection);
          // Toon een succesbevestiging
          this.successSaveInspection = 'Inspectierapport succesvol opgeslagen!';
          this.errorSaveInspection = '';
          setTimeout(async () => {
            // Reset de successSaveInspection na 3 seconden
            this.successSaveInspection = '';
            // Ophalen van bijgewerkte inspectielijst
            await store.fetchInspections();
          }, 3000);
        } else {
          console.error('saveInspection() - Inspection not found with ID:', inspectionId);
        }
      } catch (error) {
        console.error('Fout bij het opslaan van de inspectie:', error);
      }
    },
  },
}
</script>

<style scoped>
.v-row {
  margin: 0;
}
.login-btn {
  color: rgb(var(--v-theme-surface));
  background-color: rgb(var(--v-theme-primary));
}
.inspection-card {
  margin-bottom: 15px;
  margin-top: -12px;
  padding-top: 0;
  padding-bottom: 10px;
}
.v-list-item-title {
  color: rgb(var(--v-theme-primary));
  font-size: 0.9rem;
  font-weight: 500;
  padding-right: 5px;
}
.v-list-item {
  padding-inline: 0;
}
.v-list-items {
  font-size: 0.9rem;
}
.option-value {
  font-weight: 600;
}
.v-card-text.show-modal {
  padding: 0;
}
.modal-message {
  padding: 0;
}
.v-picker.v-sheet {
  margin-left: -25px;
}
.icard-edit-btn {
  background-color: rgb(var(--v-theme-surface-variant));
  font-size: 0.775rem;
  text-transform: initial;
}
.btn-row {
  flex-direction: column;
}
.icard-modal-save-btn {
  color: rgb(var(--v-theme-surface));
  background-color: rgb(var(--v-theme-primary));
  margin-bottom: 10px;
}
.icard-modal-reset-btn {
  color: rgb(var(--v-theme-surface));
  background-color: rgb(var(--v-theme-warning));
  font-size: 18px;
  font-weight: 800;
  margin-bottom: 10px;
}
.icard-modal-cancel-btn {
  color: rgb(var(--v-theme-text-light));
  background-color: rgb(var(--v-theme-error));
  margin-bottom: 10px;
}
.edit-goals-row {
  flex-direction: column;
  margin-top: 10px;
}
.edit-goals-col {
  padding: 0;
}
.simulatie-container {
  padding: 0;
}
.simulatie {
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
.image-preview {
  max-width: 100px;
  max-height: 100px;
  margin-top: 10px;
}
.option-image {
  max-width: 100px;
  max-height: 100px;
}
</style>