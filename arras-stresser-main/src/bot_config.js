// Please note: most of this config is useless now. This was originally used for an arras.io bot, which spawned tanks. 
// Only parts of the config are useful now.

(() => {
// Input proxies
let proxies = [];
for (let i = 0; i < 2500; i+=1) {
    // Just push a singular proxy since this was originally just used with a rotating proxy. 
    // Obviously you can put in a list of separate proxy addresses though and get the same result.
    proxies.push("budget-v6.whiteproxies.com:27020");
}
// Input if workers should be replaced upon being banned
let replace_workers = true;
// Input fetch proxy
let fetch_proxy = "";
// Input bot names (not recommended for staying anonymous but here if wanted)
let bot_names = ["example 1", "example 2", "example 3"];
// Input bot messages
let bot_messages = ["example 1", "example 2", "example 3"];
// Input if the random name generator function should be utilized
let randomize_names = false;
// Input UA
let user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36";
// Input if bot can pathfind on maze maps
let bot_pathfind = true;
// Input upgrade and stat paths for bots in normal modes
let bot_upgrades_normal = [
    {
        tanks: [0, 3, 0], // Octo
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [0, 3, 1], // Cyclone
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [0, 0, 0], // Triple Twin
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [0, 3, 2], // Hexa Trapper
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [3, 4, 2], // Septa Trapper
        stats: [[0, 8], [1, 8], [2, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [3, 2, 2], // Auto 4
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },    
   {
        tanks: [6, 3], // Barricade
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [2, 2, 0], // Auto-Gunner
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [2, 2, 1], // Nailgun
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [2, 2, 3], // Machine Gunner
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [2, 2, 2], // Auto 4
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [0, 1, 0], // Pentashot
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [0, 1, 1], // Spreadshot
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [0, 1, 2], // Bent Hybrid
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [0, 1, 3], // Bent double
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [0, 1, 4], // Triplet
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [0, 1, 5], // Triplex
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [0, 0, 1], // Hewn Double
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [0, 1, 2], // Auto-Double
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [5, 4], // Shotgun
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [5, 3, 0], // Skimmer
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [5, 3, 1], // Twister
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [5, 3, 2], // Swamer
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [5, 3, 3], // Sidewinder
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [5, 3, 4], // Field Gun
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [0, 6], // Bulwark
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [0, 5], // dual
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [1, 0], // Streamliner
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    }
];
// Input bot upgrades for ar modes
let bot_upgrades_ar = [
    {
        tanks: [3, 2, 2, 0], // Auto 6
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [3, 0, 1, 3], // tempest
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [3, 0, 0, 2], // gale
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [0, 0, 0, 0], // quad twin
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [0, 0, 0, 2], // bent triple
        stats: [[0, 8], [1, 8], [2, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [0, 0, 0, 5], // triple gunner 
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [0, 1, 5, 3], // split double 
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [0, 1, 3, 5], // oouble spreadshot
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [3, 2, 0, 0], // auto 7 
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [3, 0, 1, 0], // tornado
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [0, 0, 0, 4], // triple flank twin
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [0, 0, 2, 4], // auto bent double
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [3, 0, 0, 0], // deca
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [0, 0, 0, 1], // auto triple twin
        stats: [[0, 8], [1, 8], [2, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [0, 0, 0, 5], // triple gunner        
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [3, 0, 1, 1], // dust storm
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [3, 5, 5], // triple gunner
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [3, 2, 2, 1], // batter-4
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [3, 2, 2, 3], // wraith
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [3, 2, 2, 7], // trove
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [1, 2, 0, 0], // rationalizer
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [1, 2, 0, 8], // bent streamliner
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [3, 0, 6, 3], // alloy
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [3, 5, 3], // hewn triple
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [2, 2, 2, 0], // vulcan
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [2, 2, 2, 3], // stapler
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [3, 4, 8], // tri barricade
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [3, 2, 5, 2], // chisel
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [0, 4, 4, 0], // kraal
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [0, 4, 4, 1], // employer
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [0, 4, 4, 2], // corella
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [0, 4, 4, 3], // guardrail
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [0, 4, 4, 4], // brig
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [0, 4, 4, 5], // machete
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [0, 4, 4, 6], // coop
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [0, 4, 4, 7], // fencer
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [0, 4, 4, 8], // retainer
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [0, 4, 4, 1], // auto-hutch
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [6, 7, 0], // blockade
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [6, 7, 1], // barrier
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [6, 7, 2], // rampart
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [6, 7, 3], // auto-barricade
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [6, 7, 4], // maw
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [6, 7, 5], // electrocutor
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [6, 7, 6], // clasp
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [6, 7, 7], // fortifier
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [6, 7, 8], // propper
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [6, 7, 9], // bent barricade
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [6, 6, 0, 0], // warkwarkwark
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [6, 6, 0, 1], // warkwarkwark
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [6, 6, 0, 2], // auto warkwark
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [6, 6, 0, 3], // waarrkwaarrk
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [6, 6, 0, 5], // warkwawawark
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [6, 6, 0, 0], // warkwarkwark
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [6, 6, 0, 5], // double equalizer
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [6, 6, 0, 7], // sealer
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    },
    {
        tanks: [6, 6, 0, 8], // setup
        stats: [[0, 3], [1, 3], [5, 9], [4, 9], [6, 9], [7, 9]],
        growth_extended_upgrades_order_to_max: [2, 7, 1, 0, 8, 9],
        autospin: true,
        pathfinding_facing_angle_offset: 0
    }
];
// WebSocket queries info
let t = Math.round(Date.now() / 1000) - 20000;
let b = "55421c1a490e9153";
let first_packet_msg_verify = [0, 1, 0, 1, 42, 12, 220, 3, 209, 149, 167, 126];
let public_key = [
    238, 53, 4, 127, 114, 238, 165, 218, 156, 37, 9, 44, 119, 178, 145, 149, 
    1, 34, 65, 209, 224, 209, 38, 65, 62, 8, 161, 154, 101, 46, 216, 22
];
// Bot following to coordinate config
let followbot_config = {
    range: 60,
    dist: 60
};
// Discord info (token & channel ID)
let token = "";
let channel = "";
// VPS data 
let vps_data = [
    {
        host: "",
        user: "",
        password: "",
        work_dir: "/root/[DIR]",
        endpoint_name: "[DIR]"
    },
];
// Codespace data
let codespace_data = [
    // example
    {
        "name": "fuzzy-meme-r4j9g9566rpw3cp4q",
        "token": "ghp_Td5lYZssxWzYG6vEhRHH977CyOk55G2wGKui",
        "repository_name": "repository"
    },
];

// This is just a util but I'm not making a separate file lol
async function send_discord_message(text, reply = false) {
    let content = { content: text };
    if (reply) content.message_reference = { channel_id: channel, message_id: reply };
    let retry_delay = 1000;
    while (true) {
        try {
            let response = await fetch(`https://discord.com/api/v9/channels/${channel}/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify(content)
            });
            if (response.ok) return await response.json();
            if (response.status == 429) {
                let error_data = await response.json();
                let wait_time = (error_data.retry_after * 1000) || retry_delay;
                await new Promise(resolve => setTimeout(resolve, wait_time));
                continue;
            }
            if (response.status >= 400 && response.status < 500) {
                let error_data = await response.text();
                throw new Error(`Fatal Client Error (${response.status}): ${error_data}`);
            }
            await new Promise(resolve => setTimeout(resolve, retry_delay));
        } catch (error) {
            if (error.message.includes('Fatal Client Error')) throw error;
            await new Promise(resolve => setTimeout(resolve, retry_delay));
        }
        retry_delay = Math.min(retry_delay * 2, 15000);
    }
}
return [proxies, replace_workers, fetch_proxy, bot_names, bot_messages, randomize_names, user_agent, bot_pathfind, bot_upgrades_normal, bot_upgrades_ar, t, b, first_packet_msg_verify, public_key, followbot_config, token, channel, vps_data, codespace_data, send_discord_message];
})();
