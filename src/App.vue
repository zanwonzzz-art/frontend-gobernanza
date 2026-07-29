<script setup lang="ts">
import Alert from './components/Alert.vue';
import cerrar from '@/assets/cerrar.png';
</script>

<template>
  <Alert :imagen="cerrar" 
         titulo_principal="Código Incorrecto" 
         descripcion="El código de verificación es incorrecto"
         codigo="OTP-001"
         color_boton="#FF0000"
         color_titulo="#FFFFF"
         titulo="OK"/>
</template>