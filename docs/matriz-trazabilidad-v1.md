# Matriz de trazabilidad v1 — ParaBank

**Curso:** QA Automatizador — Tecsup  
**Proyecto:** ParaBank · https://parabank.parasoft.com/parabank/  
**Fecha:** 19/10/2026 · **Estado:** Borrador de laboratorio; ejecución por verificar  
**Fuente:** `docs/casos-manuales-v1.md` (F01–F06, CP-01–CP-12).

## 1. Requisitos → casos → defectos

Los requisitos R01–R07 son **criterios funcionales propuestos/inferidos de la interfaz**, no documentación oficial del banco. Los estados describen las pruebas **documentadas**, no la disponibilidad real del sitio.

| ID | Requisito o criterio que se validará | Flujo | Casos de prueba | Estado | Defectos vinculados | Observación / hueco |
|---|---|---|---|---|---|---|
| R01 | Permitir registrar un cliente con datos completos y confirmación coincidente; rechazar confirmación diferente (criterio de validación propuesto). | F01 | CP-01, CP-02 | Por ejecutar | DEF-01 (candidato; por confirmar) | Verificar campos obligatorios y mensaje real. |
| R02 | Permitir acceso con credenciales válidas e impedirlo con contraseña incorrecta. | F02 | CP-03, CP-04 | Por ejecutar | — | Se necesita usuario de prueba. |
| R03 | Mostrar cuentas y saldos asociados al usuario autenticado. | F03 | CP-05 | Por ejecutar | — | Agregar caso de acceso no autorizado si el alcance lo permite. |
| R04 | Transferir monto positivo entre dos cuentas disponibles, actualizando los saldos correctamente. | F04 | CP-06 | Por ejecutar | DEF-02 (candidato; por confirmar) | Validar saldo antes y después y duplicados. |
| R05 | Aplicar una política definida a montos cero, montos superiores al saldo y transferencias a la misma cuenta. | F04 | CP-07, CP-08, CP-09 | Regla por confirmar y casos por ejecutar | DEF-03, DEF-04 (candidatos) | **Hueco de especificación:** confirmar si se admiten sobregiros y transferencias propias. |
| R06 | Guardar cambios de datos de contacto y conservarlos al volver a consultar el perfil. | F05 | CP-10 | Por ejecutar | — | Falta caso negativo de campo obligatorio. |
| R07 | Recuperar datos de acceso con información coincidente y dar respuesta comprensible ante campos vacíos. | F06 | CP-11, CP-12 | Por ejecutar | DEF-05 (candidato; por confirmar) | Validación de mensaje/criterio por observar. |

**Cobertura de diseño:** 7/7 requisitos con al menos 1 caso asociado (100% de presencia), **no equivale a cobertura ejecutada ni aprobada**. Total: 12 casos planificados, 0 resultados reales acreditados en los materiales disponibles. 5 registros de defecto **candidatos**, 0 confirmados con evidencia.

## 2. Huecos de cobertura y acciones

1. **R03:** solo caso positivo de consulta; agregar un caso de sesión cerrada/acceso restringido.
2. **R05:** reglas de sobregiro, monto cero y misma cuenta no confirmadas; consultar comportamiento esperado antes de calificar FAIL.
3. **R06:** falta prueba negativa de actualización con campo obligatorio vacío.
4. **Todos:** faltan capturas, fecha, navegador y estado PASS/FAIL/BLOCKED de cada ejecución.

## 3. Actualización tras ejecutar

Para cada caso, sustituir `Por ejecutar` por `Aprobado`, `Fallido`, `Bloqueado` o `Parcial`, y enlazar únicamente los DEF confirmados. Si no se reproduce un candidato, conservarlo como `No confirmado` y **no** contabilizarlo como defecto.
