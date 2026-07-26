local isUIOpen = false
local isPlacementMode = false

function OpenUI()
    if isUIOpen then return end
    isUIOpen = true
    SetNuiFocus(true, true)
    SetNuiFocusKeepInput(false)
    SendNUIMessage({
        action = 'open',
        scenarios = Config.Scenarios,
        animations = Config.Animations,
        props = Config.Props,
        pedModels = Config.PedModels
    })
    TriggerServerEvent('peak-pedmanager:sv:requestPeds')
end

function CloseUI()
    if not isUIOpen then return end
    isUIOpen = false
    isPlacementMode = false
    SetNuiFocus(false, false)
    SetNuiFocusKeepInput(false)
    SendNUIMessage({ action = 'close' })
    if isPlacementMode then
        CancelPlacement()
    end
end

-- Control Disabler Thread to prevent punching, attacking, or unintended movement while UI or placement mode is active
CreateThread(function()
    while true do
        local sleep = 500
        if isUIOpen or isPlacementMode then
            sleep = 0
            local pPed = PlayerPedId()

            -- Disable attack, melee, and firing controls
            DisableControlAction(0, 24, true)  -- Attack
            DisableControlAction(0, 25, true)  -- Aim
            DisableControlAction(0, 37, true)  -- Select Weapon
            DisableControlAction(0, 47, true)  -- Weapon Extra 1
            DisableControlAction(0, 140, true) -- Light Attack
            DisableControlAction(0, 141, true) -- Heavy Attack
            DisableControlAction(0, 142, true) -- Melee Alternate
            DisableControlAction(0, 143, true) -- Melee Block
            DisableControlAction(0, 257, true) -- Attack 2
            DisableControlAction(0, 263, true) -- Melee Attack 1
            DisableControlAction(0, 264, true) -- Melee Attack 2
            DisablePlayerFiring(pPed, true)

            -- If main UI dashboard is open (and not in placement mode), disable movement so character stays completely still
            if isUIOpen and not isPlacementMode then
                DisableControlAction(0, 30, true) -- Move LR
                DisableControlAction(0, 31, true) -- Move UD
                DisableControlAction(0, 21, true) -- Sprint
                DisableControlAction(0, 22, true) -- Jump
                DisableControlAction(0, 23, true) -- Enter Vehicle
                DisableControlAction(0, 75, true) -- Exit Vehicle
            end
        end
        Wait(sleep)
    end
end)

RegisterNUICallback('closeUI', function(data, cb)
    CloseUI()
    cb('ok')
end)

RegisterNUICallback('requestPeds', function(data, cb)
    TriggerServerEvent('peak-pedmanager:sv:requestPeds')
    cb('ok')
end)

RegisterNUICallback('savePed', function(data, cb)
    TriggerServerEvent('peak-pedmanager:sv:savePed', data)
    cb('ok')
end)

RegisterNUICallback('deletePed', function(data, cb)
    if data and data.id then
        TriggerServerEvent('peak-pedmanager:sv:deletePed', data.id)
    end
    cb('ok')
end)

RegisterNUICallback('teleportPed', function(data, cb)
    if data and data.coords then
        local pPed = PlayerPedId()
        SetEntityCoords(pPed, data.coords.x + 0.0, data.coords.y + 0.0, data.coords.z + 0.0, false, false, false, false)
        Bridge.Notify(string.format("Teleported to Ped #%s", data.id or "?"), "info")
    end
    cb('ok')
end)

RegisterNUICallback('startPlacementMode', function(data, cb)
    isPlacementMode = true
    SetNuiFocus(true, true)
    SetNuiFocusKeepInput(true)
    StartPlacement(data)
    cb('ok')
end)

RegisterNUICallback('updatePlacement', function(data, cb)
    UpdatePlacementPreview(data)
    cb('ok')
end)

RegisterNUICallback('confirmPlacement', function(data, cb)
    isPlacementMode = false
    SetNuiFocusKeepInput(false)
    ConfirmPlacement(data)
    cb('ok')
end)

RegisterNUICallback('cancelPlacement', function(data, cb)
    isPlacementMode = false
    SetNuiFocusKeepInput(false)
    CancelPlacement()
    cb('ok')
end)

RegisterNetEvent('peak-pedmanager:cl:syncPeds', function(pedsList)
    SendNUIMessage({
        action = 'updatePeds',
        peds = pedsList
    })
end)

-- Command & Key Mapping to open UI
RegisterCommand(Config.CommandName, function()
    TriggerServerEvent('peak-pedmanager:sv:checkPermissions')
end, false)

if Config.OpenKey then
    RegisterKeyMapping(Config.CommandName, 'Open Ped Manager Dashboard', 'keyboard', Config.OpenKey)
end

RegisterNetEvent('peak-pedmanager:cl:openUI', function()
    OpenUI()
end)

RegisterNetEvent('peak-pedmanager:cl:notify', function(msg, type)
    Bridge.Notify(msg, type)
end)
