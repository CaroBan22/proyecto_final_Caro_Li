# Validaciones intermedias

## Registro: comprobado

Dos casos generados desde `test-data/register-controls.json`:

- REG-CTRL-01: formulario vacío muestra error de nombre; completar solo el nombre y reenviar elimina ese error, pero conserva el error de apellido.
- REG-CTRL-02: formulario vacío muestra error de usuario; completar solo el usuario y reenviar elimina ese error, pero conserva el error de apellido.

Se comprueba además el valor conservado y la ausencia del enlace de logout. El apellido y otros campos obligatorios permanecen vacíos en todos los envíos; no se completa el alta de un cliente.

Validación contra ParaBank en Chromium del sistema: **6 aprobadas en 12.7 s**, dos casos por tres repeticiones, un worker y sin reintentos. Pendientes Firefox, WebKit y CI.

```bash
npx playwright test tests/registration/register-controls.spec.js --project=chromium --workers=1 --retries=0 --repeat-each=3 --reporter=list,html
```

## Transferencias: pendiente

En el reconocimiento del formulario autenticado se observó que el botón no está deshabilitado con el importe vacío. El manejador JavaScript prepara directamente un POST al servicio de transferencia. No se envió esa operación durante esta inspección.

Esto impide copiar literalmente los controles disabled/enabled de checkout de Toolshop: ParaBank puede validar en el servidor. No se confirma un defecto ni una aceptación de importes inválidos con esta evidencia. Para completar los controles transaccionales falta contrastar las reglas esperadas y probar respuestas de rechazo con cuentas dedicadas, conservando saldos e historial como evidencia.

Los controles de registro no reemplazan las validaciones intermedias de transferencias. La aprobación anterior de BANK-E2E acredita su camino exitoso, no todas sus reglas negativas.
