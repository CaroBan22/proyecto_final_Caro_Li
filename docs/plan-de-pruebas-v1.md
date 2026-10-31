# Plan de pruebas v1 — ParaBank

**Curso:** QA Automatizador — Tecsup
**Proyecto:** Sistema de banca virtual ParaBank
**Sistema bajo prueba (SUT):** https://parabank.parasoft.com/parabank/
**Autor:** Por completar — estudiante responsable del repositorio
**Versión:** 1.0 (borrador para revisión)
**Fecha inicial:** 19 de octubre de 2026 · **Actualizado:** 22 de octubre de 2026
**Archivo de entrega:** `docs/plan-de-pruebas-v1.md`
**Estado:** Plan v1 diseñado. Se agregó una observación de accesibilidad inspeccionada en Chromium y un mapa de red observado con Playwright; la ejecución funcional manual, contraste DevTools y cierre de defectos siguen pendientes.

> **Nota de alcance:** este plan se basa en los flujos F01–F06, los casos CP-01–CP-15 y la matriz R01–R07 de los documentos preparados para ParaBank. Las reglas inferidas de la interfaz o propuestas por QA no se presentan como requisitos oficiales. El plan no certifica ejecuciones que aún no tienen evidencia.

## 1. Identificación

| Campo | Detalle |
|---|---|
| Proyecto | QA manual del sistema bancario de demostración ParaBank |
| Sistema | ParaBank (Parasoft), sitio público de práctica |
| Responsable QA | Por completar |
| Versión del plan | v1 · 19/10/2026 |
| Repositorio | `https://github.com/CaroBan22/proyecto_final_Caro_Li` |
| Archivo | `docs/plan-de-pruebas-v1.md` |
| Módulo académico | Módulo 1: Testing manual y control de versiones |

## 2. Objetivo y alcance

**Objetivo de calidad:** comprobar que una persona usuaria de ParaBank pueda registrarse, iniciar sesión, consultar sus cuentas, transferir fondos de prueba, actualizar sus datos y recuperar información de acceso, observando resultados consistentes y mensajes comprensibles. Se priorizan flujos que dan acceso al servicio o modifican datos y saldos.

### Dentro del alcance

| Flujo | Funcionalidad | Qué se comprobará | Motivo / prioridad |
|---|---|---|---|
| F01 | Registro de cliente | Datos válidos, campos requeridos y confirmación de contraseña | Permite acceder al sistema; alta |
| F02 | Inicio de sesión | Credenciales correctas e incorrectas | Control de acceso; alta |
| F03 | Consulta de cuentas | Visibilidad de cuentas y saldos de sesión | Información bancaria simulada; alta |
| F04 | Transferencia de fondos | Monto positivo; monto cero; importe superior al saldo; origen y destino iguales; coherencia de saldos | Operación monetaria de prueba; alta |
| F05 | Actualización del perfil | Guardado y persistencia de cambios | Integridad del contacto; media |
| F06 | Recuperación de acceso | Datos coincidentes y campos faltantes | Recuperar acceso; alta |
| Transversal | Accesibilidad y usabilidad básica | Teclado, etiquetas de formulario, mensajes, contraste y nombres de controles | Detectar obstáculos en flujos críticos; media/alta según impacto |
| Automatización exploratoria | Playwright | Comprobaciones de presencia de controles del login y navegación pública | Apoyo técnico; no sustituye la ejecución manual ni certifica los demás flujos |

### Fuera del alcance

| Exclusión | Motivo |
|---|---|
| Pruebas de carga y rendimiento masivo | No se cuenta con entorno ni herramientas de carga y corresponden a fases posteriores |
| Pruebas de penetración y seguridad avanzada | Fuera del alcance académico de testing manual básico; evitar acciones intrusivas |
| Automatización bancaria completa | No se automatizan transferencias ni flujos con modificación de datos en esta versión |
| Aplicaciones móviles y compatibilidad exhaustiva entre navegadores | Se prioriza una única configuración de escritorio por tiempo limitado |
| Base de datos, código del servidor y operaciones bancarias reales | No existe acceso administrativo; ParaBank es un entorno de demostración |

**Reglas pendientes:** no se dispone de una especificación oficial que confirme cómo deben tratarse sobregiros, transferencias entre la misma cuenta o ciertos datos de registro. Estos comportamientos se registrarán como preguntas hasta confirmar la regla; no se clasificarán automáticamente como defectos.

## 3. Enfoque de pruebas

| Tipo / técnica | Aplicación al proyecto | Referencia / evidencia |
|---|---|---|
| Casos manuales funcionales | Ejecutar CP-01 a CP-15, comparar esperado y observado, anotar PASS/FAIL/BLOCKED y fecha | `docs/casos-manuales-v1.md` |
| Partición de equivalencia y valores límite | Datos completos/incompletos, contraseñas coincidentes/diferentes, monto positivo/0 y saldo S frente a S + 0.01 (regla de sobregiro por confirmar) | Casos CP-01, CP-02, CP-06 a CP-09, CP-12 |
| Tabla de decisión | Analizar registro F01 con tres condiciones: campos completos, contraseñas iguales, usuario disponible; 8 combinaciones y 5 casos derivados | `docs/tabla-decision-v1.md` |
| Testing exploratorio | Sesión con charter y tiempo delimitado para encontrar comportamientos no previstos; anotar O (observación), D (posible defecto), P (pregunta), I (idea) | `docs/sesion-exploratoria-1.md` — por elaborar/ejecutar |
| Accesibilidad y usabilidad | Revisión manual de navegación con teclado, formularios, mensajes de error y legibilidad; Lighthouse como apoyo, no como prueba definitiva | Capturas y notas en `evidencias/` — pendientes |
| Gestión de defectos | Reproducir desde cero; incluir precondiciones, pasos, esperado fundamentado, obtenido, evidencia, severidad y prioridad; vincular R y CP | `docs/reporte-defectos-v1.md` y Jira — pendientes de evidencia |
| Trazabilidad | Relacionar requisitos R01–R07 con CP y DEF, detectar huecos y actualizar estados tras las ejecuciones | `docs/matriz-trazabilidad-v1.md` |

**Entorno de colaboración:** Git y GitHub para versionar. Para esta entrega se recomienda crear una rama de trabajo, generar el commit, publicar y abrir pull request hacia `main`, conforme a la referencia del curso.

## 4. Criterios de entrada y salida

| Tipo | Criterio verificable | Situación a la fecha |
|---|---|---|
| Entrada | La URL de ParaBank responde y se pueden abrir los flujos seleccionados | Sitio y rutas de lectura respondieron durante observaciones en Chromium; volver a comprobar al ejecutar |
| Entrada | Están definidos los flujos F01–F06 y los casos CP-01 a CP-15 | Documentados; ejecución manual pendiente |
| Entrada | Existen cuentas y datos ficticios de prueba; se anotan saldo inicial y navegador | Por completar |
| Entrada | Se dispone de carpeta `evidencias/` y mecanismo de registro de resultados | Existe una captura ACC-01 y su ficha; faltan evidencias de casos y defectos |
| Salida | Todos los casos de prioridad alta planificados se ejecutaron o tienen bloqueo justificado | Pendiente |
| Salida | Cada caso ejecutado tiene fecha, resultado y evidencia, o motivo de ausencia | Pendiente |
| Salida | No quedan defectos críticos conocidos abiertos sin decisión explícita | No evaluable hasta ejecución |
| Salida | Se completó al menos una sesión exploratoria con charter y notas | Notas de 20 minutos transcritas; fecha y evidencia de reproducción incompletas |
| Salida | R01–R07 están vinculados con casos; se revisaron huecos y DEF confirmados | Trazabilidad de diseño creada; estados pendientes |

**Importante:** un caso sin ejecutar no puede presentarse como aprobado. Un candidato DEF sin reproducción y regla clara no se cuenta como defecto confirmado.

## 5. Entorno y datos de prueba

| Campo | Configuración o dato |
|---|---|
| Aplicación | `https://parabank.parasoft.com/parabank/` |
| Equipo / sistema operativo | Mac / macOS (versión por completar) |
| Navegador | Chromium usado en inspección de red y accesibilidad; versión exacta por completar |
| Herramientas | Chromium/Playwright para observaciones de red y DOM; DevTools para contrastar; Lighthouse (si disponible); Jira Free (por confirmar); VS Code, Git y GitHub |
| Datos personales | Identidades, dirección y correo ficticios; no usar datos ni contraseñas reales |
| Registro y acceso | Nombre de usuario único de prueba, credenciales válidas y contraseñas de prueba diferentes |
| Transferencias | Dos cuentas ficticias diferentes cuando existan; monto positivo de prueba; monto 0; saldo S y monto S + 0.01; misma cuenta como origen/destino |
| Recuperación | Datos ficticios coincidentes con la cuenta de prueba y luego un campo requerido vacío |
| Capturas | Guardar en `evidencias/CP-XX-*.png` o `evidencias/DEF-XX.png`, ocultando datos sensibles si aparecieran |

**Registro por sesión (llenar al ejecutar):** fecha/hora: **por completar**; navegador/versión: **por completar**; cuenta ficticia: **por completar**; saldos antes/después: **por completar**; incidencias ambientales: **por completar**.

## 6. Roles y cronograma

| Actividad | Responsable | Momento / estado |
|---|---|---|
| Selección del proyecto, README y repositorio | Estudiante QA | Base creada; revisar versión publicada |
| Diseño de casos manuales v1 | Estudiante QA | 15 casos funcionales diseñados; evidencias de ejecución pendientes |
| Tabla de decisión y matriz de trazabilidad | Estudiante QA | Borradores del 19/10/2026 preparados |
| Sesión exploratoria 1 (charter, 25 min de exploración, notas y balance) | Estudiante QA | Notas fuente indican 20 min; fecha, balance y reproducción documentada pendientes |
| Reproducción de al menos dos candidatos y registro de incidencias | Estudiante QA | Pendiente; OBS-01 a OBS-05 requieren repetición y reglas esperadas |
| Reporte de cinco defectos realmente confirmados | Estudiante QA | Pendiente; no se presentan los candidatos como defectos confirmados |
| Revisión de un par, rama, pull request y merge | Estudiante QA y revisor por definir | **Por completar** |
| Entrega del Módulo 1 | Estudiante QA | Fecha/hora definitiva del docente: **por confirmar** |

Las fechas no se inventan: la presentación modelo de Tecsup proporciona ejemplos; registra aquí las fechas efectivas de cada actividad.

## 7. Riesgos y mitigación

| Riesgo | Impacto | Mitigación |
|---|---|---|
| El sitio público cambia o deja de estar disponible | Casos bloqueados o diferencias no reproducibles | Guardar fecha/hora, URL y captura; repetir en otra sesión; marcar BLOCKED si corresponde |
| Regla de negocio no documentada (sobregiro, cuenta igual) | Falsos defectos o esperado incorrecto | Anotar requisito **por confirmar** y comportamiento real; consultar y no asignar FAIL hasta contar con criterio verificable |
| Falta de datos o de dos cuentas de prueba | No se pueden ejecutar transferencias completas | Crear solo datos ficticios permitidos, anotar cuentas/saldos y registrar bloqueo si no se logra |
| Plazo corto y cobertura incompleta | Casos prioritarios sin ejecutar | Priorizar registro, acceso, transferencias y recuperación; dejar explicitados casos no ejecutados |
| Fallos intermitentes o datos reiniciados en la demo | Dificultad para reproducir resultados | Registrar hora, navegador, precondiciones y pasos; reproducir desde cero antes de abrir DEF |
| Hallazgos de Lighthouse no comprobados a mano | Reportes de accesibilidad falsos | Corroborar con teclado y revisión visual; adjuntar prueba y criterio utilizado |

## 8. Entregables

| Archivo o evidencia | Estado a 19/10/2026 |
|---|---|
| `README.md` y repositorio GitHub | README actualizado; publicar cambios pendientes mediante PR |
| `docs/casos-manuales-v1.md` | 15 casos funcionales; completar ejecuciones, capturas y Jira |
| `docs/tabla-decision-v1.md` | Preparado (regla propuesta, 8 combinaciones, 4 derivados); validar reglas del sitio |
| `docs/matriz-trazabilidad-v1.md` | Preparada (7 requisitos); actualizar estados y huecos tras ejecución |
| `docs/sesion-exploratoria-1.md` | Notas O/D/P/I transcritas; faltan fecha y detalle reproducible |
| `docs/reporte-defectos-v1.md` | Alineado con las notas fuente: 5 candidatos sin reproducción actual; ACC-01 tiene inspección técnica y falta validación con lector de pantalla |
| `docs/mapa-flujos-criticos.md` | Rutas de lectura observadas en Chromium; falta captura en DevTools y observar envío real de transferencia |
| `docs/plan-de-pruebas-v1.md` | Este plan v1, actualizado y listo para incluir en la rama de entrega |
| `evidencias/` | Captura y ficha ACC-01; faltan capturas de casos, defectos, Jira y revisión complementaria |
| Pull request hacia `main` | El mapa posterior al PR anterior y cambios actuales requieren un nuevo PR; aún no creado |

### Lista de verificación antes de presentar

- [x] Al menos 3 elementos dentro del alcance y 2 fuera, con sus motivos.
- [x] Enfoque con casos manuales, tabla de decisión, exploración y accesibilidad.
- [x] Criterios de entrada y salida comprobables.
- [x] Al menos 3 riesgos con mitigación.
- [x] Ocho secciones del plan.
- [ ] Datos reales de entorno, responsable y fechas completados.
- [ ] Completar datos faltantes de sesión exploratoria y reproducir al menos dos candidatos.
- [ ] Casos ejecutados con evidencias.
- [ ] Defectos confirmados, clasificados y vinculados con requisitos.
- [ ] Evidencias de Jira / Lighthouse y revisión por pull request (si corresponde).

**Criterio de honestidad de QA:** lo desconocido queda como **por completar/por confirmar**, en lugar de inventar resultados.
