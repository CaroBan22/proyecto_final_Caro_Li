

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
