<!-- UitgevoerdView.vue -->
<template>
  <h1>Uitgevoerde rapportages</h1>
  <v-container>
    <!-- Itereren over de inspecties -->
    <CollapsibleSection v-for="(inspection, index) in filledInInspections" :key="index" :title="`${formatDate(inspection.date)} -- ${inspection.address}`">
      <v-card  class="inspection-card">
          <v-list>
            <!-- Itereren over elk inspectiedoel van de inspectie -->
            <v-list-item v-for="(goal, index) in inspection.inspection_goals" :key="index">
              <v-list-item-title>{{ goal.goal }}</v-list-item-title>
              <ul v-if="isGoalFilled(goal)">
                <!-- Itereren over de opties van het inspectiedoel -->
                <li v-for="(value, key) in goal.options" :key="key" class="v-list-items">
                  {{ key }}: <span class="option-value">{{ value.value }}</span>
                </li>
              </ul>
              <!-- Als het inspectiedoel niet is ingevuld -->
              <template v-else>
                <v-btn variant="flat" class="icard-btn">Invullen</v-btn>
              </template>
            </v-list-item>
          </v-list>
      </v-card>
    </CollapsibleSection>
  </v-container>
</template>

<script>
import { fetchInspections } from '@/services/InspectionService'
import CollapsibleSection from '@/components/CollapsibleSection.vue'

export default {
  name: 'UitgevoerdView',
  components: {
    CollapsibleSection
  },
  data() {
    return {
      inspections: []
    }
  },
  computed: {
    // Filter ingevulde inspecties en sorteer inspecties op datum
    filledInInspections() {
      return this.inspections
        .filter(inspection =>
          inspection.inspection_goals.some(goal => this.isGoalFilled(goal))
        )
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  },
  methods: {
    // Controleren of minstens één optie van het inspectiedoel is ingevuld
    isGoalFilled(goal) {
      return Object.values(goal.options).some(option => option.value !== "");
    },
    // Datum weergeven als "DD-MM-YYYY"
    formatDate(dateString) {
      const [year, month, day] = dateString.split('-');
      return `${day}-${month}-${year}`;
    }
  },
  // InspectieData ophalen
  mounted() {
    fetchInspections()
      .then(data => {
        this.inspections = data;
      });
  }
}
</script>

<style scoped>
.inspection-card {
  width: 100%;
  border-radius: 15px;
  background: rgb(var(--v-theme-surface));
  margin-bottom: 15px;
  margin-top: -12px;
}
.v-card-title {
  font-size: 1rem;
  letter-spacing: 0;
  text-align: left;
  line-height: 1.5;
  padding: 1rem;
  background-color: rgb(var(--v-theme-surface-variant));
}
.v-card-title-date {
  font-size: 0.9rem;
  font-style: italic;
}
.v-list-item-title {
  color: rgb(var(--v-theme-primary));
  font-size: 0.9rem;
  font-weight: 500;
  padding-right: 5px;
}
.v-list-items {
  font-size: 0.9rem;
}
.option-value {
  font-weight: 600;
}
.icard-btn {
  background-color: rgb(var(--v-theme-surface-variant));
  font-size: 0.775rem;
  text-transform: initial;
}
</style>