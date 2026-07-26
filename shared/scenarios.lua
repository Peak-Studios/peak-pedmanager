Config = Config or {}

-- Pre-categorized model library for quick selection in the UI
Config.PedModels = {
    Civilian = {
        'a_m_y_business_01', 'a_m_y_business_02', 'a_f_y_business_01', 'a_f_y_business_02',
        'a_m_m_bevhills_01', 'a_f_m_bevhills_01', 'a_m_y_hipster_01', 'a_f_y_hipster_01',
        'a_m_m_tourist_01', 'a_f_m_tourist_01', 'a_m_y_runner_01', 'a_f_y_runner_01'
    },
    Emergency = {
        's_m_y_cop_01', 's_f_y_cop_01', 's_m_y_sheriff_01', 's_f_y_sheriff_01',
        's_m_y_fireman_01', 's_m_m_paramedic_01', 's_f_y_paramedic_01', 's_m_y_swat_01'
    },
    Service = {
        's_m_y_mechanic_01', 's_m_m_autoshop_01', 's_m_y_barman_01', 's_f_y_airhostess_01',
        's_m_m_doctor_01', 's_m_y_waiter_01', 's_m_y_dealer_01', 's_m_y_armoured_01'
    },
    Gangs = {
        'g_m_y_ballasout_01', 'g_m_y_famca_01', 'g_m_y_vagos_01', 'g_m_y_mexgoon_01',
        'g_m_y_korean_01', 'g_m_y_lost_01', 'g_m_y_salva_01', 'g_m_y_strpunk_01'
    },
    Special = {
        'ig_bankman', 'ig_lestercrest', 'ig_travis', 'ig_chef', 'ig_floyd',
        'a_c_chop', 'a_c_cat_01', 'a_c_retriever', 'a_c_husky'
    }
}

-- Native GTAV Scenarios list
Config.Scenarios = {
    { id = 'WORLD_HUMAN_CLIPBOARD', label = 'Inspect Clipboard', category = 'Work' },
    { id = 'WORLD_HUMAN_LEANING', label = 'Lean on Wall/Structure', category = 'Idle' },
    { id = 'WORLD_HUMAN_AA_COFFEE', label = 'Drink Coffee', category = 'Idle' },
    { id = 'WORLD_HUMAN_SMOKING', label = 'Smoke Cigarette', category = 'Idle' },
    { id = 'WORLD_HUMAN_GUARD_STAND', label = 'Guard Stand', category = 'Security' },
    { id = 'WORLD_HUMAN_STAND_MOBILE', label = 'Use Mobile Phone', category = 'Idle' },
    { id = 'WORLD_HUMAN_COP_IDLES', label = 'Police Officer Idle', category = 'Security' },
    { id = 'WORLD_HUMAN_DRUG_DEALER', label = 'Drug Dealer Stance', category = 'Criminal' },
    { id = 'WORLD_HUMAN_SECURITY_NAV', label = 'Security Patrol / Nav', category = 'Security' },
    { id = 'WORLD_HUMAN_CHEERING', label = 'Cheering / Waving', category = 'Social' },
    { id = 'WORLD_HUMAN_SEAT_WALL', label = 'Sit on Wall Edge', category = 'Seated' },
    { id = 'WORLD_HUMAN_SEAT_LEDGE', label = 'Sit on Ledge', category = 'Seated' },
    { id = 'WORLD_HUMAN_BARTENDER', label = 'Bartender Cleaning', category = 'Work' },
    { id = 'WORLD_HUMAN_VALET', label = 'Valet Waiting', category = 'Work' },
    { id = 'WORLD_HUMAN_PAPARAZZI', label = 'Take Photos (Camera)', category = 'Work' },
    { id = 'WORLD_HUMAN_WELDING', label = 'Welding Torch', category = 'Work' },
    { id = 'WORLD_HUMAN_DRINKING', label = 'Drink Beer/Soda', category = 'Idle' },
    { id = 'WORLD_HUMAN_PARTYING', label = 'Partying / Dancing', category = 'Social' }
}

-- Presets for animation dictionary and animation name combinations
Config.Animations = {
    { dict = 'amb@world_human_cop_idles@female@base', anim = 'base', label = 'Cop Arms Crossed', category = 'Police' },
    { dict = 'amb@world_human_clipboard@male@base', anim = 'base', label = 'Writing Clipboard', category = 'Work' },
    { dict = 'amb@world_human_drinking@coffee@male@base', anim = 'base', label = 'Sipping Coffee', category = 'Casual' },
    { dict = 'amb@world_human_leaning@male@wall@back@foot_up@base', anim = 'base', label = 'Back Against Wall', category = 'Idle' },
    { dict = 'mini@strip_club@idles@bouncer@base', anim = 'base', label = 'Bouncer Guard', category = 'Security' },
    { dict = 'anim@heists@heist_thanksgiving@toasting', anim = 'a_cheers_a', label = 'Toast Drink', category = 'Social' },
    { dict = 'amb@world_human_sit_chair@male@static', anim = 'base', label = 'Sit on Chair', category = 'Seated' },
    { dict = 'cellphone@', anim = 'cellphone_call_listen_base', label = 'On Phone Call', category = 'Casual' }
}

-- Prop Attachments list for peds
Config.Props = {
    { model = 'p_amb_clipboard_01', bone = 60309, pos = vector3(0.0, 0.0, 0.0), rot = vector3(0.0, 0.0, 0.0), label = 'Clipboard' },
    { model = 'p_amb_coffeecup_01', bone = 28422, pos = vector3(0.0, 0.0, 0.0), rot = vector3(0.0, 0.0, 0.0), label = 'Coffee Cup' },
    { model = 'prop_notepad_01', bone = 60309, pos = vector3(0.0, 0.0, 0.0), rot = vector3(0.0, 0.0, 0.0), label = 'Notepad' },
    { model = 'prop_pencil_01', bone = 57005, pos = vector3(0.0, 0.0, 0.0), rot = vector3(0.0, 0.0, 0.0), label = 'Pen' },
    { model = 'prop_phone_ing', bone = 28422, pos = vector3(0.0, 0.0, 0.0), rot = vector3(0.0, 0.0, 0.0), label = 'Mobile Phone' }
}
