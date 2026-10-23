# Sesión exploratoria 1 — ParaBank

**Charter:** Explorar transferencias y recuperación de acceso para identificar errores de validación.
**Inicio indicado en las notas:** 9:30 p. m.
**Fin indicado en las notas:** 9:50 p. m.
**Duración indicada:** 20 minutos.
**Fecha:** no aparece en la imagen de notas compartida.
**Fuente de esta transcripción:** imagen «Notas exploratorias de ParaBank» proporcionada por la autora.
**Estado:** transcripción de notas; los hallazgos D requieren reproducción y evidencia antes de confirmarlos.

## Notas

| Marca | Nota transcrita | Estado de seguimiento |
|---|---|---|
| O | Transferencia de S/ 1.00 confirmada. | Observación reportada en la imagen; faltan cuenta, fecha y evidencia reproducible. |
| D-01 | Permite transferir S/ 0.00 entre cuentas diferentes. | Candidato a defecto; reproducir desde cero y guardar evidencia. |
| D-02 | Permite transferir S/ 0.00 hacia la misma cuenta. | Candidato a defecto; verificar primero qué cuentas se seleccionaron y la regla esperada. |
| D-03 | Permite transferir montos superiores al saldo disponible. | Candidato a defecto; registrar saldo inicial/final y confirmar política de sobregiro. |
| D-04 | Permite transferencias positivas hacia la misma cuenta (prueba anterior). | Candidato a defecto; confirmar si se completa la operación y si aparece un movimiento. |
| D-05 | No se logra recuperar la cuenta mediante *Forgot Login Info*. | Candidato a defecto; repetir con datos ficticios verificados y anotar el mensaje exacto. |
| P | ¿Qué validaciones deben aplicarse a las transferencias y a la recuperación de acceso? | Pregunta pendiente de responder con regla documentada o confirmación del responsable. |
| I | Probar montos negativos y repetir la recuperación con datos verificados. | Idea para la siguiente sesión. |

## Balance y límites de la fuente

La imagen indica 20 minutos de duración, pero no incluye desglose del tiempo entre exploración, reporte y problemas de entorno. Tampoco muestra fecha, navegador, cuentas utilizadas, pasos detallados, saldos antes/después ni capturas individuales de los comportamientos. Por ello, las notas se transcriben como registro aportado y no se presentan como reproducción independiente ni como cinco defectos confirmados.

## Próximos pasos

1. Reproducir cada candidato con datos de demostración y anotar pasos concretos.
2. Registrar saldo antes y después de cada transferencia; no usar credenciales ni datos personales reales.
3. Guardar evidencia en `evidencias/` y vincular cada hallazgo con CP y requisito.
4. Mantener como pregunta cualquier regla que no esté especificada; no asignar un defecto hasta tener resultado reproducible y esperado sustentado.
