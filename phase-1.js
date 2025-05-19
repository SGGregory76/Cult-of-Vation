{
  "structure": {
    "index.html": "Game entry point with Burner OS loader or intro scene",
    "css/": {
      "style.css": "Global styles for UI and layout"
    },
    "js/": {
      "engine.js": "Handles core logic: apply effects, progress state",
      "loader.js": "Loads JSON data (npcs, items, missions, etc.)",
      "missions.js": "Controls mission requirements, steps, and rewards",
      "npc.js": "NPC behavior, mood, loyalty, inventory",
      "state.js": "Manages player state, save/load, flags"
    },
    "data/": {
      "player.json": {
        "alias": "Ghost",
        "level": 1,
        "xp": 0,
        "xpToNext": 100,
        "hp": 80,
        "maxHp": 80,
        "energy": 5,
        "maxEnergy": 5,
        "rep": 0,
        "heat": 0,
        "cash": 0,
        "rp": 0,
        "perks": [],
        "inventory": ["Low-Grade Weed"],
        "contacts": [],
        "flags": {
          "intro_complete": false,
          "met_maya": false,
          "burner_os_unlocked": false
        },
        "location": "car"
      },
      "items.json": [
        {
          "id": "low_weed",
          "name": "Low-Grade Weed",
          "type": "drug",
          "value": 20,
          "actions": {
            "smoke": { "heat": 1, "energy": -1 },
            "sell": { "cash": 20 },
            "give": { "rep": 10, "flag": "met_maya" }
          }
        }
      ],
      "npcs.json": [
        {
          "id": "maya",
          "name": "Maya",
          "mood": "neutral",
          "loyalty": "neutral",
          "trust": 0.5,
          "drugOfChoice": "Speed Pill",
          "inventory": [],
          "flags": { "available": true }
        }
      ],
      "missions.json": [
        {
          "id": "street_debts",
          "name": "Street Debts",
          "giver": "maya",
          "requirements": { "rep": 10, "flags": ["met_maya"] },
          "steps": ["Meet Maya", "Give her a stash or cash", "Return next day"],
          "rewards": { "cash": 100, "rep": 15, "flag": "maya_trusted" },
          "repeatable": false
        }
      ],
      "zones.json": [
        {
          "id": "car",
          "name": "Broken Car",
          "unlocked": true,
          "missions": ["street_debts"],
          "npcs": ["maya"]
        }
      ]
    },
    "assets/": {
      "icons/": "Icons for inventory, NPCs, etc."
    }
  },
  "readme": "Create each folder/file with matching paths in GitHub. Load JSON using fetch in loader.js and connect to index.html via <script>. Player.json defines game start, while loader.js + state.js handle runtime logic."
}
