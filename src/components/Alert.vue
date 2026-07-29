<!-- Alert.vue -->
<template>
  <div class="app-alert">
    <IconAlert :imagen="imagen" :ancho="ancho" class="alert-icon" />

    <h2 class="alert-titulo">{{ titulo_principal }}</h2>
    <p class="alert-descripcion">{{ descripcion }}</p>

    <span class="alert-codigo">{{ codigo }}</span>

    <Button
      :titulo="titulo"
      :color_boton="color_boton"
      :color_titulo="color_titulo"
      class="alert-boton"
    />
  </div>
</template>

<script setup>
import Button from './Button.vue';
import IconAlert from './IconAlert.vue';

defineProps({
  titulo: {
    type: String,
    default: 'OK'
  },
  titulo_principal: {
    type: String,
    default: 'Título'
  },
  descripcion: {
    type: String,
    default: ''
  },
  codigo: {
    type: String,
    default: ''
  },
  color_boton: {
    type: String,
    default: ''
  },
  color_titulo: {
    type: String,
    default: ''
  },
  imagen: {
    type: String,
    default: ''
  },
  ancho: {
    type: String,
    default: '80px'
  },
})
</script>

<style scoped>
.app-alert {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: white;
  padding: 40px 32px;
  border-radius: 16px;
  max-width: 400px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.alert-icon {
  margin-bottom: 24px;
}

.alert-titulo {
  font-size: 1.6rem;
  font-weight: 800;
  color: #1a1a1a;
  margin: 0 0 16px 0;
}

.alert-descripcion {
  font-size: 1rem;
  color: #555;
  margin: 0 0 24px 0;
}

.alert-codigo {
  background: #f0f1f3;
  color: #667085;
  font-weight: 700;
  font-size: 0.9rem;
  padding: 8px 16px;
  border-radius: 8px;
  margin-bottom: 24px;
  letter-spacing: 0.5px;
}

.alert-boton {
  width: 100%;
}
</style>