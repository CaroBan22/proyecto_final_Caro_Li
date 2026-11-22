# Proyecto QA ParaBank

## 1. Descripción y alcance

Proyecto académico del curso QA Automatizador de Tecsup. Automatiza pruebas web sobre [ParaBank](https://parabank.parasoft.com/parabank/), una aplicación bancaria pública de demostración, mediante Playwright y JavaScript.

Adapta los ejemplos de tienda del curso al dominio bancario: autenticación, consulta de cuentas y apertura con transferencia. Incluye validaciones de registro, transferencias inválidas, evidencia por etapas y comprobación de persistencia después de cerrar sesión y volver a entrar.

La organización utiliza Page Object Model (POM), fixtures compartidas, datos JSON externos y esperas por condición. Las comprobaciones de negocio permanecen en los tests. Existen mejoras pendientes para centralizar selectores y secuencias todavía presentes en las pruebas.

**Estado:** suite web implementada con validaciones parciales documentadas. La validación final conjunta sigue pendiente. Existe un hallazgo abierto de acceso con credenciales inválidas; las expectativas de rechazo se conservan.

La colección de API en Postman se encuentra en preparación y todavía requiere completar sus verificaciones y exportación.

## 2. Requisitos

- Node.js 24. Versión local comprobada por la autora: **v24.22.1**.
- npm.
- Dependencias instaladas desde `package-lock.json`.
- Navegadores de Playwright instalados.
- Conexión a ParaBank.
- Usuario de demostración vigente para las pruebas autenticadas.
- Identidad, cuentas y saldo verificados antes de ejecutar operaciones bancarias.

Dependencias declaradas:

| Dependencia | Rango declarado |
|---|---|
| `@playwright/test` | `^1.64.1` |
| `allure` | `^3.33.0` |
| `allure-playwright` | `^3.14.0` |
| `dotenv` | `^18.0.9` |

Los rangos declarados no sustituyen las versiones resueltas en `package-lock.json`.

El workflow está configurado para Node.js 24. La ejecución de CI con esta versión queda pendiente de verificación.

## 3. Instalación

Desde la raíz del repositorio, instalar las dependencias reproducibles:

```bash
npm ci
```

Instalar los navegadores:

```bash
npx playwright install
```

En Linux o CI, instalar también las dependencias del sistema cuando corresponda:

```bash
npx playwright install --with-deps
```

Crear el archivo local `.env` a partir de `.env.example` y completar las variables necesarias antes de ejecutar pruebas autenticadas.

## 4. Variables de entorno y datos

Mantener una sola definición de cada variable en el archivo local `.env`:

```dotenv
BASE_URL=https://parabank.parasoft.com/parabank/
PARABANK_USERNAME=
PARABANK_PASSWORD=
PARABANK_FROM_ACCOUNT=
PARABANK_TO_ACCOUNT=
RUN_OPEN_ACCOUNT_FLOW=false
RUN_BANK_MUTATIONS=false
RUN_TRANSFER_NEGATIVE=false
```

Completar las credenciales con una cuenta de demostración vigente. Los valores vacíos no son credenciales válidas. Conservar la barra final de `BASE_URL`.

| Variable | Uso |
|---|---|
| `BASE_URL` | Dirección de la aplicación web. |
| `PARABANK_USERNAME` | Usuario de demostración para las pruebas autenticadas. |
| `PARABANK_PASSWORD` | Contraseña del usuario de demostración. |
| `PARABANK_FROM_ACCOUNT` | Cuenta de origen perteneciente al cliente verificado. |
| `PARABANK_TO_ACCOUNT` | Cuenta distinta de destino para CP-06 y pruebas negativas de transferencia. |
| `RUN_OPEN_ACCOUNT_FLOW` | Activa los dos escenarios de apertura y transferencia. |
| `RUN_BANK_MUTATIONS` | Activa CP-06, transferencia entre cuentas existentes. |
| `RUN_TRANSFER_NEGATIVE` | Activa los dos casos de importes inválidos. |

Los archivos de `test-data/` contienen datos ficticios y expectativas.

`bank-flow-data.json` genera dos escenarios:

- `BANK-E2E-01`: cuenta CHECKING y transferencia de USD 1.00.
- `BANK-E2E-02`: cuenta SAVINGS y transferencia de USD 2.00.

Las credenciales y la cuenta de origen se obtienen del entorno. La cuenta nueva y el depósito mínimo se obtienen del sitio durante la ejecución.

### Protección de datos

`.env` y los resultados generados están excluidos de Git.

No publicar credenciales, cookies, estado de sesión ni trazas sin revisar. Utilizar únicamente datos de demostración.

Actualizar `.env` no actualiza los secretos de GitHub Actions. El workflow utiliza los secretos `PARABANK_USERNAME` y `PARABANK_PASSWORD` configurados en GitHub.

### Precondición para operaciones bancarias

Antes de habilitar operaciones, verificar que el cliente mostrado corresponde al usuario esperado y que las cuentas le pertenecen.

Durante la revisión se observó acceso como John Smith con credenciales inventadas. Mientras la identidad no pueda verificarse, mantener las tres opciones de operaciones en `false`.

## 5. Ejecución y reportes

### Inventario y scripts

Listar las pruebas sin ejecutarlas:

```bash
npm test -- --list
```

| Comando | Acción |
|---|---|
| `npm test` | Ejecuta la suite principal en los navegadores configurados. |
| `npm run test:chromium` | Ejecuta la suite principal en Chromium con un worker. |
| `npm run test:headed` | Ejecuta las pruebas con navegador visible. |
| `npm run test:ui` | Abre la interfaz interactiva de Playwright. |
| `npm run test:auth` | Ejecuta únicamente `tests/auth/login.spec.js`. |
| `npm run report` | Abre el último reporte HTML de Playwright. |
| `npm run report:allure` | Genera y abre Allure a partir de los resultados existentes. No ejecuta pruebas. |

### Ejecución general

Dejar las tres opciones de operaciones en `false` y ejecutar:

```bash
npm run test:chromium -- --retries=0 --max-failures=0
```

Abrir el reporte:

```bash
npm run report
```

Presionar `Ctrl+C` en la terminal para detener el servidor del reporte.

### Validación aislada del login

```bash
npm run test:auth -- --project=chromium --workers=1 --retries=0
```

Este comando ejecuta los tres casos de `login.spec.js`. No incluye toda la carpeta `tests/auth/`.

### Operaciones bancarias opcionales

Habilitar únicamente las opciones necesarias después de verificar identidad, cuentas y saldo:

- `RUN_OPEN_ACCOUNT_FLOW=true`: habilita los dos escenarios de apertura y transferencia.
- `RUN_BANK_MUTATIONS=true`: habilita la transferencia entre cuentas existentes.
- `RUN_TRANSFER_NEGATIVE=true`: habilita los casos de importes inválidos.

Para ejecutar el archivo de apertura y transferencia:

```bash
npm run test:chromium -- tests/accounts/open-transfer.spec.js --retries=0
```

Al terminar, devolver las opciones a `false`.

Las operaciones que crean cuentas o transfieren fondos se ejecutan sin reintentos y sin `--repeat-each`. Si una prueba falla después de realizar una operación, revisar sus efectos antes de repetirla.

### Evidencia y conservación

La configuración genera:

| Ubicación | Contenido |
|---|---|
| `playwright-report/` | Reporte HTML. |
| `results.json` | Resultados estructurados en JSON. |
| `allure-results/` | Resultados para generar Allure. |
| `test-results/` | Adjuntos y trazas según el resultado. |

Las capturas automáticas se guardan al fallar. Las trazas se conservan al fallar, incluso sin reintentos. Algunas pruebas incorporan pasos y adjuntos explícitos.

Los resultados generados están excluidos de Git. Para conservar una corrida, copiar sus reportes a una carpeta local distinta antes de ejecutar otras pruebas.

`npm run report:allure` utiliza los resultados existentes. La opción `--clean` limpia la salida del reporte; no elimina los resultados crudos acumulados en `allure-results/`.

### Integración continua

El workflow `.github/workflows/node.js.yml` está configurado para:

- Utilizar Node.js 24.
- Instalar dependencias mediante `npm ci`.
- Instalar navegadores y dependencias del sistema.
- Ejecutar `npm test`.
- Conservar el reporte HTML como artefacto durante siete días, incluso si las pruebas fallan.

La configuración actual detiene la ejecución en CI después de la primera prueba fallida. Las pruebas restantes pueden quedar sin ejecutar.

La actualización del workflow a Node.js 24 está implementada; falta verificar su ejecución en GitHub Actions. Un commit o una fusión no acreditan por sí solos que las pruebas hayan aprobado.

## 6. Estructura del proyecto

```text
.
├── pages/                       # Page Objects
├── tests/
│   ├── accounts/                # Consultas, esperas y apertura con transferencia
│   ├── auth/                    # Login, logout, sesión y evidencia por etapas
│   ├── registration/            # Validaciones del registro
│   ├── transfers/               # Transferencias y controles de importes
│   └── fixtures.js              # Preparación y fixtures compartidas
├── test-data/                   # Datos ficticios y escenarios JSON
├── docs/                        # Plan, trazabilidad y hallazgos
├── evidencias/                  # Evidencias seleccionadas y revisadas
├── demos/                       # Demostraciones separadas
├── .github/workflows/           # Integración continua
├── .env.example                 # Plantilla sin credenciales
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.js
└── README.md
```

La configuración delimita las pruebas de la suite principal. Tener un archivo de ejemplo en el repositorio no significa que participe en esa ejecución.

Las fixtures de sesión guardada utilizan un contexto explícito. Los casos negativos de login emplean las fixtures habituales de página y no solicitan esa sesión guardada.

## 7. Métricas, hallazgos y pendientes

### Última corrida general reportada

Resultado comunicado por la autora mediante la salida de terminal. Corresponde a Chromium con las operaciones opcionales desactivadas; no acredita la ejecución de los flujos omitidos.

| Métrica | Resultado |
|---|---:|
| Navegador | Chromium |
| Pruebas planificadas | 27 |
| Aprobadas | 20 |
| Fallidas | 2 |
| Omitidas | 5 |
| Duración mostrada | 1,7 minutos |
| Reintentos configurados | 0 |

Comando utilizado:

```bash
npm run test:chromium -- --retries=0 --max-failures=0
```

Fecha y commit exactos de esta corrida: pendientes de completar con el registro de la ejecución.

La autora reportó conservar el HTML y el JSON en:

```text
evidencias-locales/corrida-completa-chromium/
```

Esta ubicación es local y no constituye un enlace público de entrega.

### Validación aislada reciente del login

La salida compartida de la ejecución aislada mostró:

| Métrica | Resultado |
|---|---:|
| Navegador | Chromium |
| Pruebas ejecutadas | 3 |
| Aprobadas | 1 |
| Fallidas | 2 |
| Duración mostrada | 17,4 segundos |
| Reintentos configurados | 0 |

Los dos casos negativos llegaron a `overview.htm`. Sus snapshots mostraron John Smith, cuentas y el enlace `Log Out`.

La aprobación del caso positivo acredita las comprobaciones implementadas de navegación y contenido. No acredita por sí sola que la identidad del cliente sea la esperada.

### Fallos y omisiones

- `AUTH-NEG-04`: la prueba con usuario inválido llega a `overview.htm` y falla la expectativa de rechazo.
- `AUTH-NEG-05`: la prueba con contraseña incorrecta llega a `overview.htm` y falla la expectativa de rechazo.
- Dos escenarios de apertura con transferencia quedaron omitidos en la corrida general.
- Una transferencia entre cuentas existentes quedó omitida.
- Dos casos de importes inválidos quedaron omitidos.

Las cinco omisiones corresponden a opciones desactivadas. No se contabilizan como aprobaciones.

El comportamiento de autenticación se documenta en [el reporte de hallazgos](docs/reporte-defectos-v1.md). Las expectativas de rechazo se mantienen.

### Reproducción manual y configuración observada

El 22/11/2026, la autora reportó que el sitio permitía acceder como John Smith al introducir distintos usuarios y contraseñas inventados.

En Administration se observó `Data Access Mode = SOAP`, con los campos de endpoints vacíos. La pantalla indica que los valores vacíos utilizan los endpoints predeterminados.

La observación del modo SOAP no demuestra por sí sola que exista un servicio simulado ni determina la causa del acceso. La causa y clasificación final del hallazgo permanecen pendientes.

### Validaciones separadas

Se reportaron ejecuciones aprobadas de la prueba de evidencia por etapas y del ciclo de cierre y nuevo inicio de sesión.

También existen validaciones anteriores del flujo bancario. Esos resultados no sustituyen una validación final de la versión actual que incluya conciliación y persistencia después de volver a entrar.

### API y Postman

La colección de exploración adapta las consultas al dominio bancario:

1. Consultar cliente.
2. Listar cuentas del cliente.
3. Consultar detalle de cuenta.
4. Listar movimientos de una cuenta.
5. Consultar detalle de un movimiento.

Estas consultas utilizan GET y no requieren Body en la petición. Los identificadores se envían en la ruta y deben corresponder a datos de prueba vigentes.

Queda pendiente verificar las cinco consultas, registrar código de estado, cabeceras, estructura y valores, y exportar la colección y el entorno revisados.

### Pendientes de cierre

1. Completar fecha, commit y referencias de evidencia de las ejecuciones documentadas.
2. Investigar la causa del acceso con credenciales inválidas.
3. Verificar la identidad de la sesión antes de realizar operaciones bancarias.
4. Validar los escenarios transaccionales actuales con cuentas y saldo comprobados.
5. Conservar evidencia separada de cada ejecución dedicada.
6. Revisar selectores y secuencias repetidas para mejorar Page Objects y fixtures.
7. Verificar la ejecución de GitHub Actions con Node.js 24 y registrar sus resultados.
8. Completar la colección de Postman, sus verificaciones y exportación.
9. Actualizar las métricas después de la siguiente ejecución, conservando el contexto histórico.

La adaptación de los ejemplos de tienda al dominio bancario requiere la aceptación del profesor.

**Estado de cierre:** suite web implementada con resultados y hallazgos documentados; validación final y trabajo de API pendientes.