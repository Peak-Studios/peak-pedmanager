# Installation Guide — Peak Ped Manager

This guide walks you through installing and configuring `peak-pedmanager` on your FiveM server.

---

## Prerequisites

Make sure the following required resources are installed and started on your server:

1. **`oxmysql`**: Standard MySQL library for FiveM.
2. *(Optional)* **Target Resource**: `ox_target`, `qb-target`, or `qtarget`. If none is installed, the resource automatically uses in-world 3D Text prompts.

---

## Step 1: Database Setup

Run the SQL script located in `install/schema.sql` on your database using HeidiSQL, phpMyAdmin, or your database GUI.

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

---

## Step 2: Configuration

Open `shared/config.lua` and adjust settings for your server framework and permission rules:

```lua
Config.Framework = 'auto'      -- 'auto', 'qbcore', 'esx', 'qbox', or 'standalone'
Config.TargetSystem = 'auto'   -- 'auto', 'ox_target', 'qb-target', 'qtarget', or '3dtext'
Config.CommandName = 'pedmanager'
Config.OpenKey = 'F6'

Config.RequireAdmin = true
Config.AdminGroups = {
    ['admin'] = true,
    ['god'] = true,
    ['superadmin'] = true
}
```

### Granting ACE Permissions (Standalone / ESX / QBCore)
In your `server.cfg`, add ACE permission for admin groups or specific Steam/license IDs:

```cfg
add_ace group.admin command.pedmanager allow
```

---

## Step 3: Server Configuration

Add `ensure peak-pedmanager` to your `server.cfg`:

```cfg
ensure oxmysql
ensure ox_target      # Optional
ensure peak-pedmanager
```

---

## Step 4: Verification

1. Start your server and join in-game.
2. Execute `/pedmanager` or press `F6`.
3. The Peak Ped Manager NUI dashboard should open.
4. Click **Create Ped**, select a model and scenario (e.g. `WORLD_HUMAN_CLIPBOARD`), click **Live 3D Placement**, position the ped, and click **Save Ped**.
5. The ped will spawn instantly and persist across server restarts.
