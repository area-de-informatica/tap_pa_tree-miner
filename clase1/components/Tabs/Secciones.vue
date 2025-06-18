<template>
    <v-sheet color="orange" elevation="3" rounded="lg" max-width="1200" class="mx-auto">
      <v-tabs
        v-model="tab"
        :items="tabs"
        align-tabs="center"
        color="black"
        height="60"
        width="100%"
        slider-color="black"
      >
        <template v-slot:tab="{ item }">
          <v-tab
            :prepend-icon="item.icon"
            :text="item.text"
            :value="item.value"
            class="text-none text-black"
          ></v-tab>
        </template>
  
        <template v-slot:item="{ item }">
          <v-tabs-window-item :value="item.value" class="pa-4 text-black">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!
          </v-tabs-window-item>
        </template>
      </v-tabs>
    </v-sheet>
</template>

<script setup>
    import { shallowRef } from 'vue'
  
    const tab = shallowRef('tab-1')
    const tabs = [
      {
        icon: 'mdi-home',
        text: 'Inicio',
        value: 'tab-1',
      },
      {
        icon: 'mdi-book-open',
        text: 'Contenido',
        value: 'tab-2',
      },
      {
        icon: 'mdi-pencil-box',
        text: 'Actividades',
        value: 'tab-3',
      },
      {
        icon: 'mdi-check-circle',
        text: 'Evaluación',
        value: 'tab-4',
      },
      {
        icon: 'mdi-information',
        text: 'Créditos',
        value: 'tab-5',
      },
    ]
</script>