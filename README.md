# Proyecto QA ParaBank

## 1. Descripción

Proyecto académico de aseguramiento de calidad para el curso QA Automatizador de Tecsup. El sistema bajo prueba es ParaBank, aplicación bancaria de demostración de Parasoft.

## 2. Objetivo

Evaluar flujos funcionales y aspectos básicos de accesibilidad mediante diseño de casos manuales, exploración y automatización inicial con Playwright.

## 3. Sistema bajo prueba

- **URL:** https://parabank.parasoft.com/parabank/
- **Tipo:** aplicación web bancaria de demostración.
- **Estado:** en desarrollo; la cobertura manual y validación de hallazgos siguen pendientes.

## 4. Funcionalidades diseñadas

- Registro de clientes.
- Inicio de sesión.
- Recuperación de credenciales.
- Consulta de cuentas y saldos.
- Transferencias.
- Actualización de información personal.
- Revisión básica de accesibilidad.

## 5. Herramientas

- Git y GitHub para control de versiones.
- Playwright para comprobaciones automatizadas iniciales.
- Chromium y DevTools para observar la aplicación y sus peticiones.
- Jira para gestión de casos y defectos, si se confirma el espacio del curso.

## 6. Estructura

- `docs/`: plan, casos manuales, matriz, tabla de decisión, reglas del proyecto, reporte, sesión exploratoria y mapa de flujos.
- `tests/`: pruebas Playwright de ParaBank y archivos de ejemplo.
- `evidencias/`: capturas y fichas de evidencia.
- `playwright.config.js`, `package.json`: configuración y dependencias de Playwright.

Estos hallazgos requieren analizar las reglas de negocio y documentar su reproducción antes de confirmarlos como defectos.

## 7. Estado de pruebas y hallazgos

La suite inicial de Playwright se encuentra en `tests/parabank-login.spec.js` y cubre cinco comportamientos del acceso y registro. Una captura de terminal compartida por la autora mostró 5 pruebas aprobadas. Ese resultado corresponde a la ejecución mostrada y no acredita la ejecución manual de los casos.

Las notas exploratorias originales contienen cinco candidatos funcionales que aún requieren reproducción. Se registran en `docs/reporte-defectos-v1.md` sin presentarlos como defectos confirmados. ACC-01 registra una inspección técnica del nombre accesible de los campos de login; falta completar la revisión con lector de pantalla.

## 8. Pendientes

- Ejecutar CP-01 a CP-15 y guardar fecha, resultado y evidencia.
- Reproducir OBS-01 a OBS-05 y confirmar las reglas esperadas antes de registrar defectos.
- Contrastar las peticiones del mapa en DevTools y observar el envío de transferencia con cuentas de prueba.
- Completar las revisiones de accesibilidad de teclado, lector de pantalla, contraste y texto alternativo.
- Registrar casos y defectos en Jira si el espacio del curso está disponible.
- Integrar los cambios pendientes mediante una rama y pull request hacia `main`.

## 9. Automatización de acceso con Playwright

- `pages/LoginPage.js`: Page Object del formulario de inicio de sesión.
- `tests/fixtures.js`: prepara `loginPage` y entrega las credenciales desde variables de entorno.
- `tests/auth/login.spec.js`: tres escenarios de autenticación.
- `tests/parabank-login.spec.js`: comprobaciones del formulario y del acceso al registro.
- `playwright.config.js`: URL base tomada de `BASE_URL`.

### Configuración local

1. Copiar `.env.example` como `.env`.
2. Completar `BASE_URL`; para el escenario de acceso exitoso, configurar también `PARABANK_USERNAME` y `PARABANK_PASSWORD` con una cuenta de prueba.
3. Instalar dependencias con `npm install`.
4. Ejecutar la suite con `npm test` o solo autenticación con `npm run test:auth`.

El archivo `.env` está excluido de Git. El escenario de acceso exitoso se omite cuando las credenciales de prueba no están configuradas.
