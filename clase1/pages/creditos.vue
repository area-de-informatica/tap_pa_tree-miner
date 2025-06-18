<script setup>
import { useStoreProject } from '@/stores/project'
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue'

const isLoading = ref(true)
const storeProject = useStoreProject()
const { projectData } = storeToRefs(storeProject)


onMounted(async () => {
  try {
    await storeProject.fetchProjectInfo()
  } finally {
    isLoading.value = false
  }
})

const getAuthorColor = (id) => {
  const colors = ['#667eea', '#10b981', '#f59e0b', '#ef4444']
  return colors[(id - 1) % colors.length]
}
</script>

<template>
  <div class="credits-page">
    <!-- Header con gradiente -->
    <div class="hero-section">
      <v-container>
        <div class="text-center py-12">
          <v-icon size="80" color="white" class="mb-4">mdi-school-outline</v-icon>
          <h1 class="text-h2 font-weight-bold text-white mb-2">Créditos del Proyecto</h1>
          <p class="text-h6 text-blue-lighten-4">Técnicas Avanzadas de Programación</p>
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
        <p class="text-h6 text-grey-darken-1">Cargando información del proyecto...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="!projectData" class="text-center py-12">
        <v-icon size="64" color="error" class="mb-4">mdi-alert-circle-outline</v-icon>
        <p class="text-h6 text-error">No hay información del proyecto disponible</p>
      </div>

      <!-- Main Content -->
      <div v-else>
        <v-row>
          <!-- Equipo de Desarrollo -->
          <v-col cols="12">
            <v-card elevation="6" rounded="xl" class="authors-card">
              <v-card-title class="text-h5 font-weight-bold d-flex align-center pa-6">
                <v-icon size="32" color="success" class="mr-3">mdi-account-group</v-icon>
                Equipo de Desarrollo
              </v-card-title>
              
              <v-card-text class="pa-6">
                <v-row>
                  <v-col 
                    v-for="autor in projectData.autores" 
                    :key="autor.id"
                    cols="12" 
                    sm="6" 
                    md="3"
                  >
                    <div class="author-card">
                      <div class="text-center">
                        <v-avatar
                          size="120"
                          :color="getAuthorColor(autor.id)"
                          class="author-avatar mb-4"
                        >
                          <span class="text-h4 font-weight-bold text-white">
                            {{ autor.nombre.split(' ')[0].charAt(0) }}{{ autor.nombre.split(' ')[1]?.charAt(0) || '' }}
                          </span>
                        </v-avatar>
                        
                        <h3 class="text-h6 font-weight-bold mb-2">{{ autor.nombre }}</h3>
                        
                        <v-chip 
                          color="primary" 
                          variant="outlined" 
                          size="small"
                          class="mb-3"
                        >
                          Desarrollador #{{ autor.id }}
                        </v-chip>
                        
                        <div class="author-info">
                          <div class="info-row">
                            <v-icon size="16" color="grey-darken-1" class="mr-1">mdi-school</v-icon>
                            <span class="text-caption text-grey-darken-1">{{ projectData.programa }}</span>
                          </div>
                          <div class="info-row">
                            <v-icon size="16" color="grey-darken-1" class="mr-1">mdi-calendar</v-icon>
                            <span class="text-caption text-grey-darken-1">{{ projectData.año }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
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
.credits-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
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

.project-info-card {
  background: white;
  border-top: 4px solid #667eea;
}

.card-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px 24px;
  border-radius: 12px 12px 0 0;
  position: relative;
}

.card-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 30% 70%, rgba(255,255,255,0.1) 0%, transparent 50%);
}

.left-panel {
  padding: 32px 24px !important;
  background: linear-gradient(135deg, #fefefe 0%, #f8fafc 100%);
}

.main-info-section {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.description-card {
  background: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  border-left: 4px solid #667eea;
}

.description-header {
  display: flex;
  align-items: center;
  border-bottom: 2px solid #f0f4ff;
  padding-bottom: 12px;
}

.leading-relaxed {
  line-height: 1.7;
}

.academic-info {
  margin: 0;
}

.course-card {
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
  padding: 24px;
  border-radius: 16px;
  border-left: 4px solid #10b981;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 12px rgba(16, 185, 129, 0.1);
}

.course-icon-section {
  margin-right: 20px;
  text-align: center;
}

.course-content {
  flex: 1;
}

.course-details {
  margin-top: 12px;
}

.stats-panel {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-left: 1px solid #e2e8f0;
  padding: 32px 24px !important;
}

.stats-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.additional-info {
  background: white;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.info-item-small {
  display: flex;
  align-items: center;
}

.progress-section {
  background: white;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

@media (max-width: 960px) {
  .left-panel {
    background: white;
  }
  
  .stats-panel {
    border-left: none;
    border-top: 1px solid #e2e8f0;
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  }
  
  .course-card {
    flex-direction: column;
    text-align: center;
  }
  
  .course-icon-section {
    margin-right: 0;
    margin-bottom: 16px;
  }
}

.authors-card {
  background: white;
  border-top: 4px solid #10b981;
}

.author-card {
  background: #f8fffe;
  border-radius: 16px;
  padding: 24px;
  height: 100%;
  border: 2px solid #e6fffa;
  transition: all 0.3s ease;
}

.author-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 32px rgba(16, 185, 129, 0.2);
  border-color: #10b981;
}

.author-avatar {
  border: 4px solid #10b981;
  box-shadow: 0 4px 16px rgba(16, 185, 129, 0.3);
}

.author-info {
  margin-top: 12px;
}

.info-row {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;
}
</style>
