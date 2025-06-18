<script setup>
import { useStoreQuestion } from '@/stores/question'
import { storeToRefs } from 'pinia'
import { ref, onMounted, computed } from 'vue'

const storeQuestion = useStoreQuestion()
const { 
  questionsData, 
  currentQuestion, 
  userAnswers, 
  currentQuestionIndex, 
  showResults, 
  evaluationStarted 
} = storeToRefs(storeQuestion)

const { score, correctAnswersCount, totalAnswered, scoreLevel, isPassed } = storeToRefs(storeQuestion)

const isLoading = ref(true)
const selectedAnswer = ref('')
const showFeedback = ref(false)
const feedbackMessage = ref('')
const isCorrectAnswer = ref(false)


onMounted(async () => {
  try {
    await storeQuestion.fetchQuestions()
  } finally {
    isLoading.value = false
  }
})

const handleAnswerSelection = (optionId) => {
  if (!currentQuestion.value) return
  
  selectedAnswer.value = optionId
  const isCorrect = storeQuestion.answerQuestion(currentQuestion.value.id, optionId)
  
  isCorrectAnswer.value = isCorrect
  feedbackMessage.value = isCorrect 
    ? '¡Correcto! ' + currentQuestion.value.explanation
    : 'Incorrecto. ' + currentQuestion.value.explanation
  
  showFeedback.value = true
}

const nextQuestion = () => {
  selectedAnswer.value = ''
  showFeedback.value = false
  storeQuestion.nextQuestion()
}

const previousQuestion = () => {
  selectedAnswer.value = ''
  showFeedback.value = false
  storeQuestion.previousQuestion()
}

const finishEvaluation = () => {
  storeQuestion.finishEvaluation()
}

const restartEvaluation = () => {
  selectedAnswer.value = ''
  showFeedback.value = false
  storeQuestion.resetEvaluation()
}

const startEvaluation = () => {
  storeQuestion.startEvaluation()
}

const getOptionColor = (optionId) => {
  if (!showFeedback.value) return 'default'
  if (!currentQuestion.value) return 'default'
  
  if (optionId === currentQuestion.value.correctAnswer) return 'success'
  if (optionId === selectedAnswer.value && optionId !== currentQuestion.value.correctAnswer) return 'error'
  return 'default'
}

const getOptionVariant = (optionId) => {
  if (!showFeedback.value) return 'outlined'
  if (!currentQuestion.value) return 'outlined'
  
  if (optionId === currentQuestion.value.correctAnswer) return 'flat'
  if (optionId === selectedAnswer.value && optionId !== currentQuestion.value.correctAnswer) return 'flat'
  return 'outlined'
}

const progressPercentage = computed(() => {
  if (!questionsData.value) return 0
  return Math.round(((currentQuestionIndex.value + 1) / questionsData.value.questions.length) * 100)
})
</script>

<template>
  <div class="evaluacion-page">
    <!-- Header -->
    <div class="hero-section">
      <v-container>
        <div class="text-center py-12">
          <v-icon size="80" color="white" class="mb-4">mdi-clipboard-check-outline</v-icon>
          <h1 class="text-h2 font-weight-bold text-white mb-2">
            {{ questionsData?.evaluation?.title || 'Evaluación' }}
          </h1>
          <p class="text-h6 text-purple-lighten-4">
            {{ questionsData?.evaluation?.description || 'Pon a prueba tus conocimientos' }}
          </p>
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
        <p class="text-h6 text-grey-darken-1">Cargando evaluación...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="!questionsData" class="text-center py-12">
        <v-icon size="64" color="error" class="mb-4">mdi-alert-circle-outline</v-icon>
        <p class="text-h6 text-error">Error al cargar la evaluación</p>
      </div>

      <!-- Pre-evaluation Screen -->
      <div v-else-if="!evaluationStarted" class="text-center">
        <v-card class="mx-auto" max-width="600" elevation="8" rounded="xl">
          <v-card-text class="pa-8">
            <v-icon size="80" color="primary" class="mb-4">mdi-school</v-icon>
            <h2 class="text-h4 font-weight-bold mb-4">¿Listo para la evaluación?</h2>
            <p class="text-body-1 text-grey-darken-1 mb-6">
              {{ questionsData.evaluation.instructions }}
            </p>
            
            <v-row class="mb-6">
              <v-col cols="4">
                <div class="text-center">
                  <v-icon size="40" color="info" class="mb-2">mdi-help-circle</v-icon>
                  <div class="text-h6 font-weight-bold">{{ questionsData.evaluation.totalQuestions }}</div>
                  <div class="text-caption">Preguntas</div>
                </div>
              </v-col>
              <v-col cols="4">
                <div class="text-center">
                  <v-icon size="40" color="success" class="mb-2">mdi-target</v-icon>
                  <div class="text-h6 font-weight-bold">{{ questionsData.evaluation.passingScore }}%</div>
                  <div class="text-caption">Para aprobar</div>
                </div>
              </v-col>
              <v-col cols="4">
                <div class="text-center">
                  <v-icon size="40" color="warning" class="mb-2">mdi-clock-outline</v-icon>
                  <div class="text-h6 font-weight-bold">Sin límite</div>
                  <div class="text-caption">Tiempo</div>
                </div>
              </v-col>
            </v-row>
            
            <v-btn 
              color="primary" 
              size="large" 
              block
              @click="startEvaluation"
            >
              <v-icon start>mdi-play</v-icon>
              Comenzar Evaluación
            </v-btn>
          </v-card-text>
        </v-card>
      </div>

      <!-- Results Screen -->
      <div v-else-if="showResults" class="text-center">
        <v-card class="mx-auto" max-width="600" elevation="8" rounded="xl">
          <v-card-text class="pa-8">
            <v-icon 
              :icon="scoreLevel?.icon" 
              :color="scoreLevel?.color" 
              size="80" 
              class="mb-4"
            ></v-icon>
            
            <h2 class="text-h4 font-weight-bold mb-4">Evaluación Completada</h2>
            
            <div class="score-display mb-6">
              <div class="text-h2 font-weight-bold" :class="`text-${scoreLevel?.color}`">
                {{ score }}%
              </div>
              <div class="text-body-1 text-grey-darken-1">
                {{ correctAnswersCount }} de {{ questionsData.evaluation.totalQuestions }} correctas
              </div>
            </div>
            
            <v-alert 
              :type="scoreLevel?.color" 
              variant="tonal" 
              class="mb-6"
            >
              {{ scoreLevel?.message }}
            </v-alert>
            
            <div class="mb-6">
              <v-chip 
                :color="isPassed ? 'success' : 'error'" 
                size="large"
                class="font-weight-bold"
              >
                <v-icon start>{{ isPassed ? 'mdi-check-circle' : 'mdi-close-circle' }}</v-icon>
                {{ isPassed ? 'APROBADO' : 'NO APROBADO' }}
              </v-chip>
            </div>
            
            <v-btn 
              color="primary" 
              variant="outlined" 
              block
              @click="restartEvaluation"
            >
              <v-icon start>mdi-restart</v-icon>
              Intentar de Nuevo
            </v-btn>
          </v-card-text>
        </v-card>
      </div>

      <!-- Question Screen -->
      <div v-else-if="currentQuestion">
        <v-row>
          <v-col cols="12">
            <!-- Progress -->
            <v-card class="mb-6" elevation="4" rounded="xl">
              <v-card-text class="pa-4">
                <div class="d-flex align-center justify-space-between mb-2">
                  <span class="text-body-2 font-weight-bold">
                    Pregunta {{ currentQuestionIndex + 1 }} de {{ questionsData.evaluation.totalQuestions }}
                  </span>
                  <span class="text-body-2">{{ progressPercentage }}%</span>
                </div>
                <v-progress-linear 
                  :model-value="progressPercentage" 
                  color="primary" 
                  height="8" 
                  rounded
                ></v-progress-linear>
              </v-card-text>
            </v-card>

            <!-- Question Card -->
            <v-card class="question-card mb-6" elevation="8" rounded="xl">
              <v-card-title class="pa-6">
                <div class="d-flex align-center mb-4">
                  <v-avatar color="primary" size="40" class="mr-3">
                    <span class="text-white font-weight-bold">{{ currentQuestion.id }}</span>
                  </v-avatar>
                  <div>
                    <v-chip color="info" variant="outlined" size="small" class="mr-2">
                      {{ currentQuestion.difficulty }}
                    </v-chip>
                    <v-chip color="primary" variant="outlined" size="small">
                      {{ currentQuestion.topic }}
                    </v-chip>
                  </div>
                </div>
                <h3 class="text-h5 font-weight-bold">{{ currentQuestion.question }}</h3>
              </v-card-title>
              
              <v-card-text class="pa-6">
                <v-radio-group v-model="selectedAnswer" :disabled="showFeedback">
                  <v-radio
                    v-for="option in currentQuestion.options"
                    :key="option.id"
                    :value="option.id"
                    :color="getOptionColor(option.id)"
                    @click="!showFeedback && handleAnswerSelection(option.id)"
                  >
                    <template v-slot:label>
                      <v-chip
                        :color="getOptionColor(option.id)"
                        :variant="getOptionVariant(option.id)"
                        class="mr-3"
                        size="small"
                      >
                        {{ option.id.toUpperCase() }}
                      </v-chip>
                      <span :class="showFeedback && option.id === currentQuestion.correctAnswer ? 'font-weight-bold' : ''">
                        {{ option.text }}
                      </span>
                    </template>
                  </v-radio>
                </v-radio-group>

                <!-- Feedback -->
                <v-alert
                  v-if="showFeedback"
                  :type="isCorrectAnswer ? 'success' : 'error'"
                  variant="tonal"
                  class="mt-4"
                  :icon="isCorrectAnswer ? 'mdi-check-circle' : 'mdi-close-circle'"
                >
                  {{ feedbackMessage }}
                </v-alert>
              </v-card-text>

              <v-card-actions class="pa-6">
                <v-btn
                  v-if="currentQuestionIndex > 0"
                  color="grey"
                  variant="outlined"
                  @click="previousQuestion"
                  :disabled="!showFeedback"
                >
                  <v-icon start>mdi-arrow-left</v-icon>
                  Anterior
                </v-btn>
                
                <v-spacer></v-spacer>
                
                <v-btn
                  v-if="currentQuestionIndex < questionsData.evaluation.totalQuestions - 1"
                  color="primary"
                  @click="nextQuestion"
                  :disabled="!showFeedback"
                >
                  Siguiente
                  <v-icon end>mdi-arrow-right</v-icon>
                </v-btn>
                
                <v-btn
                  v-else
                  color="success"
                  @click="finishEvaluation"
                  :disabled="!showFeedback"
                >
                  Finalizar
                  <v-icon end>mdi-check</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<style scoped>
.evaluacion-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #faf5ff 0%, #e9d5ff 100%);
}

.hero-section {
  background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%);
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

.question-card {
  background: white;
  border-top: 4px solid #7c3aed;
}

.score-display {
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  padding: 24px;
  border-radius: 16px;
  border: 2px solid #e0f2fe;
}

.v-radio :deep(.v-selection-control__wrapper) {
  margin-right: 12px;
}
</style>