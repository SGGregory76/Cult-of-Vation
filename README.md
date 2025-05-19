# Cult-of-Vation
A blogger based drug simulator designed and developed by Shane Gregory
{
  "structure": {
    "index.html": "Game entry point",
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
      "player.json": "Initial player state",
      "items.json": "All item definitions",
      "npcs.json": "NPC profiles",
      "missions.json": "Mission definitions",
      "zones.json": "Zone layout and unlocks"
    },
    "assets/": {
      "icons/": "Icons for inventory, NPCs, etc."
    }
  },
  "readme": "Create each folder/file with matching paths in GitHub. Load JSON using fetch in loader.js and connect to index.html via <script>."
}
