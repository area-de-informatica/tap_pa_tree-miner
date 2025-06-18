<script setup>
import { useStoreActivities } from '@/stores/activities'
import { storeToRefs } from 'pinia'
import { ref, onMounted, computed } from 'vue'

const isLoading = ref(true)
const selectedCategory = ref('all')
const selectedDifficulty = ref('all')
const storeActivities = useStoreActivities()
const { activitiesData, currentActivity } = storeToRefs(storeActivities)

onMounted(async () => {
  try {
    await storeActivities.fetchActivities()
  } finally {
    isLoading.value = false
  }
})

const getDifficultyColor = (difficulty) => {
  const colors = {
    'Básico': 'success',
    'Intermedio': 'warning',
    'Avanzado': 'error'
  }
  return colors[difficulty] || 'grey'
}

const getCategoryColor = (categoryId) => {
  if (!activitiesData.value) return 'grey'
  const category = activitiesData.value.categories.find(cat => cat.id === categoryId)
  return category?.color || 'grey'
}

const getCategoryName = (categoryId) => {
  if (!activitiesData.value) return categoryId
  const category = activitiesData.value.categories.find(cat => cat.id === categoryId)
  return category?.name || categoryId
}

const filteredActivities = computed(() => {
  if (!activitiesData.value) return []
  
  let filtered = activitiesData.value.activities
  
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(activity => activity.category === selectedCategory.value)
  }
  
  if (selectedDifficulty.value !== 'all') {
    filtered = filtered.filter(activity => activity.difficulty === selectedDifficulty.value)
  }
  
  return filtered
})

const activitiesByCategory = computed(() => {
  if (!activitiesData.value) return {}
  
  const grouped = {}
  activitiesData.value.categories.forEach(category => {
    grouped[category.id] = filteredActivities.value.filter(activity => activity.category === category.id)
  })
  
  return grouped
})
</script>

<template>
  <div class="actividades-page">
    <!-- Hero Section Ultra Moderno -->
    <div class="hero-section">
      <div class="hero-overlay"></div>
      <div class="hero-pattern"></div>
      <v-container class="hero-container">
        <div class="hero-content">
          <div class="hero-icon-wrapper">
            <v-icon size="100" class="hero-icon">mdi-flask-outline</v-icon>
          </div>
          <h1 class="hero-title">
            {{ activitiesData?.metadata?.topic || 'Actividades Prácticas' }}
          </h1>
          <div v-if="activitiesData?.metadata" class="hero-stats">
            <v-card class="stat-card" elevation="8">
              <v-card-text class="stat-content">
                <v-icon class="stat-icon">mdi-clipboard-list</v-icon>
                <div class="stat-info">
                  <div class="stat-number">{{ activitiesData.metadata.totalActivities }}</div>
                  <div class="stat-label">Actividades</div>
                </div>
              </v-card-text>
            </v-card>
            <v-card class="stat-card" elevation="8">
              <v-card-text class="stat-content">
                <v-icon class="stat-icon">mdi-clock-outline</v-icon>
                <div class="stat-info">
                  <div class="stat-number">{{ activitiesData.metadata.estimatedTotalTime }}</div>
                  <div class="stat-label">Duración</div>
                </div>
              </v-card-text>
            </v-card>
          </div>
        </div>
      </v-container>
    </div>

    <v-container class="main-container">
      <!-- Loading State Premium -->
      <div v-if="isLoading" class="loading-container">
        <v-card class="loading-card" elevation="12">
          <v-card-text class="loading-content">
            <v-progress-circular
              indeterminate
              size="80"
              width="6"
              color="primary"
              class="loading-spinner"
            ></v-progress-circular>
            <h3 class="loading-title">Cargando Actividades</h3>
            <p class="loading-subtitle">Preparando tu experiencia de aprendizaje...</p>
          </v-card-text>
        </v-card>
      </div>

      <!-- Error State Premium -->
      <div v-else-if="!activitiesData" class="error-container">
        <v-card class="error-card" elevation="12">
          <v-card-text class="error-content">
            <v-icon size="80" color="error" class="error-icon">mdi-alert-circle-outline</v-icon>
            <h3 class="error-title">Sin Actividades Disponibles</h3>
            <p class="error-subtitle">No se pudieron cargar las actividades en este momento</p>
            <v-btn color="primary" variant="elevated" class="retry-btn">
              <v-icon start>mdi-refresh</v-icon>
              Reintentar
            </v-btn>
          </v-card-text>
        </v-card>
      </div>

      <!-- Main Content -->
      <div v-else class="content-wrapper">
        <!-- Filtros Ultra Premium -->
        <v-card class="filters-card" elevation="8">
          <div class="filters-header">
            <div class="filters-title-section">
              <v-icon class="filters-main-icon">mdi-tune-variant</v-icon>
              <div>
                <h2 class="filters-title">Filtros Avanzados</h2>
                <p class="filters-subtitle">Personaliza tu búsqueda de actividades</p>
              </div>
            </div>
          </div>
          <v-card-text class="filters-body">
            <v-row>
              <v-col cols="12" md="6">
                <div class="filter-group">
                  <label class="filter-label">
                    <v-icon class="filter-label-icon">mdi-tag-multiple</v-icon>
                    Categoría de Actividad
                  </label>
                  <v-select
                    v-model="selectedCategory"
                    :items="[
                      { value: 'all', title: 'Todas las categorías' },
                      ...activitiesData.categories.map(cat => ({ value: cat.id, title: cat.name }))
                    ]"
                    variant="outlined"
                    density="comfortable"
                    class="premium-select"
                    prepend-inner-icon="mdi-folder-outline"
                  ></v-select>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <div class="filter-group">
                  <label class="filter-label">
                    <v-icon class="filter-label-icon">mdi-speedometer</v-icon>
                    Nivel de Dificultad
                  </label>
                  <v-select
                    v-model="selectedDifficulty"
                    :items="[
                      { value: 'all', title: 'Todas las dificultades' },
                      ...activitiesData.difficultyLevels.map(level => ({ value: level.level, title: level.level }))
                    ]"
                    variant="outlined"
                    density="comfortable"
                    class="premium-select"
                    prepend-inner-icon="mdi-chart-line"
                  ></v-select>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <!-- Actividades por Categoría Ultra Premium -->
        <div v-for="category in activitiesData.categories" :key="category.id" class="category-section">
          <div v-if="activitiesByCategory[category.id] && activitiesByCategory[category.id].length > 0">
            
            <!-- Category Header Premium -->
            <div class="category-header-premium">
              <div class="category-header-content">
                <div class="category-icon-wrapper">
                  <v-icon :color="category.color" class="category-main-icon">mdi-folder-open-outline</v-icon>
                </div>
                <div class="category-text-content">
                  <div class="category-title-row">
                    <h2 class="category-premium-title">{{ category.name }}</h2>
                    <v-chip 
                      :color="category.color" 
                      variant="elevated" 
                      class="category-count-chip"
                      size="large"
                    >
                      <v-icon start>mdi-counter</v-icon>
                      {{ activitiesByCategory[category.id].length }} actividades
                    </v-chip>
                  </div>
                  <p class="category-premium-description">{{ category.description }}</p>
                </div>
              </div>
            </div>

            <!-- Activities Premium Grid -->
            <v-row class="activities-premium-grid">
              <v-col 
                v-for="activity in activitiesByCategory[category.id]" 
                :key="activity.id"
                cols="12" 
                xl="6"
              >
                <v-card class="activity-premium-card" elevation="12">
                  
                  <!-- Activity Header Premium -->
                  <div class="activity-header-premium">
                    <div class="activity-id-section">
                      <v-avatar 
                        :color="getCategoryColor(activity.category)" 
                        size="60" 
                        class="activity-premium-avatar"
                      >
                        <span class="activity-premium-id">{{ activity.id }}</span>
                      </v-avatar>
                    </div>
                    <div class="activity-title-section">
                      <h3 class="activity-premium-title">{{ activity.title }}</h3>
                      <div class="activity-meta-badges">
                        <v-chip 
                          :color="getDifficultyColor(activity.difficulty)" 
                          variant="elevated" 
                          size="small"
                          class="difficulty-premium-chip"
                        >
                          <v-icon start size="16">mdi-signal</v-icon>
                          {{ activity.difficulty }}
                        </v-chip>
                        <v-chip 
                          color="info" 
                          variant="elevated" 
                          size="small"
                          class="time-premium-chip"
                        >
                          <v-icon start size="16">mdi-clock-outline</v-icon>
                          {{ activity.estimatedTime }}
                        </v-chip>
                      </div>
                    </div>
                  </div>

                  <v-card-text class="activity-premium-content">
                    
                    <!-- Dataset Section Premium -->
                    <v-card class="dataset-premium-section" variant="tonal" color="primary">
                      <v-card-text class="dataset-content">
                        <div class="dataset-header">
                          <v-icon class="dataset-icon">mdi-database</v-icon>
                          <div class="dataset-info">
                            <h4 class="dataset-title">{{ activity.dataset }}</h4>
                            <v-chip color="primary" variant="elevated" size="small" class="dataset-file-chip">
                              <v-icon start size="14">mdi-file-document</v-icon>
                              {{ activity.datasetFile }}
                            </v-chip>
                          </div>
                        </div>
                        <div class="objective-section">
                          <div class="objective-header">
                            <v-icon class="objective-icon">mdi-target</v-icon>
                            <span class="objective-label">Objetivo</span>
                          </div>
                          <p class="objective-premium-text">{{ activity.objective }}</p>
                        </div>
                      </v-card-text>
                    </v-card>

                    <!-- Widgets Section Premium -->
                    <div class="widgets-premium-section">
                      <div class="section-premium-header">
                        <v-icon class="section-header-icon" color="success">mdi-widgets</v-icon>
                        <h4 class="section-premium-title">Widgets Necesarios</h4>
                      </div>
                      <div class="widgets-premium-grid">
                        <v-chip 
                          v-for="widget in activity.widgets" 
                          :key="widget"
                          color="success" 
                          variant="elevated" 
                          size="small"
                          class="widget-premium-chip"
                        >
                          <v-icon start size="14">mdi-puzzle</v-icon>
                          {{ widget }}
                        </v-chip>
                      </div>
                    </div>

                    <!-- Instructions Section Premium -->
                    <div class="instructions-premium-section">
                      <div class="section-premium-header">
                        <v-icon class="section-header-icon" color="warning">mdi-format-list-numbered</v-icon>
                        <h4 class="section-premium-title">Instrucciones Paso a Paso</h4>
                      </div>
                      <div class="instructions-premium-list">
                        <div
                          v-for="(instruction, index) in activity.instructions"
                          :key="index"
                          class="instruction-premium-item"
                        >
                          <v-avatar 
                            color="warning" 
                            size="32" 
                            class="step-premium-number"
                          >
                            <span class="step-premium-text">{{ index + 1 }}</span>
                          </v-avatar>
                          <p class="instruction-premium-text">{{ instruction }}</p>
                        </div>
                      </div>
                    </div>

                    <!-- Questions Section Premium -->
                    <div class="questions-premium-section">
                      <div class="section-premium-header">
                        <v-icon class="section-header-icon" color="error">mdi-help-circle</v-icon>
                        <h4 class="section-premium-title">Preguntas de Análisis</h4>
                      </div>
                      <div class="questions-premium-list">
                        <div
                          v-for="(question, index) in activity.questions"
                          :key="index"
                          class="question-premium-item"
                        >
                          <v-icon color="error" class="question-premium-icon">mdi-help-circle-outline</v-icon>
                          <p class="question-premium-text">{{ question }}</p>
                        </div>
                      </div>
                    </div>

                  </v-card-text>

                  <!-- Action Button Premium -->
                </v-card>
              </v-col>
            </v-row>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<style scoped>
/* Hero Section Ultra Premium */
.hero-section {
  position: relative;
  min-height: 60vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  display: flex;
  align-items: center;
  overflow: hidden;
  margin-bottom: 80px;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(0,0,0,0.1), rgba(255,255,255,0.1));
}

.hero-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 2px, transparent 2px),
    radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 2px, transparent 2px);
  background-size: 50px 50px;
  animation: float 20s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(1deg); }
}

.hero-container {
  position: relative;
  z-index: 2;
}

.hero-content {
  text-align: center;
  color: white;
}

.hero-icon-wrapper {
  margin-bottom: 2rem;
}

.hero-icon {
  color: white;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.hero-title {
  font-size: 4rem;
  font-weight: 900;
  margin-bottom: 1rem;
  text-shadow: 0 4px 8px rgba(0,0,0,0.3);
  background: linear-gradient(45deg, #ffffff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.5rem;
  font-weight: 300;
  margin-bottom: 3rem;
  opacity: 0.95;
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.stat-card {
  background: rgba(255,255,255,0.15) !important;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 20px !important;
  min-width: 200px;
}

.stat-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem !important;
}

.stat-icon {
  font-size: 3rem !important;
  color: white;
}

.stat-info {
  color: white;
}

.stat-number {
  font-size: 2rem;
  font-weight: 800;
  line-height: 1;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.9;
  font-weight: 500;
}

/* Main Container */
.main-container {
  margin-top: -4rem;
  position: relative;
  z-index: 3;
}

/* Loading State Premium */
.loading-container, .error-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
}

.loading-card, .error-card {
  max-width: 400px;
  border-radius: 24px !important;
  background: linear-gradient(145deg, #ffffff, #f8f9fa) !important;
}

.loading-content, .error-content {
  text-align: center;
  padding: 3rem !important;
}

.loading-spinner {
  margin-bottom: 2rem;
}

.loading-title, .error-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #333;
}

.loading-subtitle, .error-subtitle {
  color: #666;
  margin-bottom: 1rem;
}

.error-icon {
  margin-bottom: 1.5rem;
}

.retry-btn {
  margin-top: 1rem;
  border-radius: 12px !important;
  font-weight: 600;
}

/* Filters Premium */
.filters-card {
  margin-bottom: 3rem;
  border-radius: 24px !important;
  background: linear-gradient(145deg, #ffffff, #f8f9fa) !important;
  border: 1px solid #e0e0e0;
}

.filters-header {
  background: linear-gradient(135deg, #f5f5f5, #ffffff);
  padding: 2rem;
  border-radius: 24px 24px 0 0;
  border-bottom: 1px solid #e0e0e0;
}

.filters-title-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.filters-main-icon {
  font-size: 2.5rem !important;
  color: #1976d2;
}

.filters-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.25rem;
}

.filters-subtitle {
  color: #666;
  font-size: 1rem;
}

.filters-body {
  padding: 2rem !important;
}

.filter-group {
  margin-bottom: 1rem;
}

.filter-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
}

.filter-label-icon {
  font-size: 1.1rem !important;
  color: #1976d2;
}

.premium-select {
  border-radius: 12px;
}

/* Category Header Premium */
.category-header-premium {
  margin-bottom: 2rem;
}

.category-header-content {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  padding: 2rem;
  background: linear-gradient(135deg, #fafafa, #ffffff);
  border-radius: 20px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.category-icon-wrapper {
  flex-shrink: 0;
}

.category-main-icon {
  font-size: 3rem !important;
}

.category-text-content {
  flex: 1;
}

.category-title-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.category-premium-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #333;
  margin: 0;
}

.category-count-chip {
  font-weight: 600;
  border-radius: 12px !important;
}

.category-premium-description {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
  margin: 0;
}

/* Activities Premium Grid */
.activities-premium-grid {
  gap: 2rem;
}

.category-section {
  margin-bottom: 4rem;
}

/* Activity Premium Cards */
.activity-premium-card {
  border-radius: 24px !important;
  background: linear-gradient(145deg, #ffffff, #f8f9fa) !important;
  border: 1px solid #e0e0e0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
  position: relative;
  overflow: hidden;
}

.activity-premium-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  transition: height 0.3s ease;
}

.activity-premium-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.1) !important;
  border-color: #1976d2;
}

.activity-premium-card:hover::before {
  height: 6px;
}

/* Activity Header Premium */
.activity-header-premium {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  padding: 2rem;
  background: linear-gradient(135deg, #fafafa, #ffffff);
  border-bottom: 1px solid #f0f0f0;
}

.activity-id-section {
  flex-shrink: 0;
}

.activity-premium-avatar {
  box-shadow: 0 8px 16px rgba(0,0,0,0.15) !important;
  border: 3px solid white;
}

.activity-premium-id {
  font-size: 1.5rem;
  font-weight: 900;
}

.activity-title-section {
  flex: 1;
}

.activity-premium-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1rem;
  line-height: 1.3;
}

.activity-meta-badges {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.difficulty-premium-chip, .time-premium-chip {
  font-weight: 600;
  border-radius: 12px !important;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

/* Activity Premium Content */
.activity-premium-content {
  padding: 2rem !important;
}

/* Dataset Section Premium */
.dataset-premium-section {
  margin-bottom: 1.5rem;
  border-radius: 16px !important;
  border: 1px solid rgba(25, 118, 210, 0.2);
}

.dataset-content {
  padding: 1.5rem !important;
}

.dataset-header {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
}

.dataset-icon {
  font-size: 2rem !important;
  color: #1976d2;
  flex-shrink: 0;
}

.dataset-info {
  flex: 1;
}

.dataset-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.5rem;
}

.dataset-file-chip {
  font-weight: 600;
  border-radius: 8px !important;
}

.objective-section {
  margin-top: 1rem;
}

.objective-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.objective-icon {
  color: #1976d2;
}

.objective-label {
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
}

.objective-premium-text {
  color: #555;
  line-height: 1.6;
  margin: 0;
}

/* Sections Premium */
.widgets-premium-section, 
.instructions-premium-section, 
.questions-premium-section {
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  border-radius: 16px;
  border: 1px solid #e0e0e0;
  background: linear-gradient(145deg, #fafafa, #ffffff);
}

.section-premium-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.section-header-icon {
  font-size: 1.5rem !important;
}

.section-premium-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #333;
  margin: 0;
}

/* Widgets Premium */
.widgets-premium-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.widget-premium-chip {
  font-weight: 600;
  border-radius: 8px !important;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Instructions Premium */
.instructions-premium-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.instruction-premium-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.step-premium-number {
  flex-shrink: 0;
  box-shadow: 0 4px 8px rgba(0,0,0,0.15) !important;
  border: 2px solid white;
}

.step-premium-text {
  font-size: 0.9rem;
  font-weight: 800;
}

.instruction-premium-text {
  color: #444;
  line-height: 1.6;
  margin: 0;
  font-weight: 500;
}

/* Questions Premium */
.questions-premium-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.question-premium-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.question-premium-icon {
  flex-shrink: 0;
  margin-top: 0.1rem;
}

.question-premium-text {
  color: #444;
  line-height: 1.6;
  margin: 0;
  font-weight: 500;
}

/* Action Button Premium */
.activity-premium-actions {
  padding: 2rem !important;
  background: linear-gradient(135deg, #fafafa, #ffffff);
  border-top: 1px solid #f0f0f0;
}

.start-premium-btn {
  font-weight: 700;
  font-size: 1.1rem !important;
  padding: 1rem 2rem !important;
  border-radius: 16px !important;
  text-transform: none !important;
  box-shadow: 0 8px 16px rgba(0,0,0,0.15) !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.start-premium-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.2) !important;
}

/* Responsive Design */
@media (max-width: 960px) {
  .hero-title {
    font-size: 3rem;
  }
  
  .category-premium-title {
    font-size: 2rem;
  }
  
  .activity-header-premium {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .category-header-content {
    flex-direction: column;
    text-align: center;
  }
  
  .category-title-row {
    flex-direction: column;
    align-items: center;
  }
}

@media (max-width: 600px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
  }
  
  .hero-stats {
    flex-direction: column;
    align-items: center;
  }
  
  .stat-card {
    min-width: auto;
    width: 100%;
    max-width: 300px;
  }
}
</style>