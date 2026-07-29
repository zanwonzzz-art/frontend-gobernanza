<!-- Input.vue -->
<template>
  <input
    class="app-input"
    :style="{
      backgroundColor: color,
      color: color_titulo,
      width: ancho,
      height: alto,
      fontSize: tamano_texto,
      textAlign: alineado,
      borderRadius: bordes
    }"
    :placeholder="titulo"
  />
</template>

<script setup>
defineProps({
  titulo: { type: String, default: 'Escribe aquí' },
  color: { type: String, default: 'white' },
  color_titulo: { type: String, default: '#333333' },
  ancho: { type: String, default: '100%' },
  alto: { type: String, default: 'auto' },
  tamano_texto: { type: String, default: '1rem' },
  alineado: { type: String, default: 'left' },
  bordes: { type: String, default: '10px' },
})
</script>

<style scoped>
.app-input {
  padding: 12px 16px;
  border: 1px solid #ccc;
  font-weight: 600;
  box-sizing: border-box;
  transition: opacity 0.2s;
}

.app-input::placeholder {
  color: #999999;
  opacity: 1;
}

.app-input:focus {
  outline: none;
  border-color: #b81933;
}
</style>