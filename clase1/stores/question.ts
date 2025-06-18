import { defineStore } from "pinia"

interface Option {
  id: string
  text: string
}

interface Question {
  id: number
  question: string
  options: Option[]
  correctAnswer: string
  explanation: string
  difficulty: string
  topic: string
}

interface Evaluation {
  title: string
  description: string
  instructions: string
  totalQuestions: number
  passingScore: number
}

interface ScoreLevel {
  min: number
  message: string
  color: string
  icon: string
}

interface Scoring {
  excellent: ScoreLevel
  good: ScoreLevel
  fair: ScoreLevel
  poor: ScoreLevel
}

interface Metadata {
  course: string
  topic: string
  version: string
  lastUpdated: string
  timeLimit: string | null
  attempts: string
}

interface QuestionsData {
  evaluation: Evaluation
  questions: Question[]
  scoring: Scoring
  metadata: Metadata
}

interface UserAnswer {
  questionId: number
  selectedOption: string
  isCorrect: boolean
  timestamp: Date
}

export const useStoreQuestion = defineStore("question", {
  state: () => ({
    questionsData: null as QuestionsData | null,
    currentQuestion: null as Question | null,
    userAnswers: [] as UserAnswer[],
    currentQuestionIndex: 0,
    showResults: false,
    evaluationStarted: false,
  }),
  actions: {
    async fetchQuestions() {
      try {
        const response = await $fetch("/api/question")
        this.questionsData = response
        this.setCurrentQuestion(0)
      } catch (error) {
        console.error("Error fetching questions:", error)
      }
    },
    setCurrentQuestion(index: number) {
      if (this.questionsData && this.questionsData.questions[index]) {
        this.currentQuestion = { ...this.questionsData.questions[index] }
        this.currentQuestionIndex = index
      }
    },
    answerQuestion(questionId: number, selectedOption: string) {
      if (!this.questionsData) return false

      const question = this.questionsData.questions.find((q) => q.id === questionId)
      if (!question) return false

      const isCorrect = question.correctAnswer === selectedOption

      // Guardar o actualizar la respuesta del usuario
      const existingAnswerIndex = this.userAnswers.findIndex((answer) => answer.questionId === questionId)
      const userAnswer: UserAnswer = {
        questionId,
        selectedOption,
        isCorrect,
        timestamp: new Date(),
      }

      if (existingAnswerIndex !== -1) {
        this.userAnswers[existingAnswerIndex] = userAnswer
      } else {
        this.userAnswers.push(userAnswer)
      }

      return isCorrect
    },
    nextQuestion() {
      if (this.questionsData && this.currentQuestionIndex < this.questionsData.questions.length - 1) {
        this.setCurrentQuestion(this.currentQuestionIndex + 1)
      }
    },
    previousQuestion() {
      if (this.currentQuestionIndex > 0) {
        this.setCurrentQuestion(this.currentQuestionIndex - 1)
      }
    },
    startEvaluation() {
      this.evaluationStarted = true
      this.userAnswers = []
      this.currentQuestionIndex = 0
      this.showResults = false
      this.setCurrentQuestion(0)
    },
    finishEvaluation() {
      this.showResults = true
    },
    resetEvaluation() {
      this.userAnswers = []
      this.currentQuestionIndex = 0
      this.showResults = false
      this.evaluationStarted = false
      this.setCurrentQuestion(0)
    },
    getQuestionById(questionId: number) {
      if (!this.questionsData) return null
      return this.questionsData.questions.find((question) => question.id === questionId)
    },
    getUserAnswer(questionId: number) {
      return this.userAnswers.find((answer) => answer.questionId === questionId)
    },
  },
  getters: {
    score: (state) => {
      if (state.userAnswers.length === 0) return 0
      const correctAnswers = state.userAnswers.filter((answer) => answer.isCorrect).length
      return Math.round((correctAnswers / state.userAnswers.length) * 100)
    },
    correctAnswersCount: (state) => {
      return state.userAnswers.filter((answer) => answer.isCorrect).length
    },
    totalAnswered: (state) => {
      return state.userAnswers.length
    },
    scoreLevel: (state) => {
      if (!state.questionsData) return null
      const currentScore = Math.round(
        (state.userAnswers.filter((answer) => answer.isCorrect).length / state.userAnswers.length) * 100,
      )

      if (currentScore >= state.questionsData.scoring.excellent.min) return state.questionsData.scoring.excellent
      if (currentScore >= state.questionsData.scoring.good.min) return state.questionsData.scoring.good
      if (currentScore >= state.questionsData.scoring.fair.min) return state.questionsData.scoring.fair
      return state.questionsData.scoring.poor
    },
    isPassed: (state) => {
      if (!state.questionsData) return false
      const currentScore = Math.round(
        (state.userAnswers.filter((answer) => answer.isCorrect).length / state.userAnswers.length) * 100,
      )
      return currentScore >= state.questionsData.evaluation.passingScore
    },
  },
  /*persist: { 
    storage: process.client ? localStorage : undefined 
  }*/
})