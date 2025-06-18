<template>
  <div class="app-layout">
    <!-- Navigation Header -->
    <header class="nav-header">
      <nav class="nav-container">
        <div class="nav-content">
          <!-- Logo/Brand -->
          <div class="nav-brand">
            <v-icon size="32" color="white" class="mr-2">mdi-tree</v-icon>
            <h1 class="brand-title">TreeMiner</h1>
          </div>

          <!-- Desktop Navigation -->
          <div class="nav-links desktop-nav">
            <NuxtLink
              v-for="item in items"
              :key="item.link"
              :to="item.link"
              class="nav-link"
              :class="{ 'nav-link-active': $route.path === item.link }"
            >
              <v-icon size="20" class="nav-icon">{{ item.icon }}</v-icon>
              <span class="nav-text">{{ item.title }}</span>
            </NuxtLink>
          </div>

          <!-- Mobile Menu Button -->
          <div class="mobile-menu-btn">
            <v-btn
              icon
              variant="text"
              color="white"
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="d-md-none"
            >
              <v-icon>{{ mobileMenuOpen ? 'mdi-close' : 'mdi-menu' }}</v-icon>
            </v-btn>
          </div>
        </div>

        <!-- Mobile Navigation -->
        <div class="mobile-nav" :class="{ 'mobile-nav-open': mobileMenuOpen }">
          <div class="mobile-nav-content">
            <NuxtLink
              v-for="item in items"
              :key="item.link"
              :to="item.link"
              class="mobile-nav-link"
              :class="{ 'mobile-nav-link-active': $route.path === item.link }"
              @click="mobileMenuOpen = false"
            >
              <v-icon size="24" class="mobile-nav-icon">{{ item.icon }}</v-icon>
              <span class="mobile-nav-text">{{ item.title }}</span>
            </NuxtLink>
          </div>
        </div>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="main-content">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="app-footer">
      <div class="footer-content">
        <div class="footer-section">
          <div class="footer-brand">
            <v-icon size="24" color="primary" class="mr-2">mdi-tree</v-icon>
            <span class="footer-title">TreeMiner</span>
          </div>
          <p class="footer-description">
            Herramienta educativa para aprender árboles de decisión con Orange Data Mining
          </p>
        </div>
        
        <div class="footer-section">
          <h4 class="footer-heading">Enlaces Rápidos</h4>
          <div class="footer-links">
            <NuxtLink v-for="item in items" :key="item.link" :to="item.link" class="footer-link">
              {{ item.title }}
            </NuxtLink>
          </div>
        </div>
        
        <div class="footer-section">
          <h4 class="footer-heading">Información</h4>
          <div class="footer-info">
            <p class="footer-text">Universidad de Córdoba</p>
            <p class="footer-text">Licenciatura en Informática</p>
            <p class="footer-text">Técnicas Avanzadas de Programación</p>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <div class="footer-bottom-content">
          <p class="copyright">
            © 2025 TreeMiner. Desarrollado por estudiantes de la Universidad de Córdoba.
          </p>
          <div class="footer-badges">
            <v-chip color="primary" variant="outlined" size="small" class="mr-2">
              <v-icon start size="16">mdi-school</v-icon>
              Educativo
            </v-chip>
            <v-chip color="success" variant="outlined" size="small">
              <v-icon start size="16">mdi-open-source-initiative</v-icon>
              Open Source
            </v-chip>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const mobileMenuOpen = ref(false)

const items = [
  {
    title: 'Inicio',
    link: '/',
    icon: 'mdi-home'
  },
  {
    title: 'Contenido',
    link: '/contenido',
    icon: 'mdi-book-open-page-variant'
  },
  {
    title: 'Actividades',
    link: '/actividades',
    icon: 'mdi-flask-outline'
  },
  {
    title: 'Evaluación',
    link: '/evaluacion',
    icon: 'mdi-clipboard-check-outline'
  },
  {
    title: 'Créditos',
    link: '/creditos',
    icon: 'mdi-account-group'
  }
]

// Close mobile menu when route changes
watch(() => route.path, () => {
  mobileMenuOpen.value = false
})
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Navigation Header */
.nav-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  opacity: 0.3;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
}

.nav-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  position: relative;
  z-index: 2;
}

/* Brand */
.nav-brand {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.brand-title {
  color: white;
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

/* Desktop Navigation */
.desktop-nav {
  display: none;
  gap: 0.5rem;
}

@media (min-width: 960px) {
  .desktop-nav {
    display: flex;
  }
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 0.75rem 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  border-radius: 12px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.1);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
  border-radius: 12px;
}

.nav-link:hover::before,
.nav-link-active::before {
  transform: scaleX(1);
}

.nav-link:hover {
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.nav-link-active {
  color: white;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.nav-icon {
  margin-right: 0.5rem;
}

.nav-text {
  font-weight: 500;
  font-size: 0.95rem;
}

/* Mobile Navigation */
.mobile-nav {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transform: translateY(-100%);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.mobile-nav-open {
  transform: translateY(0);
  opacity: 1;
  visibility: visible;
}

.mobile-nav-content {
  padding: 1rem 2rem 2rem;
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  padding: 1rem 0;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.mobile-nav-link:last-child {
  border-bottom: none;
}

.mobile-nav-link:hover,
.mobile-nav-link-active {
  color: white;
  padding-left: 1rem;
}

.mobile-nav-icon {
  margin-right: 1rem;
}

.mobile-nav-text {
  font-weight: 500;
  font-size: 1.1rem;
}

/* Main Content */
.main-content {
  flex: 1;
  min-height: calc(100vh - 80px);
}

/* Footer */
.app-footer {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: white;
  margin-top: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.footer-section {
  display: flex;
  flex-direction: column;
}

.footer-brand {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.footer-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
}

.footer-description {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin: 0;
}

.footer-heading {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: white;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-link {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: color 0.3s ease;
  padding: 0.25rem 0;
}

.footer-link:hover {
  color: #667eea;
}

.footer-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-text {
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  padding: 0.25rem 0;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1.5rem 2rem;
}

.footer-bottom-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.copyright {
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
  font-size: 0.9rem;
}

.footer-badges {
  display: flex;
  gap: 0.5rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .nav-content {
    padding: 1rem;
  }
  
  .footer-content {
    padding: 2rem 1rem 1rem;
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .footer-bottom-content {
    flex-direction: column;
    text-align: center;
    padding: 1rem;
  }
}

/* Smooth transitions for route changes */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>