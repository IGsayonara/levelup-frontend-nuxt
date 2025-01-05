<template>
  <label class="switch">
    <input
      type="checkbox"
      :checked="isDark"
      @input="toggleTheme"
    >
    <span class="slider round" />
  </label>
</template>

<script setup lang="ts">
const { toggleTheme, isDark } = useTheme()
</script>

<style scoped lang="scss">
.switch {
  position: relative;
  display: inline-block;
  width: 3.5em;  /* Smaller width */
  height: 1.8em;  /* Smaller height */
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* Luxury-style slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--border);
  transition: background-color 0.4s ease, box-shadow 0.3s ease;
  border-radius: 50px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

/* Transition for the toggle circle */
.slider:before {
  position: absolute;
  content: "";
  height: 1.4em;  /* Smaller toggle circle */
  width: 1.4em;   /* Smaller toggle circle */
  left: 0.2em;
  bottom: 0.2em;
  background-color: var(--strong);
  border-radius: 50%;
  transition: transform 0.4s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
}

/* Switch colors when checked */
input:checked + .slider {
  background-color: var(--highlight);
  box-shadow: 0 2px 8px rgba(0, 184, 166, 0.4);
}

input:checked + .slider:before {
  transform: translateX(1.7em);  /* Adjusted for smaller movement */
}

/* Focus effect for accessibility */
input:focus + .slider {
  box-shadow: 0 0 1px var(--highlight);
}

/* Rounded slider with luxury feel */
.slider.round {
  border-radius: 50px;
}

.slider.round:before {
  border-radius: 50%;
}

/* Active state */
input:checked + .slider {
  background-color: var(--highlight);
}
</style>
