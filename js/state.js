// state.js – Manages player state, stat updates, save/load logic

let PlayerState = {};

function initPlayerState(data = null) {
  if (data) {
    PlayerState = JSON.parse(JSON.stringify(data));
  } else if (localStorage.getItem("player_save")) {
    PlayerState = JSON.parse(localStorage.getItem("player_save"));
  } else {
    PlayerState = JSON.parse(JSON.stringify(GameData.player));
  }
  console.log("🎮 Player State Initialized", PlayerState);
  return PlayerState;
}

function savePlayerState() {
  localStorage.setItem("player_save", JSON.stringify(PlayerState));
  console.log("💾 Player State Saved");
}

function updateStat(stat, value) {
  if (PlayerState.hasOwnProperty(stat)) {
    PlayerState[stat] += value;
    console.log(`🔁 Updated ${stat} by ${value} →`, PlayerState[stat]);
    savePlayerState();
  }
}

function setFlag(flag, val = true) {
  PlayerState.flags[flag] = val;
  console.log(`🚩 Flag set: ${flag} = ${val}`);
  savePlayerState();
}

function addInventory(item) {
  PlayerState.inventory.push(item);
  console.log(`🎒 Added to inventory: ${item}`);
  savePlayerState();
}

function hasFlag(flag) {
  return !!PlayerState.flags[flag];
}

function hasItem(itemId) {
  return PlayerState.inventory.includes(itemId);
}

function getStat(stat) {
  return PlayerState[stat] || 0;
}

