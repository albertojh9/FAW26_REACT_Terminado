# Checklist final de entrega

## Git / Flujo de trabajo

- [x] Rama de trabajo: feature/viewmodel-sync
- [ ] Push de la rama al remoto
- [ ] PR abierta: feature/viewmodel-sync -> develop
- [ ] PR asignada al profesor

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
npm run build
git add .
git commit -m "feat(viewmodel): sync estado, tmdb y documentación"
git push -u origin feature/viewmodel-sync
```

Si usas GitHub CLI:

```bash
gh pr create --base develop --head feature/viewmodel-sync --title "feat(viewmodel): sincronización, TMDB y documentación" --body-file docs/pr_feature_viewmodel_sync.md
```
