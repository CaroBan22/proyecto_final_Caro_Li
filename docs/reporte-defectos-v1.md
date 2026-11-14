65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
87
88
89
90
91
92
93
94
95
96
97
98
99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
114

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
