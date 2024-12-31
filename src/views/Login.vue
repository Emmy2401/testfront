<template>
  <div class="login-container">
    <h2>Connexion</h2>
    <form @submit.prevent="login">
      <div>
        <label for="username">Nom d'utilisateur</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div>
        <label for="password">Mot de passe</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Se connecter</button>
    </form>
    <p>
      Pas encore inscrit ? <router-link to="/register">Créer un compte</router-link>
    </p>
  </div>
</template>

<script>
import axios from '@/api/axios';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('/login', {
          username: this.username,
          password: this.password,
        });

        // Stocker le token reçu
        localStorage.setItem('token', response.data.token);

        alert('Connexion réussie !');
        this.$router.push('/produits'); // Redirige vers une page après connexion
      } catch (error) {
        console.error(error);
        alert('Erreur de connexion. Vérifiez vos identifiants.');
      }
    },
  },
};
</script>
