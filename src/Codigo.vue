<script setup lang="ts">
import Button from './components/Button.vue';
import Input from './components/Input.vue';
import trace from '@/assets/trace.png';
import Alert from './components/Alert.vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import cerrar from '@/assets/cerrar.png'

const route = useRoute();

const digitos = ref(['', '', '', '', '', '']);
const error = ref('');
const uid = ref('');

const mostrarAlert = ref(false);
const alertData = ref({
  titulo_principal: '',
  descripcion: '',
  codigo: '',
});

import { nextTick } from 'vue';   // agrégalo a tus imports de vue

async function onDigito(valor: string, i: number) {
  const soloNumero = valor.replace(/[^0-9]/g, '').slice(-1);

  // Primero vaciamos, luego ponemos el valor filtrado.
  // Esto fuerza a Vue a re-renderizar el input y descartar la letra.
  const copia = [...digitos.value];
  copia[i] = soloNumero;
  digitos.value = copia;

  // Forzamos la actualización del DOM
  await nextTick();
  digitos.value = [...digitos.value];
}

const IDP_URL = 'http://localhost:3000';

onMounted(() => {
  uid.value = (route.query.uid as string) || '';
  if (!uid.value) {
    error.value = 'Falta el identificador de sesión.';
  }
});

function abrirAlert(titulo: string, descripcion: string, codigo: string) {
  alertData.value = { titulo_principal: titulo, descripcion, codigo };
  mostrarAlert.value = true;
}

async function verify() {
  const codigo = digitos.value.join('');

  if (codigo.length !== 6) {
    abrirAlert('Código incompleto', 'Ingresa los 6 dígitos', '');
    return;
  }


  try {
    const res = await fetch(`${IDP_URL}/oidc/interaction/${uid.value}/otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ codigo }),
    });

    const data = await res.json();

    if (!res.ok) {
      abrirAlert(
        'Error de verificación',
        data.message || 'Código incorrecto', 
        data.code || '',                        
      );
      return;
    }

    // Codigo correcto: el IdP nos da la URL para continuar el flujo OIDC
    if (data.redirectTo) {
      // Redirigimos el navegador (sale de Vue, continua el flujo del IdP)
      window.location.href = data.redirectTo;
    }
  } catch (e) {
    abrirAlert('Error de conexión', 'La solicitud tardó demasiado tiempo, por favor intenta nuevamente', 'SRV_003');
  }
}
</script>

<template>
  <div class="login-container">
    <img :src="trace" alt="Trace logo" class="login-logo" />

    <p v-if="error" style="color: #ff6b6b; margin-bottom: 10px;">{{ error }}</p>

    <div class="otp-form">
      <div class="otp-inputs">
       <Input
          v-for="(d, i) in digitos"
          :key="i"
          :model-value="digitos[i]"
          @update:model-value="onDigito($event, i)"
          titulo="0"
          tipo="text"
          color_titulo="#000000"
          ancho="48px"
          alto="48px"
          tamano_texto="1.3rem"
          alineado="center"
          bordes="10px"
        />
      </div>

      <Button
        titulo="Verify"
        color_boton="#FFFFFF"
        color_titulo="#000000"
        ancho="140px"
        alto="48px"
        bordes="50px"
        class="login-button"
        @click="verify"
      />
    </div>

    <div v-if="mostrarAlert" class="alert-overlay" @click.self="mostrarAlert = false">
      <Alert
        :titulo_principal="alertData.titulo_principal"
        :descripcion="alertData.descripcion"
        :codigo="alertData.codigo"
        :imagen="cerrar"
        titulo="Entendido"
        color_boton="#b81933"
        color_titulo="#FFFFFF"
        @click="mostrarAlert = false"
      />
    </div>

  </div>
</template>

<style scoped>
/* ...tu mismo style, no cambia... */
.alert-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.login-container {
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: #262626;
  padding: 60px 20px 40px;
  box-sizing: border-box;
}
.login-logo {
  width: 100%;
  max-width: 350px;
  margin-bottom: 60px;
}
.otp-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 40px;
}
.otp-inputs {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: nowrap;
}
@media (min-width: 1024px) {
  .login-container { padding-top: 80px; }
  .login-logo { max-width: 400px; margin-bottom: 70px; }
}
@media (max-width: 768px) {
  .login-logo { max-width: 280px; margin-bottom: 50px; }
}
@media (max-width: 480px) {
  .login-container { padding: 40px 16px 30px; }
  .login-logo { max-width: 220px; margin-bottom: 40px; }
  .otp-inputs { gap: 8px; }
}
</style>