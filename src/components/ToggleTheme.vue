<!-- ToggleTheme.vue -->
<template>
  <div>
    <v-switch v-model="isDarkMode" @change="setTheme">
      <template #prepend>
        <v-icon color="yellow-darken-3">{{ isDarkMode ? 'mdi-moon-waning-crescent' : 'mdi-white-balance-sunny' }}</v-icon>
      </template>
    </v-switch>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTheme } from "vuetify";

const theme = useTheme();
const isDarkMode = ref(false);

const setTheme = () => {
  const selectedThemeName = isDarkMode.value ? "customDarkTheme" : "customLightTheme";
  theme.global.name.value = selectedThemeName;
  console.log(selectedThemeName);
};
</script>

<style>
.v-switch__track {
  background-color:gray;
}
.v-switch__thumb {
  background-color: white;
}
</style>