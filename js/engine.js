// engine.js

// Apply stat effects to the player state and log the results
function applyEffects(effects = {}) {
  const state = getPlayerState();
  const logs = [];

  if (effects.cash) {
    state.cash = (state.cash || 0) + effects.cash;
    logs.push(`💰 Cash ${effects.cash >= 0 ? '+' : ''}${effects.cash}`);
  }
  if (effects.rep) {
    state.rep = (state.rep || 0) + effects.rep;
    logs.push(`⭐ Rep ${effects.rep >= 0 ? '+' : ''}${effects.rep}`);
  }
  if (effects.heat) {
    state.heat = (state.heat || 0) + effects.heat;
    logs.push(`🔥 Heat ${effects.heat >= 0 ? '+' : ''}${effects.heat}`);
  }
  if (effects.energy) {
    state.energy = (state.energy || 0) + effects.energy;
    logs.push(`⚡ Energy ${effects.energy >= 0 ? '+' : ''}${effects.energy}`);
  }
  if (effects.hp) {
    state.hp = (state.hp || 0) + effects.hp;
    logs.push(`❤️ HP ${effects.hp >= 0 ? '+' : ''}${effects.hp}`);
  }
  if (effects.atk) {
    state.atk = (state.atk || 0) + effects.atk;
    logs.push(`🗡️ ATK ${effects.atk >= 0 ? '+' : ''}${effects.atk}`);
  }
  if (effects.def) {
    state.def = (state.def || 0) + effects.def;
    logs.push(`🛡️ DEF ${effects.def >= 0 ? '+' : ''}${effects.def}`);
  }

  if (Array.isArray(effects.flags)) {
    effects.flags.forEach(flag => setFlag(flag));
    logs.push(`🏁 Flags: ${effects.flags.join(', ')}`);
  }

  savePlayerState(state);
  appendToLog(logs.join(' | '));
  updateStatDisplay();
}

// Initialize player from external profile
async function initFromJson(url) {
  const res = await fetch(url);
  const profile = await res.json();

  savePlayerState(profile.startingStats || {});
  localStorage.setItem('flags', JSON.stringify(profile.flags || []));
  localStorage.setItem('abilities', JSON.stringify(profile.abilities || {}));
  localStorage.setItem('perks', JSON.stringify(profile.perks || []));
  localStorage.setItem('inventory', JSON.stringify(profile.inventory || []));
  localStorage.setItem('loadout', JSON.stringify(profile.loadout || {}));

  appendToLog('🧬 Player initialized from profile.');
  updateStatDisplay();
}

// Manage persistent flags
function setFlag(flag) {
  const flags = getPlayerFlags();
  if (!flags.includes(flag)) {
    flags.push(flag);
    localStorage.setItem('flags', JSON.stringify(flags));
  }
}

function getFlag(flag) {
  return getPlayerFlags().includes(flag);
}

function getPlayerFlags() {
  const stored = localStorage.getItem('flags');
  return stored ? JSON.parse(stored) : [];
}

// Helpers for player state storage
function getPlayerState() {
  const stored = localStorage.getItem('player');
  return stored ? JSON.parse(stored) : {};
}

function savePlayerState(state) {
  localStorage.setItem('player', JSON.stringify(state));
}

// Append a message to the log
function appendToLog(message) {
  const logs = getGameLog();
  logs.unshift({ time: new Date().toISOString(), message });
  localStorage.setItem('log', JSON.stringify(logs.slice(0, 50)));
}

function getGameLog() {
  const stored = localStorage.getItem('log');
  return stored ? JSON.parse(stored) : [];
}

// Update stats preview UI if present
function updateStatDisplay() {
  const state = getPlayerState();
  if (document.getElementById('stat-cash')) {
    document.getElementById('stat-cash').innerText = state.cash || 0;
  }
  if (document.getElementById('stat-rep')) {
    document.getElementById('stat-rep').innerText = state.rep || 0;
  }
  if (document.getElementById('stat-heat')) {
    document.getElementById('stat-heat').innerText = state.heat || 0;
  }
  if (document.getElementById('stat-energy')) {
    document.getElementById('stat-energy').innerText = state.energy || 0;
  }
  if (document.getElementById('stat-hp')) {
    document.getElementById('stat-hp').innerText = state.hp || 0;
  }
  if (document.getElementById('stat-atk')) {
    document.getElementById('stat-atk').innerText = state.atk || 0;
  }
  if (document.getElementById('stat-def')) {
    document.getElementById('stat-def').innerText = state.def || 0;
  }
}
