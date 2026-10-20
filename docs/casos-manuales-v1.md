# Casos de prueba manuales v1 — ParaBank

**Curso:** QA Automatizador — Tecsup  
**Proyecto:** Sistema de banca virtual ParaBank  
**Sistema bajo prueba:** https://parabank.parasoft.com/parabank/  
**Versión del documento:** 1.0  
**Fecha:** 13 de octubre de 2026  
**Estado:** Borrador completo para ejecución y validación

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

**Convenciones:** CP = caso de prueba; F = flujo crítico; CE = partición de equivalencia; VL = valor límite. La prioridad se refiere al impacto del flujo. **Todos los casos están por ejecutar o confirmar**: no se registran observaciones simuladas como hechos. Las reglas de validación no publicadas por ParaBank se consideran **criterios propuestos / por confirmar**, no especificaciones oficiales.

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

### Resumen de cobertura planificada

| Flujo | Casos asociados | Total |
|---|---|---:|
| F01 Registro | CP-01, CP-02 | 2 |
| F02 Inicio de sesión | CP-03, CP-04 | 2 |
| F03 Consulta de cuentas | CP-05 | 1 |
| F04 Transferencias | CP-06, CP-07, CP-08, CP-09 | 4 |
| F05 Contacto | CP-10 | 1 |
| F06 Recuperación de acceso | CP-11, CP-12 | 2 |
| **Total** | **12 casos diseñados; 0 ejecuciones documentadas** | **12** |

---

## 3. Defectos: registro y clasificación

**Diferencia:** *severidad* indica el impacto, *prioridad* indica urgencia de corrección. No se debe confundir una observación con un defecto confirmado. Los siguientes ítems constituyen hipótesis de investigación procedentes del seguimiento preliminar del proyecto y no verificaciones nuevas.

| ID provisional | Hallazgo por revisar | Caso relacionado | Severidad | Prioridad | Estado | Confirmación necesaria |
|---|---|---|---|---|---|---|
| OBS-01 | Posible transferencia a la misma cuenta | CP-09 | Por definir | Por definir | Por reproducir | Regla permitida o prohibida y efecto real en saldo |
| OBS-02 | Posible transferencia superior al saldo | CP-08 | Por definir | Por definir | Por reproducir | Política de sobregiro y saldos antes/después |
| OBS-03 | Error interno reportado en una operación, sin contexto completo | Por vincular | Por definir | Por definir | Por reproducir | URL/pantalla, pasos, datos, fecha, respuesta y captura |
| OBS-04 | Posible problema en recuperación de credenciales | CP-11 / CP-12 | Por definir | Por definir | Por reproducir | Datos de entrada y resultado esperado sustentado |

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

**Nota:** el modelo de Semana 3 contempla un reporte de al menos **cinco defectos documentados**. No inventar defectos para alcanzar esa cifra; explorar nuevos flujos y clasificar los hallazgos no confirmados como pendientes.

---

## 4. Accesibilidad y usabilidad

Se aplicarán las **cinco comprobaciones rápidas** de la sesión 6 a los flujos de inicio de sesión y transferencia: navegación por teclado, contraste visual, texto alternativo, etiquetas de formularios y nombres comprensibles de botones/enlaces. Un hallazgo automático no basta para declarar un defecto: debe comprobarse manualmente.

| ID | Revisión | Procedimiento manual | Resultado | Evidencia |
|---|---|---|---|---|
| ACC-01 | Teclado | Navegar por el login usando Tab, Shift+Tab y Enter; comprobar orden y foco visible | Por ejecutar | `evidencias/ACC-01-teclado.png` (pendiente) |
| ACC-02 | Etiquetas y mensajes | Comprobar que cada campo de *Transfer Funds* tenga etiqueta comprensible y que errores indiquen qué corregir | Por ejecutar | `evidencias/ACC-02-formularios.png` (pendiente) |
| ACC-03 | Contraste y nombres | Revisar contraste de texto y legibilidad de enlaces/botones; usar Lighthouse solo como apoyo y confirmar a mano | Por ejecutar | `evidencias/ACC-03-contraste.png` (pendiente) |

**Pendientes de inspección complementaria:** verificar si las imágenes informativas disponen de texto alternativo significativo, y si la navegación sigue siendo comprensible sin depender únicamente del color. Estos son **tres objetivos de revisión, no tres problemas detectados**. Al terminar, sustituir por 2–3 hallazgos concretos si efectivamente aparecen, con criterio, pasos, impacto y clasificación; si no aparecen, registrar "sin hallazgos en esta prueba".

---

## 5. Registro en la herramienta de gestión

**Herramienta indicada por el curso:** Jira Free. **Estado:** falta verificar la existencia del proyecto y tickets, y adjuntar evidencia.

1. Crear o identificar el proyecto Jira del QA de ParaBank.
2. Registrar los casos **CP-01 a CP-12** como incidencias de tipo *Caso de prueba* (o tipo equivalente configurado), con pasos, esperado, prioridad y estado.
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
- [x] Doce casos diseñados (más del mínimo de ocho); equivalencia y límites documentados.
- [ ] Ejecutar casos y completar resultados obtenidos y capturas.
- [ ] Verificar reglas de negocio propuestas frente a interfaz y documentación disponible.
- [ ] Sustentar y clasificar defectos reales, si los hay.
- [ ] Completar revisión de accesibilidad y registrar 2–3 hallazgos reales o ausencia de hallazgos.
- [ ] Agregar proyecto de Jira, tickets y captura o enlace.
- [x] Explicar apoyo de IA y decisiones de verificación.
- [ ] Hacer `git add`, `git commit` y `git push` al repositorio propio cuando esté revisado.
