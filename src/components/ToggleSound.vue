<template>
  <v-col class="switch-container">
    <v-switch v-model="soundEnabled" @change="setSound" hide-details color="primary">
      <template #prepend>
        <v-icon color="yellow-darken-3">{{ soundEnabled ? '' : 'mdi-volume-off' }}</v-icon>
      </template>
      <template #append>
        <v-icon color="yellow-darken-3">{{ soundEnabled ? 'mdi-volume-high' : '' }}</v-icon>
      </template>
    </v-switch>
  </v-col>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const soundEnabled = ref(true);

const setSound = () => {
  localStorage.setItem('soundEnabled', soundEnabled.value.toString());
  console.log(soundEnabled.value);
};
onMounted(() => {
  const savedSoundSetting = localStorage.getItem('soundEnabled');
  if (savedSoundSetting !== null) {
    soundEnabled.value = savedSoundSetting === 'true';
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
  opacity: 0.3;
}
.v-switch__thumb {
  background-color: white;
  font-size: 24px;
}
</style>