# Proyecto QA ParaBank

## 1. Descripción del proyecto
Proyecto académico de aseguramiento de calidad de software, desarrollado para el curso QA Automatizador de Tecsup.

El sistema seleccionado es ParaBank, una aplicación web de banca virtual de demostración desarrollada por Parasoft.

## 2. Objetivo
Evaluar el funcionamiento de las principales operaciones bancarias mediante pruebas manuales, identificando posibles defectos funcionales, de accesibilidad y usabilidad.

## 3. Sistema bajo prueba
- **Nombre:** ParaBank
- **URL:** https://parabank.parasoft.com/parabank/
- **Tipo:** Aplicación web bancaria
- **Modalidad:** Pruebas manuales
- **Estado:** En desarrollo

## 4. Funcionalidades evaluadas
- Registro de clientes.
- Inicio de sesión.
- Recuperación de credenciales.
- Consulta de cuentas y saldos.
- Transferencia de fondos.
- Actualización de información personal.

## 5. Herramientas utilizadas
- Git: control de versiones.
- GitHub: almacenamiento del repositorio.
- Jira: gestión de casos y defectos (pendiente de configurar).
- DevTools: inspección de la aplicación.
- Navegador web: ejecución de pruebas manuales.

## 6. Estructura del proyecto
- `docs/`: documentación de calidad y casos de prueba.
- `tests/`: archivos relacionados con las pruebas.
- `evidencias/`: capturas de pantalla de los resultados.

## 7. Hallazgos preliminares
Durante las pruebas exploratorias se observaron los siguientes comportamientos:

- Confirmación de transferencias hacia la misma cuenta.
- Confirmación de transferencias superiores al saldo disponible previamente observado.
- Aparición de un mensaje de error interno.
- Visualización de credenciales durante la recuperación de acceso.

Estos hallazgos requieren analizar las reglas de negocio y documentar su reproducción antes de confirmarlos como defectos.

## 8. Automatización de acceso con Playwright
- `pages/LoginPage.js`: Page Object del formulario de inicio de sesión.
- `tests/auth/login.spec.js`: tres escenarios de autenticación.
- `tests/parabank-login.spec.js`: comprobaciones del formulario y del acceso al registro.
- `playwright.config.js`: URL base tomada de `BASE_URL`.

### Configuración local
1. Copiar `.env.example` como `.env`.
2. Completar `BASE_URL`; para el escenario de acceso exitoso, configurar también `PARABANK_USERNAME` y `PARABANK_PASSWORD` con una cuenta de prueba.
3. Instalar dependencias con `npm install`.
4. Ejecutar la suite con `npm test` o solo autenticación con `npm run test:auth`.

El archivo `.env` está excluido de Git. El escenario de acceso exitoso se omite cuando las credenciales de prueba no están configuradas.
