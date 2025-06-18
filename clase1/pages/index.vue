<script setup>
import { useStoreHome } from '@/stores/home'
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue'

const isLoading = ref(true)
const storeHome = useStoreHome()
const { homeData, currentSection } = storeToRefs(storeHome)

onMounted(async () => {
  try {
    await storeHome.fetchHomeData()
  } finally {
    isLoading.value = false
  }
})

const navigateToSection = (route) => {
  // Aquí puedes agregar la lógica de navegación
  console.log('Navegando a:', route)
}
</script>

<template>
  <div class="home-page">
    <!-- Loading State -->
    <div v-if="isLoading" class="loading-section">
      <v-container class="text-center py-12">
        <v-progress-circular
          indeterminate
          size="64"
          color="primary"
          class="mb-4"
        ></v-progress-circular>
        <p class="text-h6 text-grey-darken-1">Cargando TreeMiner...</p>
      </v-container>
    </div>

    <!-- Error State -->
    <div v-else-if="!homeData" class="error-section">
      <v-container class="text-center py-12">
        <v-icon size="64" color="error" class="mb-4">mdi-alert-circle-outline</v-icon>
        <p class="text-h6 text-error">Error al cargar la información</p>
      </v-container>
    </div>

    <!-- Main Content -->
    <div v-else>
      <!-- Hero Section -->
      <div class="hero-section">
        <v-container>
          <div class="text-center py-16">
            <v-icon :icon="homeData.hero.icon" size="100" color="white" class="mb-6"></v-icon>
            <h1 class="text-h1 font-weight-bold text-white mb-4">
              {{ homeData.hero.title }}
            </h1>
            <p class="text-h6 text-blue-lighten-4 mx-auto" style="max-width: 800px;">
              {{ homeData.hero.subtitle }}
            </p>
            <div class="mt-8">
            </div>
          </div>
        </v-container>
      </div>

      <v-container class="mt-8">
        <!-- Navigation Sections -->
        <v-row class="mb-12">
          <v-col cols="12">
            <h2 class="text-h3 font-weight-bold text-grey-darken-2 mb-6 text-center">
              Explora el Contenido
            </h2>
          </v-col>
          
          <v-col 
            v-for="section in homeData.navigation.sections" 
            :key="section.id"
            cols="12" 
            md="4"
          >
            <v-card 
              class="navigation-card h-100" 
              elevation="8" 
              rounded="xl"
              :class="`${section.color}-border`"
              @click="navigateToSection(section.route)"
            >
              <v-card-text class="pa-6 text-center">
                <v-avatar 
                  :color="section.color" 
                  size="80" 
                  class="mb-4"
                >
                  <v-icon :icon="section.icon" size="40" color="white"></v-icon>
                </v-avatar>
                <h3 class="text-h5 font-weight-bold mb-3">{{ section.title }}</h3>
                <p class="text-body-1 text-grey-darken-1 mb-4">{{ section.description }}</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Recommendations -->
        <v-row class="mb-12">
          <v-col cols="12">
            <v-card class="recommendations-card" elevation="8" rounded="xl">
              <div class="recommendations-header">
                <v-card-title class="text-h3 font-weight-bold text-white d-flex align-center">
                  <v-icon size="40" class="mr-3">mdi-lightbulb-outline</v-icon>
                  {{ homeData.recommendations.title }}
                </v-card-title>
              </div>
              
              <v-card-text class="pa-6">
                <v-row>
                  <v-col 
                    v-for="recommendation in homeData.recommendations.items" 
                    :key="recommendation.id"
                    cols="12" 
                    md="6"
                  >
                    <div class="recommendation-item">
                      <div class="recommendation-header mb-3">
                        <v-avatar 
                          :color="recommendation.color" 
                          size="48" 
                          class="mr-3"
                        >
                          <v-icon :icon="recommendation.icon" size="24" color="white"></v-icon>
                        </v-avatar>
                        <div>
                          <h4 class="text-h6 font-weight-bold">{{ recommendation.title }}</h4>
                          <v-chip 
                            :color="recommendation.color" 
                            variant="outlined" 
                            size="small"
                          >
                            Recomendación {{ recommendation.id }}
                          </v-chip>
                        </div>
                      </div>
                      <p class="text-body-1 text-grey-darken-1">{{ recommendation.description }}</p>
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Learning Outcomes -->
        <v-row class="mb-12">
          <v-col cols="12">
            <v-card class="learning-card" elevation="8" rounded="xl">
              <v-card-title class="pa-6 d-flex align-center">
                <v-icon size="32" color="success" class="mr-3">mdi-target</v-icon>
                <h2 class="text-h3 font-weight-bold">{{ homeData.learningOutcomes.title }}</h2>
              </v-card-title>
              
              <v-card-text class="pa-6">
                <v-row>
                  <v-col 
                    v-for="outcome in homeData.learningOutcomes.outcomes" 
                    :key="outcome.id"
                    cols="12" 
                    md="4"
                  >
                    <v-card 
                      class="outcome-card h-100" 
                      elevation="4" 
                      rounded="lg"
                      :class="`${outcome.color}-border`"
                    >
                      <v-card-text class="pa-4 text-center">
                        <v-avatar 
                          :color="outcome.color" 
                          size="64" 
                          class="mb-3"
                        >
                          <v-icon :icon="outcome.icon" size="32" color="white"></v-icon>
                        </v-avatar>
                        
                        <div class="mb-3">
                          <v-chip 
                            :color="outcome.color" 
                            variant="tonal" 
                            size="small"
                            class="mb-2"
                          >
                            {{ outcome.level }}
                          </v-chip>
                        </div>
                        
                        <h4 class="text-h6 font-weight-bold mb-2">{{ outcome.title }}</h4>
                        <p class="text-body-2 text-grey-darken-1">{{ outcome.description }}</p>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<style scoped>
.home-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  opacity: 0.3;
}

.navigation-card {
  background: white;
  transition: all 0.3s ease;
  cursor: pointer;
}

.navigation-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.2) !important;
}

.primary-border {
  border-top: 6px solid #1976d2;
}

.success-border {
  border-top: 6px solid #388e3c;
}

.info-border {
  border-top: 6px solid #0288d1;
}

.recommendations-card {
  background: white;
  border-top: 4px solid #f59e0b;
}

.recommendations-header {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  padding: 24px;
  border-radius: 12px 12px 0 0;
}

.recommendation-item {
  background: #fffbeb;
  padding: 20px;
  border-radius: 12px;
  border-left: 4px solid #f59e0b;
  margin-bottom: 16px;
  height: 100%;
}

.recommendation-header {
  display: flex;
  align-items: center;
}

.learning-card {
  background: white;
  border-top: 4px solid #388e3c;
}

.outcome-card {
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  transition: all 0.3s ease;
}

.outcome-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}

.loading-section, .error-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}
</style>