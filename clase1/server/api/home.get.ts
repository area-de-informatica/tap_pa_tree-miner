import { defineEventHandler } from "h3"

export default defineEventHandler((event) => {
  const homeData = {
    hero: {
      title: "TreeMiner",
      subtitle:
        "¿Te has preguntado alguna vez cómo una máquina puede tomar decisiones basadas en datos? Hoy comenzarás a descubrirlo con el widget Tree de Orange Data Mining. Este recurso te guiará paso a paso para entender cómo funcionan los árboles de decisión, una de las herramientas más visuales y potentes del aprendizaje automático.",
      icon: "mdi-tree",
      backgroundGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    recommendations: {
      title: "Recomendaciones",
      items: [
        {
          id: 1,
          title: "Configura tu entorno",
          description:
            "Asegúrate de tener un equipo con conexión a internet estable, instala Orange. No te preocupes si no sabes cómo hacerlo, en la sección de contenidos encontrarás una guía completa.",
          icon: "mdi-cog-outline",
          color: "primary",
        },
        {
          id: 2,
          title: "Descarga los recursos",
          description:
            "Cuando te ubiques en los ejercicios asegúrate de descargar los archivos necesarios, estos recursos te permitirán realizar los ejemplos y realizar tus propias pruebas.",
          icon: "mdi-download",
          color: "success",
        },
        {
          id: 3,
          title: "Aprende haciendo",
          description:
            "Sigue los pasos de cada guía y no dudes en experimentar por tu cuenta. La mejor manera de aprender es aplicando lo que ves en los ejemplos y explorando nuevas configuraciones.",
          icon: "mdi-hand-heart",
          color: "warning",
        },
        {
          id: 4,
          title: "Refuerza lo aprendido",
          description:
            "Al finalizar cada sesión tómate un momento para repasar los conceptos claves. Puedes volver a los ejemplos, utilizar la sesión de preguntas frecuentes o incluso buscar nuevas aplicaciones del widget.",
          icon: "mdi-brain",
          color: "info",
        },
      ],
    },
    learningOutcomes: {
      title: "Con este recurso aprenderás",
      outcomes: [
        {
          id: 1,
          title: "Árboles de decisión",
          description: "Comprender el funcionamiento de los árboles de decisión",
          icon: "mdi-file-tree",
          color: "success",
          level: "Fundamental",
        },
        {
          id: 2,
          title: "Modelado con Tree",
          description: "Construir, visualizar y evaluar modelos con el widget Tree",
          icon: "mdi-chart-tree",
          color: "primary",
          level: "Práctico",
        },
        {
          id: 3,
          title: "Proyectos reales",
          description: "Realizar prácticas guiadas con ejemplos reales.",
          icon: "mdi-folder-multiple",
          color: "purple",
          level: "Aplicado",
        },
      ],
    },
    navigation: {
      sections: [
        {
          id: "contenido",
          title: "Contenido",
          description: "Conceptos fundamentales y teoría",
          icon: "mdi-book-open-page-variant",
          color: "primary",
          route: "/contenido",
        },
        {
          id: "actividades",
          title: "Actividades",
          description: "Ejercicios prácticos guiados",
          icon: "mdi-flask-outline",
          color: "success",
          route: "/actividades",
        },
        {
          id: "creditos",
          title: "Créditos",
          description: "Información del equipo",
          icon: "mdi-account-group",
          color: "info",
          route: "/creditos",
        },
      ],
    },
    metadata: {
      course: "Técnicas Avanzadas de Programación",
      topic: "TreeMiner - Árboles de Decisión",
      version: "1.0",
      lastUpdated: "2025-06-11",
      estimatedDuration: "4 horas",
    },
  }

  return homeData
})