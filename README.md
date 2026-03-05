# React Movies 🎬

Aplicación de catálogo de películas que consume la API de TMDB, permitiendo explorar estrenos, películas populares, buscar títulos y ver detalles con tráiler.

## 📋 Descripción

Esta aplicación es un catálogo de películas con funcionalidades completas:

- **Página de inicio**: Slider con las últimas películas en cartelera
- **Últimos lanzamientos**: Grid paginado de películas en cartelera
- **Películas Populares**: Grid paginado de películas populares
- **Búsqueda**: Búsqueda en tiempo real con debounce al escribir y soporte para Enter
- **Detalle de película**: Información completa con póster, sinopsis, géneros y tráiler
- **Reproductor de vídeo**: Modal con tráiler de YouTube/Vimeo al hacer clic en "Ver"
- **Paginación**: Navegación entre páginas de resultados

## 🛠️ Tecnologías

- React 19
- TypeScript
- Ant Design v6
- React Router DOM v7
- Day.js
- SCSS/Sass
- TMDB API
- React Player v3
- React Testing Library
- Jest

## 🚀 Cómo Ejecutar

### Prerequisitos

- Node.js (v14 o superior)
- npm o yarn
- API Key de [TMDB](https://www.themoviedb.org/settings/api)

### Instalación

1. Navega al directorio del proyecto:

```bash
cd "react-movies"
```

2. Instala las dependencias:

```bash
npm install
```

3. Configura tu API Key de TMDB en `src/utils/constants.ts`:

```ts
export const API_KEY = "tu_api_key_aquí";
```

### Ejecución en Desarrollo

```bash
npm run dev
```

La aplicación se abrirá en [http://localhost:3000](http://localhost:3000).

### Ejecutar Tests

```bash
npm test
```

### Build para Producción

```bash
npm run build
```

## 📚 Conceptos Demostrados

### 1. **Custom Hook useFetch**

Hook reutilizable para peticiones a la API con manejo de estados:

```ts
export default function useFetch(url: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // ...
}
```

### 2. **Componente MoviePage reutilizable**

Componente genérico que recibe título y endpoint, eliminando duplicación entre páginas:

```tsx
<MoviePage title="Últimos lanzamientos" endpoint="movie/now_playing" />
<MoviePage title="Películas Populares" endpoint="movie/popular" />
```

### 3. **Búsqueda con Debounce**

Búsqueda en tiempo real sin saturar la API, actualizando la URL con `useSearchParams`:

```tsx
debounceRef.current = setTimeout(() => {
  setSearchParams({ q: value });
}, 300);
```

### 4. **React Router v7**

Navegación con rutas dinámicas y lectura de parámetros:

```tsx
const { id } = useParams();
const [searchParams, setSearchParams] = useSearchParams();
```

### 5. **Modal de Vídeo**

Reproductor de YouTube/Vimeo en modal con parada automática al cerrar usando `destroyOnHidden`:

```tsx
<Modal destroyOnHidden open={isOpen} onCancel={onClose}>
  <ReactPlayer url={videoUrl} />
</Modal>
```

### 6. **Grid Responsive**

Catálogo con tarjetas de altura uniforme usando Ant Design Grid y CSS:

```tsx
<Row gutter={[16, 16]}>
  <Col xs={24} sm={12} md={8} lg={6} xl={4}>
    <MovieCard movie={movie} />
  </Col>
</Row>
```

### 7. **Formateo de fechas con Day.js**

Sustituto moderno y ligero de Moment.js (~2KB vs ~70KB):

```tsx
const year = dayjs(releaseDate).format("YYYY");
```

## 📁 Estructura del Proyecto

```text
react-movies/
├── src/
│   ├── components/
│   │   ├── Error/
│   │   ├── Footer/
│   │   ├── Loading/
│   │   ├── MenuTop/
│   │   ├── ModalVideo/
│   │   ├── MovieCatalog/
│   │   ├── MovieList/
│   │   ├── MoviePage/
│   │   ├── Pagination/
│   │   └── SliderMovies/
│   ├── hooks/
│   │   └── useFetch.ts
│   ├── pages/
│   │   ├── 404/
│   │   ├── movie/
│   │   ├── search/
│   │   ├── home.tsx
│   │   ├── latest-releases.tsx
│   │   └── popular.tsx
│   ├── utils/
│   │   └── constants.ts
│   ├── App.tsx
│   ├── index.scss
│   └── index.tsx
└── package.json
```

## 🎯 Características Principales

### Catálogo de Películas

- ✅ Grid responsive con tarjetas de altura uniforme
- ✅ Imagen de portada con recorte inteligente (object-fit: cover)
- ✅ Títulos truncados a 2 líneas con puntos suspensivos
- ✅ Paginación completa entre resultados

### Búsqueda

- ✅ Búsqueda en tiempo real con debounce de 300ms
- ✅ Soporte para búsqueda al pulsar Enter
- ✅ URL actualizada con el término de búsqueda (`?q=...`)

### Detalle de Película

- ✅ Fondo con imagen backdrop de la película
- ✅ Póster, título, año, géneros y sinopsis
- ✅ Botón para reproducir el tráiler en modal
- ✅ Vídeo se detiene automáticamente al cerrar el modal

### Navegación

- ✅ Menú superior con enlaces a todas las secciones
- ✅ Rutas dinámicas para detalle de película (`/movie/:id`)
- ✅ Página 404 para rutas no encontradas

## 🧪 Testing

El proyecto incluye tests para los componentes principales. Ejecuta los tests con:

```bash
npm test
```

## 🤝 Contribuciones

Este es un proyecto educativo. Siéntete libre de hacer fork y experimentar con diferentes conceptos de React.

## 📝 Licencia

MIT

## 👨‍💻 Autor

Proyecto creado como parte del curso de React en Udemy.
