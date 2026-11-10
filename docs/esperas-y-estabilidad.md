# Esperas y estabilidad

Referencia de clase: rama `rama-flaky-test` del repositorio del profesor.
Adaptación a ParaBank: consultas de cuentas y detalles; no se crean cuentas ni se transfiere saldo.

## Suite de consultas

`tests/accounts/account-waits.spec.js` incluye casos de lista cargada con `expect.poll`, datos coherentes con `toPass` y navegación con `waitForURL` más comprobación del contenido. Requieren credenciales válidas y al menos una cuenta existente.

Con `RUN_OPEN_ACCOUNT_FLOW=false` y `RUN_BANK_MUTATIONS=false`:

```bash
npx playwright test tests/accounts/account-waits.spec.js --project=chromium --workers=1 --retries=0 --repeat-each=3 --reporter=list,html
```

Una cuenta vacía o un servicio externo con error no demuestra por sí solo una condición de carrera. Leer el error y la evidencia antes de clasificarlo como flaky.

## Demostración aislada

`demos/flaky-demo.spec.js` simula una carga de datos local con demora variable. La pausa de 550 ms puede fallar; la aserción condicional espera el estado. No es parte de la suite habitual porque vive fuera de `tests/`.

```bash
npx playwright test --config=demos/playwright.config.js --repeat-each=10
```

El resultado de la demo con pausa fija varía; que pase una ejecución no prueba estabilidad. No añadirla al CI bancario. No se requiere que ParaBank tenga un catálogo ni que rechace las mismas entradas que Toolshop.

El trace de la suite se conserva al fallar incluso sin reintentos. Puede contener información de sesión: revisarlo antes de compartir y no subirlo al código del repositorio.

CP-ESPERA-04 observa la petición GET real `/parabank/services_proxy/bank/customers/{id}/accounts`, sin fijar el ID del cliente. Registra `waitForResponse` antes de navegar y, tras la respuesta, comprueba estado 200, lista no vacía y coincidencia de los identificadores de cuenta con la tabla visible. Primero termina la carga del login para no capturar una respuesta de la navegación anterior.

## Validación de este cambio

- Playwright descubre los tres casos originales en los tres navegadores (9 combinaciones).
- Los tres casos nuevos pasaron contra ParaBank en Chromium del sistema: `3 passed (7.7s)`, un worker, sin reintentos y sin movimientos de saldo.
- La variante local con espera condicional pasó tres repeticiones: `3 passed (5.9s)`.
- La autora ejecutó los tres casos originales tres veces en Chromium: 9 aprobados en 42.7 s, sin reintentos. Sigue pendiente probarlos en Firefox y WebKit. La demo con espera fija es intencionalmente inestable y no se presenta como suite aprobada.

- CP-ESPERA-04 pasó tres repeticiones en Chromium del sistema contra ParaBank, sin reintentos. El fallo inicial de implementación capturó una respuesta de la navegación anterior; se corrigió esperando el fin de carga del login antes de registrar la nueva espera.
- El bloque ahora contiene cuatro casos: `--repeat-each=3` debe descubrir 12 ejecuciones por navegador; no confundir las nueve aprobaciones anteriores con la validación conjunta de los cuatro.
