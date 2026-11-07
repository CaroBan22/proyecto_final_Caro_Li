# Adaptación del ejemplo del profesor a ParaBank

Referencia: https://github.com/hamet04/proyecto_final_Hamet_Calderon

| Patrón del ejemplo | Equivalente ParaBank |
|---|---|
| LoginPage y credentials | LoginPage y credentials con variables PARABANK_* |
| loggedInPage | Sesión de banca validada con Accounts Overview |
| HomePage / ProductPage / CartPage | AccountsPage / AccountDetailsPage |
| Checkout por etapas / BillingPage / PaymentPage | TransferPage: selección de cuentas, importe y confirmación |
| shopStorageState | bankStorageState en memoria, por worker y navegador |
| Datos JSON | data-login.json y register-data.json |
| Fixtures centrales | tests/fixtures.js; auth/fixture.js reexporta por compatibilidad |

Los módulos de tienda se adaptan al dominio bancario; no se agregan productos ni carritos a ParaBank.
La cookie de sesión de ParaBank puede caducar: el estado guardado no garantiza persistencia entre ejecuciones.

## Ejecución

- `npx playwright test --list`: comprobar descubrimiento.
- `npx playwright test tests/auth tests/registration --project=chromium --workers=1`: casos de acceso y registro sin altas.
- `npx playwright test tests/accounts tests/transfers --project=chromium --workers=1`: requiere credenciales válidas.
- La transferencia real requiere `RUN_BANK_MUTATIONS=true` y dos cuentas dedicadas distintas con saldo suficiente. Ejecutarla solo en un navegador y una versión de Node; no reintentar sin revisar movimientos. La comprobación actual valida la confirmación; la conciliación de saldos e historial queda pendiente.

## Fallos externos conocidos

El CI observado redirigió credenciales inválidas a overview.htm. Se mantienen las aserciones negativas; no se marca el fallo como esperado ni se desactiva para obtener verde.
Los secretos de GitHub no se transfieren al entorno local de desarrollo. No incluir .env ni estados de sesión en commits.

## Límites de esta adaptación

No acredita CP manuales ejecutados ni defectos funcionales confirmados. El alta positiva, recuperación y actualización de contacto requieren ampliar datos y evidencia según los casos del proyecto.

## Validación de esta entrega

Playwright descubrió 45 combinaciones (15 casos por navegador). Se ejecutaron 4 casos en Chromium del sistema contra ParaBank: los tres de campos vacíos y el registro vacío; los cuatro aprobaron. Después de configurar la cuenta de prueba, aprobaron en Chromium los dos casos de cuentas: consulta y detalles, y reutilización de sesión guardada (2 aprobados). La transferencia real sigue sin ejecutarse. Se habilita CI para PR dirigidos a refactor-pom para verificar la adaptación en los tres navegadores.

## Ajuste por bloqueo del sitio público

Los reportes del CI 42328302101 contienen la página de Cloudflare Error 1015, “You are being rate limited”. Es un bloqueo temporal del entorno externo; no demuestra un defecto en los localizadores ni en las credenciales. No se reejecuta inmediatamente.

El CI utiliza una sola versión de Node (22), un worker, sin reintentos y se detiene tras el primer fallo. La concurrencia del workflow se serializa para reducir ejecuciones simultáneas. Se mantienen los tres navegadores y las comprobaciones funcionales. Esto reduce carga pero no garantiza que desaparezca el límite externo.

La transferencia opcional se omite al declarar su grupo, antes de preparar fixtures o iniciar sesión. La prueba de sesión guardada utiliza un contexto explícito con cierre garantizado; los casos anónimos no reciben ese estado.

Validación de estos cambios: descubrimiento de pruebas y omisión del caso CP-06 sin credenciales; no se repite una ejecución contra el sitio durante el bloqueo temporal.
