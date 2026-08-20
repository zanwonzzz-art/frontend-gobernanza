<script setup lang="ts">
import Button from './components/Button.vue';
import Input from './components/Input.vue';
import trace from '@/assets/trace.png'
import Alert from './components/Alert.vue';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import cerrar from '@/assets/cerrar.png'

const route = useRoute();
const router = useRouter();

const username = ref('');
const password = ref('');
const error = ref('');
const uid = ref('');

const IDP_URL = 'http://localhost:3000';

const mostrarAlert = ref(false);
const alertData = ref({
  titulo_principal: '',
  descripcion: '',
  codigo: '',
});

function abrirAlert(titulo: string, descripcion: string, codigo: string) {
  alertData.value = { titulo_principal: titulo, descripcion, codigo };
  mostrarAlert.value = true;
}

// Al cargar, leemos el uid de la URL (?uid=abc123)
onMounted(() => {
  uid.value = (route.query.uid as string) || '';
  if (!uid.value) {
    error.value = 'Falta el identificador de sesión. Vuelve a iniciar desde la app.';
  }
});

async function login() {
  error.value = '';

  try {
    const res = await fetch(`${IDP_URL}/oidc/interaction/${uid.value}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',   // para que viajen las cookies de la interaction
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      // El IdP respondió con error (401, etc.)
      abrirAlert(
        'Credenciales Incorrectas',
        data.msg?.msg,
        data.msg?.code || '',                     
      );
      return;
    }

    // Password correcto: el IdP dice "ahora el MFA"
    if (data.step === 'mfa') {
      // Vamos a la pantalla del código, llevando el uid
      router.push(`/mfa?uid=${uid.value}`);
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

    <div class="login-form">
      <Input
        v-model="username"
        titulo="Username"
        color_titulo="#000000"
        ancho="100%"
        alto="48px"
        bordes="25px"
      />
      <Input
        v-model="password"
        tipo="password"
        titulo="Password"
        color_titulo="#000000"
        ancho="100%"
        alto="48px"
        bordes="25px"
      />
      <Button
        titulo="Sign In"
        color_boton="#FFFFFF"
        color_titulo="#000000"
        ancho="140px"
        alto="48px"
        bordes="50px"
        class="login-button"
        @click="login"
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

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 340px;
  gap: 20px;
}

.login-button {
  margin-top: 10px;
}

/* Laptop / Desktop */
@media (min-width: 1024px) {
  .login-container {
    padding-top: 80px;
  }

  .login-logo {
    max-width: 400px;
    margin-bottom: 70px;
  }

  .login-form {
    max-width: 380px;
  }
}

/* Tablet */
@media (max-width: 768px) {
  .login-logo {
    max-width: 280px;
    margin-bottom: 50px;
  }
}

/* Móvil */
@media (max-width: 480px) {
  .login-container {
    padding: 40px 16px 30px;
  }

  .login-logo {
    max-width: 220px;
    margin-bottom: 40px;
  }

  .login-form {
    max-width: 100%;
    gap: 16px;
  }
}
</style>