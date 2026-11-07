# Proyecto QA ParaBank

## 1. Descripción

Proyecto académico de aseguramiento de calidad para el curso QA Automatizador de Tecsup. El sistema bajo prueba es ParaBank, una aplicación bancaria de demostración desarrollada por Parasoft. El repositorio centraliza la documentación de pruebas, la evidencia generada y la automatización inicial con Playwright.

## 2. Objetivo

Evaluar flujos funcionales y aspectos básicos de accesibilidad mediante diseño de casos manuales, exploración y automatización con Playwright.

La automatización adapta la organización del ejemplo del curso mediante Page Objects, fixtures y pruebas parametrizadas con datos separados.

## 3. Sistema bajo prueba

- **URL:** https://parabank.parasoft.com/parabank/
- **Tipo:** aplicación web bancaria de demostración.
- **Estado:** en desarrollo; la ejecución manual y validación de hallazgos siguen pendientes.

## 4. Funcionalidades contempladas

- Registro de clientes.
- Inicio y cierre de sesión.
- Recuperación de credenciales.
- Consulta de cuentas y saldos.
- Transferencias.
- Actualización de información personal.
- Revisión básica de accesibilidad.

Este alcance incluye funcionalidades diseñadas que todavía no cuentan con automatización completa.

## 5. Herramientas

- Git y GitHub para control de versiones.
- Playwright para pruebas automatizadas.
- Chromium, Firefox y WebKit para ejecución de pruebas.
- DevTools para inspeccionar la aplicación y sus peticiones.
- GitHub Actions para integración continua.
- Jira para gestión de casos y defectos, si se confirma el espacio del curso.

## 6. Estructura del repositorio

- `docs/`: plan de pruebas, casos manuales, matriz de trazabilidad, tabla de decisión, reglas del proyecto, reporte de hallazgos, sesión exploratoria y mapa de flujos.
- `pages/LoginPage.js`: Page Object del formulario de acceso.
- `tests/auth/fixture.js`: fixtures de autenticación y sesión.
- `tests/auth/login.spec.js`: pruebas de credenciales válidas e inválidas.
- `tests/auth/logout.spec.js`: prueba de cierre de sesión.
- `tests/auth/login-data.spec.js`: pruebas parametrizadas de campos obligatorios.
- `test-data/data-login.json`: datos ficticios para las pruebas parametrizadas.
- `tests/parabank-login.spec.js`: comprobaciones del formulario y del acceso al registro.
- `evidencias/`: capturas y fichas de evidencia.
- `.github/workflows/node.js.yml`: ejecución de pruebas en GitHub Actions.
- `.env.example`: plantilla de variables de entorno.
- `playwright.config.js`: configuración de pruebas, navegadores y reportes.
- `package.json`: dependencias y comandos de ejecución.

Los archivos `tests/example.spec.js` y `tests/locators.spec.js` son ejercicios excluidos de la suite principal mediante `testMatch`.

## 7. Casos automatizados de autenticación

| Archivo | Caso |
|---|---|
| `login.spec.js` | No crea sesión para un usuario inválido. |
| `login.spec.js` | Rechaza una contraseña incorrecta. |
| `login.spec.js` | Permite iniciar sesión con credenciales válidas. |
| `logout.spec.js` | Cierra sesión y muestra el formulario de acceso. |
| `login-data.spec.js` | Rechaza el usuario vacío. |
| `login-data.spec.js` | Rechaza la contraseña vacía. |
| `login-data.spec.js` | Rechaza ambos campos vacíos. |

Las pruebas parametrizadas toman los datos y mensajes esperados de `test-data/data-login.json`.

### Resultados verificados

Se ejecutaron los siete casos de autenticación en Chromium, Firefox y WebKit, con resultado de **21 pruebas aprobadas**.

Después de ajustar la navegación inicial de `LoginPage` para abrir `./index.htm`, se ejecutaron nuevamente los siete casos en Chromium, con resultado de **7 pruebas aprobadas**.

Estos resultados corresponden a las ejecuciones locales observadas. No acreditan la ejecución manual de CP-01 a CP-15 ni la aprobación de toda la suite en GitHub Actions.

## 8. Estado de hallazgos y pruebas manuales

Las notas exploratorias originales contienen cinco candidatos funcionales que requieren reproducción. Se registran en `docs/reporte-defectos-v1.md` sin presentarlos como defectos confirmados.

Antes de confirmar cada candidato, se deben documentar las precondiciones, los pasos, el resultado obtenido, la evidencia y la regla de negocio esperada.

ACC-01 registra una inspección técnica del nombre accesible de los campos de login. Falta completar la revisión con lector de pantalla y evaluar su impacto.

## 9. Organización de la automatización

### Page Object

`pages/LoginPage.js` centraliza los localizadores y las acciones del formulario de acceso:

- Campos de usuario y contraseña.
- Botón `Log In`.
- Mensaje de error.
- Encabezado `Accounts Overview`.
- Métodos `goto()` y `login()`.

El método `goto()` abre `./index.htm` respecto de la URL base para conservar la ruta `/parabank/`.

### Fixtures

`tests/auth/fixture.js` proporciona:

- `loginPage`: crea el Page Object y abre el formulario de acceso.
- `credentials`: obtiene el usuario y la contraseña de las variables de entorno.
- `loggedInPage`: inicia sesión, verifica la página de cuentas y entrega la página autenticada al test.

Cada prueba utiliza su propio contexto de navegador. La fixture permite reutilizar la preparación del acceso sin depender de una prueba anterior.

### Datos parametrizados

`test-data/data-login.json` contiene datos ficticios y mensajes esperados para las combinaciones de campos vacíos.

`tests/auth/login-data.spec.js` recorre esos datos y genera una prueba independiente por entrada.

## 10. Configuración local

Ejecutar los comandos desde la carpeta raíz del proyecto.

### Instalar dependencias

```bash
npm ci
```

### Instalar navegadores

```bash
npx playwright install --with-deps
```

### Configurar variables de entorno

Copiar `.env.example` como `.env` y completar:

```dotenv
BASE_URL=https://parabank.parasoft.com/parabank/
PARABANK_USERNAME=tu_usuario_de_prueba
PARABANK_PASSWORD=tu_contraseña_de_prueba
```

Los valores de usuario y contraseña del ejemplo son marcadores. Deben reemplazarse por los de una cuenta de prueba válida.

Conservar la barra final de `BASE_URL`.

El archivo `.env` está excluido de Git. No publicar credenciales en código, documentación ni capturas.

## 11. Ejecución de pruebas

### Toda la suite principal

```bash
npm test
```

### Todos los casos de autenticación en los tres navegadores

```bash
npx playwright test tests/auth --workers=1
```

### Todos los casos de autenticación en Chromium

```bash
npx playwright test tests/auth --project=chromium --workers=1
```

### Solo los tres casos de login

```bash
npm run test:auth
```

Este comando ejecuta únicamente `tests/auth/login.spec.js`.

### Solo cierre de sesión

```bash
npx playwright test tests/auth/logout.spec.js --project=chromium
```

### Solo los casos parametrizados

```bash
npx playwright test tests/auth/login-data.spec.js --project=chromium
```

### Ejecutar con navegador visible

```bash
npm run test:headed
```

### Abrir la interfaz de Playwright

```bash
npm run test:ui
```

### Consultar el reporte HTML

```bash
npm run report
```

### Comportamiento cuando faltan credenciales

- El caso de acceso válido se omite si falta el usuario o la contraseña.
- El caso de contraseña incorrecta se omite si falta el usuario.
- El cierre de sesión utiliza `loggedInPage` y requiere ambas credenciales. Si faltan, la fixture informa un error.
- Los casos parametrizados de campos vacíos utilizan datos ficticios y no requieren credenciales reales.

## 12. Integración continua

El workflow `.github/workflows/node.js.yml` se activa con pushes a `main` y pull requests dirigidos a `main`.

El proceso:

1. Prepara las versiones de Node.js configuradas en la matriz.
2. Instala las dependencias con `npm ci`.
3. Instala los navegadores y dependencias de Playwright.
4. Ejecuta la suite principal con `npm test`.
5. Conserva el reporte HTML como artefacto durante siete días.

Queda pendiente crear los secretos `PARABANK_USERNAME` y `PARABANK_PASSWORD` en GitHub y conectarlos como variables de entorno del workflow.

Las pruebas autenticadas requieren una cuenta válida en ParaBank. Una ejecución local aprobada no garantiza el mismo resultado en CI.

## 13. Pendientes

- Configurar las credenciales de prueba en GitHub Actions y verificar la ejecución completa en CI.
- Actualizar la matriz de trazabilidad con los casos automatizados y sus evidencias.
- Ejecutar CP-01 a CP-15 y guardar fecha, resultado y evidencia.
- Reproducir OBS-01 a OBS-05 y confirmar las reglas esperadas antes de registrar defectos.
- Contrastar las peticiones del mapa de flujos en DevTools.
- Ampliar la automatización de registro, cuentas y transferencias según el alcance.
- Completar las revisiones de accesibilidad de teclado, lector de pantalla, contraste y texto alternativo.
- Registrar casos y defectos en Jira si el espacio del curso está disponible.
- Revisar y unificar los archivos de fixtures que hayan quedado duplicados.
- Subir los commits locales e integrar los cambios mediante un pull request hacia `main`.

## 14. Nota

Este repositorio refleja un proyecto académico en evolución. La documentación distingue el diseño de pruebas, los resultados de ejecución y los hallazgos pendientes de confirmación.

## Adaptación de la estructura del curso

Consultar [la correspondencia y los comandos](docs/adaptacion-profesor.md). Se centralizaron fixtures y se agregaron páginas de registro, cuentas, detalles y transferencia, además de reutilización de sesión en memoria. Las pruebas nuevas requieren validación contra ParaBank; no se consideran aprobadas por estar implementadas.
