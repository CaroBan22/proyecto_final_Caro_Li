# Casos de prueba manuales v1 — ParaBank

**Curso:** QA Automatizador — Tecsup
**Proyecto:** Sistema de banca virtual ParaBank
**Sistema bajo prueba:** https://parabank.parasoft.com/parabank/
**Versión del documento:** 1.0
**Fecha inicial:** 13 de octubre de 2026 · **Actualizado:** 22 de octubre de 2026
**Estado:** Diseño actualizado; ejecución funcional pendiente. Se documenta por separado una comprobación de accesibilidad del formulario de login.

---

## 1. Alcance y flujos críticos

### 1.1 Objetivo

Verificar el funcionamiento de los principales procesos del sistema bancario ParaBank mediante pruebas manuales, identificando posibles defectos funcionales y problemas de accesibilidad y usabilidad.

### 1.2 Alcance de las pruebas

Se evaluarán las siguientes funcionalidades:

- Registro de clientes.
- Inicio de sesión.
- Recuperación de información de acceso.
- Consulta de cuentas y saldos.
- Transferencia de fondos.
- Actualización de información personal.

### 1.3 Flujos críticos

**F01 — Registro de clientes**

El usuario accede al formulario de registro, ingresa sus datos personales y crea una cuenta de acceso al sistema.

**F02 — Inicio de sesión**

El usuario introduce sus credenciales y accede a los servicios bancarios.

**F03 — Consulta de cuentas**

El usuario accede a Accounts Overview para visualizar sus cuentas, saldos y dinero disponible.

**F04 — Transferencia de fondos**

El usuario selecciona una cuenta de origen, una cuenta de destino, ingresa un monto y solicita la transferencia.

**F05 — Actualización de información personal**

El usuario ingresa a Update Contact Info, modifica sus datos y solicita guardar los cambios.

**F06 — Recuperación de acceso**

El usuario utiliza Forgot Login Info para recuperar el acceso a su cuenta mediante los datos solicitados por el sistema.

### 1.4 Prioridades

| Funcionalidad | Prioridad | Justificación |
|---|---|---|
| Registro de clientes | Alta | Permite crear usuarios |
| Inicio de sesión | Alta | Controla el acceso al sistema |
| Consulta de cuentas | Alta | Muestra información bancaria |
| Transferencia de fondos | Alta | Involucra operaciones monetarias simuladas |
| Actualización de perfil | Media | Permite mantener los datos del cliente |
| Recuperación de acceso | Alta | Permite recuperar el acceso a la cuenta |

### 1.5 Fuera del alcance

No se incluyen pruebas de rendimiento, pruebas de carga, pruebas de penetración, automatización ni evaluaciones exhaustivas de seguridad.

Se realizará una evaluación básica de accesibilidad y usabilidad siguiendo las indicaciones de la sesión 6.

---

## 2. Casos de prueba por flujo

**Convenciones:** CP = caso de prueba; F = flujo crítico; CE = partición de equivalencia; VL = valor límite. La prioridad se refiere al impacto del flujo. Los casos funcionales CP-01 a CP-14 están por ejecutar. Las reglas no publicadas por ParaBank son criterios propuestos, no requisitos oficiales. La comprobación ACC-01 se observó en el DOM/árbol de accesibilidad con Chromium; falta revisión con lector de pantalla.

### CP-01 — Registro con datos válidos (F01)
- **Tipo / nivel:** Funcional / sistema. **Técnica:** CE válida. **Prioridad:** Alta.
- **Precondición:** Página de registro accesible y nombre de usuario de prueba no utilizado.
- **Datos:** Nombre, apellido, dirección, ciudad, estado, código postal, teléfono, identificador requerido por el formulario; usuario único y contraseña con confirmación coincidente. Utilizar solamente datos ficticios.
- **Pasos:** 1) Abrir ParaBank. 2) Seleccionar *Register*. 3) Completar campos solicitados con datos de prueba válidos. 4) Enviar formulario.
- **Resultado esperado:** El sistema registra al cliente e informa la creación de la cuenta o habilita el acceso, conforme a la interfaz.
- **Resultado obtenido / estado:** Por ejecutar. **Evidencia:** `evidencias/CP-01-registro-valido.png` (por adjuntar).

### CP-02 — Registro con confirmación de contraseña diferente (F01)
- **Tipo / nivel:** Funcional / sistema. **Técnica:** CE inválida. **Prioridad:** Alta.
- **Precondición:** Formulario de registro abierto.
- **Datos:** Datos ficticios completos; contraseña `Prueba2026!` y confirmación `Otra2026!` (valores ilustrativos).
- **Pasos:** 1) Completar el formulario. 2) Ingresar las dos contraseñas distintas. 3) Enviar.
- **Resultado esperado:** No se crea la cuenta y se informa que la confirmación no coincide (**criterio de validación propuesto**).
- **Resultado obtenido / estado:** Por ejecutar. **Evidencia:** `evidencias/CP-02-contrasena.png` (por adjuntar).

### CP-03 — Inicio de sesión con credenciales válidas (F02)
- **Tipo / nivel:** Funcional / sistema. **Técnica:** CE válida. **Prioridad:** Alta.
- **Precondición:** Usuario de pruebas registrado.
- **Datos:** Usuario y contraseña válidos del entorno de prueba (no guardar contraseñas reales en Git).
- **Pasos:** 1) Abrir la página principal. 2) Escribir credenciales. 3) Seleccionar *Log In*.
- **Resultado esperado:** Inicio de sesión correcto y acceso a funciones de la cuenta.
- **Resultado obtenido / estado:** Por ejecutar. **Evidencia:** `evidencias/CP-03-login-valido.png` (por adjuntar).

### CP-04 — Inicio de sesión con contraseña incorrecta (F02)
- **Tipo / nivel:** Funcional / sistema. **Técnica:** CE inválida. **Prioridad:** Alta.
- **Precondición:** Usuario de pruebas existente.
- **Datos:** Usuario válido y contraseña incorrecta.
- **Pasos:** 1) Abrir la página principal. 2) Introducir usuario válido y contraseña errónea. 3) Seleccionar *Log In*.
- **Resultado esperado:** No se concede acceso y aparece una indicación de autenticación fallida.
- **Resultado obtenido / estado:** Por ejecutar. **Evidencia:** `evidencias/CP-04-login-invalido.png` (por adjuntar).

### CP-05 — Consultar cuentas y saldos (F03)
- **Tipo / nivel:** Funcional / sistema. **Técnica:** CE válida. **Prioridad:** Alta.
- **Precondición:** Sesión iniciada; usuario con al menos una cuenta de prueba disponible.
- **Datos:** Cuenta de prueba del usuario.
- **Pasos:** 1) Iniciar sesión. 2) Entrar a *Accounts Overview*. 3) Revisar identificadores, saldos y saldo disponible mostrados.
- **Resultado esperado:** Se presenta la información de las cuentas correspondientes al usuario; los importes se visualizan coherentemente con el estado registrado del sistema.
- **Resultado obtenido / estado:** Por ejecutar. **Evidencia:** `evidencias/CP-05-cuentas.png` (por adjuntar).

### CP-06 — Transferencia con monto positivo y fondos suficientes (F04)
- **Tipo / nivel:** Funcional / integración (interfaz y actualización entre cuentas). **Técnica:** CE válida. **Prioridad:** Alta.
- **Precondición:** Sesión iniciada; dos cuentas de prueba disponibles; cuenta de origen con saldo conocido suficiente.
- **Datos:** Cuenta origen A; destino B; monto simulado `10.00` (ajustar si el saldo no alcanza).
- **Pasos:** 1) Registrar saldos iniciales. 2) Abrir *Transfer Funds*. 3) Indicar monto, origen y destino. 4) Confirmar. 5) Regresar a consultar saldos o movimientos.
- **Resultado esperado:** Se confirma la operación; el importe se descuenta de A y se acredita en B una sola vez, según las reglas disponibles.
- **Resultado obtenido / estado:** Por ejecutar. **Evidencia:** `evidencias/CP-06-transferencia-valida.png` (por adjuntar).

### CP-07 — Transferencia de monto cero (F04)
- **Tipo / nivel:** Funcional / sistema. **Técnica:** VL inferior (0 frente a un monto positivo) y CE inválida propuesta. **Prioridad:** Alta.
- **Precondición:** Sesión iniciada; cuentas origen y destino de prueba disponibles.
- **Datos:** Monto `0.00`.
- **Pasos:** 1) Abrir *Transfer Funds*. 2) Introducir `0.00`. 3) Seleccionar cuentas. 4) Confirmar y observar mensaje y saldos.
- **Resultado esperado:** **Por confirmar con la regla del sistema**: como criterio de prueba propuesto, no registrar una transferencia de valor cero e informar al usuario.
- **Resultado obtenido / estado:** Por ejecutar. **Evidencia:** `evidencias/CP-07-monto-cero.png` (por adjuntar).

### CP-08 — Transferencia superior al saldo disponible (F04)
- **Tipo / nivel:** Funcional / sistema. **Técnica:** VL superior al saldo disponible; CE inválida propuesta. **Prioridad:** Alta.
- **Precondición:** Sesión iniciada; saldo disponible de cuenta A registrado antes de la operación.
- **Datos:** Si el disponible es `S`, probar monto `S + 0.01` (moneda y precisión según interfaz).
- **Pasos:** 1) Consultar y anotar saldo disponible S. 2) Abrir *Transfer Funds*. 3) Seleccionar A y B. 4) Ingresar monto superior a S. 5) Confirmar; comprobar saldos y mensajes.
- **Resultado esperado:** **Por confirmar**: se debe definir si se permiten saldos negativos o sobregiros en la demo antes de clasificar la operación como defecto. Si se establece la prohibición, debe rechazarse sin variar saldos.
- **Resultado obtenido / estado:** Por ejecutar. **Evidencia:** `evidencias/CP-08-saldo-insuficiente.png` (por adjuntar).

### CP-09 — Transferencia hacia la misma cuenta (F04)
- **Tipo / nivel:** Funcional / sistema. **Técnica:** CE caso especial / tabla de decisión. **Prioridad:** Alta.
- **Precondición:** Sesión iniciada y cuenta de prueba disponible.
- **Datos:** Origen A; destino A; monto `1.00`.
- **Pasos:** 1) Entrar a *Transfer Funds*. 2) Intentar elegir la misma cuenta como origen y destino. 3) Ingresar el monto si se permite. 4) Observar respuesta y revisar movimientos.
- **Resultado esperado:** **Regla por confirmar**: verificar si la aplicación impide seleccionar la misma cuenta o si procesa una operación sin cambio neto. No calificar de defecto sin criterio documentado.
- **Resultado obtenido / estado:** Por ejecutar. **Evidencia:** `evidencias/CP-09-misma-cuenta.png` (por adjuntar).

### CP-10 — Actualización de información de contacto (F05)
- **Tipo / nivel:** Funcional / sistema. **Técnica:** CE válida. **Prioridad:** Media.
- **Precondición:** Sesión iniciada; datos de contacto de prueba registrados.
- **Datos:** Cambiar la ciudad por un valor ficticio válido como `LimaTest` (ajustar al formato permitido).
- **Pasos:** 1) Abrir *Update Contact Info*. 2) Registrar valor anterior. 3) Editar un campo permitido. 4) Enviar formulario. 5) Volver a la pantalla y verificar persistencia.
- **Resultado esperado:** Confirmación del cambio y visualización persistente del nuevo dato.
- **Resultado obtenido / estado:** Por ejecutar. **Evidencia:** `evidencias/CP-10-contacto.png` (por adjuntar).

### CP-11 — Recuperación de información de acceso con datos válidos (F06)
- **Tipo / nivel:** Funcional / sistema. **Técnica:** CE válida. **Prioridad:** Alta.
- **Precondición:** Cuenta de prueba conocida y acceso a los datos ficticios de registro.
- **Datos:** Datos de identificación solicitados en *Forgot Login Info* coincidentes con el registro.
- **Pasos:** 1) Seleccionar *Forgot Login Info*. 2) Introducir datos de la cuenta ficticia conforme al formulario. 3) Enviar y revisar respuesta.
- **Resultado esperado:** El sistema comunica el resultado de recuperación conforme a la funcionalidad visible, sin error inesperado.
- **Resultado obtenido / estado:** Por ejecutar. **Evidencia:** `evidencias/CP-11-recuperacion-valida.png` (por adjuntar).

### CP-12 — Recuperación con campo obligatorio vacío (F06)
- **Tipo / nivel:** Funcional / sistema. **Técnica:** CE inválida / VL vacío. **Prioridad:** Alta.
- **Precondición:** Formulario *Forgot Login Info* abierto.
- **Datos:** Dejar al menos un campo marcado como obligatorio vacío; llenar los demás con datos ficticios.
- **Pasos:** 1) Abrir formulario. 2) Dejar vacío un dato requerido. 3) Enviar. 4) Registrar mensaje observado.
- **Resultado esperado:** No completar la recuperación con información obligatoria incompleta y mostrar validación comprensible (**criterio propuesto según campos visibles**).
- **Resultado obtenido / estado:** Por ejecutar. **Evidencia:** `evidencias/CP-12-recuperacion-vacio.png` (por adjuntar).

### CP-13 — Registro con un campo obligatorio vacío (F01)
- **Tipo / nivel:** Funcional / sistema. **Técnica:** CE inválida. **Prioridad:** Alta.
- **Precondición:** formulario de registro abierto; identificar un campo marcado como requerido en la interfaz.
- **Datos:** Datos ficticios válidos en los demás campos; dejar vacío un campo requerido.
- **Pasos:** 1) Abrir *Register*. 2) Completar los campos con datos ficticios. 3) Dejar vacío un campo indicado como obligatorio. 4) Enviar el formulario.
- **Resultado esperado:** No se completa el registro y se informa qué dato falta (criterio propuesto a partir del requisito de campos completos).
- **Resultado obtenido / estado:** Por ejecutar. **Evidencia:** `evidencias/CP-13-registro-campo-vacio.png` (por adjuntar).

### CP-14 — Registro con nombre de usuario ya utilizado (F01)
- **Tipo / nivel:** Funcional / sistema. **Técnica:** CE inválida. **Prioridad:** Alta.
- **Precondición:** disponer de un nombre de usuario ficticio ya registrado y formulario de registro abierto.
- **Datos:** Datos ficticios completos; reutilizar exactamente el usuario de prueba existente.
- **Pasos:** 1) Abrir *Register*. 2) Completar datos válidos y contraseñas coincidentes. 3) Usar el nombre de usuario ya registrado. 4) Enviar el formulario.
- **Resultado esperado:** No se crea una segunda cuenta con el mismo usuario y se indica que el nombre no está disponible (criterio propuesto; confirmar el texto real).
- **Resultado obtenido / estado:** Por ejecutar. **Evidencia:** `evidencias/CP-14-usuario-duplicado.png` (por adjuntar).

### ACC-01 — Login: campos con nombre accesible (F02 / accesibilidad)
- **Tipo / nivel:** Accesibilidad / sistema. **Técnica:** inspección de nombre accesible y etiquetas. **Prioridad:** Media, sujeta a evaluación del impacto.
- **Precondición:** formulario de inicio de sesión abierto en Chromium.
- **Pasos:** 1) Inspeccionar Username y Password en DOM/árbol de accesibilidad. 2) Comprobar asociación con `<label>`, `aria-label` o `aria-labelledby`, y consulta por rol/nombre. 3) Confirmar con lector de pantalla como seguimiento.
- **Resultado esperado:** cada campo expone un nombre accesible que identifica su propósito.
- **Resultado observado:** durante la inspección, ambos inputs no tenían `<label>` asociado, `aria-label`, `aria-labelledby`, placeholder ni title; las consultas por rol/nombre y por label no encontraban esos campos. El texto visible cercano no estaba asociado programáticamente.
- **Estado:** Observación técnica reproducida en Chromium; pendiente de comprobación con lector de pantalla y de registrar un defecto en Jira. No afirmar que teclado o foco fallan.
- **Evidencia:** `evidencias/ACC-01-login-formulario.png` y `evidencias/ACC-01-login-formulario.md`.

### Resumen de cobertura planificada

| Flujo | Casos asociados | Total |
|---|---|---:|
| F01 Registro | CP-01, CP-02, CP-13, CP-14 | 4 |
| F02 Inicio de sesión | CP-03, CP-04 | 2 |
| F03 Consulta de cuentas | CP-05 | 1 |
| F04 Transferencias | CP-06, CP-07, CP-08, CP-09 | 4 |
| F05 Contacto | CP-10 | 1 |
| F06 Recuperación de acceso | CP-11, CP-12 | 2 |
| F02 / Accesibilidad | ACC-01 | 1 observación |
| **Total** | **14 casos funcionales diseñados y 1 comprobación de accesibilidad** | **14 + 1** |

---

## 3. Defectos: registro y clasificación

**Diferencia:** *severidad* indica el impacto, *prioridad* indica urgencia de corrección. Las observaciones siguientes se transcriben de las notas compartidas; ninguna se presenta como defecto funcional confirmado.

| ID provisional | Hallazgo por revisar | Caso relacionado | Severidad | Prioridad | Estado | Confirmación necesaria |
|---|---|---|---|---|---|---|
| OBS-01 | La nota indica transferencia de S/ 0.00 entre cuentas diferentes | CP-07 | Por definir | Por definir | Transcrito; por reproducir | Repetir y registrar regla, mensaje y saldos |
| OBS-02 | La nota indica transferencia de S/ 0.00 a la misma cuenta | CP-07 / CP-09 | Por definir | Por definir | Transcrito; por reproducir | Confirmar cuentas elegidas, efecto y regla esperada |
| OBS-03 | La nota indica importe mayor al saldo disponible | CP-08 | Por definir | Por definir | Transcrito; por reproducir | Confirmar política de sobregiro y saldos antes/después |
| OBS-04 | La nota indica transferencia positiva a la misma cuenta | CP-09 | Por definir | Por definir | Transcrito; por reproducir | Registrar respuesta, movimiento y saldos |
| OBS-05 | La nota indica que no se logró recuperar la cuenta con Forgot Login Info | CP-11 | Por definir | Por definir | Transcrito; por reproducir | Probar datos ficticios verificados y guardar mensaje exacto |
| OBS-A11Y-01 | Campos de login sin nombre programático en la inspección Chromium | ACC-01 | Por evaluar | Por evaluar | Observación técnica; lector de pantalla pendiente | Completar prueba con tecnología de asistencia |

**Plantilla para convertir un hallazgo reproducido en defecto (DEF-XX):**
- **Título y módulo:** [completar].
- **Caso / requisito:** [CP-XX / R-XX].
- **Entorno, navegador y fecha/hora:** [completar].
- **Precondiciones y datos ficticios:** [completar].
- **Pasos para reproducir:** [numerados y repetibles].
- **Resultado esperado y fundamento:** [criterio de la interfaz, documentación o regla consensuada].
- **Resultado obtenido:** [observación exacta].
- **Evidencia:** [captura en `evidencias/` o enlace autorizado].
- **Severidad y prioridad:** [nivel y explicación por separado].
- **Estado y ticket de Jira:** [por completar].

**Nota:** las notas aportadas documentan cinco candidatos, no cinco defectos confirmados. No inventar resultados para alcanzar el número requerido por el curso; reproducirlos y documentar el resultado real.

---

## 4. Accesibilidad y usabilidad

Se aplicarán las **cinco comprobaciones rápidas** de la sesión 6 a los flujos de inicio de sesión y transferencia: navegación por teclado, contraste visual, texto alternativo, etiquetas de formularios y nombres comprensibles de botones/enlaces. Un hallazgo automático no basta para declarar un defecto: debe comprobarse manualmente.

| ID | Revisión | Procedimiento manual | Resultado | Evidencia |
|---|---|---|---|---|
| ACC-01 | Nombres accesibles del login | Inspeccionar nombre accesible de Username y Password; completar con lector de pantalla | DOM/árbol de accesibilidad: ambos campos sin nombre programático; lector de pantalla pendiente | `evidencias/ACC-01-login-formulario.png` y `.md` |
| ACC-02 | Teclado | Navegar por el login usando Tab, Shift+Tab y Enter; comprobar orden y foco visible | Parcial: Tab avanzó por enlaces y el foco observado fue visible; falta completar Shift+Tab/Enter y dejar evidencia específica | Pendiente |
| ACC-03 | Transferencia y mensajes | Comprobar etiquetas de *Transfer Funds* y claridad de errores | Por ejecutar | Pendiente |
| ACC-04 | Contraste y texto alternativo | Revisar contraste, nombres de botones/enlaces y texto alternativo de imágenes | Por ejecutar | Pendiente |

**Pendientes de inspección complementaria:** verificar si las imágenes informativas disponen de texto alternativo significativo, y si la navegación sigue siendo comprensible sin depender únicamente del color. Estos son **tres objetivos de revisión, no tres problemas detectados**. Al terminar, sustituir por 2–3 hallazgos concretos si efectivamente aparecen, con criterio, pasos, impacto y clasificación; si no aparecen, registrar "sin hallazgos en esta prueba".

---

## 5. Registro en la herramienta de gestión

**Herramienta indicada por el curso:** Jira Free. **Estado:** falta verificar la existencia del proyecto y tickets, y adjuntar evidencia.

1. Crear o identificar el proyecto Jira del QA de ParaBank.
2. Registrar los casos **CP-01 a CP-14** como incidencias de tipo *Caso de prueba* (o tipo equivalente configurado), con pasos, esperado, prioridad y estado.
3. Abrir tickets de tipo *Defecto* **solo tras reproducir y sustentar** cada hallazgo.
4. Enlazar cada defecto con su caso de prueba y registrar el resultado de ejecución.
5. Adjuntar aquí **URL real del proyecto Jira: [por completar]**, más captura `evidencias/jira-casos.png` [pendiente].

**Estado de integración:** [por confirmar; no se presume que los tickets existan].

---

## 6. Uso de IA: propuesta y comprobación

Se utilizó IA como **apoyo de redacción y diseño** para organizar casos vinculados a F01–F06, proponer particiones de equivalencia, valores límite y una plantilla reproducible para reportar defectos. **Verificación humana pendiente:** revisar en ParaBank la existencia de cada campo, acción y mensaje; ejecutar cada caso; comprobar las reglas no documentadas (especialmente transferencias y recuperación de acceso); corregir lo que no coincida y dejar capturas reales. No se atribuyen a la IA ejecuciones, capturas ni defectos confirmados.

**Decisión de QA:** conservar únicamente resultados observados; marcar expectativas no sustentadas como **por confirmar**; registrar en Jira los defectos que efectivamente se reproduzcan.

---

## Lista de verificación antes de entregar

- [x] Documento de seis secciones con alcance y mapa F01–F06.
- [x] Catorce casos funcionales diseñados; equivalencia y límites documentados.
- [ ] Ejecutar casos y completar resultados obtenidos y capturas.
- [ ] Verificar reglas de negocio propuestas frente a interfaz y documentación disponible.
- [ ] Sustentar y clasificar defectos reales, si los hay.
- [ ] Completar revisión de accesibilidad y registrar 2–3 hallazgos reales o ausencia de hallazgos.
- [ ] Agregar proyecto de Jira, tickets y captura o enlace.
- [x] Explicar apoyo de IA y decisiones de verificación.
- [ ] Hacer `git add`, `git commit` y `git push` al repositorio propio cuando esté revisado.
