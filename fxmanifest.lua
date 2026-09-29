fx_version 'cerulean'
game 'gta5'
lua54 'yes'

name 'peak-pedmanager'
author 'Peak Studios'
description 'A standalone FiveM ped management resource with live UI, scenario & animation presets, ox_target hooks, and SQL persistence.'
version '1.0.0'

ui_page 'ui/dist/index.html'

shared_scripts {
    'shared/config.lua',
    'shared/scenarios.lua'
}

client_scripts {
    'client/bridge.lua',
    'client/target.lua',
    'client/nui.lua',
    'client/main.lua'
}

server_scripts {
    '@oxmysql/lib/MySQL.lua',
    'server/bridge.lua',
    'server/main.lua'
}

files {
    'ui/dist/index.html',
    'ui/dist/assets/*.*',
    'locales/*.json',
    'version.json'
}

dependencies {
    'oxmysql'
}

escrow_ignore {
    'shared/*.lua',
    'locales/*.json',
    'install/*.sql',
    'docs/*.md',
    '*.md'
}
