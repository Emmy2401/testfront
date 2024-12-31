import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import ProductsList from '@/views/ProductsList.vue'
import AddProduct from '@/views/AddProduct.vue'
import UpdateProduct from '@/views/UpdateProduct.vue'
import HospitalSearch from '@/views/HospitalSearch.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/', // Redirige la racine vers '/login'
    redirect: '/login',
  },
  {
    path: '/produits',
    name: 'ProductsList',
    component: ProductsList
  },
  {
    path: '/produits/add',
    name: 'AddProduct',
    component: AddProduct
  },
  {
    // Exemple de route pour la mise à jour d'un produit,
    // on récupère l'ID dans les params
    path: '/produits/update/:id',
    name: 'UpdateProduct',
    component: UpdateProduct,
    props: true // pour passer l'id en tant que prop
  },

  // Redirection par défaut
  {
    path: '/',
    redirect: '/produits'
  } ,
  {
    path: '/hospitals',
    name: 'HospitalSearch',
    component: HospitalSearch,
  }
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
