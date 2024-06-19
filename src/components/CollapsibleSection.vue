<template>
  <div class="collapsible-section" style="cursor: pointer;" @click="toggleCollapse">
    <span v-if="open">&#x25b2; {{ title }}</span>
    <span v-else>&#x25bc; {{ title }}</span>
  </div>
  <transition @after-enter="playOpenSound" @after-leave="playCloseSound">
    <div v-if="open">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: "CollapsibleSection",
  props: {
    title: String
  },
  data() {
    return {
      open: false,
      csOpenSound: null,
      csCloseSound: null
    }
  },
  created() {
    this.csOpenSound = new Audio(require("@/assets/cs-open.mp3"));
    this.csCloseSound = new Audio(require("@/assets/cs-close.mp3"));
  },
  methods: {
    toggleCollapse() {
      this.open = !this.open;
    },
    playOpenSound() {
      const soundEnabled = localStorage.getItem('soundEnabled') === 'true';
      if (soundEnabled) {
        this.csOpenSound.play();
      }
    },
    playCloseSound() {
      const soundEnabled = localStorage.getItem('soundEnabled') === 'true';
      if (soundEnabled) {
        this.csCloseSound.play();
      }
    },
  }
}
</script>

<style scoped>
.collapsible-section {
  width: 100%;
  border-radius: 15px;
  background: rgb(var(--v-theme-surface));
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0px 2px 1px -1px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)), 0px 1px 1px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)), 0px 1px 3px 0px var(--v-shadow-key-ambient-opacity, rgba(0, 0, 0, 0.12));
}
.collapsible-section span {
  color: rgb(var(--v-theme-primary));
  font-size: 0.875rem;
}
</style>