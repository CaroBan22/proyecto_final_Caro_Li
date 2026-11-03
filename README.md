# Proyecto QA ParaBank

## 1. Descripción

Proyecto académico de aseguramiento de calidad para el curso QA Automatizador de Tecsup. El sistema bajo prueba es ParaBank, una aplicación bancaria de demostración desarrollada por Parasoft. El repositorio centraliza la documentación de pruebas, la evidencia generada y la automatización inicial con Playwright.

## 2. Objetivo

Evaluar flujos funcionales clave de la aplicación, documentar el alcance de las pruebas y automatizar una base inicial para validaciones de acceso, registro y navegación crítica.

## 3. Sistema bajo prueba

- URL: https://parabank.parasoft.com/parabank/
- Tipo: aplicación web bancaria de demostración
- Estado: proyecto activo en etapa de documentación y automatización inicial

## 4. Alcance del proyecto

Las pruebas y documentación del proyecto contemplan los siguientes escenarios:

- Registro de clientes
- Inicio de sesión
- Recuperación de credenciales
- Consulta de cuentas y saldos
- Transferencias
- Actualización de información personal
- Validación básica de accesibilidad
- Exploración de flujos críticos y análisis de riesgos

## 5. Herramientas

- Git y GitHub para control de versiones y colaboración
- Playwright para automatización de pruebas web
- Chromium y DevTools para inspección del comportamiento de la aplicación
- Jira para posible gestión de casos y defectos, según disponibilidad del espacio del curso
- GitHub Actions para automatización de validaciones CI

## 6. Estructura del repositorio

- `.github/workflows/node.js.yml`: flujo de CI para ejecución de pruebas con Node.js
- `docs/`: documentos del plan de pruebas, casos manuales, trazabilidad, reglas de negocio, sesiones exploratorias, mapa de flujos y reporte de hallazgos
- `tests/`: pruebas automatizadas con Playwright y archivos de ejemplo
- `evidencias/`: capturas y evidencias de pruebas
- `playwright.config.js`: configuración de Playwright
- `package.json`: dependencias y metadata del proyecto
- `README.md`: resumen general del proyecto

## 7. Estado actual

El repositorio incluye una base de documentación y automatización inicial para QA. Actualmente se encuentran disponibles:

- plan de pruebas y trazabilidad en `docs/`
- pruebas de Playwright en `tests/parabank-login.spec.js`
- archivos de ejemplo y pruebas adicionales de referencia en `tests/`
- evidencia visual en `evidencias/`
- configuración de integración continua en `.github/workflows/node.js.yml`

La suite inicial se enfoca en validaciones de acceso y registro, con la intención de ampliar la cobertura hacia más flujos funcionales y escenarios de accesibilidad.

## 8. Pendientes

- Ejecutar y documentar la totalidad de los casos de prueba planificados
- Revisar y confirmar los hallazgos exploratorios antes de registrar defectos definitivos
- Completar la validación de transferencias con cuentas de prueba
- Ampliar la cobertura de accesibilidad (teclado, lector de pantalla, contraste y texto alternativo)
- Mantener actualizada la documentación del proyecto conforme avancen los cambios
- Continuar con la evolución de la automatización en Playwright
- Integrar cambios mediante ramas y pull requests hacia `main`

## 9. Nota

Este repositorio refleja un proyecto académico de calidad de software en evolución. La documentación y la automatización están en construcción, con foco en definir una base sólida para pruebas funcionales y de accesibilidad de la aplicación ParaBank.
