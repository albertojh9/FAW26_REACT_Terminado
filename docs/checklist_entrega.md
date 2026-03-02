# Checklist final de entrega

## Git / Flujo de trabajo

- [x] Rama principal: main
- [x] Código pusheado al remoto (origen main)
- [x] Feature branch mergeada: feature/viewmodel-sync -> main (COMPLETADA)
- [x] Repositorio actualizado en GitHub

## Frontend

- [x] Patrón ViewModel aplicado por pantalla
- [x] Lógica de fetch/estado fuera de las páginas
- [x] Estados de loading/error visibles en UI
- [x] Favoritos sincronizados entre Movies y Detail
- [x] SearchTMDBPage funcional (ID + texto)
- [x] Botón Guardar/Importar desde TMDB al backend local

## Backend (repo separado)

- [x] POST /api/movies acepta JSON con request.get_json
- [x] Persistencia invocando create_movie(...)
- [x] Respuesta JSON 201 Created
- [x] DELETE /api/movies/<id> disponible (extra)

## CORS (Flask)

- [x] dependencia flask-cors en requirements.txt
- [x] CORS(app, origins=["http://localhost:5173"]) configurado
- [x] Endpoints API expuestos con @cross_origin()

## Documentación

- [x] README con referencia al repo/ruta del backend
- [x] README con credenciales TMDB y uso de import.meta.env.VITE_TMDB_API_KEY
- [x] Diagramas PlantUML fuente en docs/*.puml
- [x] Diagramas renderizados en docs/images/*.png
- [x] README mostrando imágenes renderizadas
- [x] changelog actualizado

## Seguridad

- [ ] Rotar API key de TMDB si se compartió por error
- [x] .env.local ignorado por git
- [x] .env.example con placeholder para compartir en equipo

## Comandos útiles

```bash
# Build y validación
npm run build

# Verificar estado del repositorio
git status
git log --oneline -5

# Ver historial de cambios
git log --graph --oneline --all
```
