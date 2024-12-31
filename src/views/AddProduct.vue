<template>
  <div class="container">
    <h2>Ajouter un Produit</h2>
    <form @submit.prevent="submitProduct">
      <div>
        <label for="name">Nom :</label>
        <input type="text" id="name" v-model="product.name" required />
      </div>
      <div>
        <label for="description">Description :</label>
        <input type="text" id="description" v-model="product.description" required />
      </div>
      <div>
        <label for="price">Prix :</label>
        <input type="number" step="0.01" id="price" v-model="product.price" required />
      </div>
      <div>
        <label for="code">Code :</label>
        <input type="text" id="code" v-model="product.code" required />
      </div>
      <div>
        <label for="available">Disponible :</label>
        <input type="checkbox" id="available" v-model="product.available" />
      </div>
      <button type="submit">Ajouter</button>
    </form>
  </div>
</template>

<script>
import ProductAxios from '@/api/ProductsAxios'

export default {
  name: 'AddProduct',
  data() {
    return {
      product: {
        name: '',
        description: '',
        price: null,
        code: '',
        available: true,
      },
    }
  },
  methods: {
    validateProduct() {
      return (
        this.product.name && this.product.description && this.product.price && this.product.code
      )
    },
    async submitProduct() {
      if (!this.validateProduct()) {
        alert('Veuillez remplir tous les champs obligatoires.')
        return
      }
      try {
        // Envoi des données au backend
        const response = await ProductAxios.post('', this.product)

        alert(`Produit ajouté avec succès : ${response.data.name}`)
        // Redirection vers la liste des produits
        this.$router.push('/produits')
      } catch (error) {
        console.error(error)
        alert('Erreur lors de l’ajout du produit. Veuillez vérifier les données.')
      }
    },
  },
}
</script>

<style scoped>
.container {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 0 auto;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type='text'],
input[type='number'],
input[type='checkbox'] {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}
</style>
