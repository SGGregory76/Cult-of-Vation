
// loader.js – Loads external JSON game data and provides access functions

const GameData = {
  player: {},
  items: {},
  npcs: {},
  missions: {},
  zones: {}
};

async function loadGameData() {
  const files = ["player", "items", "npcs", "missions", "zones"];
  const folder = "data";

  for (const name of files) {
    try {
      const res = await fetch(`${folder}/${name}.json`);
      const data = await res.json();
      GameData[name] = Array.isArray(data) ? indexById(data) : data;
    } catch (err) {
      console.error(`Error loading ${name}:`, err);
    }
  }

  console.log("✅ GameData Loaded", GameData);
  return GameData;
}

function indexById(array) {
  return array.reduce((acc, obj) => {
    if (obj.id) acc[obj.id] = obj;
    return acc;
  }, {});
}

// Example usage:
// await loadGameData();
// console.log(GameData.player, GameData.npcs["maya"]);
