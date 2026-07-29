<!-- AppButton.vue -->
<template>
  <button
    class="app-btn"
    :style="{ backgroundColor: color_boton,  color: color_titulo }"
    @click="$emit('click')"
  >
    {{ titulo }}
  </button>
</template>

<script setup>
defineProps({
  titulo: {
    type: String,
    default: 'Botón'
  },
  color_boton: {
    type: String,
    default: '#b81933'
  },
  color_titulo: {
    type: String,
    default: '#b81933'
  },
})

defineEmits(['click'])
</script>

<style scoped>
.app-btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}
.app-btn:hover {
  opacity: 0.85;
}
</style>