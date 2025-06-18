<template>
    <v-container class="d-flex justify-center">
      <v-card max-width="1200" class="d-flex flex-row">
        <v-img
          :src="imageSrc"
          height="400px"
          cover
          class="w-50"
        ></v-img>p
  
        <v-card-text class="w-50 d-flex flex-column justify-center px-6">
          <v-card-title class="text-h4 font-weight-bold">{{ title }}</v-card-title>
          <v-card-subtitle class="text-subtitle-1 mt-2">{{ subtitle }}</v-card-subtitle>
          <v-card-text class="text-body-1 mt-4">{{ description }}</v-card-text>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const imageSrc = ref('https://agnieszka.si/img/portfolio/orange-2023/orange-ilustr-2023.png');
  const title = ref('Bienvenido a TreeMiner');
  const subtitle = ref('Explorando árboles de decisión');
  const description = ref('Descubre cómo el widget de Tree en Orange Data Mining puede ayudarte a visualizar y analizar árboles de decisión de manera intuitiva y poderosa.');
  </script>
  
  <style scoped>
  .w-50 {
    width: 50%;
  }
  </style>
  