# Transferencias con importes inválidos

## Casos comprobados

TRANSFER-NEG-01 envía importe vacío y TRANSFER-NEG-02 envía `abc`, desde datos ficticios en `test-data/invalid-transfers.json`. Son casos de formato inválido: no cubren saldo insuficiente, importes negativos, cero ni cuentas ajenas.

Se observa el POST real de transferencia, se exige HTTP 400 y un detalle relativo a `amount`, se comprueba ausencia de confirmación exitosa y presencia del panel de error. Luego se comparan saldos del resumen e historiales de ambas cuentas con su estado anterior. El adjunto `rechazo-transferencia` registra la comparación.

Validación en Chromium del sistema contra ParaBank: **2 aprobadas en 10.4 segundos**, un worker, sin reintentos. Los saldos y los historiales consultados permanecieron iguales. Durante la implementación se corrigió la espera que elegía un mensaje vacío oculto en lugar de las filas visibles del historial. Posteriormente se repitieron ambos casos tres veces: **6 aprobadas en 27.1 segundos**, un worker, sin reintentos, con reporte HTML. Todas las ejecuciones rechazaron los importes con HTTP 400 y conservaron saldos e historiales. Pendientes otros navegadores y CI.

## Configuración local

Usar dos cuentas distintas pertenecientes a la cuenta de prueba y mantener el resto de operaciones desactivadas. No ejecutar estos casos mientras otra persona modifica esas mismas cuentas: la comparación necesita datos estables.

```dotenv
RUN_OPEN_ACCOUNT_FLOW=false
RUN_BANK_MUTATIONS=false
RUN_TRANSFER_NEGATIVE=true
PARABANK_FROM_ACCOUNT=cuenta_origen_de_prueba
PARABANK_TO_ACCOUNT=cuenta_destino_de_prueba
```

Los valores de cuenta anteriores son marcadores. Las credenciales van en `.env` y no se publican. Ejecutar:

```bash
npx playwright test tests/transfers/invalid-transfer.spec.js --project=chromium --workers=1 --retries=0 --reporter=list,html
```

Al terminar, reemplazar `RUN_TRANSFER_NEGATIVE=true` por `RUN_TRANSFER_NEGATIVE=false`. No duplicar variables. El grupo se omite por defecto, antes de iniciar sesión. Estos tests sí envían solicitudes inválidas al servidor; no simulan ni interceptan las respuestas.

## Hallazgo de presentación pendiente

El servicio devolvió HTTP 400 con detalles de importe vacío/no convertible. La interfaz mostró “An internal error has occurred and has been logged.”, sin explicar qué campo corregir. La aprobación de las pruebas acredita rechazo y ausencia de movimiento observado, no calidad del mensaje. Evaluar y registrar este hallazgo con criterios de usabilidad y evidencia; no atribuir una causa interna ni confundirlo con una transferencia aceptada.
