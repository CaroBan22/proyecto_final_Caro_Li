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
- `tests/fixtures.js`: fixtures centrales de autenticación, páginas y sesión guardada en memoria.
- `tests/auth/fixture.js`: reexportación de las fixtures centrales por compatibilidad.
- `pages/AccountsPage.js` y `pages/AccountDetailsPage.js`: consulta de cuentas y detalles.
- `pages/RegisterPage.js`: formulario de registro.
- `pages/OpenAccountPage.js`: apertura de cuenta bancaria.
- `pages/TransferPage.js`: formulario y confirmación de transferencias.
- `tests/accounts/accounts.spec.js`: consulta de cuentas y reutilización de sesión.
- `tests/accounts/open-transfer.spec.js`: apertura, transferencia, conciliación y nuevo login.
- `tests/registration/register.spec.js`: campos obligatorios de registro.
- `tests/transfers/transfer.spec.js`: formulario y transferencia opcional entre cuentas configuradas.
- `tests/auth/login.spec.js`: pruebas de credenciales válidas e inválidas.
- `tests/auth/logout.spec.js`: prueba de cierre de sesión.
- `tests/auth/login-data.spec.js`: pruebas parametrizadas de campos obligatorios.
- `test-data/data-login.json`: datos ficticios para las pruebas parametrizadas.
- `test-data/bank-flow-data.json`: tipo de cuenta e importe del flujo BANK-E2E, sin credenciales ni números de cuenta.
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

Estos resultados históricos corresponden a las ejecuciones locales observadas. No acreditan la ejecución manual de CP-01 a CP-15 ni la aprobación de toda la suite en GitHub Actions.

### Validaciones locales adicionales

Las capturas y los pasos del reporte compartidos por la autora acreditan estas ejecuciones separadas en Chromium:

| Ejecución | Resultado | Alcance |
|---|---|---|
| Bloques de autenticación, cuentas, registro y formularios | 14 aprobadas y 1 omitida | CP-06 se omitió; este resultado no incluye BANK-E2E. |
| Autenticación con cuenta de prueba renovada | 7 aprobadas en 24.2 s | Campos vacíos, acceso válido e inválido y logout. |
| BANK-E2E, 9 de noviembre de 2026 | 1 aprobada en 18.7 s | Apertura, transferencia de USD 1, conciliación, logout y nuevo login. |

BANK-E2E creó la cuenta **20781** desde la cuenta de prueba **20226** y comprobó los saldos después de la apertura, después de la transferencia y tras volver a iniciar sesión. El reporte incluye el paso de persistencia y el adjunto `conciliacion`. Estos números identifican esa ejecución; no son datos permanentes para futuras pruebas.

El historial de movimientos no se comprueba en BANK-E2E. La aprobación local no acredita la ejecución del flujo en CI, Firefox o WebKit, ni tres repeticiones del flujo transaccional. La suite sin movimientos sí se repitió, según el resultado detallado en la sección de estabilidad.

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

`tests/fixtures.js` proporciona las fixtures centrales; `tests/auth/fixture.js` las reexporta por compatibilidad:

- `loginPage`: crea el Page Object y abre el formulario de acceso.
- `credentials`: obtiene el usuario y la contraseña de las variables de entorno.
- `loggedInPage`: inicia sesión, verifica la página de cuentas y entrega la página autenticada al test.
- `bankStorageState`: genera el estado de sesión en memoria por worker.
- `savedSessionPage`: abre un contexto independiente con el estado guardado.
- `registerPage`, `accountsPage`, `accountDetailsPage` y `transferPage`: preparan las páginas de cada flujo.

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
RUN_OPEN_ACCOUNT_FLOW=false
RUN_BANK_MUTATIONS=false
PARABANK_FROM_ACCOUNT=
PARABANK_TO_ACCOUNT=
```

Los valores de usuario y contraseña del ejemplo son marcadores. Deben reemplazarse por los de una cuenta de prueba válida.

Conservar la barra final de `BASE_URL`.

El archivo `.env` está excluido de Git. No publicar credenciales en código, documentación ni capturas.

## 11. Ejecución de pruebas

### Toda la suite principal

Antes de una ejecución general, conservar `RUN_OPEN_ACCOUNT_FLOW=false` y `RUN_BANK_MUTATIONS=false` para omitir las operaciones que crean cuentas o transfieren saldo.

### Comando general

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

### Flujo completo con apertura y transferencia

Configurar en el `.env` local `RUN_OPEN_ACCOUNT_FLOW=true` y `PARABANK_FROM_ACCOUNT` con una cuenta del usuario actual. La cuenta debe cubrir el depósito mínimo que muestra ParaBank y USD 1 adicional.

Ejecutar una sola vez, en un navegador y sin reintentos:

```bash
npx playwright test tests/accounts/open-transfer.spec.js --project=chromium --workers=1 --retries=0 --headed --reporter=list,html
```

El flujo inicia sesión, abre una cuenta CHECKING, obtiene su número dinámico, transfiere USD 1 y concilia los saldos. Después cierra sesión, vuelve a entrar y verifica persistencia. Al finalizar, reemplazar el valor por `RUN_OPEN_ACCOUNT_FLOW=false`: mantener una sola definición de la variable.

Si falla después de enviar una operación, revisar las cuentas antes de repetirla. No hay limpieza automática ni reversión de movimientos.

CP-06 es otro caso: requiere `RUN_BANK_MUTATIONS=true` y dos cuentas distintas en `PARABANK_FROM_ACCOUNT` y `PARABANK_TO_ACCOUNT`; valida confirmación e identificadores, sin conciliación de saldos. Mantenerlo desactivado en ejecuciones generales.

### Reportes y estabilidad

Para conservar salida de terminal y generar HTML, usar `--reporter=list,html`. Usar solo `--reporter=list` no actualiza el HTML y puede dejar visible un reporte anterior.

La autora verificó la suite previa a esta refactorización en Chromium con tres repeticiones: **54 aprobadas y 6 omitidas en 3.1 minutos**, sin fallos ni reintentos. Las seis omisiones son BANK-E2E y CP-06 por tres repeticiones. Ese resultado no acredita las operaciones omitidas ni otros navegadores. Para repetirla con ambas variables de operaciones en `false`:

```bash
npx playwright test --project=chromium --workers=1 --retries=0 --repeat-each=3 --reporter=list,html
```

Las pruebas omitidas no cuentan como aprobadas. Esta comprobación no acredita repetición del flujo transaccional.

### Comportamiento cuando faltan credenciales

- El caso de acceso válido se omite si falta el usuario o la contraseña.
- El caso de contraseña incorrecta se omite si falta el usuario.
- El cierre de sesión utiliza `loggedInPage` y requiere ambas credenciales. Si faltan, la fixture informa un error.
- Los casos parametrizados de campos vacíos utilizan datos ficticios y no requieren credenciales reales.

## 12. Integración continua

El workflow `.github/workflows/node.js.yml` permite ejecución manual y se activa con pushes a `main` y pull requests dirigidos a `main` o `refactor-pom`.

El proceso:

1. Prepara Node.js 22 según la matriz actual.
2. Instala las dependencias con `npm ci`.
3. Instala los navegadores y dependencias de Playwright.
4. Ejecuta la suite principal con `npm test`.
5. Conserva el reporte HTML como artefacto durante siete días.

El workflow ya obtiene `PARABANK_USERNAME` y `PARABANK_PASSWORD` desde los secretos del repositorio. Mantener sus valores vigentes cuando cambie la cuenta de prueba; actualizar el `.env` local no actualiza los secretos de GitHub.

La ejecución se serializa para reducir carga sobre el sitio público. El flujo con apertura no se activa desde este workflow por defecto. Se han observado bloqueos temporales y cuentas vacías en ejecuciones anteriores; revisar el reporte antes de atribuir un fallo al código.

Las pruebas autenticadas requieren una cuenta válida en ParaBank. Una ejecución local aprobada no garantiza el mismo resultado en CI.

## 13. Pendientes

- Verificar la ejecución actual en CI con credenciales y cuentas vigentes.
- Validar BANK-E2E en Firefox y WebKit; no extrapolar el resultado de Chromium.
- Revalidar estabilidad tras cambios funcionales; la ejecución anterior de Chromium aprobó 54 ejecuciones y omitió 6, sin movimientos de saldo.
- Completar pruebas de validaciones intermedias y mantener la trazabilidad de los IDs. Los tests principales ya incluyen ID; BANK-E2E obtiene tipo e importe del JSON.
- Actualizar la matriz de trazabilidad con los casos automatizados y sus evidencias.
- Ejecutar CP-01 a CP-15 y guardar fecha, resultado y evidencia.
- Reproducir OBS-01 a OBS-05 y confirmar las reglas esperadas antes de registrar defectos.
- Contrastar las peticiones del mapa de flujos en DevTools.
- Ampliar el registro positivo, recuperación de credenciales, actualización de contacto e historial según el alcance.
- Completar las revisiones de accesibilidad de teclado, lector de pantalla, contraste y texto alternativo.
- Registrar casos y defectos en Jira si el espacio del curso está disponible.
- Mantener las fixtures centrales y revisar que la documentación de compatibilidad siga vigente.
- Mantener la descripción del PR, la documentación y las evidencias sincronizadas antes de integrar cada cambio a `main`.

## 14. Nota

Este repositorio refleja un proyecto académico en evolución. La documentación distingue el diseño de pruebas, los resultados de ejecución y los hallazgos pendientes de confirmación.

## Adaptación de la estructura del curso

Consultar [la correspondencia y los comandos](docs/adaptacion-profesor.md). Se centralizaron fixtures y se agregaron páginas de registro, cuentas, detalles y transferencia, además de reutilización de sesión en memoria. La validación local observada se detalla en la sección 7. BANK-E2E está aprobado en Chromium; las verificaciones pendientes se mantienen explícitas. La equivalencia del flujo bancario con el checkout del curso debe confirmarse con el profesor.

## IDs y datos del flujo

Los títulos de los tests principales incluyen ID y resultado en español. Login y logout usan AUTH-NEG-04/05, AUTH-POS-01 y AUTH-OUT-01; el formulario usa FORM-01/02/03. Se conservan los IDs existentes de otros flujos. Estos IDs de automatización deben asociarse a los requisitos en la matriz; añadir el prefijo no acredita esa trazabilidad.

BANK-E2E lee `accountType` y `transferAmount` de `test-data/bank-flow-data.json`. Las credenciales y la cuenta de origen siguen en variables de entorno; el depósito mínimo y la cuenta nueva se obtienen del sitio. Los datos ficticios se separan del estado del entorno.
