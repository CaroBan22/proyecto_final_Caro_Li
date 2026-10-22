# Evidencia ACC-01 — Nombre accesible del login

- **Fecha de inspección:** 22/10/2026.
- **Navegador:** Chromium.
- **URL:** `https://parabank.parasoft.com/parabank/`.
- **Tipo de comprobación:** inspección DOM/árbol de accesibilidad desde Chromium.
- **Captura:** `ACC-01-login-formulario.png`.

## Procedimiento

1. Abrir el formulario público de inicio de sesión.
2. Inspeccionar los inputs `username` y `password`.
3. Revisar asociación con `<label>`, `aria-label`, `aria-labelledby`, placeholder y title.
4. Consultar los controles por rol/nombre accesible y por etiqueta.

## Resultado observado

Los dos inputs inspeccionados no tenían `<label>` asociado, `aria-label`, `aria-labelledby`, placeholder ni title. Las consultas por rol/nombre y por label devolvieron cero controles para ambos campos. La captura muestra la pantalla del formulario, sin credenciales introducidas.

## Alcance y seguimiento

Esta evidencia respalda la ausencia de nombre programático en la inspección DOM/árbol realizada. No prueba por sí sola la experiencia completa de personas usuarias de tecnologías de asistencia. Falta repetir con lector de pantalla y registrar ese resultado antes de cerrar la clasificación del hallazgo. No se observó ni se afirma una falla de teclado.
