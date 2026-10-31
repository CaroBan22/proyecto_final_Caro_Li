# Reglas de negocio del proyecto — ParaBank v1

**Estado:** reglas vigentes del proyecto. Su cumplimiento en ParaBank debe comprobarse mediante pruebas; este documento no afirma resultados que todavía no se hayan ejecutado.
**Sistema:** ParaBank de demostración.
**Alcance:** comportamiento que puede observarse desde los formularios y flujos disponibles en la interfaz.

## Alcance y autoridad de estas reglas

Estas reglas definen los criterios de aceptación acordados para el proyecto QA. Son requisitos del proyecto y no una especificación oficial de ParaBank. Las pruebas comparan el comportamiento observado del sitio con estas reglas; cualquier diferencia se documenta con evidencia antes de clasificarla como defecto.

La interfaz de registro solicita nombre, apellido, dirección, ciudad, estado, código postal, teléfono, SSN, nombre de usuario, contraseña y confirmación. No presenta un campo identificado como DNI peruano ni evidencia de consulta a RENIEC. Customer ID, Account ID y Transaction ID son identificadores mostrados/administrados por el sistema, no campos que el usuario defina en los flujos revisados.

## Reglas vigentes y puntos de validación

| ID | Área | Regla / pregunta verificable | Comprobación observable | Criterio actual |
|---|---|---|---|---|
| RB-01 | Registro | El formulario presenta los campos de registro disponibles y permite intentar el envío. | Revisar controles visibles y enviar datos ficticios. | Verificable en la interfaz; obligatoriedad campo por campo queda por comprobar. |
| RB-01a | Registro / SSN | Con los demás campos completos, el formulario permitió registrarse al ingresar un solo carácter en SSN: una letra o un dígito. | Repetir con datos ficticios controlados; conservar el mensaje/resultado y evidencia, sin publicar datos personales. | **Observación reportada por la estudiante**; falta adjuntar evidencia y repetir para confirmar. No se ha probado que acepte símbolos, vacío u otras longitudes. |
| RB-02 | Registro | Un usuario nuevo puede completar el registro con los datos que el formulario requiere. | Registrar usuario ficticio único y guardar mensaje/navegación. | **Regla del proyecto;** ejecución pendiente. |
| RB-03 | Registro | Un nombre de usuario ya registrado no puede crear una segunda cuenta con el mismo usuario. | Intentar un segundo registro con el mismo username y otros datos ficticios; observar rechazo/mensaje. | **Regla del proyecto;** ejecución pendiente. |
| RB-04 | Registro | La contraseña y su confirmación deben coincidir para completar el registro. | Enviar el formulario con valores distintos y registrar el mensaje. | **Regla del proyecto;** ejecución pendiente. |
| RB-05 | Login | Las credenciales inválidas no deben permitir acceder a la sesión del cliente. | Probar usuario inexistente o contraseña incorrecta y comprobar que no aparece el área autenticada. | **Regla del proyecto;** registrar literalmente el mensaje observado. |
| RB-06 | Login | Tras varios intentos fallidos, observar si ParaBank limita, bloquea o sigue permitiendo intentos. | Hacer intentos controlados con cuenta ficticia y registrar cantidad, respuesta y recuperación. | Política y umbral desconocidos; no asumir límite de intentos. Evitar pruebas que puedan afectar cuentas ajenas. |
| RB-07 | Cuenta | Después de iniciar sesión, el usuario puede consultar las cuentas asociadas y los saldos que muestra el sistema. | Abrir Accounts Overview y registrar cuentas/saldos de prueba sin exponer datos sensibles. | Comprobable en la interfaz; coherencia del saldo se contrasta con operaciones realizadas. |
| RB-08 | Transferencia | El formulario permite seleccionar cuenta de origen, cuenta destino e ingresar un monto. | Revisar controles y opciones cargadas. | Comprobable en la interfaz. |
| RB-09 | Transferencia | El importe transferido debe ser mayor que cero; la operación no puede dejar ningún saldo por debajo de cero ni transferir más que el saldo disponible. | Probar límites con cuentas ficticias; comprobar rechazo, mensaje, historial y saldos antes/después. | **Regla vigente del proyecto.** Cumplimiento en ParaBank pendiente de ejecución y evidencia. |
| RB-10 | Identificadores | Registrar el formato y valor de Customer ID, Account ID y Transaction ID cuando la interfaz los muestre. | Capturar evidencia con datos sensibles ocultos y observar si los IDs persisten al recargar/consultar. | No establecer longitud, alfabeto, secuencia ni aleatoriedad sin evidencia o especificación. |
| RB-11 | Transacciones | Observar si cada operación completada muestra una referencia/ID y si aparece en el historial correspondiente. | Ejecutar operaciones ficticias y comparar referencias entre movimientos observados. | Unicidad global, generación aleatoria y patrón de dígitos no están documentados; no se pueden afirmar todavía. |
| RB-12 | Recuperación | Con datos ficticios que correspondan a una cuenta de prueba, observar el resultado de Forgot Login Info. | Enviar formulario y registrar respuesta sin mostrar información personal. | Mensaje y recuperación efectiva pendientes de reproducir; evitar inferir la existencia de una cuenta a partir de mensajes sensibles. |

## Decisiones de alcance del proyecto

- **DNI peruano de 8 dígitos y validación RENIEC:** no hay campo DNI ni integración RENIEC visible en la aplicación. El formulario etiqueta el campo como SSN. La observación RB-01a sobre aceptar una letra o un dígito no demuestra validación de identidad ni que el campo represente un DNI. Se puede probar un valor ficticio de 8 dígitos en SSN, registrando el resultado como comportamiento del formulario, no como verificación RENIEC.
- **Customer ID de cinco letras y cuatro dígitos, Account ID de 18 dígitos, Transaction ID aleatorio ascendente:** no son reglas del proyecto para ParaBank, porque no hay especificación o evidencia que justifique esos formatos.
- **Un solo inicio de sesión por DNI:** el inicio de sesión observado usa username y contraseña; tampoco existe DNI disponible para asociar esa regla.

## Datos y seguridad de las pruebas

- Usar exclusivamente cuentas y datos ficticios autorizados para el entorno de demostración.
- No incluir contraseñas, SSN, tokens ni identificadores completos de cuentas en capturas o reportes compartidos.
- Para cada prueba de transferencia, anotar de forma segura los valores iniciales y finales necesarios para comprobar el efecto.
- No ejecutar repetidamente intentos de acceso o transferencias sobre cuentas que no sean de prueba.

## Relación con los entregables

- La matriz de registro está en `tabla-decision-v1.md`; sus resultados esperados son criterios del proyecto y deben contrastarse con la interfaz.
- Los pasos detallados de ejecución están en `casos-manuales-v1.md`.
- Observaciones exploratorias que requieren reproducción están en `sesion-exploratoria-1.md` y `reporte-defectos-v1.md`.
- Un resultado solo se marca como ejecutado cuando exista evidencia real de la sesión de prueba.
