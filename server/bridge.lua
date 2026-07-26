ServerBridge = {}

function ServerBridge.IsAdmin(source)
    if not Config.RequireAdmin then return true end

    -- Check ACE permission first
    if IsPlayerAceAllowed(source, Config.AcePermission or 'command.pedmanager') then
        return true
    end

    -- Check QBCore / Qbox framework permissions
    if GetResourceState('qb-core') == 'started' or GetResourceState('qbx_core') == 'started' then
        local QBCore = exports['qb-core']:GetCoreObject()
        if QBCore and QBCore.Functions then
            local player = QBCore.Functions.GetPlayer(source)
            if player and player.PlayerData and player.PlayerData.group then
                local grp = player.PlayerData.group
                if Config.AdminGroups[grp] then return true end
            end
            if QBCore.Functions.HasPermission(source, 'admin') or QBCore.Functions.HasPermission(source, 'god') then
                return true
            end
        end
    end

    -- Check ESX framework permissions
    if GetResourceState('es_extended') == 'started' then
        local ESX = exports['es_extended']:getSharedObject()
        if ESX then
            local xPlayer = ESX.GetPlayerFromId(source)
            if xPlayer and xPlayer.getGroup then
                local grp = xPlayer.getGroup()
                if Config.AdminGroups[grp] then return true end
            end
        end
    end

    return false
end
