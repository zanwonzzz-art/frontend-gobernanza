import { createApp } from 'vue';
import App from './App.vue';
import router from './router/routes.ts'; 
import './assets/main.css';   // o la ruta donde esté tu main.css

createApp(App)
  .use(router)                    
  .mount('#app');