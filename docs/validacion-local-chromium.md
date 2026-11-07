# # Validación local en Chromium

Rama: feat/adaptacion-estructura-profesor

Ejecución por bloques con un worker y sin reintentos.

| Bloque | Aprobadas | Omitidas |
|---|---:|---:|
| Autenticación | 7 | 0 |
| Cuentas y detalles | 2 | 0 |
| Campos obligatorios de registro | 1 | 0 |
| Transferencias | 1 | 1 |
| Formulario de acceso y registro | 3 | 0 |
| Total | 14 | 1 |

CP-06 se omitió porque requiere activar las transferencias y configurar
dos cuentas de prueba distintas. No se realizó movimiento de saldo.

Durante la revisión, CUENTAS-02 falló inicialmente y después pasó
aislada y junto con CP-05. La causa inicial no quedó confirmada.

Pendiente: validar esta rama en GitHub Actions, Firefox y WebKit.