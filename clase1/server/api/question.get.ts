import { defineEventHandler } from "h3"

export default defineEventHandler((event) => {
  const questionsData = {
    evaluation: {
      title: "Evaluación - Árboles de Decisión",
      description: "Pon a prueba tus conocimientos sobre árboles de decisión y Orange Data Mining",
      instructions: "Selecciona la respuesta correcta para cada pregunta. Recibirás retroalimentación inmediata.",
      totalQuestions: 5,
      passingScore: 60,
    },
    questions: [
      {
        id: 1,
        question: "¿Qué es un árbol de decisión y para qué se utiliza?",
        options: [
          {
            id: "a",
            text: "Un gráfico para visualizar porcentajes",
          },
          {
            id: "b",
            text: "Una herramienta para predecir resultados según reglas lógicas",
          },
          {
            id: "c",
            text: "Un conjunto de datos para clasificar imágenes",
          },
          {
            id: "d",
            text: "Un método para calcular estadísticas básicas",
          },
        ],
        correctAnswer: "b",
        explanation:
          "Un árbol de decisión es una herramienta de aprendizaje automático que utiliza reglas lógicas para predecir resultados o clasificar datos de manera visual y comprensible.",
        difficulty: "Básico",
        topic: "Conceptos fundamentales",
      },
      {
        id: 2,
        question: "¿Cuál de estas es una ventaja del árbol de decisión?",
        options: [
          {
            id: "a",
            text: "Solo sirve con datos numéricos",
          },
          {
            id: "b",
            text: "Es difícil de interpretar",
          },
          {
            id: "c",
            text: "Es visual y fácil de entender",
          },
          {
            id: "d",
            text: "Solo funciona con Orange",
          },
        ],
        correctAnswer: "c",
        explanation:
          "Una de las principales ventajas de los árboles de decisión es que son muy visuales y fáciles de interpretar, lo que los hace ideales para explicar decisiones.",
        difficulty: "Básico",
        topic: "Ventajas y características",
      },
      {
        id: 3,
        question: "¿Qué dataset se utiliza para predecir si una persona sobrevivió al Titanic?",
        options: [
          {
            id: "a",
            text: "zoo.tab",
          },
          {
            id: "b",
            text: "iris.tab",
          },
          {
            id: "c",
            text: "animals.tab",
          },
          {
            id: "d",
            text: "titanic.tab",
          },
        ],
        correctAnswer: "d",
        explanation:
          "El dataset titanic.tab contiene información sobre los pasajeros del Titanic y se utiliza para predecir la supervivencia basándose en características como edad, clase, sexo, etc.",
        difficulty: "Intermedio",
        topic: "Datasets y aplicaciones",
      },
      {
        id: 4,
        question: "¿Cuál es el objetivo del ejemplo práctico con el dataset Zoo?",
        options: [
          {
            id: "a",
            text: "Clasificar animales según su edad",
          },
          {
            id: "b",
            text: "Identificar animales salvajes",
          },
          {
            id: "c",
            text: "Predecir el tipo de animal según sus características",
          },
          {
            id: "d",
            text: "Medir la velocidad de los animales",
          },
        ],
        correctAnswer: "c",
        explanation:
          "El dataset Zoo se utiliza para clasificar animales en diferentes tipos (mamíferos, aves, peces, etc.) basándose en sus características físicas y biológicas.",
        difficulty: "Intermedio",
        topic: "Proyectos prácticos",
      },
      {
        id: 5,
        question: "¿Cuál es el primer paso para trabajar con datos en Orange?",
        options: [
          {
            id: "a",
            text: "Descargar Python",
          },
          {
            id: "b",
            text: "Abrir Tree Viewer",
          },
          {
            id: "c",
            text: "Cargar el archivo con el widget File",
          },
          {
            id: "d",
            text: "Hacer clic en Test & Score",
          },
        ],
        correctAnswer: "c",
        explanation:
          "El primer paso en cualquier flujo de trabajo en Orange es cargar los datos utilizando el widget File, que permite importar datasets en diferentes formatos.",
        difficulty: "Básico",
        topic: "Uso de Orange",
      },
    ],
    scoring: {
      excellent: {
        min: 90,
        message: "¡Excelente! Dominas muy bien los conceptos de árboles de decisión.",
        color: "success",
        icon: "mdi-trophy",
      },
      good: {
        min: 70,
        message: "¡Bien hecho! Tienes un buen entendimiento del tema.",
        color: "primary",
        icon: "mdi-thumb-up",
      },
      fair: {
        min: 60,
        message: "Aprobado. Te recomendamos repasar algunos conceptos.",
        color: "warning",
        icon: "mdi-school",
      },
      poor: {
        min: 0,
        message: "Necesitas estudiar más. Revisa el contenido del curso.",
        color: "error",
        icon: "mdi-book-open",
      },
    },
    metadata: {
      course: "Técnicas Avanzadas de Programación",
      topic: "Evaluación - Árboles de Decisión",
      version: "1.0",
      lastUpdated: "2025-06-11",
      timeLimit: null,
      attempts: "unlimited",
    },
  }

  return questionsData
})