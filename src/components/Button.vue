<!-- Button.vue -->
<template>
  <button
    class="app-btn"
    :style="{
      backgroundColor: color_boton,
      color: color_titulo,
      width: ancho,
      height: alto,
      fontSize: tamano_texto,
      borderRadius: bordes
    }"
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
  ancho: {
    type: String,
    default: 'auto'
  },
  alto: {
    type: String,
    default: 'auto'
  },
  tamano_texto: {
    type: String,
    default: '1rem'
  },
  bordes: {
    type: String,
    default: '8px'
  },
})

defineEmits(['click'])
</script>

<style scoped>
.app-btn {
  padding: 12px 24px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  box-sizing: border-box;
  transition: opacity 0.2s;
}
.app-btn:hover {
  opacity: 0.85;
}
</style>