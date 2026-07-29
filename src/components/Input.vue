<!-- AppInput.vue -->
<template>
  <input
    class="app-input"
    :style="{ backgroundColor: color, color: color_titulo,width: ancho }"
    :placeholder="titulo"
  />
</template>

<script setup>
defineProps({
  titulo: {
    type: String,
    default: 'Escribe aquí'
  },
  color: {
    type: String,
    default: 'white'
  },
  color_titulo: {
    type: String,
    default: '#b81933'
  },
  ancho:{
    type: String,
    default: '250px'
  }
})
</script>

<style scoped>
.app-input {
  padding: 12px 24px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-weight: 600;
  transition: opacity 0.2s;
}
</style>