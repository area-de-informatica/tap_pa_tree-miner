export default defineEventHandler((event) => {
  const projectData = {
    autores: [
      {
        id: 1,
        nombre: "Camilo Andrés Soto German",
      },
      {
        id: 2,
        nombre: "Juan Daniel Lozano Vergara",
      },
      {
        id: 3,
        nombre: "Ludis Isabel Álvarez Solipaz",
      },
      {
        id: 4,
        nombre: "Juan Pablo Palomo González",
      },
    ],
    universidad: "Universidad de Córdoba",
    programa: "Licenciatura en informática",
    curso: "Técnicas avanzadas de programación",
    año: 2025,
    descripcion: "Este proyecto se desarrolló en el 2025 para el curso de técnicas avanzadas de programación.",
  }

  return projectData
})