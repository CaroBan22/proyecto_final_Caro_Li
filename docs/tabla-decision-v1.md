# Tabla de decisión v1 — ParaBank

**Regla elegida:** validación propuesta para el registro de clientes (`Register`), flujo F01 / R01.
**Actualizada:** 22/10/2026 · **Estado:** reglas de prueba definidas; comportamiento esperado pendiente de validación contra la interfaz.

## 1. Condiciones de la regla

Para que las condiciones sean independientes, se separan los datos personales de los datos de acceso:

| Condición | Sí | No |
|---|---|---|
| **C1 — Datos personales completos** | Están ingresados los campos personales del formulario: nombre, apellido, dirección, ciudad, estado, código postal, teléfono y SSN. | Falta uno o más de esos campos. |
| **C2 — Contraseña confirmada** | Contraseña y confirmación están ingresadas y coinciden. | Falta una de las dos o los valores son distintos. Para las combinaciones de esta tabla que representan discrepancia, ingresar ambos valores y hacerlos diferentes. |
| **C3 — Usuario disponible** | El nombre de usuario está ingresado y no se ha usado antes. | El campo está vacío o el nombre ya está registrado. Para las combinaciones de esta tabla que representan duplicado, ingresar un usuario existente. |

El formulario público muestra estos campos, pero no publica junto a ellos una especificación de validación. Por eso, C1–C3 y los resultados de abajo son **criterios de prueba propuestos**, no reglas confirmadas del producto. La OpenAPI pública no documenta una operación de registro. Fuentes: [formulario de registro ParaBank](https://parabank.parasoft.com/parabank/register.htm) y [OpenAPI ParaBank](https://parabank.parasoft.com/parabank/services/bank/openapi.json).

## 2. Tabla completa — 2³ = 8 combinaciones

En cada combinación negativa, se propone que el sistema no cree la cuenta y muestre todos los mensajes aplicables en el mismo envío. Si la interfaz solo muestra un error por envío, se registra el orden observado y se reintenta después de corregirlo; no se cuenta como defecto hasta confirmar el criterio con el responsable.

| Regla | C1 datos personales | C2 contraseñas | C3 usuario | Resultado esperado propuesto | ¿Registrar? |
|---|---|---|---|---|---|
| D01 | Sí | Sí | Sí | Crear la cuenta y confirmar el registro. | Sí |
| D02 | Sí | Sí | No | No crearla; indicar que el usuario no está disponible. | No |
| D03 | Sí | No | Sí | No crearla; indicar que contraseña y confirmación no coinciden o que falta una. | No |
| D04 | Sí | No | No | No crearla; indicar ambos errores: contraseña/confirmación y usuario no disponible. | No |
| D05 | No | Sí | Sí | No crearla; identificar el/los campo(s) personal(es) faltante(s). | No |
| D06 | No | Sí | No | No crearla; identificar los campos personales faltantes y el usuario no disponible. | No |
| D07 | No | No | Sí | No crearla; identificar los campos personales faltantes y el problema de contraseña. | No |
| D08 | No | No | No | No crearla; identificar los campos personales faltantes, el problema de contraseña y el usuario no disponible. | No |

Para que las ocho filas sean reproducibles, cuando **C1 = No** dejar vacío un campo personal como City y completar Username, Password y Confirm. Así C2 y C3 se pueden evaluar por separado. En D04 usar datos personales completos, un usuario duplicado y dos contraseñas distintas.

## 3. Simplificación por condiciones dominantes

Las reglas se leen de arriba hacia abajo y no se superponen. La prioridad define el orden para organizar la tabla, no que el sistema deba ocultar otros errores.

| Regla simplificada | C1 | C2 | C3 | Acción y mensaje esperado |
|---|---|---|---|---|
| S01 | No | — | — | Rechazar. Informar todos los errores aplicables: campos personales faltantes y, si corresponden, contraseña y/o usuario. |
| S02 | Sí | No | — | Rechazar. Informar el problema de contraseña y, si C3 = No, también el usuario no disponible. |
| S03 | Sí | Sí | No | Rechazar e informar que el usuario no está disponible. |
| S04 | Sí | Sí | Sí | Registrar y confirmar el alta. |

`—` significa que cualquiera de los dos valores aplica. Las filas S01 y S02 exigen que se reporten varios errores cuando las condiciones aplicables fallan a la vez; esa expectativa se valida con D04 y CP-15. Si el producto presenta los errores por pasos, registrar cada respuesta y solicitar confirmación del criterio antes de clasificarlo como defecto.

## 4. Casos derivados

| ID derivado | Regla | Datos / preparación | Resultado esperado | Caso vinculado |
|---|---|---|---|---|
| TD-01 | D01 / S04 | Datos personales completos, usuario único y contraseñas iguales. | Registro correcto. | R01, CP-01 |
| TD-02 | D03 / S02 | Datos personales completos, usuario único y contraseñas distintas. | Rechazo y mensaje de contraseña. | R01, CP-02 |
| TD-03 | D05 / S01 | Dejar vacío City; completar credenciales válidas y usuario único. | Rechazo e identificación del campo personal faltante. | R01, CP-13 |
| TD-04 | D02 / S03 | Datos personales completos, contraseñas iguales y usuario ya registrado. | Rechazo e indicación de usuario no disponible. | R01, CP-14 |
| TD-05 | D04 / S02 | Datos personales completos, contraseña distinta de confirmación y usuario ya registrado. | Rechazo con ambos mensajes en la misma respuesta, o registrar el comportamiento escalonado para contrastar el criterio. | R01, CP-15 |

## 5. Criterio de evaluación

- **Aprobado:** coincide con el criterio propuesto, incluida la identificación de cada error aplicable.
- **Fallido:** contradice una regla esperada que el responsable del curso/producto haya confirmado.
- **Pendiente de criterio:** la interfaz se comporta de otra manera y no existe una regla confirmada. Registrar evidencia sin abrir un defecto todavía.

Usar solo datos ficticios. No guardar credenciales reales en la tabla ni en capturas.
