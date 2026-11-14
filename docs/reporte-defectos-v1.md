# Reporte de defectos y hallazgos v1 — ParaBank

**Curso:** QA Automatizador · **Sitio:** https://parabank.parasoft.com/parabank/
**Estado actualizado:** cinco candidatos funcionales de notas exploratorias pendientes de reproducción actual; un hallazgo de autenticación reproducido en automatización local y CI, con reproducción manual reportada; una observación técnica de accesibilidad. La causa del hallazgo de autenticación y su clasificación final siguen pendientes.

**Última evidencia de autenticación:** ejecución local reportada del 13/11/2026 (hora de Lima) y artefacto de CI `playwright-report-22-2.zip`. La fecha y el enlace exactos de la ejecución de CI quedan por registrar.

> Las notas de la sesión y la inspección técnica son fuentes distintas. Un comportamiento anotado en la imagen no equivale a una reproducción actual. Las reglas esperadas para monto cero, sobregiro y transferencia a la misma cuenta siguen por confirmar.

## 1. Resumen de candidatos

| ID | Hallazgo anotado | Requisito / caso | Estado y validación pendiente |
|---|---|---|---|
| OBS-01 | La nota indica que se aceptó transferir S/ 0.00 entre cuentas diferentes. | R05 / CP-07 | Transcrito de la imagen; reproducir y guardar mensaje/saldos antes y después. |
| OBS-02 | La nota indica que se aceptó transferir S/ 0.00 a la misma cuenta. | R05 / CP-07 y CP-09 | Transcrito; confirmar cuentas seleccionadas, efecto y regla esperada. |
| OBS-03 | La nota indica que se aceptaron montos mayores al saldo disponible. | R05 / CP-08 | Transcrito; falta saldo inicial/final y política de sobregiro. |
| OBS-04 | La nota indica que se aceptó una transferencia positiva a la misma cuenta. | R05 / CP-09 | Transcrito; reproducir y revisar movimiento/saldos y regla de negocio. |
| OBS-05 | La nota indica que no se logró recuperar la cuenta con *Forgot Login Info*. | R07 / CP-11 | Transcrito; probar datos ficticios verificados y guardar mensaje exacto. |
| AUTH-OBS-01 | Con un usuario inválido, CI muestra `overview.htm`, nombre de cliente, cuenta, saldo y `Log Out`; el servicio de cuentas responde HTTP 200. | RB-05 / AUTH-NEG-04; AUTH-NEG-05 como evidencia local relacionada | Reproducido en Chromium local y CI; reproducción manual reportada. Causa y clasificación pendientes. Las aserciones se conservan y el fallo permanece visible. Véase la ficha de la sección 7. |
| OBS-A11Y-01 | Los campos Username y Password no exponen nombre accesible en la inspección DOM/árbol de accesibilidad de Chromium. | R02 / ACC-01 | Observación técnica reproducida; falta validar con lector de pantalla y clasificar impacto antes de confirmar defecto. |

**Conteo:** 5 candidatos funcionales de las notas pendientes de reproducción actual; 1 hallazgo de autenticación reproducido, con causa y clasificación pendientes; 1 observación técnica de accesibilidad. Los cinco candidatos originales no se presentan como defectos confirmados.

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

Los casos CP-07, CP-08, CP-09 y CP-11 permiten reproducir los candidatos funcionales. Registrar el resultado real, incluso si no se reproduce. Para OBS-01 a OBS-05, mantener cada hipótesis como no confirmada mientras falte una regla esperada verificable o evidencia suficiente. AUTH-OBS-01 cuenta con evidencia del comportamiento observado; su causa y clasificación siguen pendientes. Vincular un ticket Jira solo cuando exista; actualmente no se proporciona URL ni evidencia de tickets.

## 6. Estado de seguimiento
| Registro | Fuente/evidencia | Confirmado como defecto | Jira |
|---|---|---|---|
| OBS-01 a OBS-05 | Imagen de notas exploratorias; reproducción pendiente | No | No proporcionado |
| OBS-A11Y-01 | Inspección DOM/árbol y captura ACC-01 | Observación técnica; clasificación pendiente | No proporcionado |
| AUTH-OBS-01 | Pruebas locales, reproducción manual reportada y artefacto de CI | Comportamiento reproducido; causa y clasificación pendientes | No proporcionado |

## 7. AUTH-OBS-01: acceso a cuentas tras introducir un usuario inválido

**Identificador principal:** AUTH-OBS-01.  
**Referencia histórica:** OBS-LOGIN-01. Ambos nombres corresponden al mismo registro; no crear un ticket duplicado.  
**Estado:** comportamiento reproducido; causa, severidad y prioridad pendientes de investigación.  
**Módulo / regla / pruebas:** autenticación · RB-05 · AUTH-NEG-04 y AUTH-NEG-05.  
**Entorno reciente verificado:** ParaBank público, Chromium local y Chromium en GitHub Actions. La evidencia reciente no acredita Firefox ni WebKit.

### Precondiciones

- Para reproducción manual, abrir una ventana privada nueva sin sesión previa de ParaBank.
- Para automatización, utilizar un contexto de navegador nuevo y comprobar que aparece el formulario de login antes del envío. Revisar en la traza si existe estado de sesión inesperado.
- Usar datos ficticios. No registrar previamente el usuario inventado.

### Pasos de reproducción manual reportada


1. Abrir https://parabank.parasoft.com/parabank/ en la ventana privada.
2. Introducir un usuario inventado no registrado y una contraseña ficticia no vacía.
3. Pulsar `Log In`.
4. Observar la URL, el encabezado y si aparecen cuentas, saldos y `Log Out`, sin ejecutar operaciones bancarias.

### Resultado esperado

Rechazar las credenciales inválidas y mostrar un mensaje de error, sin permitir acceso a datos de cuentas.

### Resultado obtenido y alcance de la evidencia

- **CI, AUTH-NEG-04:** después del envío del usuario aleatorio, la petición de login responde HTTP 302 y la navegación a `overview.htm` responde HTTP 200. La página muestra nombre de cliente, una cuenta, saldo y el enlace `Log Out`. La petición al servicio de cuentas responde HTTP 200.
- **Local, AUTH-NEG-04 y AUTH-NEG-05:** ambas pruebas llegan a `overview.htm` y fallan en la aserción que prohíbe esa URL. En AUTH-NEG-05, los pasos del reporte muestran el llenado de una contraseña incorrecta.
- **Manual:** la autora reportó que el sitio permite avanzar con credenciales inventadas en ventana privada. Los detalles de acceso a cuentas descritos arriba se verificaron en el artefacto de CI.

Esto acredita el comportamiento observado. Todavía no determina si la causa está en la aplicación, su configuración de demostración, el manejo de sesión u otro componente.

### Evidencia y trazabilidad

- Artefacto de CI revisado: `playwright-report-22-2.zip`, con HTML, capturas, contexto del error y traza.
- Resultado de esa ejecución: **9 aprobadas, 1 fallida, 2 omitidas y 66 sin ejecutar**. CI se detuvo al primer fallo; AUTH-NEG-05 no llegó a ejecutarse en esa corrida.
- Validación local aislada reportada el 13/11/2026 (Lima): AUTH-NEG-04 y AUTH-NEG-05 fallidas; duración total de 17,6 segundos según el reporte compartido.
- PR relacionado: #17, reportes y evidencia por etapas. Su validación específica de REP-01 es independiente de este hallazgo.
- **Por registrar:** URL y fecha exactas de la ejecución de Actions, SHA del commit ejecutado y versión del navegador. No inferir estos datos del nombre del ZIP.
- **Jira:** no proporcionado.

### Tratamiento y pendientes

- Conservar las aserciones actuales: las pruebas siguen fallando normalmente; no están marcadas como fallo esperado.
- Investigar la respuesta de login y el estado de sesión inicial sin realizar transferencias ni modificar saldos.
- Conservar el ZIP fuera del repositorio público porque contiene información de sesión. Preparar una copia depurada antes de compartir evidencia públicamente.
- Una vez determinada la causa, registrar la clasificación y verificar la corrección con los mismos casos. No modificar las expectativas únicamente para obtener una ejecución en verde.
