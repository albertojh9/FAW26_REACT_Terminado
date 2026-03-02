# Changelog - Cinema FAW

Todos los cambios notables en este proyecto se documentan en este archivo.
El formato está basado en [Keep a Changelog](https://keepachangelog.com/).

## [2.0.2] - 2026-03-02

### ✨ Mejoras de Sincronización

#### Estado Compartido
- **`src/services/favoritesStore.ts`**: Nuevo servicio centralizado
  - Fuente única de verdad para favoritos en frontend
  - Persiste en `localStorage` del navegador
  - Métodos: `isFavoriteMovie()`, `setFavoriteMovie()`, `getFavorites()`
  - Sincroniza automáticamente entre componentes sin necesidad HTTP

#### ViewModels Actualizados
- **`useMoviesViewModel.ts`**: 
  - Integración con `favoritesStore`
  - Hidratación de favoritos al cargar películas
  - Limpieza de favoritos al eliminar película
  
- **`useMovieDetailViewModel.ts`**:
  - Soporte completo para `favoritesStore`
  - Cambios de favoritos reflejados inmediatamente al volver a `/movies`
  - Sincronización automática sin re-renders innecesarios

### 📚 Documentación Mejorada

#### README.md
- ✅ Referencia explícita a ruta del repositorio backend
- ✅ Nueva sección: "Sincronización Frontend-Backend"
- ✅ Diagramas de flujo de datos (ASCII art)
- ✅ Guía de sincronización con 3 casos de uso principales
- ✅ Instrucciones de desarrollo local
- ✅ Testing manual paso a paso
- ✅ Stack tecnológico completo

#### Diagramas PlantUML Renderizados
- `docs/images/architecture.png` - Arquitectura general del sistema
- `docs/images/class_diagram.png` - Diagrama de clases y relaciones
- `docs/images/sequence_save_movie.png` - Secuencia de guardado desde TMDB

### 🔧 Cambios Técnicos

#### Frontend
- Eliminación de favoritos local (`isFavorite` en MovieCard) → centralizado en `favoritesStore`
- Mejor manejo de ciclo de vida de componentes
- Optimización de re-renders

#### Backend
- SIN CAMBIOS: Endpoints funcionan sin modificación
- Compatibilidad total con versiones anteriores

## [2.0.1] - 2026-03-02

### ✨ Nuevas Características

#### Sincronización Automática de Películas TMDB
- **`useMoviesViewModel.ts`**: Completamente actualizado
  - Carga automática de películas populares de TMDB
  - Sincronización inteligente: combina películas locales + TMDB
  - Deduplicación por título y año
  - Manejo de errores si TMDB falla (continúa con películas locales)
  - El catálogo ahora muestra hasta 20 películas populares de TMDB adicionales

#### Nuevas Funciones TMDB
- **`getPopularMovies(page)`**: Obtiene películas populares de TMDB
  - Pageable (por defecto página 1)
  - Filtra películas sin póster
  - Caché de géneros para mejor performance
  
- **`getNowPlayingMovies(page)`**: Obtiene películas en cartelera
  - Útil para futuras expansiones
  - Mismo formato que getPopularMovies

#### Instrucciones Mejoradas
- **`.env.local`**: Comentarios más claros
  - Instrucciones paso a paso para obtener API Key
  - Enlace directo a https://www.themoviedb.org/settings/api

### 🔧 Cambios Técnicos

#### Frontend
- Al cargar MoviesPage, automáticamente:
  1. Obtiene películas del backend local
  2. Obtiene películas populares de TMDB (si API key es válida)
  3. Combina ambas evitando duplicados
  4. Muestra todas sin duplicados en la interfaz

- Deduplicación mejorada: ahora compara por título + año, no solo por ID

### 🐛 Correcciones
- Mejor manejo de errores cuando TMDB API key no es válida
- El catálogo no falla si TMDB no está disponible
- Mejor sincronización de estado

---

## [2.0.0] - 2026-03-02

### ✨ Nuevas Características

#### Patrón ViewModel con Custom Hooks
- **Carpeta `src/hooks`**: Creada para centralizar la lógica de negocio
- **`useMoviesViewModel.ts`**: ViewModel para la lista de películas
  - Fetching de películas del backend
  - Eliminación de películas
  - Toggle de favoritos
  - Sincronización de estado
- **`useMovieDetailViewModel.ts`**: ViewModel para detalles de película
  - Carga de película individual
  - Soporte para eliminar película
  - Toggle de favoritos
- **`useSearchTMDBViewModel.ts`**: ViewModel para búsqueda TMDB
  - Búsqueda por ID de TMDB
  - Búsqueda por texto
  - Guardado de películas en base datos local
  - Manejo de duplicados

#### Integración con TMDB
- **`src/services/tmdbService.ts`**: Servicio completamente reescrito
  - Autenticación con API Key (VITE_TMDB_API_KEY)
  - `searchMoviesByTMDBId(id)`: Búsqueda por ID
  - `searchMoviesByQuery(query)`: Búsqueda por texto
  - Mapeo automático de géneros de TMDB
  - Extracción de información del director
  - Manejo de imágenes y URLs de pósters
- **`.env.local`**: Nuevo archivo para credenciales
  - Almacena VITE_TMDB_API_KEY de forma segura
  - Añadido a `.gitignore`

#### Nueva Página: SearchTMDBPage
- **`src/pages/SearchTMDBPage.tsx`**: Página de búsqueda en TMDB
  - Interfaz de búsqueda dual (por ID o por texto)
  - Vista de resultados en grid responsive
  - Botón para guardar películas en catálogo local
  - Badge de películas guardadas
  - Manejo de estados (loading, error, empty)

#### Backend - Nuevos Endpoints
- **`DELETE /api/movies/<id>`**: Eliminación de películas
  - Nueva función `delete_movie(id)` en `models.py`
  - Validación de existencia de película
  - Manejo de errores

#### Mejoras de Componentes
- **`MovieCard.tsx`**: Completamente rediseñado
  - Soporte para `onDelete` callback
  - Soporte para `onToggleFavorite` callback
  - Ícono de corazón para favoritos
  - Botón de eliminar (cuando aplique)
  - Estilos mejorados
  - Responsive design

- **`MoviesPage.tsx`**: Actualizado con ViewModel
  - Usa `useMoviesViewModel`
  - Integración de búsqueda TMDB
  - Manejo de eliminación
  - Manejo de favoritos

- **`MovieDetailPage.tsx`**: Actualizado con ViewModel
  - Carga desde backend, no mock
  - Sistema de favoritos funcional
  - Botón de eliminar película
  - Navegación después de eliminar

#### Modelo de Datos
- **`Movie` class**: Extensión del modelo
  - Nuevo campo `isFavorite: boolean`
  - Constructor actualizado para soportar favoritos

### 📚 Documentación

#### Diagramas PlantUML
- **`docs/architecture.puml`**: Diagrama de arquitectura del sistema
  - Relaciones entre Frontend, Backend y APIs
  - Componentes principales
  - Flujo de datos
  
- **`docs/class_diagram.puml`**: Diagrama de clases
  - Modelo Movie
  - Interfaz IMovieRepository
  - ViewModels
  - Servicios
  - Relaciones

- **`docs/sequence_save_movie.puml`**: Diagrama de secuencia
  - Flujo de búsqueda y guardado desde TMDB
  - Interacciones entre capas

#### README.md
- Completamente reescrito
- Documentación completa de arquitectura
- Instrucciones de instalación y ejecución
- Descripción de endpoints
- Stack tecnológico
- Características principales

### 🔧 Cambios Técnicos

#### Backend (Flask)
- Actualización de importaciones en `app.py`
- Nueva función `delete_movie()` en `models.py`
- Endpoint DELETE implementado y funcional
- CORS habilitado para DELETE requests

#### Frontend
- Actualización de api.ts para usar nuevos endpoints
- Sincronización de estado mejorada
- Manejo de errores más robusto
- Loading states en todas operaciones async

### 🐛 Correcciones de Bugs

- Eliminación correcta de películas desde detail page
- Sincronización de estado al eliminar
- Prevención de duplicados al guardar desde TMDB
- Manejo mejorado de errores de API

### 🚀 Performance

- Caché de géneros en tmdbService
- Límite de resultados a 10 películas por búsqueda
- Filtrado de películas sin póster
- Optimización de re-renders con hooks

## [1.0.0] - Inicial

### Características Iniciales
- Catálogo de películas mockado
- Detalles de película
- Página de contacto
- Sistema de navegación
- Bootstrap 5 styling
- TypeScript

---

# Migración a Typescript

Hemos instalado las siguientes dependencias mediante `npm install --save-dev` para que nuestro proyecto pueda usar typescript:

- typescript
- @types/react
- @types/react-dom

Además, una vez instalado typescript deberemos crear un fichero de configuración.
Podemos crearlo fácilmente con `npx tsc --init`, lo cual nos generará el fichero `tsconfig.json`.

Una vez hecho eso, hemos cambiado las extensiones de los ficheros `js` a `ts` y `jsx` a `tsx`.
A cada variable le añadiremos el tipo que tiene.

En el fichero `models.py` hemos cambiado el valor de retorno en un diccionario/lista de diccionarios para poder transformarlo después a json mediante `jsonify`.

Por ejemplo, para obtener todas las películas:
```py
movies_diccionario = []
for movie in movies:
    movies_diccionario.append({"id": movie[0], "title": movie[1], "director": movie[2], "year": movie[3], "genre": movie[4], "description": movie[5], "rating": movie[6], "poster_url": movie[7], "created_at": movie[8]})
return movies_diccionario
```

## Devolver el json desde endpoints

En `app.py` creamos el objeto cost:

```py
cors = CORS(app,origins=["http://localhost:5173"] )
app.config['CORS_HEADERS'] = 'Content-Type'
```
```
Además, a cada método le podemos añadir el decorador:
`@cross_origin()`

De esta manera dejamos acceso desde cualquier ruta.
