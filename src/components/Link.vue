<!-- Link.vue -->
<template>
  <a
    class="app-link"
    :href="href"
    :style="{
      color: color_titulo,
      fontSize: tamano_texto,
      textDecoration: subrayado
    }"
    @click="$emit('click', $event)"
  >
    {{ titulo }}
  </a>
</template>

<script setup>
defineProps({
  titulo: {
    type: String,
    default: 'Enlace'
  },
  href: {
    type: String,
    default: '#'
  },
  color_titulo: {
    type: String,
    default: '#b81933'
  },
  tamano_texto: {
    type: String,
    default: '1rem'
  },
  subrayado: {
    type: String,
    default: 'underline'
  },
})

defineEmits(['click'])
</script>

<style scoped>
.app-link {
  cursor: pointer;
  font-weight: 600;
  transition: opacity 0.2s;
}
.app-link:hover {
  opacity: 0.75;
}
</style>