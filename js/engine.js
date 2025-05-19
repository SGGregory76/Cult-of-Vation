// engine.js – Applies effects from game data (items, missions, etc.)

/**
 * Applies a set of effects to the player based on any action source
 * @param {Object} effects – effects object (e.g., { cash: 50, rep: 10, flag: "met_maya" })
 */
function applyEffects(effects) {
  for (const key in effects) {
    const value = effects[key];

    if (key === "flag") {
      setFlag(value);
    } else if (key === "flags" && Array.isArray(value)) {
      value.forEach(flag => setFlag(flag));
    } else if (key === "item") {
      addInventory(value);
    } else if (key === "items" && Array.isArray(value)) {
      value.forEach(item => addInventory(item));
    } else {
      updateStat(key, value);
    }
  }
}

/**
 * Consumes an item and applies its defined effect
 * @param {string} itemId – the id of the item (must exist in GameData.items)
 * @param {string} action – "smoke", "sell", "give", etc.
 */
function useItem(itemId, action) {
  const item = GameData.items[itemId];
  if (!item || !item.actions || !item.actions[action]) return;

  console.log(`🧪 Using ${item.name} with action: ${action}`);
  applyEffects(item.actions[action]);

  // Remove item from inventory after use
  const index = PlayerState.inventory.indexOf(itemId);
  if (index !== -1) PlayerState.inventory.splice(index, 1);
  savePlayerState();
}

/**
 * Claims mission reward if requirements met
 * @param {string} missionId
 */
function completeMission(missionId) {
  const mission = GameData.missions[missionId];
  if (!mission || PlayerState.flags[missionId]) return;

  console.log(`🎯 Completing mission: ${mission.name}`);
  applyEffects(mission.rewards);
  setFlag(missionId);
  savePlayerState();
}
