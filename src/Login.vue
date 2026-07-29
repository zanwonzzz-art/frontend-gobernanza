<script setup lang="ts">
import Button from './components/Button.vue';
import Input from './components/Input.vue';
import trace from '@/assets/trace.png'
</script>

<template>
  <div class="login-container">
    <img :src="trace" alt="Trace logo" class="login-logo" />

    <div class="login-form">
      <Input
        titulo="Username"
        color_titulo="#000000"
        ancho="100%"
        alto="48px"
        bordes="25px"
      />
      <Input
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
      />
    </div>
  </div>
</template>

<style scoped>
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