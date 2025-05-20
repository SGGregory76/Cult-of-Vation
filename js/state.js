// state.js - applies effects and game mechanics

function applyEffects(effects) {
  for (const stat in effects) {
    updateStat(stat, effects[stat]);
  }
}

function checkLevelUp() {
  const state = loadPlayerState();
  const xp = state.exp || 0;
  const level = state.level || 1;
  const nextLevelXp = level * 100;

  if (xp >= nextLevelXp) {
    state.level = level + 1;
    state.exp = xp - nextLevelXp;
    updateStat("cash", 50); // Bonus for leveling up
    updateStat("energy", 1);
    addPerk("Level Up Reward");
    savePlayerState(state);
    console.log(`🎉 Level Up! You are now level ${state.level}`);
  }
}
