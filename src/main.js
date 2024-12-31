import './assets/styles.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

createApp(App)
  .use(router) // Utilisation de Vue Router
  .mount('#app');

  