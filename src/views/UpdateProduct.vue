<template>
  <div class="container">
    <h2>Modifier le Produit {{ product.id }}</h2>

    <form @submit.prevent="submitUpdateProduct">
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

      <button type="submit">Mettre à jour</button>
    </form>
  </div>
</template>

<script>
import ProductAxios from '@/api/ProductsAxios'

export default {
  name: 'UpdateProduct',
  props: ['id'], // Récupéré depuis le router
  data() {
    return {
      product: {
        id: null,
        name: '',
        description: '',
        price: null,
        code: '',
        available: true,
      },
    }
  },
  async mounted() {
    await this.getProductDetail()
  },
  methods: {
    validateProduct() {
      return (
        this.product.name && this.product.description && this.product.price && this.product.code
      )
    },
    async getProductDetail() {
      try {
        const response = await ProductAxios.get(`/${this.id}`)
        this.product = response.data // Charge les détails du produit
      } catch (error) {
        console.error(error)
        alert('Erreur lors de la récupération du produit.')
      }
    },
    async submitUpdateProduct() {
      if (!this.validateProduct()) {
        alert('Veuillez remplir tous les champs obligatoires.')
        return
      }
      try {
        await ProductAxios.put(`/${this.id}`, this.product)
        alert(`Produit ${this.product.name} mis à jour avec succès !`)
        this.$router.push('/produits') // Redirection après succès
      } catch (error) {
        console.error(error)
        alert('Erreur lors de la mise à jour du produit.')
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
