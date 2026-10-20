# Reporte de defectos y hallazgos v1 — ParaBank

**Curso:** QA Automatizador · **Fecha:** 19/10/2026 · **Sitio:** https://parabank.parasoft.com/parabank/  
**Estado del documento:** 5 **candidatos de investigación**, **0 defectos confirmados en los materiales recibidos**. Este archivo **no sustituye** las 5 verificaciones reales exigidas por el docente.

## 1. Resumen y vinculación con la matriz

| Código | Hallazgo que se investigará | Requisito | Caso asociado | Severidad / prioridad | Estado |
|---|---|---|---|---|---|
| DEF-01 | Posible aceptación de registro con confirmación de contraseña diferente | R01 | CP-02 | Por determinar | **Hipótesis; no ejecutado** |
| DEF-02 | Posible error interno al realizar operación bancaria | R04 | CP-06 (si ocurre allí; por confirmar) | Por determinar | **Observación preliminar; sin reproducción** |
| DEF-03 | Posible procesamiento de monto superior al saldo | R05 | CP-08 | Por determinar | **Hipótesis; regla de sobregiro pendiente** |
| DEF-04 | Posible transferencia a la misma cuenta | R05 | CP-09 | Por determinar | **Hipótesis; regla de negocio pendiente** |
| DEF-05 | Posible problema al recuperar credenciales | R07 | CP-11 / CP-12 | Por determinar | **Observación preliminar; sin reproducción** |

**Cómo computar los cinco:** un `DEF` de esta tabla se considera *confirmado* solo si cuenta con precondiciones, reproducción, resultado esperado sustentado, resultado obtenido y captura. Si no sucede, anotar `No reproducido` y sustituirlo por un hallazgo real.

## 2. Fichas técnicas de investigación

### DEF-01 — Confirmación de contraseña diferente (R01 / CP-02)
- **Precondición:** formulario Register, datos ficticios completos, usuario único.
- **Pasos:** (1) Abrir Register; (2) completar datos; (3) escribir contraseñas distintas; (4) pulsar Register.
- **Esperado (criterio propuesto):** no se crea la cuenta; aparece mensaje de discrepancia.
- **Obtenido:** **Por ejecutar**. No afirmar aceptación sin comprobarlo.
- **Evidencia:** `evidencias/DEF-01.png` (pendiente).
- **Severidad / prioridad:** pendiente de evaluar impacto tras confirmación.

### DEF-02 — Error interno durante operación bancaria (R04 / CP-06, asociación provisional)
- **Precondición:** usuario autenticado; dos cuentas de prueba y saldos registrados.
- **Pasos:** (1) Ir a Transfer Funds; (2) elegir cuentas distintas; (3) introducir monto positivo dentro del saldo; (4) enviar y observar.
- **Esperado:** confirmación y actualización coherente de saldos.
- **Obtenido:** **Por reproducir**. Hay referencia preliminar a un error interno, pero faltan contexto, operación y mensaje exactos.
- **Evidencia:** `evidencias/DEF-02.png` (pendiente).
- **Severidad / prioridad:** por clasificar tras verificar operación y alcance del fallo.

### DEF-03 — Monto superior al saldo (R05 / CP-08)
- **Precondición:** registrar saldo disponible S en cuenta origen.
- **Pasos:** (1) Consultar saldo S; (2) Transfer Funds; (3) elegir destino distinto; (4) intentar monto S + 0.01; (5) verificar mensaje y nuevos saldos.
- **Esperado:** **Regla pendiente de confirmar**; no asumir prohibición de sobregiro.
- **Obtenido:** **Por ejecutar**.
- **Evidencia:** `evidencias/DEF-03.png` (pendiente).
- **Severidad / prioridad:** por determinar solo si hay regla incumplida.

### DEF-04 — Transferencia a la misma cuenta (R05 / CP-09)
- **Precondición:** sesión iniciada, cuenta de prueba A.
- **Pasos:** (1) Transfer Funds; (2) intentar A como origen y destino; (3) transferir 1.00 si deja; (4) revisar confirmación y movimientos.
- **Esperado:** **Por confirmar** si el sistema la prohíbe o admite operación sin cambio neto.
- **Obtenido:** **Por ejecutar**.
- **Evidencia:** `evidencias/DEF-04.png` (pendiente).
- **Severidad / prioridad:** por determinar tras confirmar política y efecto.

### DEF-05 — Recuperación de credenciales (R07 / CP-11–CP-12)
- **Precondición:** cuenta ficticia registrada y datos de registro disponibles.
- **Pasos:** (1) Cerrar sesión; (2) Forgot Login Info; (3) enviar primero datos coincidentes y después un campo obligatorio vacío; (4) registrar respuestas exactas.
- **Esperado:** recuperación coherente para datos coincidentes y validación comprensible de campos obligatorios, según pantalla.
- **Obtenido:** **Por ejecutar**.
- **Evidencia:** `evidencias/DEF-05.png` (pendiente).
- **Severidad / prioridad:** por determinar si hay incumplimiento observado.

## 3. Comunicación del hallazgo a dos públicos — EJEMPLO CONDICIONAL

### Versión técnica para QA / desarrollo (DEF-02, solo si se reproduce)

**Título propuesto:** Error interno al confirmar una transferencia válida entre cuentas de prueba.  
**Módulo / requisito / caso:** Transfer Funds · R04 · CP-06.  
**Reproducción:** iniciar sesión; anotar saldos; elegir origen y destino distintos; ingresar monto positivo dentro del disponible; confirmar.  
**Esperado:** respuesta de confirmación y movimientos coherentes.  
**Obtenido:** **[Incluir texto exacto del error, fecha/hora, URL y captura después de reproducir]**.  
**Impacto:** **[Determinar si operación queda interrumpida y si hubo cambios de saldo]**.  
**Severidad / prioridad:** por valorar con base en impacto reproducido.

### Versión para quien decide (del mismo DEF-02, condicional)

> Estamos revisando un posible problema en el proceso de transferencias de ParaBank. Si se confirma, podría impedir completar una operación y afectar la confianza en el flujo. Antes de asignar urgencia o afirmar impacto, verificaremos si el error se reproduce, cuántas operaciones afecta y si los saldos permanecen correctos. Presentaremos capturas y una recomendación de prioridad al finalizar la comprobación.

## 4. Registro de ejecución y evidencias — completar HOY

| DEF | Fecha/hora | Navegador | Regla comprobada | Resultado observado | Captura | ¿Confirmado? | Severidad | Prioridad | Jira |
|---|---|---|---|---|---|---|---|---|---|
| DEF-01 | — | — | — | — | — | No | — | — | — |
| DEF-02 | — | — | — | — | — | No | — | — | — |
| DEF-03 | — | — | — | — | — | No | — | — | — |
| DEF-04 | — | — | — | — | — | No | — | — | — |
| DEF-05 | — | — | — | — | — | No | — | — | — |

**Nota de integridad académica:** no transformar estos cinco escenarios en cinco defectos reales sin pruebas. Es correcto entregar el avance documentado y explicar qué está por confirmar, si no alcanza el tiempo.
