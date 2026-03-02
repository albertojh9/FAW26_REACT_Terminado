# 📋 Registro Histórico: feature/viewmodel-sync -> main

**Estado**: ✅ MERGEADO A MAIN (2026-03-02)

## Título del Merge

feat(viewmodel): sincronización entre pantallas, integración TMDB y mejora de documentación

## Descripción

Esta PR completa la implementación del patrón ViewModel con Custom Hooks en frontend, consolida la integración con TMDB para búsqueda e importación al catálogo local y mejora la documentación técnica para facilitar la corrección.

## Qué se ha hecho

### 1) ViewModel por pantalla

- MoviesPage delega en useMoviesViewModel.
- MovieDetailPage delega en useMovieDetailViewModel.
- SearchTMDBPage delega en useSearchTMDBViewModel.
- Las páginas quedan centradas en renderizado y eventos de UI.

### 2) Estados loading/error en UI

- Se muestran estados de carga y error en catálogo, detalle y búsqueda TMDB.
- Las operaciones async están encapsuladas en los ViewModels.

### 3) Sincronización de estado entre pantallas

- Se añade una fuente compartida de favoritos en frontend:
  - src/services/favoritesStore.ts
- useMoviesViewModel y useMovieDetailViewModel hidratan/persisten favoritos desde la misma fuente.
- Al eliminar película se limpia también su estado de favorito.

### 4) Integración TMDB + persistencia en backend

- Búsqueda por ID y por texto desde TMDB.
- Mapeo de respuesta TMDB al modelo Movie de la app.
- Guardado en backend propio mediante POST /api/movies.
- Visualización posterior en /movies tras persistencia.

### 5) Documentación y PlantUML

- Diagramas fuente en docs/*.puml.
- Render en imagen para VS Code/GitHub en docs/images:
  - architecture.png
  - class_diagram.png
  - sequence_save_movie.png
- README actualizado con:
  - referencia al backend,
  - gestión de credenciales,
  - diagramas renderizados.

### 6) Changelog

- Registro actualizado en changelog.md con cambios de sincronización y documentación.

## Evidencias rápidas

- Build frontend OK:
  - npm run build

## Validación de requisitos de revisión previa

- ✅ Se trabajó en rama feature/viewmodel-sync.
- ✅ Se documentó explícitamente la relación con backend.
- ✅ Se refleja el trabajo en changelog y README.
- ✅ Rama mergeada exitosamente a main.
- ✅ Todo el código disponible en rama principal.

## Nota de seguridad

Se recomienda rotar la API key de TMDB si fue expuesta y mantener únicamente placeholders en archivos compartidos.

## Checklist del autor

- [x] ViewModels por pantalla implementados
- [x] Loading/error en pantallas principales
- [x] Sincronización de estado entre lista y detalle
- [x] Integración TMDB y guardado en backend
- [x] Diagramas PlantUML renderizados e incrustados en README
- [x] Changelog actualizado
- [x] Build local validado

## Asignación

Asignada al profesor para revisión contra develop.
