# Borrador de reglas de negocio verificables — ParaBank

**Estado:** borrador para revisión. No equivale a una especificación oficial ni a resultados de pruebas ejecutadas.
**Sistema:** ParaBank de demostración.
**Alcance:** comportamiento que puede observarse desde los formularios y flujos disponibles en la interfaz.

## Criterio para este borrador

Se incluyen reglas cuya respuesta se puede observar en ParaBank: campos, mensajes, navegación, cuentas, saldos y resultado de acciones. Cuando ParaBank no publica el límite o la política, se registra como **por determinar** y se explora el comportamiento; no se inventa un valor esperado ni se declara defecto sin confirmar el criterio.

La interfaz de registro solicita nombre, apellido, dirección, ciudad, estado, código postal, teléfono, SSN, nombre de usuario, contraseña y confirmación. No presenta un campo identificado como DNI peruano ni evidencia de consulta a RENIEC. Customer ID, Account ID y Transaction ID son identificadores mostrados/administrados por el sistema, no campos que el usuario defina en los flujos revisados.

## Reglas propuestas que se pueden comprobar

| ID | Área | Regla / pregunta verificable | Comprobación observable | Criterio actual |
|---|---|---|---|---|
| RB-01 | Registro | El formulario presenta los campos de registro disponibles y permite intentar el envío. | Revisar controles visibles y enviar datos ficticios. | Verificable en la interfaz; obligatoriedad campo por campo queda por comprobar. |
| RB-01a | Registro / SSN | Con los demás campos completos, el formulario permitió registrarse al ingresar un solo carácter en SSN: una letra o un dígito. | Repetir con datos ficticios controlados; conservar el mensaje/resultado y evidencia, sin publicar datos personales. | **Observación reportada por la estudiante**; falta adjuntar evidencia y repetir para confirmar. No se ha probado que acepte símbolos, vacío u otras longitudes. |
| RB-02 | Registro | Un nombre de usuario nuevo puede completar el registro cuando los demás datos requeridos son aceptados. | Registrar usuario ficticio único y guardar mensaje/navegación. | Propuesto; resultado pendiente de ejecución. |
| RB-03 | Registro | Un nombre de usuario ya registrado no debe crear una segunda cuenta con el mismo usuario. | Intentar un segundo registro con el mismo username y otros datos ficticios; observar rechazo/mensaje. | Propuesto; el resultado concreto de ParaBank se debe observar. |
| RB-04 | Registro | Si contraseña y confirmación difieren, observar si el sistema rechaza el registro y qué mensaje presenta. | Enviar el formulario con valores distintos. | Criterio esperado ya propuesto en la tabla de decisión; política real pendiente de validar. |
| RB-05 | Login | Con credenciales inválidas no se debe acceder a la sesión del cliente. | Probar usuario inexistente o contraseña incorrecta y comprobar que no aparece el área autenticada. | Regla funcional propuesta; mensaje exacto se registra literalmente. |
| RB-06 | Login | Tras varios intentos fallidos, observar si ParaBank limita, bloquea o sigue permitiendo intentos. | Hacer intentos controlados con cuenta ficticia y registrar cantidad, respuesta y recuperación. | Política y umbral desconocidos; no asumir límite de intentos. Evitar pruebas que puedan afectar cuentas ajenas. |
| RB-07 | Cuenta | Después de iniciar sesión, el usuario puede consultar las cuentas asociadas y los saldos que muestra el sistema. | Abrir Accounts Overview y registrar cuentas/saldos de prueba sin exponer datos sensibles. | Comprobable en la interfaz; coherencia del saldo se contrasta con operaciones realizadas. |
| RB-08 | Transferencia | El formulario permite seleccionar cuenta de origen, cuenta destino e ingresar un monto. | Revisar controles y opciones cargadas. | Comprobable en la interfaz. |
| RB-09 | Transferencia | Para monto cero, monto negativo, monto superior al saldo y origen igual a destino, registrar si acepta/rechaza, mensaje, movimiento y saldos antes/después. | Ejecutar cada escenario solo con cuentas ficticias controladas. | Política de negocio no confirmada. Los apuntes exploratorios son candidatos a reproducir, no defectos confirmados. |
| RB-10 | Identificadores | Registrar el formato y valor de Customer ID, Account ID y Transaction ID cuando la interfaz los muestre. | Capturar evidencia con datos sensibles ocultos y observar si los IDs persisten al recargar/consultar. | No establecer longitud, alfabeto, secuencia ni aleatoriedad sin evidencia o especificación. |
| RB-11 | Transacciones | Observar si cada operación completada muestra una referencia/ID y si aparece en el historial correspondiente. | Ejecutar operaciones ficticias y comparar referencias entre movimientos observados. | Unicidad global, generación aleatoria y patrón de dígitos no están documentados; no se pueden afirmar todavía. |
| RB-12 | Recuperación | Con datos ficticios que correspondan a una cuenta de prueba, observar el resultado de Forgot Login Info. | Enviar formulario y registrar respuesta sin mostrar información personal. | Mensaje y recuperación efectiva pendientes de reproducir; evitar inferir la existencia de una cuenta a partir de mensajes sensibles. |

## Reglas fuera de alcance en ParaBank

- **DNI peruano de 8 dígitos y validación RENIEC:** no hay campo DNI ni integración RENIEC visible en la aplicación. El formulario etiqueta el campo como SSN. La observación RB-01a sobre aceptar una letra o un dígito no demuestra validación de identidad ni que el campo represente un DNI. Se puede probar un valor ficticio de 8 dígitos en SSN, registrando el resultado como comportamiento del formulario, no como verificación RENIEC.
- **Customer ID de cinco letras y cuatro dígitos, Account ID de 18 dígitos, Transaction ID aleatorio ascendente:** son propuestas hipotéticas del diseño conversado, pero no se usarán como criterios de aceptación de ParaBank sin documentación que las respalde.
- **Un solo inicio de sesión por DNI:** el inicio de sesión observado usa username y contraseña; tampoco existe DNI disponible para asociar esa regla.

## Datos y seguridad de las pruebas

- Usar exclusivamente cuentas y datos ficticios autorizados para el entorno de demostración.
- No incluir contraseñas, SSN, tokens ni identificadores completos de cuentas en capturas o reportes compartidos.
- Para cada prueba de transferencia, anotar de forma segura los valores iniciales y finales necesarios para comprobar el efecto.
- No ejecutar repetidamente intentos de acceso o transferencias sobre cuentas que no sean de prueba.

## Relación con los entregables

- La matriz de registro vigente está en `tabla-decision-v1.md`; sus criterios se consideran propuestas hasta confirmarlos en la interfaz.
- Los pasos detallados de ejecución están en `casos-manuales-v1.md`.
- Observaciones exploratorias que requieren reproducción están en `sesion-exploratoria-1.md` y `reporte-defectos-v1.md`.
- Un resultado solo se marca como ejecutado cuando exista evidencia real de la sesión de prueba.
