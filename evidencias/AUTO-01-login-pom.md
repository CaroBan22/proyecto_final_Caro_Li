# Evidencia AUTO-01 — Suite de autenticación

**Fecha de ejecución:** 28 de octubre de 2026

**Rama:** `refactor-pom`

**PR:** [#5 hacia `main`](https://github.com/CaroBan22/proyecto_final_Caro_Li/pull/5)

**Navegador:** Chromium

**Comando:** `npx playwright test tests/auth/login.spec.js --project=chromium --trace off --workers=1 --reporter=html`

## Resultado más reciente

**2 aprobados, 1 fallido.**

- **Aprobado:** un usuario inválido no crea una sesión.
- **Aprobado:** una contraseña incorrecta no crea una sesión.
- **Fallido:** el login con las credenciales configuradas no llegó a `overview.htm`; ParaBank mantuvo la página en `login.htm`.

La clave se mantuvo fuera de la captura y de la traza de Playwright. El reporte HTML local está en `playwright-report/index.html` (directorio ignorado por Git).

## Archivos de evidencia

- [Captura del reporte Playwright](AUTO-01-playwright-report.png)
- [Traza del caso de usuario inválido con datos ficticios](AUTO-01-login-usuario-invalido-trace.zip)
