# Reporte de defectos y hallazgos v1 — ParaBank

**Curso:** QA Automatizador · **Sitio:** https://parabank.parasoft.com/parabank/
**Actualizado:** 22/10/2026 · **Estado:** cinco candidatos transcritos de las notas exploratorias; cero defectos funcionales confirmados de forma independiente. Se registra además una observación técnica de accesibilidad pendiente de confirmación con lector de pantalla.

> Las notas de la sesión y la inspección técnica son fuentes distintas. Un comportamiento anotado en la imagen no equivale a una reproducción actual. Las reglas esperadas para monto cero, sobregiro y transferencia a la misma cuenta siguen por confirmar.

## 1. Resumen de candidatos

| ID | Hallazgo anotado | Requisito / caso | Estado y validación pendiente |
|---|---|---|---|
| OBS-01 | La nota indica que se aceptó transferir S/ 0.00 entre cuentas diferentes. | R05 / CP-07 | Transcrito de la imagen; reproducir y guardar mensaje/saldos antes y después. |
| OBS-02 | La nota indica que se aceptó transferir S/ 0.00 a la misma cuenta. | R05 / CP-07 y CP-09 | Transcrito; confirmar cuentas seleccionadas, efecto y regla esperada. |
| OBS-03 | La nota indica que se aceptaron montos mayores al saldo disponible. | R05 / CP-08 | Transcrito; falta saldo inicial/final y política de sobregiro. |
| OBS-04 | La nota indica que se aceptó una transferencia positiva a la misma cuenta. | R05 / CP-09 | Transcrito; reproducir y revisar movimiento/saldos y regla de negocio. |
| OBS-05 | La nota indica que no se logró recuperar la cuenta con *Forgot Login Info*. | R07 / CP-11 | Transcrito; probar datos ficticios verificados y guardar mensaje exacto. |
| OBS-A11Y-01 | Los campos Username y Password no exponen nombre accesible en la inspección DOM/árbol de accesibilidad de Chromium. | R02 / ACC-01 | Observación técnica reproducida; falta validar con lector de pantalla y clasificar impacto antes de confirmar defecto. |

**Conteo:** 5 candidatos de la imagen sin reproducción actual; 1 observación técnica de accesibilidad con inspección DOM; 0 defectos confirmados con ficha completa. No se debe presentar este conteo como cinco defectos verificados.

## 2. Ficha de seguimiento para OBS-01 a OBS-05

Para cada candidato, completar al reproducir:

- **Fecha/hora, navegador y URL:** pendiente.
- **Precondiciones y datos ficticios:** pendiente; para transferencias, anotar cuentas de prueba sin publicar IDs sensibles.
- **Pasos numerados y repetibles:** pendiente de reconstrucción; las notas originales no los incluyen.
- **Resultado esperado y fundamento:** pendiente de regla documentada/consensuada.
- **Resultado obtenido exacto:** pendiente de nueva ejecución.
- **Saldo y movimientos antes/después:** pendiente para OBS-01 a OBS-04.
- **Evidencia:** pendiente; no existe captura individual por hallazgo en la imagen compartida.
- **Severidad, prioridad y Jira:** asignar solamente después de confirmar el incumplimiento.

## 3. Ficha técnica — OBS-A11Y-01 (caso ACC-01)

**Título provisional:** Los campos del formulario de inicio de sesión no exponen nombre accesible en el DOM inspeccionado.
**Módulo / requisito / caso:** Login · R02 · ACC-01.
**Criterio de referencia:** evaluar contra WCAG 2.2, criterio 4.1.2 *Name, Role, Value* ([W3C](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html)).
**Entorno observado:** Chromium, 22/10/2026; ParaBank público.
**Pasos:** abrir el login; inspeccionar los inputs `username` y `password`; consultar asociación `<label>`, `aria-label`, `aria-labelledby`, placeholder/title y búsqueda por rol/nombre o label.
**Resultado observado:** ambos inputs carecían de esos atributos/asociaciones; las consultas accesibles por nombre no los encontraban.
**Resultado esperado:** ambos campos deben anunciar un nombre que identifique su propósito.
**Evidencia:** `evidencias/ACC-01-login-formulario.png` y `evidencias/ACC-01-login-formulario.md`.
**Límite:** esta inspección sustenta que falta un nombre programático en el DOM/árbol revisado. Aún no se probó con lector de pantalla; el impacto final y la clasificación de defecto quedan por confirmar. No se observó una falla de teclado.

## 4. Comunicación del hallazgo ACC-01

**Versión técnica:** En el formulario de acceso, los inputs de usuario y contraseña no presentan una etiqueta asociada ni un nombre accesible mediante `aria-label` o `aria-labelledby`. En Chromium, las consultas por rol/nombre y por etiqueta no localizaron los campos. Revisar con lector de pantalla y añadir nombres programáticos asociados a cada control. La observación está respaldada por la evidencia ACC-01; impacto y prioridad pendientes de evaluación.

**Versión para quien decide:** La revisión técnica del formulario encontró que las cajas de usuario y contraseña tienen texto visible, pero ese texto no aparece asociado al control para tecnologías de asistencia en la inspección realizada. Falta comprobar la experiencia con lector de pantalla y priorizar la corrección.

## 5. Cierre y trazabilidad

Los casos CP-07, CP-08, CP-09 y CP-11 permiten reproducir los candidatos funcionales. Registrar el resultado real, incluso si no se reproduce. Mantener cada hipótesis como no confirmada mientras falte una regla esperada verificable o evidencia suficiente. Vincular un ticket Jira solo cuando exista; actualmente no se proporciona URL ni evidencia de tickets.

| Registro | Fuente/evidencia | Confirmado como defecto | Jira |
|---|---|---|---|
| OBS-01 a OBS-05 | Imagen de notas exploratorias; reproducción pendiente | No | No proporcionado |
| OBS-A11Y-01 | Inspección DOM/árbol y captura ACC-01 | Observación técnica; clasificación pendiente | No proporcionado |
