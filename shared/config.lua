Config = {}

-- Framework integration mode: 'auto', 'qbcore', 'esx', 'qbox', or 'standalone'
Config.Framework = 'auto'

-- Target script integration: 'auto', 'ox_target', 'qb-target', 'qtarget', or '3dtext'
Config.TargetSystem = 'auto'

-- Command to open the Ped Manager dashboard
Config.CommandName = 'pedmanager'
Config.OpenKey = 'F6' -- Set to nil or string key identifier if binding key

-- Permission enforcement: true requires admin privileges, false allows all players (useful for dev servers)
Config.RequireAdmin = true
Config.AdminGroups = {
    ['admin'] = true,
    ['god'] = true,
    ['superadmin'] = true,
    ['mod'] = true
}
Config.AcePermission = 'command.pedmanager'

-- Distance Streaming (Optimization)
Config.RenderDistance = 80.0    -- Distance at which peds spawn on the client
Config.UnloadDistance = 100.0   -- Distance at which peds despawn on client
Config.StreamCheckInterval = 1000 -- Interval (ms) for distance calculation loop

-- Default placement options when creating a new ped
Config.DefaultPed = {
    model = 'a_m_y_business_01',
    scenario = 'WORLD_HUMAN_CLIPBOARD',
    animDict = '',
    animName = '',
    freeze = true,
    invincible = true,
    blockEvents = true,
    collision = true,
    groundSnap = true
}

-- Default interaction settings
Config.InteractionDistance = 2.5
Config.InteractionIcon = 'fas fa-user-tag'

-- Webhook logging for audit trails
Config.DiscordWebhook = '' -- Insert webhook URL if server logs ped creations/deletions
