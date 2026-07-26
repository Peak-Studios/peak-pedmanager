Bridge = {}
Bridge.Framework = nil

local function DetectFramework()
    if Config.Framework ~= 'auto' then
        return Config.Framework
    end

    if GetResourceState('qbx_core') == 'started' then return 'qbox' end
    if GetResourceState('qb-core') == 'started' then return 'qbcore' end
    if GetResourceState('es_extended') == 'started' then return 'esx' end
    return 'standalone'
end

CreateThread(function()
    Bridge.Framework = DetectFramework()
end)

function Bridge.Notify(msg, type)
    type = type or 'info'
    if Bridge.Framework == 'qbcore' or Bridge.Framework == 'qbox' then
        local QBCore = exports['qb-core']:GetCoreObject()
        if QBCore and QBCore.Functions then
            QBCore.Functions.Notify(msg, type)
            return
        end
    elseif Bridge.Framework == 'esx' then
        local ESX = exports['es_extended']:getSharedObject()
        if ESX and ESX.ShowNotification then
            ESX.ShowNotification(msg)
            return
        end
    end

    -- Fallback chat message / native notification
    SetNotificationTextEntry('STRING')
    AddTextComponentString(msg)
    DrawNotification(false, true)
end
