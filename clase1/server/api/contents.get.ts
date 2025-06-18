export default defineEventHandler((event) => {
  const orangeContent = {
    sections: [
      {
        id: 1,
        title: "Instalación de Orange",
        content:
          "Para instalar Orange data mining, te recomendamos la versión portable la cuál podrás descargar usando el siguiente enlace https://orangedatamining.com/",
        type: "installation",
        hasVideo: true,
      },
      {
        id: 2,
        title: "Árboles de decisión",
        content:
          "Un árbol de decisión es una herramienta que nos ayuda a tomar decisiones basadas en datos. Funciona como un diagrama en forma de árbol, donde cada 'rama' representa una posible elección o resultado según ciertas condiciones.",
        type: "concept",
        hasVideo: false,
      },
      {
        id: 3,
        title: "Widget Tree",
        content:
          "El widget Tree de Orange permite implementar árboles de decisión para tareas de clasificación o regresión. Estos modelos dividen el conjunto de datos en función de características seleccionadas automáticamente, generando una estructura jerárquica en forma de árbol.",
        type: "widget",
        hasVideo: false,
      },
      {
        id: 4,
        title: "El widget Tree en Orange",
        content: "Parámetros clave",
        type: "widget-details",
        parameters: [
          {
            name: "Max Depth",
            description: "Límite de profundidad del árbol.",
          },
          {
            name: "Min Samples Split",
            description: "Mínimo de muestras necesarias para dividir un nodo.",
          },
          {
            name: "Pre-pruning",
            description: "Previene el sobreajuste deteniendo el crecimiento del árbol tempranamente.",
          },
          {
            name: "Post-pruning",
            description: "Elimina ramas innecesarias después de construir el árbol.",
          },
        ],
        note: "Para poder visualizar el árbol recuerda conectar la salida del widget Tree con la entrada del widget Tree Viewer",
      },
      {
        id: 5,
        title: "Proyectos reales",
        content: "Recuerda descargar los archivos de cada ejemplo para poder realizar estos ejercicios prácticos.",
        type: "projects",
        projects: [
          {
            id: 1,
            title: "Predicción de especies de flores (Iris Dataset)",
            objective: "Predecir la especie de una flor con base en sus características.",
            steps: [
              "Cargar el conjunto iris.tab desde el widget File.",
              "Conectar al widget Tree con valores por defecto.",
              "Conectar Tree Viewer para visualizar la estructura generada.",
              "Evaluar el modelo con Test & Score.",
            ],
            dataset: "iris.tab",
          },
          {
            id: 2,
            title: "Predicción de supervivencia (Titanic Dataset)",
            objective:
              "Predecir si una persona sobrevivió al hundimiento del Titanic, según sus características personales.",
            steps: [
              "Cargar el conjunto titanic.tab desde el widget File.",
              "Conectar al widget Tree con valores por defecto.",
              "Conectar Tree Viewer para visualizar la estructura generada.",
              "Evaluar el modelo con Test & Score.",
            ],
            dataset: "titanic.tab",
          },
          {
            id: 3,
            title: "Predicción de tipo de animal (Zoo Dataset)",
            objective: "Predecir el tipo de animal según sus características físicas y biológicas.",
            steps: [
              "Cargar el conjunto zoo.tab desde el widget File.",
              "Conectar al widget Tree con valores por defecto.",
              "Conectar Tree Viewer para visualizar la estructura generada.",
              "Evaluar el modelo con Test & Score.",
            ],
            dataset: "zoo.tab",
          },
        ],
      },
    ],
    metadata: {
      course: "Técnicas Avanzadas de Programación",
      topic: "Árboles de Decisión con Orange",
      version: "1.0",
      lastUpdated: "2025-06-11",
    },
  }

  return orangeContent
})