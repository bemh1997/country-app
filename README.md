# CountryApp

Aplicación del curso de Angular para consultar y explorar información de países. En la Sección 10 se conecta la interfaz con la API de países y se agregan búsquedas, resultados y páginas de detalle.

## Funcionalidades

- Buscar países por capital o nombre.
- Consultar países por región.
- Ver la información de un país y navegar entre sus países fronterizos.
- Mostrar estados de carga, resultados vacíos y errores de búsqueda.
- Navegación por rutas y componentes compartidos con Tailwind CSS y DaisyUI.

## Requisitos

- Node.js y pnpm.
- Una clave de acceso para la API de países.

## Configuración y desarrollo

Instala las dependencias:

```bash
pnpm install
```

Crea un archivo `.env` a partir de `.env.example` y configura la variable `COUNTRIES_API_KEY` con tu clave:

```text
COUNTRIES_API_KEY=tu_clave
```

No subas el archivo `.env` ni compartas tu clave. El proyecto genera el archivo de configuración de Angular a partir de esta variable al iniciar o compilar.

Inicia el servidor de desarrollo:

```bash
pnpm start
```

La aplicación queda disponible en `http://localhost:4200/` y se actualiza al guardar cambios.

## Compilar y probar

```bash
pnpm build
pnpm test
```

## Ramas del curso

- `seccion9`: estructura inicial de CountryApp.
- `seccion10`: integración con la API y funcionalidades de búsqueda y detalle.
- `master`: versión final del curso.
