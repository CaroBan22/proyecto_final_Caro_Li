# Mapa de flujos críticos — ParaBank

**Curso:** QA Automatizador — Tecsup
**Proyecto:** Sistema de banca virtual ParaBank
**Sistema bajo prueba:** https://parabank.parasoft.com/parabank/
**Versión:** 0.1 — borrador de diseño
**Estado:** Diagrama y peticiones observadas en Chromium; falta contrastarlas en DevTools; envío real de transferencia pendiente.

## 1. Propósito

Este documento representa cómo el navegador y los servicios de ParaBank participan en flujos críticos. Se prioriza **F04 — Transferencia de fondos**, porque modifica saldos y movimientos de cuentas. También se identifican inicio de sesión (F02) y recuperación de acceso (F06).

El diagrama es conceptual: el sitio publica una API REST de banca, pero este documento no afirma detalles internos del servidor o de su base de datos que no estén expuestos públicamente.

## 2. Diagrama cliente-servidor: transferencia

```mermaid
sequenceDiagram
    actor U as Usuario
    participant C as Navegador / interfaz ParaBank
    participant API as Servicio REST ParaBank
    participant DB as Datos de cuentas y movimientos

    U->>C: Abre Transfer Funds e ingresa origen, destino y monto
    C->>C: Revisa datos del formulario
    U->>C: Confirma la transferencia
    C->>API: POST /transfer?fromAccountId=...&toAccountId=...&amount=...
    API->>API: Procesa la solicitud de transferencia
    API->>DB: Consulta/actualiza cuentas y registra el movimiento
    DB-->>API: Devuelve el resultado del procesamiento
    API-->>C: Respuesta HTTP y resultado de transferencia
    C-->>U: Muestra confirmación o mensaje de error
```

**Puntos de control QA:** los valores de origen, destino y monto deben corresponder con lo enviado; el resultado debe ser comprensible; después de confirmar, revisar los saldos y movimientos para comprobar consistencia. Las reglas para monto cero, saldo insuficiente y misma cuenta están pendientes de confirmación con el responsable del sistema.

## 3. Flujos críticos relacionados

| ID | Flujo | Solicitud del usuario | Respuesta que debe observar QA |
|---|---|---|---|
| F02 | Inicio de sesión | Enviar usuario y contraseña desde el formulario | Acceso a la cuenta o rechazo con un mensaje; no registrar contraseña en evidencias |
| F04 | Transferencia | Enviar cuenta de origen, cuenta de destino e importe | Confirmación o rechazo; revisar saldos y movimiento |
| F06 | Recuperación de acceso | Enviar los datos solicitados en *Forgot Login Info* | Mensaje de resultado sin exponer información sensible |

## 4. Endpoints REST documentados

La API pública de ParaBank publica como base `https://parabank.parasoft.com/parabank/services/bank`. También se observaron las peticiones generadas al navegar por la interfaz en Chromium, el 22 de octubre de 2026. Los identificadores variables se reemplazan por marcadores y se omite el identificador de sesión.

| Flujo | Acción | Método | Endpoint observado o documentado | Qué revisar en la respuesta | Estado HTTP visto en Chromium |
|---|---|---|---|---|---|
| F02 | Enviar formulario de inicio de sesión | POST | `/parabank/login.htm` | Redirige a la vista de cuentas tras aceptar la cuenta demo | 302; luego `GET /parabank/overview.htm` → 200 |
| F03 | Consultar cuentas del cliente | GET | `/parabank/services_proxy/bank/customers/{customerId}/accounts` | Lista de cuentas asociadas al cliente | 200 |
| F03 | Abrir actividad de cuenta | GET | `/parabank/activity.htm` | Abre la vista de actividad | 200 |
| F03 | Consultar detalle de cuenta | GET | `/parabank/services_proxy/bank/accounts/{accountId}` | Devuelve datos de la cuenta seleccionada | 200 |
| F03 | Consultar movimientos | GET | `/parabank/services_proxy/bank/accounts/{accountId}/transactions/month/All/type/All` | Devuelve movimientos para los filtros `All` | 200 |
| F04 | Abrir formulario de transferencia | GET | `/parabank/transfer.htm` | Muestra formulario y carga las cuentas disponibles | 200; la carga de cuentas también respondió 200 |
| F04 | Enviar transferencia | POST | `/parabank/services_proxy/bank/transfer` (ruta basada en la operación OpenAPI; envío no observado) | Confirmar resultado y revisar saldos/movimiento | Pendiente: no se envió una transferencia durante esta observación |

**Cómo reproducir la observación:** en ParaBank, abrir DevTools → **Network** → filtro **Fetch/XHR**; iniciar sesión con una cuenta de prueba y abrir Accounts Overview, una cuenta y Transfer Funds. Seleccionar cada petición para contrastar método, ruta y estado. No copiar valores de usuario, contraseña, identificadores de cuenta ni tokens. La tabla anterior se obtuvo observando respuestas de red en Chromium; aún no se capturó la verificación en el panel DevTools. No se envió una transferencia.

La operación de transferencia está declarada como `POST /transfer` en la especificación OpenAPI; su ruta de proxy y estado al enviar desde la interfaz siguen pendientes de observación. Los estados de las otras filas corresponden a respuestas observadas durante la navegación en Chromium; aún conviene contrastarlos en DevTools para la evidencia de clase.

## 5. Plantilla de caso de prueba

```text
clase CasoDePrueba
  atributos:
    id, titulo, flujo, objetivo, prioridad,
    precondiciones, datos, pasos,
    resultadoEsperado, resultadoObtenido,
    estado, evidencia, fecha, navegador

  métodos:
    ejecutar()
    registrarResultado(resultado, evidencia, fecha, navegador)

objeto CP-06: CasoDePrueba
  titulo = "Transferir un monto positivo entre cuentas distintas"
  flujo = "F04 — Transferencia de fondos"
  prioridad = "Alta"
  precondiciones = ["Sesión iniciada", "Dos cuentas de prueba disponibles",
                    "Saldo inicial de origen anotado"]
  datos = { origen: "cuenta A", destino: "cuenta B", monto: "S/ 1.00" }
  pasos = ["Abrir Transfer Funds", "Elegir origen y destino",
           "Ingresar monto", "Confirmar", "Revisar saldos y movimientos"]
  resultadoEsperado = "El sistema informa el resultado y los saldos/movimientos
                       corresponden con la regla de negocio confirmada."
  resultadoObtenido = "Pendiente de ejecutar y registrar"
  estado = "Pendiente"
  evidencia = "Pendiente"
```

## 6. Notas exploratorias disponibles

La imagen de notas exploratorias compartida para el proyecto indica una sesión de 20 minutos enfocada en transferencias y recuperación de acceso. Registra como hallazgos preliminares: transferencia de S/ 0.00 entre cuentas distintas, transferencia de S/ 0.00 a la misma cuenta, importe superior al saldo observado, transferencia positiva a la misma cuenta y dificultad para recuperar la cuenta. Estas notas se conservan como observaciones aportadas; **no se reproducen ni se clasifican aquí como defectos confirmados**. Deben contrastarse con las reglas de negocio y vincularse con evidencia.

## 7. Referencias y pendientes

- Sesión 4, *Cliente-servidor, HTTP, APIs y POO aplicada a testing*: laboratorio de mapa de flujos, tabla de endpoints y plantilla de caso.
- [Servicios públicos de ParaBank](https://parabank.parasoft.com/parabank/services.htm): publica el endpoint REST y enlaza su documentación.
- [Especificación OpenAPI REST de ParaBank](https://parabank.parasoft.com/parabank/services/bank/openapi.json): métodos, rutas y esquemas de respuesta.
- `docs/casos-manuales-v1.md`: definición de los flujos F01–F06 y casos de prueba manuales.
- `docs/plan-de-pruebas-v1.md`: alcance, estrategia, criterios, entorno y riesgos.

**Pendiente para completar la evidencia de la sesión:** guardar una captura de DevTools con al menos cinco peticiones reales y completar método, endpoint y estado HTTP. No asumir que cada operación documentada en OpenAPI es llamada por la interfaz de la misma forma.
