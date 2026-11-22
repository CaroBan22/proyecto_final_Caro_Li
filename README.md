

# Proyecto QA ParaBank

## 1. Descripción y alcance

Proyecto académico del curso QA Automatizador de Tecsup. Automatiza pruebas web sobre [ParaBank](https://parabank.parasoft.com/parabank/), una aplicación bancaria pública de demostración, mediante Playwright y JavaScript.

Adapta los ejemplos de tienda del curso al dominio bancario: autenticación, consulta de cuentas y apertura con transferencia. Incluye validaciones de registro, transferencias inválidas, evidencia por etapas y comprobación de persistencia después de cerrar sesión y volver a entrar.

La organización utiliza Page Object Model (POM), fixtures centrales, datos JSON externos y esperas por condición. Las aserciones de negocio permanecen en los tests. Se identificaron mejoras pendientes para centralizar selectores todavía presentes en pruebas.

**Estado:** suite implementada con validaciones parciales documentadas. La corrida final conjunta sigue pendiente. Existe un hallazgo abierto de acceso con credenciales inválidas; no se oculta cambiando las expectativas.

## 2. Requisitos

- Node.js 24. Versión local comprobada por la autora: **v24.22.1**.
- npm.
- Dependencias instaladas desde `package-lock.json` y navegadores de Playwright.
- Conexión a ParaBank y usuario de demostración vigente para pruebas autenticadas.
- Cuentas de prueba con saldo suficiente para las operaciones opcionales.

Dependencias declaradas: `@playwright/test` ^1.64.1, `allure` ^3.33.0, `allure-playwright` ^3.14.0 y `dotenv` ^18.0.9. Los rangos no sustituyen la versión resuelta del lockfile.

El workflow revisado utiliza Node.js 22; la versión local es Node.js 24. No se afirma que CI haya sido migrado a Node.js 24.

## 3. Instalación

Desde la raíz del repositorio, instalar las dependencias reproducibles:

```bash
npm ci
```

Instalar los navegadores:

```bash
npx playwright install
```

En Linux/CI, instalar también las dependencias del sistema cuando corresponda:

```bash
npx playwright install --with-deps
```

## 4. Variables de entorno y datos

Copiar `.env.example` a un archivo local `.env`. Mantener una sola definición de cada variable:

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
| `PARABANK_USERNAME`, `PARABANK_PASSWORD` | Acceso del usuario de prueba. Las fixtures autenticadas requieren ambas. |
| `PARABANK_FROM_ACCOUNT` | Cuenta de origen perteneciente al usuario actual. |
| `PARABANK_TO_ACCOUNT` | Cuenta distinta de destino para CP-06 y pruebas negativas de transferencia. |
| `RUN_OPEN_ACCOUNT_FLOW` | Activa los dos escenarios de apertura y transferencia. |
| `RUN_BANK_MUTATIONS` | Activa CP-06, transferencia entre cuentas existentes. |
| `RUN_TRANSFER_NEGATIVE` | Activa los dos rechazos de importes inválidos. |

Los JSON de `test-data/` contienen datos ficticios y expectativas. `bank-flow-data.json` genera dos escenarios: BANK-E2E-01 (CHECKING, USD 1.00) y BANK-E2E-02 (SAVINGS, USD 2.00). Credenciales y cuenta de origen se obtienen del entorno; cuenta nueva y depósito mínimo se obtienen del sitio.

`.env` y los resultados generados están excluidos de Git. No subir credenciales, cookies, estado de sesión ni trazas sin revisar. Actualizar `.env` no actualiza los secretos de GitHub Actions.

## 5. Ejecución y reportes

### Inventario y scripts

Listar las pruebas sin ejecutarlas:

```bash
npm test -- --list
```

| Comando | Acción |
|---|---|
| `npm test` | Suite principal en los navegadores configurados. |
| `npm run test:chromium` | Suite principal en Chromium con un worker. |
| `npm run test:headed` | Suite con navegador visible. |
| `npm run test:ui` | Interfaz interactiva de Playwright. |
| `npm run test:auth` | Solo `tests/auth/login.spec.js`; no incluye toda la carpeta auth. |
| `npm run report` | Abre el último HTML de Playwright. |
| `npm run report:allure` | Genera Allure con `--clean` y abre el reporte existente. No ejecuta tests. |

Para una ejecución general, dejar las tres variables opcionales en `false`:

```bash
npm run test:chromium -- --retries=0 --max-failures=0
```

Abrir el reporte de esa ejecución:

```bash
npm run report
```

### Operaciones bancarias opcionales

Antes de habilitarlas, verificar que la sesión corresponde al usuario esperado, que las cuentas le pertenecen y que existe saldo suficiente.

- `RUN_OPEN_ACCOUNT_FLOW=true`: habilita los dos escenarios de apertura y transferencia.
- `RUN_BANK_MUTATIONS=true`: habilita la transferencia entre cuentas existentes.
- `RUN_TRANSFER_NEGATIVE=true`: habilita los casos de importes inválidos.

Activar únicamente las opciones necesarias para cada validación y devolverlas a `false` al terminar. Las operaciones que crean cuentas o transfieren fondos se ejecutan sin reintentos y sin `--repeat-each`.

### Evidencia y conservación

La configuración genera:

- `playwright-report/`: reporte HTML.
- `results.json`: resultados estructurados.
- `allure-results/`: resultados para generar Allure.
- `test-results/`: adjuntos y trazas según el resultado.

Las capturas automáticas se guardan al fallar. Las trazas se conservan al fallar, incluso sin reintentos. Algunas pruebas incorporan pasos y adjuntos explícitos.

Los resultados generados están excluidos de Git. Para conservar una corrida, copiar sus reportes a una carpeta local distinta antes de ejecutar otras pruebas.

El comando `npm run report:allure` utiliza los resultados existentes; no ejecuta la suite. Su opción `--clean` limpia la salida del reporte, no los resultados crudos acumulados.

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

### Fallos y omisiones

- `AUTH-NEG-04`: la prueba con usuario inválido llega a `overview.htm` y falla la expectativa de rechazo.
- `AUTH-NEG-05`: la prueba con contraseña incorrecta llega a `overview.htm` y falla la expectativa de rechazo.
- Dos escenarios de apertura con transferencia quedaron omitidos.
- Una transferencia entre cuentas existentes quedó omitida.
- Dos casos de importes inválidos quedaron omitidos.

Las cinco omisiones corresponden a opciones desactivadas. No se contabilizan como aprobaciones.

El comportamiento de autenticación se documenta en `docs/reporte-defectos-v1.md`. Su causa y clasificación final siguen pendientes. Las expectativas de rechazo se mantienen.

### Validaciones separadas

Se reportaron ejecuciones aprobadas de la prueba de evidencia por etapas y del ciclo de cierre y nuevo inicio de sesión.

También existen validaciones anteriores del flujo bancario. Esos resultados no sustituyen una validación final de la versión actual que incluya conciliación y persistencia después de volver a entrar.

### Pendientes de cierre

1. Investigar los dos fallos de autenticación y registrar fecha, commit y evidencia.
2. Verificar la identidad de la sesión antes de realizar operaciones bancarias.
3. Validar los escenarios transaccionales actuales con cuentas y saldo comprobados.
4. Conservar evidencia separada de cada ejecución dedicada.
5. Revisar selectores y secuencias repetidas para mejorar Page Objects y fixtures.
6. Alinear Node.js de CI con la versión principal del proyecto y revisar sus resultados.
7. Completar la colección de Postman, sus verificaciones y exportación.
8. Actualizar estas métricas después de la siguiente ejecución, conservando el contexto histórico.

La adaptación de los ejemplos de tienda al dominio bancario requiere la aceptación del profesor.

**Estado de cierre:** suite web implementada con resultados y hallazgos documentados; validación final y trabajo de API pendientes.
Para una ejecución general, dejar las tres variables opcionales en `false`:
