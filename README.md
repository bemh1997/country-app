# CountryApp

Aplicación del curso para consultar países. La Sección 9 deja preparada la estructura de navegación y presentación; la integración para cargar y buscar datos se trabajará en la Sección 10.

## Sección 9: estructura de la aplicación

- Rutas de país separadas en `src/app/country/country.routes.ts` y cargadas de forma diferida.
- Rutas para buscar por capital, país y región.
- Layout y componentes compartidos para menú, búsqueda y lista de países.
- Estilos con Tailwind CSS y DaisyUI.

## Desarrollo

Instala las dependencias con pnpm y ejecuta el servidor de desarrollo:

```bash
pnpm install
pnpm start
```

La aplicación queda disponible en `http://localhost:4200/` y se actualiza al guardar cambios.

## Compilar y probar

```bash
pnpm build
pnpm test
```

## Ramas

- `seccion9`: estructura inicial de CountryApp.
- `seccion10`: continuación para cargar datos y hacer funcionar la aplicación.
- `master`: versión final más reciente.
