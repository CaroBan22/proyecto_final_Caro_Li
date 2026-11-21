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
115
116
117
118
119
120
121
122
123
124
125
126
127
128
129
130
131
132
133
134
135
136
137
138
139
140
141
142
143
144
145
146
147
148
149
150
151
152
153
154
155
156
157
158
159
160
161
162
163
164
165
166
167
168
169
170
171
172
173
174
175
176
177
178
179
180
181
182
183
184
185
186
187
188
189
190
191
192
193
194
195
196
197
198
199
200
201
202
203
204
205
206
207
208
209
210
211
212
213
214
215
216
```bash
npm run test:chromium
```

En la versión con ambos BANK-E2E, CP-06 y los dos negativos de transferencia, esas variables desactivadas omiten cinco casos por navegador. Las omisiones no son aprobaciones. Registrar el inventario real de cada corrida; cambia al añadir pruebas.

### Validaciones específicas sin movimientos

Evidencia por etapas:

```bash
npx playwright test tests/auth/report-evidence.spec.js --project=chromium --workers=1 --retries=0
```

Ciclo de sesión:

```bash
npx playwright test tests/auth/session-cycle.spec.js --project=chromium --workers=1 --retries=0
```

### Apertura y transferencia opcionales

Activar únicamente `RUN_OPEN_ACCOUNT_FLOW=true` y configurar una cuenta de origen con saldo para **dos depósitos mínimos más USD 3**. Si cada depósito exige USD 100, se necesitan al menos USD 203. Revisar el saldo y la identidad del usuario antes de ejecutar; los números de cuenta históricos no garantizan disponibilidad.

```bash
npx playwright test tests/accounts/open-transfer.spec.js --project=chromium --workers=1 --retries=0
```

Cada escenario abre una cuenta, transfiere, verifica confirmación y saldos, cierra sesión, vuelve a entrar y comprueba persistencia. Adjunta `conciliacion`. No comprueba el historial de movimientos.

Ejecutar operaciones con un navegador, un worker y cero reintentos. Si falla después del envío, revisar cuentas y movimientos antes de repetir. No hay reversión automática. Al terminar, restablecer las tres variables opcionales a `false`.

### Reporteros y conservación

La configuración publicada en la rama de reportes incluye terminal, HTML (`playwright-report/`), JSON (`results.json`), resultados Allure (`allure-results/`), captura al fallar y traza `retain-on-failure`.

No añadir `--reporter=list,html` a los comandos habituales: sustituye la selección configurada y deja fuera JSON y Allure.

`npm run report:allure` limpia el HTML anterior de `allure-report/`; no limpia `allure-results/`, que puede contener varias corridas. No interpretar un reporte acumulado como una corrida única sin comprobar los resultados incluidos. La configuración de historial y directorios automáticos por ejecución sigue pendiente.

Antes de otra corrida, copiar la carpeta HTML completa y el JSON a una ubicación distinta. Las copias locales verificadas están en `evidencias-locales/REP-01/` y `evidencias-locales/AUTH-SES-01/`, excluidas de Git; no forman parte automática de una clonación del repositorio. Revisar datos sensibles antes de entregar reportes.

### Integración continua

`.github/workflows/node.js.yml` instala dependencias y navegadores, ejecuta `npm test` y conserva el HTML durante siete días. Utiliza secretos del repositorio para las credenciales. La configuración revisada detiene CI al primer fallo; los casos restantes figuran sin ejecutar. Actualmente no archiva JSON ni resultados Allure como artefactos separados.

## 6. Estructura y diseño

```text
pages/                         Page Objects por pantalla
  LoginPage.js
  AccountsPage.js
  AccountDetailsPage.js
  RegisterPage.js
  OpenAccountPage.js
  TransferPage.js
tests/
  fixtures.js                  Fixtures centrales y sesión en memoria
  auth/                        Login, logout, datos, REP-01 y ciclo de sesión
  accounts/                    Consultas, esperas y apertura/transferencia
  registration/                Campos obligatorios y controles intermedios
  transfers/                   Formulario, transferencia y rechazos
  parabank-login.spec.js       Formulario de acceso y navegación al registro
test-data/                     Datos ficticios en JSON
demos/                         Demostraciones fuera de la suite principal
docs/                          Plan, trazabilidad, casos y hallazgos
evidencias/                    Evidencia versionada y fichas
.github/workflows/node.js.yml  CI
.env.example                   Plantilla sin credenciales
playwright.config.js           Navegadores, selección de tests y reporteros
package.json                   Dependencias y scripts
```

`tests/auth/fixture.js` reexporta las fixtures centrales. `loggedInPage` prepara una sesión por prueba; `bankStorageState` obtiene estado en memoria por worker y `savedSessionPage` lo usa en un contexto independiente. El estado guardado no se aplica globalmente a las pruebas anónimas.

La suite principal usa aserciones por estado, `expect.poll`, `toPass`, esperas de URL y respuesta. Los reintentos de lectura no repiten envíos transaccionales. Los límites `test.setTimeout` no son esperas fijas. `tests/example.spec.js`, `tests/locators.spec.js` y las demostraciones de `demos/` no pertenecen a la selección principal.

## 7. Métricas, hallazgos y pendientes

### Resultados observados

Estas son ejecuciones **separadas**, de distintas versiones y alcances. No sumar sus cifras como casos únicos ni presentarlas como una sola validación final.

| Ejecución | Navegador | Aprobadas | Fallidas | Omitidas | Sin ejecutar | Duración |
|---|---|---:|---:|---:|---:|---|
| Suite anterior a los dos escenarios BANK-E2E | Chromium | 21 | 0 | 3 | No informado | 1,4 min |
| Dos escenarios BANK-E2E del PR #15 | Chromium del sistema | 2 | 0 | 0 | 0 | 13,4 s |
| Suite local del 13/11/2026, antes de añadir REP-01 y ciclo de sesión | Chromium | 18 | 2 | 5 | 0 | 1,4 min |
| Negativos de autenticación aislados del 13/11/2026 | Chromium | 0 | 2 | 0 | 0 | 17,6 s |
| CI del artefacto `playwright-report-22-2.zip` | Chromium hasta la detención | 9 | 1 | 2 | 66 | 18,3 s |
| FORM-01 a FORM-03; reporteros comprobados | Chromium | 3 | 0 | 0 | 0 | 8,0 s |
| REP-01; capturas de acceso y registro verificadas | Chromium | 1 | 0 | 0 | 0 | 3,3 s |
| AUTH-SES-01; login, logout y nuevo login | Chromium | 1 | 0 | 0 | 0 | 6,5 s |

En la corrida de CI se planificaron 78 ejecuciones entre los proyectos configurados. Las 66 no ejecutadas se distinguen de las dos omitidas por configuración. La traza y las capturas verifican AUTH-NEG-04; AUTH-NEG-05 no llegó a ejecutarse en esa corrida.

La aprobación aislada de AUTH-SES-01 no demuestra que el fallo anterior de nuevo login del flujo bancario esté resuelto. Una corrida conjunta anterior terminó con 6 aprobadas, 1 fallida y 18 sin ejecutar; falló al volver a entrar después de una transferencia.

La suite sin movimientos de una versión anterior también se repitió tres veces con 54 aprobadas y 6 omitidas en 3,1 minutos. Existe una validación histórica de Firefox con 20 aprobadas y 4 omitidas. Ninguno de esos resultados acredita la estabilidad o cobertura completa de la versión actual.

### Hallazgos

- **AUTH-OBS-01:** acceso a cuentas tras introducir un usuario inválido. Evidencia local, manual reportada y de CI; causa pendiente. Las aserciones de AUTH-NEG-04/05 permanecen vigentes y los fallos no se ocultan como aprobaciones.
- **OBS-01 a OBS-05:** candidatos procedentes de notas exploratorias, pendientes de reproducción actual y reglas de negocio verificables.
- **OBS-A11Y-01 / ACC-01:** inspección técnica de nombres accesibles; revisión con lector de pantalla e impacto pendientes.

Consultar [reporte de hallazgos](docs/reporte-defectos-v1.md), [matriz de trazabilidad](docs/matriz-trazabilidad-v1.md), [adaptación al curso](docs/adaptacion-profesor.md) e [índice de validaciones](evidencias/indice-validaciones.md). Los documentos históricos pueden describir versiones anteriores; contrastar su alcance antes de reutilizar una cifra.

### Cierre pendiente

1. Registrar enlace, commit y fecha exactos de la ejecución de CI del hallazgo.
2. Investigar el acceso con credenciales inválidas y verificar la identidad de sesión antes de nuevas operaciones.
3. Obtener una corrida completa del alcance final y conservar HTML o Allure, métricas y omisiones justificadas. No se presenta una suite final en verde.
4. Revisar el resultado de Checks e integrar los cambios de la rama de reportes cuando corresponda; no asumir integración por haber hecho push.
5. Completar archivo por ejecución e historial Allure si se incorporan; actualizar conjuntamente scripts, documentación y artefactos CI.
6. Validar flujos bancarios en otros navegadores solo si forman parte del alcance de entrega; no extrapolar Chromium.
7. Mantener las mejoras POM, los casos manuales CP-01 a CP-15, accesibilidad y candidatos exploratorios como pendientes hasta disponer de evidencia. Jira no se presenta como completado sin tickets.

La equivalencia del flujo bancario con los ejemplos de tienda corresponde a la aceptación del profesor. El proyecto conserva su dominio ParaBank.
