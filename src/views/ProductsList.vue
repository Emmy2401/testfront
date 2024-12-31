<template>
  <div class="container">
    <h2>Liste des Produits</h2>
  
    <!-- Section de recherche -->
    <div class="search-section">
      <h3>Rechercher un produit</h3>
      <div>
        <input
          type="number"
          v-model="searchId"
          placeholder="Chercher par ID"
        />
        <button @click="getProductById">Rechercher ID</button>
      </div>
      <div>
        <input
          type="text"
          v-model="searchCode"
          placeholder="Chercher par Code"
        />
        <button @click="getProductByCode">Rechercher Code</button>
      </div>
    </div>
  
    <!-- Section de la liste -->
    <ul>
      <li v-for="product in products" :key="product.id" class="product-item">
        <strong>{{ product.name }}</strong> ({{ product.code }})
        - Prix: {{ product.price }} €
        <button @click="updateProduct(product.id)">Update</button>
      </li>
    </ul>
  
    <!-- Lien pour ajouter un produit -->
    <router-link to="/produits/add">Ajouter un produit</router-link>
  </div>
</template>
  
<script>
import productsAxios from '@/api/ProductsAxios';

export default {
  name: 'ProductsList',
  data() {
    return {
      products: [],    // Contiendra la liste des produits
      searchId: null,  // Pour la recherche par ID
      searchCode: ''   // Pour la recherche par Code
    }
  },
  mounted() {
    this.getAllProducts();
  },
  methods: {
    async getAllProducts() {
      try {
        const response = await productsAxios.get('');
        this.products = response.data; // Récupère les produits depuis l'API
      } catch (error) {
        console.error(error);
        alert('Erreur lors de la récupération des produits.');
      }
    },
    async getProductById() {
      if (!this.searchId) {
        alert('Veuillez saisir un ID');
        return;
      }

      try {
        const response = await productsAxios.get(`/${this.searchId}`);
        this.products = [response.data]; // Affiche uniquement le produit trouvé
      } catch (error) {
        console.error(error);
        alert('Produit non trouvé ou erreur.');
      }
    },
    async getProductByCode() {
      if (!this.searchCode) {
        alert('Veuillez saisir un code');
        return;
      }

      try {
        const response = await productsAxios.get(`/code/${this.searchCode}`);
        this.products = [response.data]; // Affiche uniquement le produit trouvé
      } catch (error) {
        console.error(error);
        alert('Produit non trouvé ou erreur.');
      }
    },
    updateProduct(productId) {
      // Redirection vers la page d'update
      this.$router.push(`/produits/update/${productId}`);
    }
  }
}
</script>
  
<style scoped>
.container {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
}

.search-section {
  margin-bottom: 20px;
}

.product-item {
  margin-bottom: 10px;
}

button {
  margin-left: 10px;
}
</style>
