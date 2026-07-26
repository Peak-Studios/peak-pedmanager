Target = {}
local registeredTargets = {}

local function DetectTargetSystem()
    if Config.TargetSystem ~= 'auto' then
        return Config.TargetSystem
    end

    if GetResourceState('ox_target') == 'started' then return 'ox_target' end
    if GetResourceState('qb-target') == 'started' then return 'qb-target' end
    if GetResourceState('qtarget') == 'started' then return 'qtarget' end
    return '3dtext'
end

function Target.AddPedInteraction(pedId, pedEntity, pedData)
    if not pedEntity or not DoesEntityExist(pedEntity) then return end
    if not pedData.interaction_type or pedData.interaction_type == 'none' then return end

    local targetSys = DetectTargetSystem()
    local label = pedData.interaction_label or 'Interact'
    local icon = pedData.interaction_icon or 'fas fa-comments'
    local targetName = 'peak_ped_' .. pedId

    local onSelectAction = function()
        Target.HandleInteraction(pedData)
    end

    if targetSys == 'ox_target' then
        exports.ox_target:addLocalEntity(pedEntity, {
            {
                name = targetName,
                label = label,
                icon = icon,
                distance = Config.InteractionDistance,
                onSelect = onSelectAction
            }
        })
        registeredTargets[pedId] = { type = 'ox_target', entity = pedEntity }

    elseif targetSys == 'qb-target' or targetSys == 'qtarget' then
        local targetExport = (targetSys == 'qb-target') and exports['qb-target'] or exports['qtarget']
        targetExport:AddTargetEntity(pedEntity, {
            options = {
                {
                    type = "client",
                    action = onSelectAction,
                    icon = icon,
                    label = label,
                }
            },
            distance = Config.InteractionDistance
        })
        registeredTargets[pedId] = { type = 'qb-target', entity = pedEntity }
    else
        registeredTargets[pedId] = { type = '3dtext', entity = pedEntity, data = pedData }
    end
end

function Target.RemovePedInteraction(pedId)
    local targetInfo = registeredTargets[pedId]
    if not targetInfo then return end

    local targetSys = DetectTargetSystem()
    if targetSys == 'ox_target' then
        if DoesEntityExist(targetInfo.entity) then
            exports.ox_target:removeLocalEntity(targetInfo.entity, 'peak_ped_' .. pedId)
        end
    elseif targetSys == 'qb-target' or targetSys == 'qtarget' then
        if DoesEntityExist(targetInfo.entity) then
            local targetExport = (targetSys == 'qb-target') and exports['qb-target'] or exports['qtarget']
            targetExport:RemoveTargetEntity(targetInfo.entity, 'peak_ped_' .. pedId)
        end
    end

    registeredTargets[pedId] = nil
end

function Target.HandleInteraction(pedData)
    if not pedData or not pedData.interaction_type then return end

    local actionType = pedData.interaction_type
    local payload = pedData.interaction_payload

    if type(payload) == 'string' and string.sub(payload, 1, 1) == '{' then
        local success, decoded = pcall(json.decode, payload)
        if success then payload = decoded end
    end

    if actionType == 'client_event' then
        if type(payload) == 'table' and payload.event then
            TriggerEvent(payload.event, payload.args)
        elseif type(payload) == 'string' then
            TriggerEvent(payload)
        end
    elseif actionType == 'server_event' then
        if type(payload) == 'table' and payload.event then
            TriggerServerEvent(payload.event, payload.args)
        elseif type(payload) == 'string' then
            TriggerServerEvent(payload)
        end
    elseif actionType == 'command' then
        local cmd = (type(payload) == 'table' and payload.command) or tostring(payload)
        ExecuteCommand(cmd)
    elseif actionType == 'dialogue' then
        local text = (type(payload) == 'table' and payload.text) or tostring(payload)
        Bridge.Notify(text, 'info')
    end
end

-- 3D Text interaction thread for servers without ox_target or qb-target
CreateThread(function()
    while true do
        local sleep = 1000
        local playerPed = PlayerPedId()
        local pCoords = GetEntityCoords(playerPed)

        for pedId, info in pairs(registeredTargets) do
            if info.type == '3dtext' and DoesEntityExist(info.entity) then
                local eCoords = GetEntityCoords(info.entity)
                local dist = #(pCoords - eCoords)
                if dist <= Config.InteractionDistance then
                    sleep = 0
                    local label = info.data.interaction_label or 'Interact'
                    DrawText3D(eCoords.x, eCoords.y, eCoords.z + 1.0, "[E] " .. label)
                    if IsControlJustPressed(0, 38) then -- E key
                        Target.HandleInteraction(info.data)
                    end
                end
            end
        end
        Wait(sleep)
    end
end)

function DrawText3D(x, y, z, text)
    local onScreen, _x, _y = GetScreenCoordFromWorldCoord(x, y, z)
    if onScreen then
        SetTextScale(0.35, 0.35)
        SetTextFont(4)
        SetTextProportional(1)
        SetTextColour(255, 255, 255, 215)
        SetTextEntry("STRING")
        SetTextCentre(1)
        AddTextComponentString(text)
        DrawText(_x, _y)
        local factor = (string.len(text)) / 370
        DrawRect(_x, _y + 0.0125, 0.015 + factor, 0.03, 15, 15, 15, 180)
    end
end
