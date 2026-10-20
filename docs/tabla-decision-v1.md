# Tabla de decisión v1 — ParaBank

**Regla elegida:** Validación del registro del cliente en `Register` (flujo F01, requisito **R01**, casos CP-01 y CP-02).  
**Fecha:** 19/10/2026 · **Estado de la regla:** Criterio QA propuesto, pendiente de contrastar con los mensajes y campos del sitio.

## 1. Regla de prueba propuesta

El registro se completará únicamente cuando **(C1)** los campos obligatorios estén completos, **(C2)** la contraseña y su confirmación coincidan y **(C3)** el nombre de usuario esté disponible. Si alguna condición no se cumple, el sistema debería impedir el alta y mostrar una indicación correspondiente.

> Atención: esta es una **regla propuesta para diseñar pruebas**, no una especificación publicada de ParaBank. La existencia y el tratamiento de cada condición deben verificarse en la interfaz.

## 2. Tabla completa: todas las combinaciones (2³ = 8)

| Regla | C1 Campos completos | C2 Contraseñas coinciden | C3 Usuario disponible | Resultado esperado según propuesta | ¿Registrar? |
|---|---|---|---|---|---|
| D01 | Sí | Sí | Sí | Registro correcto | Sí |
| D02 | Sí | Sí | No | Rechazar usuario duplicado | No |
| D03 | Sí | No | Sí | Rechazar confirmación diferente | No |
| D04 | Sí | No | No | Rechazar por al menos una validación | No |
| D05 | No | Sí | Sí | Indicar campos requeridos | No |
| D06 | No | Sí | No | Indicar datos inválidos o incompletos | No |
| D07 | No | No | Sí | Indicar datos inválidos o incompletos | No |
| D08 | No | No | No | Indicar datos inválidos o incompletos | No |

## 3. Simplificación por condiciones dominantes

| Regla simplificada | C1 | C2 | C3 | Acción |
|---|---|---|---|---|
| S01 | No | — | — | Rechazar (faltan datos) |
| S02 | Sí | No | — | Rechazar (contraseñas distintas) |
| S03 | Sí | Sí | No | Rechazar (usuario no disponible) |
| S04 | Sí | Sí | Sí | Registrar |

`—` = indiferente; las reglas simplificadas se evalúan en el orden mostrado para no superponerse.

## 4. Casos derivados (mínimo 3)

| ID derivado | Regla | Datos / preparación | Resultado esperado | Relación |
|---|---|---|---|---|
| TD-01 | D01 / S04 | Datos completos, usuario de prueba único, contraseñas iguales. | Alta exitosa | R01, CP-01 |
| TD-02 | D03 / S02 | Datos completos, usuario único, contraseñas diferentes. | Impide alta e informa discrepancia | R01, CP-02 |
| TD-03 | D05 / S01 | Dejar un campo marcado como obligatorio vacío; demás válidos. | Impide alta e indica campo pendiente | R01, **nuevo caso propuesto CP-13**, no registrado aún |
| TD-04 | D02 / S03 | Reutilizar usuario ya creado; datos y contraseñas válidos. | Impide alta por usuario duplicado | R01, **nuevo caso propuesto CP-14**, no registrado aún |

**Para ejecutar:** usar únicamente usuarios y datos ficticios. Anotar si el sistema aplica una validación diferente a la propuesta y actualizar las reglas con base en evidencia.
