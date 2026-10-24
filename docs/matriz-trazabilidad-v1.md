# Matriz de trazabilidad v1 — ParaBank

**Curso:** QA Automatizador — Tecsup
**Proyecto:** ParaBank · https://parabank.parasoft.com/parabank/
**Actualizado:** 23/10/2026 · **Estado:** diseño enlazado; ejecución manual funcional pendiente.
**Fuentes:** `docs/casos-manuales-v1.md`, `docs/sesion-exploratoria-1.md`, `docs/reporte-defectos-v1.md`.

Los requisitos R01–R07 son criterios de prueba propuestos/inferidos, no una especificación oficial. El estado de un caso solo cambia tras registrar ejecución y evidencia.

## 1. Requisitos → casos → hallazgos

| ID | Requisito / criterio a validar | Flujo | Casos | Estado | Hallazgos vinculados | Hueco principal |
|---|---|---|---|---|---|---|
| R01 | Registro con datos personales completos, usuario disponible y contraseña confirmada; validar campos faltantes, duplicado, errores combinados y respuesta a valores de SSN observados. | F01 | CP-01, CP-02, CP-13, CP-14, CP-15, CP-16, CP-20 | Por ejecutar | — | Criterios y mensajes por confirmar con la interfaz; aceptación de un carácter en SSN es una observación reportada. |
| R02 | Acceso válido y rechazo de credenciales incorrectas; observar intentos fallidos repetidos; los campos de acceso exponen nombres accesibles. | F02 | CP-03, CP-04, CP-17; ACC-01 | CP-03/04/17 por ejecutar; ACC-01 observación técnica en Chromium | OBS-A11Y-01, pendiente de clasificación | Política de intentos no especificada; confirmar accesibilidad con lector de pantalla. |
| R03 | Mostrar las cuentas asociadas al usuario autenticado y observar los identificadores generados. | F03 | CP-05, CP-18 | Por ejecutar | — | Registrar formato y persistencia observados; no imponer un formato no documentado. |
| R04 | Transferir monto positivo entre cuentas distintas y reflejar resultado coherente; observar referencias en historial. | F04 | CP-06, CP-19 | Por ejecutar | O (S/1 confirmada) en notas; nueva ejecución pendiente | Capturar saldos, movimientos y referencias antes/después; no asumir unicidad global. |
| R05 | Aplicar regla acordada a monto cero, importe mayor al disponible y misma cuenta. | F04 | CP-07, CP-08, CP-09 | Regla y ejecución pendientes | OBS-01 a OBS-04, transcritos de notas y no reproducidos ahora | Confirmar política esperada y repetir con evidencia. |
| R06 | Guardar y conservar cambios de contacto. | F05 | CP-10 | Por ejecutar | — | Agregar caso negativo si el formulario tiene campos requeridos. |
| R07 | Responder de forma apropiada a recuperación con datos válidos e incompletos. | F06 | CP-11, CP-12 | Por ejecutar | OBS-05, transcrito de notas y no reproducido ahora | Probar datos ficticios verificados y conservar mensaje exacto. |

## 2. Cobertura y estado

- 7 de 7 requisitos tienen casos asociados (cobertura de diseño, no ejecución).
- 20 casos funcionales CP-01 a CP-20 están diseñados; no hay resultados manuales registrados para ellos.
- La suite automatizada `tests/parabank-login.spec.js` reportó 15 aprobadas: 5 pruebas en cada uno de Chromium, Firefox y WebKit. Esta cobertura se limita a los controles de acceso y registro descritos en esa suite; no cambia el estado pendiente de los casos manuales.
- ACC-01 documenta la comprobación técnica de accesibilidad del login. Se observó falta de nombre programático en Chromium; la validación con lector de pantalla sigue pendiente.
- OBS-01 a OBS-05 proceden de la imagen de notas exploratorias. Son candidatos por reproducir, no defectos confirmados.
- No se acreditan tickets de Jira.

## 3. Huecos y acciones siguientes

1. Ejecutar CP-01 a CP-20 y guardar fecha, navegador, resultado y evidencia individual.
2. Reproducir OBS-01 a OBS-05; documentar saldos/movimientos y resultado exacto. Confirmar reglas de negocio antes de marcar FAIL.
3. Revisar ACC-01 con lector de pantalla y documentar el resultado; completar teclado, contraste y texto alternativo.
4. Registrar casos/defectos en Jira solo si el proyecto está disponible y enlazar los tickets reales.
5. Actualizar la matriz después de cada evidencia, sin convertir cobertura diseñada en aprobada.
