local cachedPeds = {}

local function LoadPedsFromDatabase(cb)
    MySQL.query('SELECT * FROM peak_peds', {}, function(results)
        cachedPeds = results or {}
        if cb then cb(cachedPeds) end
    end)
end

local function InitDatabase(cb)
    local createTableQuery = [[
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
    ]]
    MySQL.query(createTableQuery, {}, function()
        LoadPedsFromDatabase(cb)
    end)
end

AddEventHandler('onResourceStart', function(resourceName)
    if resourceName ~= GetCurrentResourceName() then return end
    InitDatabase(function(peds)
        print(string.format('^2[peak-pedmanager]^7 Loaded %d static peds from SQL database.', #peds))
    end)
end)

RegisterNetEvent('peak-pedmanager:sv:checkPermissions', function()
    local src = source
    if ServerBridge.IsAdmin(src) then
        TriggerClientEvent('peak-pedmanager:cl:openUI', src)
    else
        TriggerClientEvent('peak-pedmanager:cl:notify', src, 'You do not have permission to use the Ped Manager.', 'error')
    end
end)

RegisterNetEvent('peak-pedmanager:sv:requestPeds', function()
    local src = source
    if not ServerBridge.IsAdmin(src) then return end

    if #cachedPeds > 0 then
        TriggerClientEvent('peak-pedmanager:cl:syncPeds', src, cachedPeds)
        TriggerClientEvent('peak-pedmanager:cl:receiveAllPeds', src, cachedPeds)
    else
        LoadPedsFromDatabase(function(peds)
            TriggerClientEvent('peak-pedmanager:cl:syncPeds', src, peds)
            TriggerClientEvent('peak-pedmanager:cl:receiveAllPeds', src, peds)
        end)
    end
end)

-- Broadcast peds to all online clients
RegisterNetEvent('playerJoining', function()
    local src = source
    TriggerClientEvent('peak-pedmanager:cl:receiveAllPeds', src, cachedPeds)
end)

RegisterNetEvent('peak-pedmanager:sv:savePed', function(pedData)
    local src = source
    if not ServerBridge.IsAdmin(src) then return end
    if not pedData then return end

    local payloadStr = nil
    if type(pedData.interaction_payload) == 'table' then
        payloadStr = json.encode(pedData.interaction_payload)
    elseif type(pedData.interaction_payload) == 'string' then
        payloadStr = pedData.interaction_payload
    end

    if pedData.id then
        -- UPDATE existing ped
        local query = [[
            UPDATE peak_peds SET
                title = ?, model = ?, x = ?, y = ?, z = ?, h = ?,
                scenario = ?, anim_dict = ?, anim_name = ?,
                prop_model = ?, prop_bone = ?,
                freeze = ?, invincible = ?, block_events = ?, collision = ?,
                interaction_type = ?, interaction_label = ?, interaction_icon = ?, interaction_payload = ?
            WHERE id = ?
        ]]
        local params = {
            pedData.title or 'Static Ped', pedData.model or 'a_m_y_business_01',
            pedData.x or 0.0, pedData.y or 0.0, pedData.z or 0.0, pedData.h or 0.0,
            pedData.scenario, pedData.anim_dict, pedData.anim_name,
            pedData.prop_model, pedData.prop_bone or 60309,
            pedData.freeze and 1 or 0, pedData.invincible and 1 or 0,
            pedData.block_events and 1 or 0, pedData.collision and 1 or 0,
            pedData.interaction_type or 'none', pedData.interaction_label or 'Talk',
            pedData.interaction_icon or 'fas fa-comments', payloadStr,
            pedData.id
        }

        MySQL.update(query, params, function(affectedRows)
            LoadPedsFromDatabase(function(peds)
                TriggerClientEvent('peak-pedmanager:cl:syncPeds', -1, peds)
                TriggerClientEvent('peak-pedmanager:cl:receiveAllPeds', -1, peds)
                TriggerClientEvent('peak-pedmanager:cl:notify', src, string.format('Ped #%s updated successfully.', pedData.id), 'success')
            end)
        end)
    else
        -- INSERT new ped
        local query = [[
            INSERT INTO peak_peds (
                title, model, x, y, z, h,
                scenario, anim_dict, anim_name,
                prop_model, prop_bone,
                freeze, invincible, block_events, collision,
                interaction_type, interaction_label, interaction_icon, interaction_payload
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ]]
        local params = {
            pedData.title or 'Static Ped', pedData.model or 'a_m_y_business_01',
            pedData.x or 0.0, pedData.y or 0.0, pedData.z or 0.0, pedData.h or 0.0,
            pedData.scenario, pedData.anim_dict, pedData.anim_name,
            pedData.prop_model, pedData.prop_bone or 60309,
            pedData.freeze and 1 or 0, pedData.invincible and 1 or 0,
            pedData.block_events and 1 or 0, pedData.collision and 1 or 0,
            pedData.interaction_type or 'none', pedData.interaction_label or 'Talk',
            pedData.interaction_icon or 'fas fa-comments', payloadStr
        }

        MySQL.insert(query, params, function(newId)
            LoadPedsFromDatabase(function(peds)
                TriggerClientEvent('peak-pedmanager:cl:syncPeds', -1, peds)
                TriggerClientEvent('peak-pedmanager:cl:receiveAllPeds', -1, peds)
                TriggerClientEvent('peak-pedmanager:cl:notify', src, string.format('New Ped created! (ID: %s)', newId), 'success')
            end)
        end)
    end
end)

RegisterNetEvent('peak-pedmanager:sv:deletePed', function(pedId)
    local src = source
    if not ServerBridge.IsAdmin(src) then return end
    if not pedId then return end

    MySQL.update('DELETE FROM peak_peds WHERE id = ?', { pedId }, function(affectedRows)
        LoadPedsFromDatabase(function(peds)
            TriggerClientEvent('peak-pedmanager:cl:syncPeds', -1, peds)
            TriggerClientEvent('peak-pedmanager:cl:receiveAllPeds', -1, peds)
            TriggerClientEvent('peak-pedmanager:cl:notify', src, string.format('Ped #%s deleted.', pedId), 'success')
        end)
    end)
end)

-- Exports for server-side developers
exports('GetAllPeds', function()
    return cachedPeds
end)

exports('GetPedById', function(pedId)
    for _, ped in ipairs(cachedPeds) do
        if ped.id == pedId then return ped end
    end
    return nil
end)
