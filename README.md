# Peak Ped Manager

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](version.json)
[![Discord](https://img.shields.io/badge/Discord-Peak_Studios-7289DA.svg)](https://dsc.gg/peakstudios)

**Peak Ped Manager** is a standalone, production-ready FiveM resource featuring a modern React + TypeScript NUI dashboard that allows server owners and developers to spawn static or animated peds, configure scenarios, set animations, attach props, set interaction target hooks, and save them directly to SQL.

---

## 🌟 Key Features

- **🎨 Modern React + Tailwind NUI**: High-performance glassmorphism UI dashboard with search, filtering, and tabbed organization.
- **📍 Live 3D Placement & Gizmo Sliders**: Position, ground-align, and rotate peds in real-time in the world with instant visual feedback.
- **🎭 Native GTAV Scenarios & Animations Library**: Built-in library of GTAV native scenarios (leaning, drinking coffee, inspecting clipboards, guarding, sitting) and custom animation dictionary support.
- **📦 Prop Attachment System**: Attach props (clipboard, coffee cup, notepad, pen, phone) to peds with bone index customization.
- **⚡ Distance Culling & Dynamic Streaming**: Authoritative server state syncing that dynamically spawns/despawns peds based on player proximity to keep client FPS high and network traffic minimal.
- **🎯 Multi-Target System**: Seamless integration with `ox_target`, `qb-target`, `qtarget`, or 3D Text / E-key fallback prompts.
- **💾 SQL Persistence**: Saves ped configurations directly to MySQL via `oxmysql` with zero data loss on server restarts.
- **⚙️ Framework Agnostic**: Native support for QBCore, ESX, Qbox, and Standalone servers.
- **📤 Import & Export JSON**: Share or backup ped placement configurations across multiple servers with ease.

---

## 📦 Requirements & Dependencies

- [oxmysql](https://github.com/overextended/oxmysql) (Required)
- Optional Target Systems: `ox_target`, `qb-target`, or `qtarget`
- Optional Frameworks: `qb-core`, `es_extended`, or `qbx_core`

---

## 🚀 Quick Setup & Installation

For a step-by-step setup guide, see [INSTALL.md](INSTALL.md).

### 🤖 AI-First Setup (Recommended)
1. Open [PROMPT.md](PROMPT.md).
2. Copy its contents into your AI coding assistant (Cursor, Claude, or ChatGPT).
3. Let it automatically verify dependencies and configure `shared/config.lua`.

### Manual Setup
1. Download or clone this repository into your FiveM `resources/` folder as `peak-pedmanager`.
2. Import `install/schema.sql` into your database.
3. Configure `shared/config.lua` (set permissions, default target system, command name).
4. Add `ensure peak-pedmanager` in your `server.cfg` **after** `oxmysql`.

---

## ⌨️ Controls & Commands

| Command | Description | Default Key | Permission Required |
| :--- | :--- | :--- | :--- |
| `/pedmanager` | Opens the Ped Manager UI Dashboard | `F6` | Admin / ACE `command.pedmanager` |

---

## 📁 Repository Structure

- [shared/config.lua](shared/config.lua): Main resource configuration file.
- [shared/scenarios.lua](shared/scenarios.lua): Catalog of scenarios, animations, models, and prop attachments.
- [client/main.lua](client/main.lua): Entity spawning, streaming distance loop, and placement raycasting.
- [client/nui.lua](client/nui.lua): NUI message dispatches and callback handlers.
- [client/target.lua](client/target.lua): `ox_target`, `qb-target`, and 3D Text interaction hooks.
- [server/main.lua](server/main.lua): Database queries (`oxmysql`), client state broadcasting, and admin verification.
- [install/schema.sql](install/schema.sql): Database table schema for `peak_peds`.
- [ui](ui): Source React + Vite + TypeScript NUI code (Pre-built production files included in `ui/dist`).

---

## 🛠️ NUI Development

To modify the frontend UI:

```bash
cd ui
npm install
npm run build
```

Keep `ui/dist` in production releases. Server owners do not need Node.js or npm to run this script.

---

## 📜 License & Community

This project is released under the [MIT License](LICENSE).

For support, updates, and community resources:
- **Discord**: [https://dsc.gg/peakstudios](https://dsc.gg/peakstudios)
- **GitHub**: [https://github.com/peak-studios](https://github.com/peak-studios)
