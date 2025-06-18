import { defineStore } from "pinia"

interface HeroSection {
  title: string
  subtitle: string
  icon: string
  backgroundGradient: string
}

interface RecommendationItem {
  id: number
  title: string
  description: string
  icon: string
  color: string
}

interface Recommendations {
  title: string
  items: RecommendationItem[]
}

interface LearningOutcome {
  id: number
  title: string
  description: string
  icon: string
  color: string
  level: string
}

interface LearningOutcomes {
  title: string
  outcomes: LearningOutcome[]
}

interface NavigationSection {
  id: string
  title: string
  description: string
  icon: string
  color: string
  route: string
}

interface Navigation {
  sections: NavigationSection[]
}

interface Metadata {
  course: string
  topic: string
  version: string
  lastUpdated: string
  estimatedDuration: string
}

interface HomeData {
  hero: HeroSection
  recommendations: Recommendations
  learningOutcomes: LearningOutcomes
  navigation: Navigation
  metadata: Metadata
}

export const useStoreHome = defineStore("home", {
  state: () => ({
    homeData: null as HomeData | null,
    currentSection: null as NavigationSection | null,
  }),
  actions: {
    async fetchHomeData() {
      try {
        const response = await $fetch("/api/home")
        this.homeData = response
        this.setCurrentSection(this.homeData.navigation.sections[0])
      } catch (error) {
        console.error("Error fetching home data:", error)
      }
    },
    setCurrentSection(section: NavigationSection) {
      this.currentSection = { ...section }
    },
    updateRecommendation(updatedRecommendation: RecommendationItem) {
      if (this.homeData) {
        const index = this.homeData.recommendations.items.findIndex((r) => r.id === updatedRecommendation.id)
        if (index !== -1) {
          this.homeData.recommendations.items[index] = { ...updatedRecommendation }
        }
      }
    },
    updateLearningOutcome(updatedOutcome: LearningOutcome) {
      if (this.homeData) {
        const index = this.homeData.learningOutcomes.outcomes.findIndex((o) => o.id === updatedOutcome.id)
        if (index !== -1) {
          this.homeData.learningOutcomes.outcomes[index] = { ...updatedOutcome }
        }
      }
    },
    getRecommendationById(recommendationId: number) {
      if (!this.homeData) return null
      return this.homeData.recommendations.items.find((item) => item.id === recommendationId)
    },
    getLearningOutcomeById(outcomeId: number) {
      if (!this.homeData) return null
      return this.homeData.learningOutcomes.outcomes.find((outcome) => outcome.id === outcomeId)
    },
    getNavigationSectionById(sectionId: string) {
      if (!this.homeData) return null
      return this.homeData.navigation.sections.find((section) => section.id === sectionId)
    },
  },
  /*persist: { 
    storage: process.client ? localStorage : undefined 
  }*/
})