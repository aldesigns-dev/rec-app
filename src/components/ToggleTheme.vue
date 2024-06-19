<template>
  <v-col class="switch-container">
    <v-switch v-model="isDarkMode" @change="setTheme" hide-details>
      <template #prepend>
        <v-icon color="yellow-darken-3">{{ isDarkMode ? '' : 'mdi-white-balance-sunny' }}</v-icon>
      </template>
      <template #append>
        <v-icon color="yellow-darken-3">{{ isDarkMode ? 'mdi-moon-waning-crescent' : '' }}</v-icon>
      </template>
    </v-switch>
  </v-col>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useTheme } from 'vuetify';

const theme = useTheme();
const isDarkMode = ref(false);

const setTheme = () => {
  const selectedThemeName = isDarkMode.value ? 'customDarkTheme' : 'customLightTheme';
  theme.global.name.value = selectedThemeName;
  localStorage.setItem('isDarkMode', isDarkMode.value);
  console.log(selectedThemeName);
};
onMounted(() => {
  const savedTheme = localStorage.getItem('isDarkMode');
  if (savedTheme !== null) {
    isDarkMode.value = savedTheme === 'true';
    setTheme();
  }
});
</script>

<style>
.switch-container {
  display: flex;
  justify-content: center;
}
.v-switch__track {
  background-color:gray;
}
.v-switch__thumb {
  background-color: white;
  font-size: 24px;
}
</style>