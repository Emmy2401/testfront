<template>
    <div class="container">
      <h2>Recherche d'hôpitaux</h2>
  
      <!-- Affichage de la position -->
      <div class="position-section">
        <p><strong>Votre position :</strong> Latitude: {{ userLocation.lat }}, Longitude: {{ userLocation.lng }}</p>
      </div>
  
      <!-- Sélection de spécialité et recherche -->
      <div class="search-section">
        <label for="specialty">Sélectionnez une spécialité médicale :</label>
        <select v-model="selectedSpecialty" id="specialty">
          <option v-for="specialty in specialties" :key="specialty" :value="specialty">
            {{ specialty }}
          </option>
        </select>
        <button @click="searchHospitals">Rechercher</button>
      </div>
  
      <!-- Tableau des résultats -->
      <div v-if="hospitals.length > 0" class="results-section">
        <h3>Résultats</h3>
        <table>
          <thead>
            <tr>
              <th>Nom de l'hôpital</th>
              <th>Distance (km)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="hospital in hospitals" :key="hospital.id">
              <td>{{ hospital.name }}</td>
              <td>{{ hospital.distance.toFixed(2) }} km</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HospitalSearch',
    data() {
      return {
        userLocation: { lat: 48.8014, lng: 2.1301 }, // Position fixe : Versailles
        selectedSpecialty: '', // Spécialité sélectionnée
        specialties: ['Cardiologie', 'Neurologie', 'Pédiatrie'], // Liste fictive
        hospitals: [], // Liste des résultats
        hospitalList: [ // Données fictives d'hôpitaux
          { id: 1, name: 'Hôpital A', lat: 48.8566, lng: 2.3522 }, // Paris
          { id: 2, name: 'Hôpital B', lat: 48.7741, lng: 2.2003 }, // Boulogne-Billancourt
          { id: 3, name: 'Hôpital C', lat: 48.8802, lng: 2.3470 }, // Saint-Denis
        ],
      };
    },
    methods: {
      searchHospitals() {
        if (!this.selectedSpecialty) {
          alert('Veuillez sélectionner une spécialité médicale.');
          return;
        }
  
        // Calcul des distances entre la position fixe et chaque hôpital
        this.hospitals = this.hospitalList.map((hospital) => {
          const distance = this.calculateDistance(
            this.userLocation.lat,
            this.userLocation.lng,
            hospital.lat,
            hospital.lng
          );
          return { ...hospital, distance };
        }).sort((a, b) => a.distance - b.distance); // Trier par distance croissante
      },
      calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Rayon de la Terre en km
        const dLat = this.deg2rad(lat2 - lat1);
        const dLon = this.deg2rad(lon2 - lon1);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(this.deg2rad(lat1)) *
            Math.cos(this.deg2rad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
      },
      deg2rad(deg) {
        return deg * (Math.PI / 180);
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    background: #fff;
    padding: 20px 30px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 800px;
    margin-top: 40px;
  }
  
  h2, h3 {
    text-align: center;
    margin-bottom: 15px;
  }
  
  .position-section {
    margin-bottom: 20px;
  }
  
  .search-section {
    margin-bottom: 20px;
  }
  
  select {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .results-section table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  table th, table td {
    padding: 10px;
    text-align: left;
    border: 1px solid #ddd;
  }
  
  table th {
    background-color: #f4f4f9;
  }
  </style>
  