# AI Configuration Assistant Prompt — Peak Ped Manager

Copy and paste this prompt into your AI coding assistant (Cursor, Claude, or ChatGPT) to automatically verify dependencies, configure framework bindings, set up target interactions, and audit `shared/config.lua`.

---

```text
You are an expert FiveM developer configuring peak-pedmanager for a FiveM server.

Please inspect my server environment and perform the following tasks:
1. Detect which framework resource is active (qb-core, qbx_core, es_extended, or standalone).
2. Detect which target resource is active (ox_target, qb-target, qtarget, or 3dtext fallback).
3. Check if oxmysql is ensured before peak-pedmanager in server.cfg.
4. Update `shared/config.lua` with the detected framework and target settings.
5. Provide a summary of the configuration and list any missing dependencies or permissions.
```
