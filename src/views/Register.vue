<template>
  <div class="register-container">
    <h2>Inscription</h2>
    <form @submit.prevent="register">
      <div>
        <label for="username">Nom d'utilisateur</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div>
        <label for="password">Mot de passe</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Créer un compte</button>
    </form>
    <p>
      Déjà inscrit ? <router-link to="/login">Se connecter</router-link>
    </p>
  </div>
</template>

<script>
import axios from '@/api/axios';

export default {
  name: 'Register',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async register() {
      try {
        const response = await axios.post('/register', {
          username: this.username,
          password: this.password,
        });

        alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
        this.$router.push('/login'); // Redirige vers la page de connexion
      } catch (error) {
        console.error(error);
        alert('Erreur lors de l’inscription. Veuillez réessayer.');
      }
    },
  },
};
</script>
