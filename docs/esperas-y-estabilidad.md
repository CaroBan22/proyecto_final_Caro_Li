# Esperas y estabilidad

Referencia de clase: rama `rama-flaky-test` del repositorio del profesor.
Adaptación a ParaBank: consultas de cuentas y detalles; no se crean cuentas ni se transfiere saldo.

## Suite de consultas

`tests/accounts/account-waits.spec.js` contiene tres casos: lista cargada con `expect.poll`, datos coherentes con `toPass` y navegación con `waitForURL` más comprobación del contenido. Requieren credenciales válidas y al menos una cuenta existente.

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

Pendientes: ejecutar y documentar las consultas contra ParaBank; inspeccionar las peticiones reales antes de añadir un caso con `waitForResponse`. No se inventa el endpoint del servicio de cuentas.

## Validación de este cambio

- Playwright descubre los tres casos nuevos en los tres navegadores (9 combinaciones).
- Los tres casos nuevos pasaron contra ParaBank en Chromium del sistema: `3 passed (7.7s)`, un worker, sin reintentos y sin movimientos de saldo.
- La variante local con espera condicional pasó tres repeticiones: `3 passed (5.9s)`.
- Sigue pendiente repetir tres veces las consultas bancarias y probarlas en Firefox y WebKit. La demo con espera fija es intencionalmente inestable y no se presenta como suite aprobada.
