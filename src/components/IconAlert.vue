<!-- AppButton.vue -->
<template>
    <img class="app-img" 
         :src="imagen" 
         :alt="pie_pagina"
         :style="{ width: ancho }">
</template>

<script setup>
import cargador from '@/assets/cargador.png'

defineProps({
  imagen: {
    type: String,
    default: cargador
  },
  pie_pagina: {
    type: String,
    default: 'Imagen'
  },
  ancho:{
    type: String,
    default: '100px'
  }
})
</script>