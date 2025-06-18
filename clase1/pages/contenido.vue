<script setup>
import { useStoreContents } from '@/stores/contents'
import { storeToRefs } from 'pinia'
import { ref, onMounted, computed } from 'vue'

const isLoading = ref(true)
const storeContents = useStoreContents()
const { orangeContent, currentSection } = storeToRefs(storeContents)

onMounted(async () => {
  try {
    await storeContents.fetchContents()
  } finally {
    isLoading.value = false
  }
})

const getSectionIcon = (type) => {
  const icons = {
    'installation': 'mdi-download',
    'concept': 'mdi-lightbulb-outline',
    'widget': 'mdi-widgets',
    'widget-details': 'mdi-cog-outline',
    'projects': 'mdi-folder-multiple-outline'
  }
  return icons[type] || 'mdi-information-outline'
}

const getSectionColor = (type) => {
  const colors = {
    'installation': 'primary',
    'concept': 'success',
    'widget': 'warning',
    'widget-details': 'info',
    'projects': 'purple'
  }
  return colors[type] || 'grey'
}

const projectsSection = computed(() => {
  if (!orangeContent.value) return null
  return orangeContent.value.sections.find(section => section.type === 'projects')
})

const parametersSection = computed(() => {
  if (!orangeContent.value) return null
  return orangeContent.value.sections.find(section => section.type === 'widget-details')
})

const conceptSections = computed(() => {
  if (!orangeContent.value) return []
  return orangeContent.value.sections.filter(section => 
    ['installation', 'concept', 'widget'].includes(section.type)
  )
})
</script>

<template>
  <div class="contenido-page">
    <!-- Header con gradiente -->
    <div class="hero-section">
      <v-container>
        <div class="text-center py-12">
          <v-icon size="80" color="white" class="mb-4">mdi-school</v-icon>
          <h1 class="text-h2 font-weight-bold text-white mb-2">
            {{ orangeContent?.metadata?.topic || 'Contenido del Curso' }}
          </h1>
        </div>
      </v-container>
    </div>

    <v-container class="mt-8">
      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-12">
        <v-progress-circular
          indeterminate
          size="64"
          color="primary"
          class="mb-4"
        ></v-progress-circular>
        <p class="text-h6 text-grey-darken-1">Cargando contenido del curso...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="!orangeContent" class="text-center py-12">
        <v-icon size="64" color="error" class="mb-4">mdi-alert-circle-outline</v-icon>
        <p class="text-h6 text-error">No hay contenido disponible</p>
      </div>

      <!-- Main Content -->
      <div v-else>
        <!-- Secciones Conceptuales -->
        <v-row class="mb-8">
          <v-col cols="12">
            <h2 class="text-h4 font-weight-bold text-grey-darken-2 mb-6 d-flex align-center">
              <v-icon size="32" color="primary" class="mr-3">mdi-book-open-page-variant</v-icon>
              Conceptos Fundamentales
            </h2>
          </v-col>
          
          <v-col 
            v-for="section in conceptSections" 
            :key="section.id"
            cols="12" 
            md="4"
          >
            <v-card 
              class="concept-card h-100" 
              elevation="6" 
              rounded="xl"
              :class="`${getSectionColor(section.type)}-border`"
            >
              <v-card-title class="pa-6">
                <div class="d-flex align-center">
                  <v-avatar 
                    :color="getSectionColor(section.type)" 
                    size="48" 
                    class="mr-3"
                  >
                    <v-icon :color="'white'" size="24">{{ getSectionIcon(section.type) }}</v-icon>
                  </v-avatar>
                  <div>
                    <h3 class="text-h6 font-weight-bold">{{ section.title }}</h3>
                    <v-chip 
                      :color="getSectionColor(section.type)" 
                      variant="outlined" 
                      size="small"
                      class="mt-1"
                    >
                      {{ section.type }}
                    </v-chip>
                  </div>
                </div>
              </v-card-title>
              
              <v-card-text class="pa-6 pt-0">
                <p class="text-body-1 text-grey-darken-1">{{ section.content }}</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Parámetros del Widget -->
        <v-row v-if="parametersSection" class="mb-8">
          <v-col cols="12">
            <v-card class="parameters-card" elevation="8" rounded="xl">
              <div class="parameters-header">
                <v-card-title class="text-h4 font-weight-bold text-white d-flex align-center">
                  <v-icon size="40" class="mr-3">mdi-cog-outline</v-icon>
                  {{ parametersSection.title }}
                </v-card-title>
                <v-card-subtitle class="text-h6 text-blue-lighten-3 mt-2">
                  {{ parametersSection.content }}
                </v-card-subtitle>
              </div>
              
              <v-card-text class="pa-6">
                <v-row>
                  <v-col 
                    v-for="parameter in parametersSection.parameters" 
                    :key="parameter.name"
                    cols="12" 
                    md="6"
                  >
                    <div class="parameter-item">
                      <div class="parameter-header mb-2">
                        <v-icon color="info" size="20" class="mr-2">mdi-settings</v-icon>
                        <span class="text-h6 font-weight-bold text-info">{{ parameter.name }}</span>
                      </div>
                      <p class="text-body-1 text-grey-darken-1">{{ parameter.description }}</p>
                    </div>
                  </v-col>
                </v-row>
                
                <v-divider class="my-4"></v-divider>
                
                <v-alert 
                  type="info" 
                  variant="tonal" 
                  class="mb-0"
                  icon="mdi-information-outline"
                >
                  <strong>Nota importante:</strong> {{ parametersSection.note }}
                </v-alert>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Proyectos Reales -->
        <v-row v-if="projectsSection">
          <v-col cols="12">
            <v-card class="projects-card" elevation="8" rounded="xl">
              <v-card-title class="pa-6 d-flex align-center">
                <v-icon size="32" color="purple" class="mr-3">mdi-folder-multiple-outline</v-icon>
                <div>
                  <h2 class="text-h4 font-weight-bold">{{ projectsSection.title }}</h2>
                  <p class="text-body-1 text-grey-darken-1 mt-2">{{ projectsSection.content }}</p>
                </div>
              </v-card-title>
              
              <v-card-text class="pa-6">
                <v-row>
                  <v-col 
                    v-for="project in projectsSection.projects" 
                    :key="project.id"
                    cols="12" 
                    lg="4"
                  >
                    <v-card 
                      class="project-card h-100" 
                      elevation="4" 
                      rounded="lg"
                    >
                      <v-card-title class="pa-4 pb-2">
                        <div class="d-flex align-center mb-2">
                          <v-avatar color="purple" size="32" class="mr-2">
                            <span class="text-white font-weight-bold">{{ project.id }}</span>
                          </v-avatar>
                          <v-chip color="purple" variant="outlined" size="small">
                            {{ project.dataset }}
                          </v-chip>
                        </div>
                        <h3 class="text-h6 font-weight-bold">{{ project.title }}</h3>
                      </v-card-title>
                      
                      <v-card-text class="pa-4">
                        <div class="objective-section mb-4">
                          <div class="text-caption text-purple font-weight-bold mb-1">OBJETIVO</div>
                          <p class="text-body-2 text-grey-darken-1">{{ project.objective }}</p>
                        </div>
                        
                        <div class="steps-section">
                          <div class="text-caption text-success font-weight-bold mb-2">PASOS A SEGUIR</div>
                          <v-list density="compact" class="pa-0">
                            <v-list-item
                              v-for="(step, index) in project.steps"
                              :key="index"
                              class="pa-1"
                            >
                              <template v-slot:prepend>
                                <v-avatar color="success" size="20" class="mr-2">
                                  <span class="text-white text-caption">{{ index + 1 }}</span>
                                </v-avatar>
                              </template>
                              <v-list-item-title class="text-body-2">{{ step }}</v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<style scoped>
.contenido-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #fef7ed 0%, #fed7aa 100%);
}

.hero-section {
  background: linear-gradient(135deg, #ea580c 0%, #dc2626 100%);
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

.concept-card {
  background: white;
  transition: all 0.3s ease;
}

.concept-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 32px rgba(0,0,0,0.15) !important;
}

.primary-border {
  border-top: 4px solid #1976d2;
}

.success-border {
  border-top: 4px solid #388e3c;
}

.warning-border {
  border-top: 4px solid #f57c00;
}

.info-border {
  border-top: 4px solid #0288d1;
}

.purple-border {
  border-top: 4px solid #7b1fa2;
}

.parameters-card {
  background: white;
  border-top: 4px solid #0288d1;
}

.parameters-header {
  background: linear-gradient(135deg, #0288d1 0%, #0277bd 100%);
  padding: 24px;
  border-radius: 12px 12px 0 0;
}

.parameter-item {
  background: #f0f9ff;
  padding: 16px;
  border-radius: 12px;
  border-left: 4px solid #0288d1;
  margin-bottom: 16px;
}

.parameter-header {
  display: flex;
  align-items: center;
}

.projects-card {
  background: white;
  border-top: 4px solid #7b1fa2;
}

.project-card {
  background: #faf5ff;
  border: 2px solid #e1bee7;
  transition: all 0.3s ease;
}

.project-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(123, 31, 162, 0.2);
  border-color: #7b1fa2;
}

.objective-section {
  background: white;
  padding: 12px;
  border-radius: 8px;
  border-left: 3px solid #7b1fa2;
}

.steps-section {
  background: white;
  padding: 12px;
  border-radius: 8px;
  border-left: 3px solid #388e3c;
}
</style>