<template>
    <v-sheet color="orange" elevation="3" rounded="lg">
      <v-tabs
        v-model="tab"
        :items="tabs"
        align-tabs="center"
        color="black"
        height="60"
        width="700"
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
        icon: 'mdi-book-open-page-variant',
        text: 'Readme',
        value: 'tab-1',
      },
      {
        icon: 'mdi-handshake-outline',
        text: 'Code of Conduct',
        value: 'tab-2',
      },
      {
        icon: 'mdi-license',
        text: 'MIT License',
        value: 'tab-3',
      },
      {
        icon: 'mdi-shield-lock-outline',
        text: 'Security',
        value: 'tab-4',
      },
    ]
</script>
