local activePeds = {}       -- pedData keyed by DB id
local spawnedEntities = {}   -- pedEntity handles keyed by DB id
local previewEntity = nil
local isPlacing = false
local currentPlacementData = nil

-- Update client local state from server broadcasts
RegisterNetEvent('peak-pedmanager:cl:receiveAllPeds', function(pedsList)
    local updatedIds = {}
    for _, pedData in ipairs(pedsList) do
        local id = pedData.id
        updatedIds[id] = true
        activePeds[id] = pedData

        -- If already spawned, update attributes
        if spawnedEntities[id] and DoesEntityExist(spawnedEntities[id]) then
            ApplyPedAttributes(spawnedEntities[id], pedData)
            Target.RemovePedInteraction(id)
            Target.AddPedInteraction(id, spawnedEntities[id], pedData)
        end
    end

    -- Despawn any peds removed from server database
    for id, entity in pairs(spawnedEntities) do
        if not updatedIds[id] then
            DespawnPedEntity(id)
            activePeds[id] = nil
        end
    end
end)

-- Main Distance Streaming Loop
CreateThread(function()
    while true do
        local sleep = Config.StreamCheckInterval or 1000
        local pPed = PlayerPedId()
        local pCoords = GetEntityCoords(pPed)

        for id, pedData in pairs(activePeds) do
            local pedCoords = vector3(pedData.x + 0.0, pedData.y + 0.0, pedData.z + 0.0)
            local dist = #(pCoords - pedCoords)

            if dist <= Config.RenderDistance then
                if not spawnedEntities[id] or not DoesEntityExist(spawnedEntities[id]) then
                    SpawnPedEntity(id, pedData)
                end
            elseif dist > Config.UnloadDistance then
                if spawnedEntities[id] and DoesEntityExist(spawnedEntities[id]) then
                    DespawnPedEntity(id)
                end
            end
        end

        Wait(sleep)
    end
end)

function SpawnPedEntity(id, pedData)
    local modelHash = joaat(pedData.model or 'a_m_y_business_01')
    if not IsModelValid(modelHash) then
        modelHash = joaat('a_m_y_business_01')
    end

    RequestModel(modelHash)
    local timeout = 0
    while not HasModelLoaded(modelHash) and timeout < 100 do
        Wait(10)
        timeout = timeout + 1
    end

    local pedEntity = CreatePed(4, modelHash, pedData.x + 0.0, pedData.y + 0.0, pedData.z + 0.0, pedData.h + 0.0, false, false)
    SetModelAsNoLongerNeeded(modelHash)

    if not DoesEntityExist(pedEntity) then return end

    spawnedEntities[id] = pedEntity
    ApplyPedAttributes(pedEntity, pedData)
    Target.AddPedInteraction(id, pedEntity, pedData)
end

function DespawnPedEntity(id)
    Target.RemovePedInteraction(id)
    local entity = spawnedEntities[id]
    if entity and DoesEntityExist(entity) then
        DeletePed(entity)
    end
    spawnedEntities[id] = nil
end

function ApplyPedAttributes(pedEntity, pedData)
    SetEntityHeading(pedEntity, pedData.h + 0.0)
    SetPedDefaultComponentVariation(pedEntity)

    -- Freeze & Invincible
    local freeze = (pedData.freeze == 1 or pedData.freeze == true)
    local invincible = (pedData.invincible == 1 or pedData.invincible == true)
    local blockEvents = (pedData.block_events == 1 or pedData.block_events == true)
    local collision = (pedData.collision == 1 or pedData.collision == true)

    FreezeEntityPosition(pedEntity, freeze)
    SetEntityInvincible(pedEntity, invincible)
    SetBlockingOfNonTemporaryEvents(pedEntity, blockEvents)
    SetEntityCanBeDamaged(pedEntity, not invincible)
    SetEntityCollision(pedEntity, collision, true)

    -- Scenarios or Animations
    ClearPedTasksImmediately(pedEntity)

    if pedData.scenario and pedData.scenario ~= '' and pedData.scenario ~= 'none' then
        TaskStartScenarioInPlace(pedEntity, pedData.scenario, 0, true)
    elseif pedData.anim_dict and pedData.anim_dict ~= '' and pedData.anim_name and pedData.anim_name ~= '' then
        RequestAnimDict(pedData.anim_dict)
        local timeout = 0
        while not HasAnimDictLoaded(pedData.anim_dict) and timeout < 50 do
            Wait(10)
            timeout = timeout + 1
        end
        TaskPlayAnim(pedEntity, pedData.anim_dict, pedData.anim_name, 8.0, -8.0, -1, 1, 0, false, false, false)
    end

    -- Prop Attachments
    if pedData.prop_model and pedData.prop_model ~= '' and pedData.prop_model ~= 'none' then
        local propHash = joaat(pedData.prop_model)
        if IsModelValid(propHash) then
            RequestModel(propHash)
            while not HasModelLoaded(propHash) do Wait(10) end
            local propObj = CreateObject(propHash, 0.0, 0.0, 0.0, false, false, false)
            local boneIndex = GetPedBoneIndex(pedEntity, pedData.prop_bone or 60309)
            AttachEntityToEntity(propObj, pedEntity, boneIndex, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, true, true, false, true, 1, true)
            SetModelAsNoLongerNeeded(propHash)
        end
    end
end

-- Placement Preview System
function StartPlacement(data)
    currentPlacementData = data or {}
    isPlacing = true

    local pPed = PlayerPedId()
    local pCoords = GetOffsetFromEntityInWorldCoords(pPed, 0.0, 2.0, 0.0)
    local pHeading = GetEntityHeading(pPed)

    local modelHash = joaat(currentPlacementData.model or 'a_m_y_business_01')
    if not IsModelValid(modelHash) then modelHash = joaat('a_m_y_business_01') end

    RequestModel(modelHash)
    while not HasModelLoaded(modelHash) do Wait(10) end

    if previewEntity and DoesEntityExist(previewEntity) then
        DeletePed(previewEntity)
    end

    previewEntity = CreatePed(4, modelHash, pCoords.x, pCoords.y, pCoords.z, pHeading, false, false)
    SetEntityAlpha(previewEntity, 200, false)
    SetEntityCollision(previewEntity, false, false)
    FreezeEntityPosition(previewEntity, true)

    SendNUIMessage({
        action = 'placementStarted',
        coords = { x = pCoords.x, y = pCoords.y, z = pCoords.z, h = pHeading }
    })
end

function UpdatePlacementPreview(data)
    if not previewEntity or not DoesEntityExist(previewEntity) then return end
    if not data or not data.coords then return end

    local c = data.coords
    SetEntityCoords(previewEntity, c.x + 0.0, c.y + 0.0, c.z + 0.0, false, false, false, false)
    SetEntityHeading(previewEntity, (c.h or 0.0) + 0.0)

    if data.model and data.model ~= currentPlacementData.model then
        currentPlacementData.model = data.model
        StartPlacement(data)
    end
end

function ConfirmPlacement(data)
    if previewEntity and DoesEntityExist(previewEntity) then
        DeletePed(previewEntity)
        previewEntity = nil
    end
    isPlacing = false

    if data then
        TriggerServerEvent('peak-pedmanager:sv:savePed', data)
    end
end

function CancelPlacement()
    if previewEntity and DoesEntityExist(previewEntity) then
        DeletePed(previewEntity)
        previewEntity = nil
    end
    isPlacing = false
    SendNUIMessage({ action = 'placementCancelled' })
end

AddEventHandler('onResourceStop', function(resName)
    if resName ~= GetCurrentResourceName() then return end
    for id, _ in pairs(spawnedEntities) do
        DespawnPedEntity(id)
    end
    if previewEntity and DoesEntityExist(previewEntity) then
        DeletePed(previewEntity)
    end
end)
