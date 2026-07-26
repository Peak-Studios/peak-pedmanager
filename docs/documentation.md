# Peak Ped Manager — Official Documentation

Welcome to the full technical documentation for **Peak Ped Manager**, a standalone FiveM resource for managing static and animated peds with real-time UI, target interactions, and SQL persistence.

---

## Table of Contents
1. [Overview & System Architecture](#overview--system-architecture)
2. [Installation & Setup](#installation--setup)
3. [Configuration Reference](#configuration-reference)
4. [Client & Server API Exports](#client--server-api-exports)
5. [Target Interactions & Event Payloads](#target-interactions--event-payloads)
6. [NUI Architecture & Live Placement Gizmo](#nui-architecture--live-placement-gizmo)
7. [Database Schema & Performance Culling](#database-schema--performance-culling)

---

## Overview & System Architecture

Peak Ped Manager operates using a server-authoritative state model combined with client-side distance culling:

1. **Server Database (`oxmysql`)**: Stores all ped records in `peak_peds`. On resource start, the server queries all peds into memory cache.
2. **Client Streaming Thread**: Each client calculates distance to all registered peds. Peds within `Config.RenderDistance` (default 80.0 units) are spawned locally as GTAV ped entities.
3. **Target Binding**: When a ped entity spawns on client, the target layer automatically attaches target options (`ox_target`, `qb-target`, or 3D Text).
4. **NUI Dashboard**: React 18 interface allowing real-time CRUD operations, live placement raycasting, scenario catalog browsing, and JSON import/export.

---

## Configuration Reference

The main configuration file is [shared/config.lua](file:///c:/Users/abdel/clean-code/peak-pedmanager/shared/config.lua):

| Setting | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `Config.Framework` | `string` | `'auto'` | `'auto'`, `'qbcore'`, `'esx'`, `'qbox'`, or `'standalone'` |
| `Config.TargetSystem` | `string` | `'auto'` | `'auto'`, `'ox_target'`, `'qb-target'`, `'qtarget'`, or `'3dtext'` |
| `Config.CommandName` | `string` | `'pedmanager'` | Command to open NUI dashboard |
| `Config.OpenKey` | `string` | `'F6'` | Keyboard shortcut mapping |
| `Config.RequireAdmin` | `boolean` | `true` | Enforce admin permissions |
| `Config.AcePermission` | `string` | `'command.pedmanager'` | ACE permission node |
| `Config.RenderDistance` | `number` | `80.0` | Ped spawn distance in units |
| `Config.UnloadDistance` | `number` | `100.0` | Ped despawn distance in units |

---

## Client & Server API Exports

### Server Exports

```lua
-- Retrieve all cached ped configurations
local allPeds = exports['peak-pedmanager']:GetAllPeds()

-- Retrieve a specific ped by database ID
local pedData = exports['peak-pedmanager']:GetPedById(12)
```

---

## Target Interactions & Event Payloads

When creating or editing a ped, server owners can assign interaction actions:

- **Client Event**: Triggers a client event when player selects target option.
  - Payload format: `{"event":"qb-clothing:client:openMenu"}`
- **Server Event**: Triggers a server-side event.
  - Payload format: `{"event":"bank:server:openBank"}`
- **Command**: Executes a client command.
  - Payload format: `{"command":"e wave"}`
- **Dialogue**: Displays a notification dialogue to the player.
  - Payload format: `{"text":"Welcome to Los Santos Medical Center!"}`

---

## NUI Architecture & Live Placement Gizmo

The frontend is built with React 18, TypeScript, Tailwind CSS, and Lucide Icons.

- Source directory: `ui/src/`
- Build output: `ui/dist/`
- Live placement gizmo sends real-time coordinates to `client/main.lua` via `updatePlacement` NUI callback.

---

## Database Schema & Performance Culling

```sql
CREATE TABLE IF NOT EXISTS `peak_peds` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(100) NOT NULL DEFAULT 'Static Ped',
  `model` VARCHAR(100) NOT NULL DEFAULT 'a_m_y_business_01',
  `x` FLOAT NOT NULL DEFAULT 0.0,
  `y` FLOAT NOT NULL DEFAULT 0.0,
  `z` FLOAT NOT NULL DEFAULT 0.0,
  `h` FLOAT NOT NULL DEFAULT 0.0,
  `scenario` VARCHAR(100) DEFAULT NULL,
  `anim_dict` VARCHAR(100) DEFAULT NULL,
  `anim_name` VARCHAR(100) DEFAULT NULL,
  `prop_model` VARCHAR(100) DEFAULT NULL,
  `prop_bone` INT DEFAULT 60309,
  `freeze` TINYINT(1) NOT NULL DEFAULT 1,
  `invincible` TINYINT(1) NOT NULL DEFAULT 1,
  `block_events` TINYINT(1) NOT NULL DEFAULT 1,
  `collision` TINYINT(1) NOT NULL DEFAULT 1,
  `interaction_type` VARCHAR(50) DEFAULT 'none',
  `interaction_label` VARCHAR(100) DEFAULT 'Talk to NPC',
  `interaction_icon` VARCHAR(50) DEFAULT 'fas fa-comments',
  `interaction_payload` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```
