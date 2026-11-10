# Índice de evidencias y validaciones

Este índice distingue archivos presentes en Git de resultados observados en el chat o ejecutados en el entorno de trabajo. Un resumen documental no reemplaza al reporte original. No se publican credenciales, cookies ni estados de sesión.

## Archivos históricos presentes en el repositorio

- [ACC-01: ficha](ACC-01-login-formulario.md) y [captura](ACC-01-login-formulario.png): inspección técnica del login; no acredita la revisión completa de accesibilidad.
- [AUTO-01: ficha](AUTO-01-login-pom.md) y [reporte capturado](AUTO-01-playwright-report.png): evidencia histórica de autenticación, según su ficha.
- Existe un trace histórico AUTO-01 en esta carpeta. Revisar su contenido de sesión antes de compartir; no confundirlo con un reporte reciente.

## Resultados recientes

| ID de evidencia documental | Casos / alcance | Resultado | Fuente y localización | Límite |
|---|---|---|---|---|
| EV-AUTO-01 | Suite sin movimientos anterior a PR #10–#12 | 54 aprobadas, 6 omitidas; 3.1 min | Captura de terminal compartida por autora; resumen en README | Captura original reciente aún no archivada en Git; no acredita versión final |
| EV-AUTO-02 | CP-ESPERA-01 a 04 | 12 aprobadas; 54.8 s; tres repeticiones | Captura de autora; [documentación](../docs/esperas-y-estabilidad.md), PR #9 | Chromium; no toda la suite |
| EV-AUTO-03 | AUTH y FORM con IDs | 10 aprobadas; 29.7 s | Captura de autora; README, PR #10 | Chromium; sin movimientos |
| EV-AUTO-04 | BANK-E2E con JSON | 1 aprobada; 18.0 s | Captura de autora; README, PR #10; reporte HTML local | Historial del camino exitoso no verificado; cuenta creada dinámica |
| EV-AUTO-05 | REG-CTRL-01/02 | 6 aprobadas; 12.7 s; tres repeticiones | Ejecución del asistente contra ParaBank; [documentación](../docs/validaciones-intermedias.md), PR #11 | Chromium del sistema; no se crea cliente |
| EV-AUTO-06 | TRANSFER-NEG-01/02 | 6 aprobadas; 27.1 s; tres repeticiones | Ejecución del asistente contra ParaBank; [documentación](../docs/transferencias-invalidas.md), PR #12 | Solo vacío y no numérico; HTTP 400 y saldos/historiales iguales |

Las filas describen ejecuciones separadas, no deben sumarse para inferir cobertura o una suite única aprobada. Los reportes recientes del asistente permanecen en el entorno de trabajo, no se adjuntaron a Git en este cambio. Las capturas de autora están en la conversación; falta incorporarlas como archivos depurados.

## Conservación recomendada

Para cada nueva ejecución registrar commit, entorno, navegador, comando, resultado y fecha real de ejecución. No asignar la fecha de actualización documental a una ejecución cuya fecha no se confirmó.

- Capturar solo el resultado, sin el editor de `.env`.
- Guardar el HTML completo con sus datos y adjuntos fuera del código si incluye información de sesión. El HTML usa archivos adicionales; `index.html` aislado puede ser insuficiente.
- Los adjuntos `conciliacion` y `rechazo-transferencia` permiten revisar datos de las operaciones; comprobarlos antes de publicar.
- El workflow conserva el reporte como artefacto siete días. Un enlace a una ejecución no garantiza conservación permanente.

## Relaciones

- [Matriz de trazabilidad](../docs/matriz-trazabilidad-v1.md)
- [Casos manuales diseñados](../docs/casos-manuales-v1.md)
- [Reporte original de candidatos](../docs/reporte-defectos-v1.md)

Pendientes: archivado depurado de evidencias recientes, actualización de fichas manuales tras ejecutarlas, Firefox, WebKit y CI.
