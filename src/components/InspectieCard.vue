<!-- InspectieCard.vue -->
<template>
  <!-- Loop door elk inspectieData object -->
  <div v-for="(inspectionData, index) in inspectieData" :key="index">
    <!-- Loop door de inspecties -->
    <div v-for="(inspection, inspectionIndex) in inspectionData.inspections" :key="inspectionIndex">
      <v-card>
        <!-- Toon het adres van de inspectie -->
        <v-card-title>{{ inspection.address }}</v-card-title> 
        <v-card-text>
          <!-- Loop door de inspectiedoelen -->
          <div v-for="(goal, goalIndex) in inspection.inspection_goals" :key="goalIndex"> 
            <!-- Controleren of de opties zijn ingevuld -->
            <template v-if="isGoalFilled(goal)">
              <h3>{{ goal.goal }}</h3>
              <!-- Loop door elke option binnen de "goal" options -->
              <div v-for="(option, optionName) in goal.options" :key="optionName">
                <!-- Voeg key en value toe -->
                <p>{{ optionName }}: <span class="option-value">{{ option.value }}</span></p>
              </div>
            </template>
            <template v-else>
              <h3>{{ goal.goal }}</h3>
              <p>Inspectiedoel niet ingevuld.</p>
            </template>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InspectieCard',
  props: {
    inspectieData: Object
  },
  methods: {
    isGoalFilled(goal) {
      // Controleren of minstens één optie is ingevuld
      return Object.values(goal.options).some(option => option.value !== "");
    }
  }
}
</script>

<style scoped>
.v-card {
  width: 100%;
  border-radius: 15px;
  background: rgb(var(--v-theme-surface));
  margin-bottom: 12px;
  margin-top: -12px;
}
.icard-content {
  display: flex;
}
.v-list-item {
  min-height: 30px;
}
.v-list-item-title {
  color: rgb(var(--v-theme-primary));
  font-size: 0.875rem;
  padding-right: 5px;
}
.v-list-item-subtitle {
  line-height: 1.7;
}
</style>