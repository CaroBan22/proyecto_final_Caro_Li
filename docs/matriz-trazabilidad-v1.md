# Matriz de trazabilidad — ParaBank

**Curso:** QA Automatizador — Tecsup  
**Actualización documental:** 9 de noviembre de 2026 (America/Lima).  
**Estado:** ejecución automatizada parcial en Chromium; ejecución manual formal pendiente.

R01–R07 conservan los criterios propuestos del diseño original. R08–R09 amplían la cobertura de sesión y apertura bancaria; son criterios inferidos, no una especificación oficial. T01 es un objetivo técnico de sincronización. Una prueba aprobada no acredita un requisito completo ni todos los entornos.

Fuentes: [casos manuales](casos-manuales-v1.md), [hallazgos originales](reporte-defectos-v1.md), [índice de evidencias](../evidencias/indice-validaciones.md).

## Requisitos y cobertura

| ID | Criterio | Casos manuales diseñados | Automatización relacionada | Resultado acreditado | Pendiente |
|---|---|---|---|---|---|
| R01 | Registro: campos requeridos, disponibilidad y confirmación de contraseña | CP-01, CP-02, CP-13, CP-14, CP-15 | REG-01; REG-CTRL-01/02; FORM-02/03 | Registro vacío y corrección parcial comprobados en Chromium; controles: 6 aprobadas en tres repeticiones | Alta positiva, duplicados, contraseña y errores combinados; ejecución manual formal |
| R02 | Acceso válido, rechazo de credenciales incorrectas y accesibilidad del login | CP-03, CP-04; ACC-01 | AUTH-POS-01; AUTH-NEG-01 a 05; FORM-01 | Acceso/formularios con IDs: 10 aprobadas en Chromium junto a logout; validaciones de acceso incluidas en la suite repetida anterior | Accesibilidad y confirmación actual en otros navegadores/CI; CP manuales |
| R03 | Mostrar cuentas del usuario y detalles consistentes | CP-05 | CP-05 automatizado; CUENTAS-02; CP-ESPERA-01 a 04 | Consultas aprobadas en Chromium; bloque de esperas: 12 aprobadas en tres repeticiones | Acceso sin sesión y usuarios sin cuentas; otros entornos |
| R04 | Transferir entre cuentas distintas y reflejar resultado coherente | CP-06 | BANK-E2E; CP-06 automatizado | BANK-E2E con JSON: 1 aprobada en 18.0 s, incluye conciliación y persistencia | El CP-06 independiente siguió omitido en suite general; historial del camino exitoso y CP manual formal |
| R05 | Reglas para cero, saldo insuficiente, misma cuenta y formato inválido | CP-07, CP-08, CP-09 | TRANSFER-NEG-01/02 para vacío y no numérico | HTTP 400, saldos e historiales conservados: 6 aprobadas en 27.1 s | No extrapolar a cero, negativos, saldo insuficiente, misma cuenta ni cuentas ajenas; confirmar reglas |
| R06 | Guardar y conservar cambios de contacto | CP-10 | Sin automatización acreditada | Pendiente | Caso positivo y negativos, ejecución y evidencia |
| R07 | Recuperación de acceso con datos válidos e incompletos | CP-11, CP-12 | Sin automatización acreditada | Pendiente | Datos ficticios verificados, reglas y mensajes |
| R08 | Logout y persistencia tras un nuevo acceso | Ampliación del alcance; falta ficha manual | AUTH-OUT-01; CUENTAS-02; BANK-E2E | Logout aprobado en autenticación; BANK-E2E verifica saldos tras nuevo login | Protección de páginas sin sesión y caducidad; otros navegadores |
| R09 | Abrir cuenta desde otra existente y conservar el total mediante depósito interno | Ampliación del alcance; falta ficha manual | BANK-E2E | Cuenta dinámica, depósito y saldos comprobados en Chromium | Otros tipos de cuenta, reglas negativas y pruebas independientes de apertura |
| T01 | Sincronizar consultas sin pausas fijas en suite habitual | No aplica como requisito de negocio | CP-ESPERA-01 a 04 | expect.poll, toPass, waitForURL y waitForResponse: 12 aprobadas en 54.8 s | Firefox, WebKit y CI |

Los IDs de automatización enlazan pruebas concretas, no renumeran las fichas manuales originales. Compartir ID CP-05/CP-06 no implica que todos sus pasos manuales estén ejecutados.

## Resultados de ejecución

Consultar [el índice](../evidencias/indice-validaciones.md) para el origen de cada resultado. No sumar ejecuciones históricas como si fueran casos diferentes.

- Suite de Chromium anterior a los PR #10–#12: **54 aprobadas y 6 omitidas en 3.1 min** (18 casos activos por tres repeticiones). Las omisiones fueron BANK-E2E y CP-06 por tres repeticiones.
- IDs y formularios del PR #10: **10 aprobadas en 29.7 s**.
- BANK-E2E con JSON del PR #10: **1 aprobada en 18.0 s**, ejecutada por separado; no fue omitida en esa ejecución.
- Controles de registro del PR #11: **6 aprobadas en 12.7 s**.
- Transferencias inválidas del PR #12: **6 aprobadas en 27.1 s**.
- Estas ejecuciones no acreditan una repetición conjunta de la versión final con todas las incorporaciones.

## Hallazgos

- OBS-01 a OBS-05 siguen como candidatos originales pendientes de reproducción y confirmación de reglas.
- OBS-A11Y-01 / ACC-01 conserva su inspección técnica; lector de pantalla pendiente.
- El mensaje genérico al rechazar transferencias inválidas se documenta en [transferencias inválidas](transferencias-invalidas.md). El rechazo funciona en los casos comprobados; la calidad del mensaje requiere evaluación y ficha de hallazgo. No hay ticket Jira acreditado.
- Las cuentas vacías y errores internos de sesiones anteriores son observaciones de ejecuciones concretas; no se atribuye causa de backend sin evidencia.

## Cierre pendiente

1. Ejecutar y documentar individualmente CP-01 a CP-15; conservar los pendientes manuales aunque exista automatización relacionada.
2. Incorporar evidencias originales recientes al repositorio, revisadas para no exponer credenciales o sesión.
3. Validar versión actual en Firefox, WebKit y CI; actualizar resultados tras cambios funcionales.
4. Completar contacto, recuperación y accesibilidad, y contrastar las reglas negativas pendientes.
5. Registrar tickets solo si existe un espacio Jira disponible y usar enlaces reales.
