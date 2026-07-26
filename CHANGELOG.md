# Changelog — Peak Ped Manager

All notable changes to `peak-pedmanager` will be documented in this file.

## [1.0.0] - 2026-07-26

### Added
- Initial public open source release of `peak-pedmanager`.
- Standalone Lua resource with framework auto-detection (QBCore, ESX, Qbox, Standalone).
- Modern React 18 + TypeScript + Tailwind CSS NUI dashboard with dark glassmorphism aesthetic.
- In-game Live 3D Placement mode with heading range sliders, coordinate fine-tuning, and raycast preview ped.
- GTAV Native Scenarios catalog and custom animation dictionary/name selector.
- Prop attachment manager supporting custom models and bone indices.
- Multi-target support for `ox_target`, `qb-target`, `qtarget`, and 3D Text prompt fallbacks.
- SQL persistence via `oxmysql` (`peak_peds` database table).
- Distance culling streaming thread (`Config.RenderDistance` / `Config.UnloadDistance`) to optimize client FPS.
- JSON Import and Export configuration tools in NUI settings.
