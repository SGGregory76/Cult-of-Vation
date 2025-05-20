<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Maya Encounter</title>
  <link rel="stylesheet" href="https://sggregory76.github.io/Cult-of-Vation/css/style.css">
  <script src="https://sggregory76.github.io/Cult-of-Vation/js/loader.js"></script>
  <script src="https://sggregory76.github.io/Cult-of-Vation/js/state.js"></script>
  <script src="https://sggregory76.github.io/Cult-of-Vation/js/engine.js"></script>
</head>
<body>
  <h1>🌒 Maya's Encounter</h1>

  <div class="content">
    <div id="dialogue"></div>
    <button id="nextBtn" class="link-btn">➡️ Next</button>
    <div id="choices" style="display:none"></div>
    <div id="result" class="content" style="display:none"></div>
  </div>

  <script>
    let currentLine = 0;
    const dialogueData = {
      "dialogue": [
        "*Knocks on your window.*",
        "Still breathing in there? Good. I wasn't sure if you were dead or just broke.",
        "You don’t remember me, huh? Figures. Too much smoke, too little sleep.",
        "Name’s Maya. You were smart once. Now you’re parked on a turf line with no stash, no crew, and a phone that looks stomped.",
        "I tossed you something green. Sell it, smoke it, or give it back. Your move."
      ],
      "choices": {
        "sell": {
          "label": "💵 Sell it",
          "response": "You flip the bag for $20. Maya fades into the alley.",
          "reward": "+💰 $20 | 📱 Burner OS Acquired",
          "effects": { "cash": 20, "rep": 2, "heat": 1 },
          "item": "Used Burner",
          "perk": "Hustler",
          "flags": ["intro_complete", "maya_mission_unlocked"]
        },
        "give": {
          "label": "🤝 Give it to Maya",
          "response": "Maya smirks. 'You might make it after all.'",
          "reward": "+⭐ REP 10 | 📱 Burner OS Acquired",
          "effects": { "rep": 10, "cash": 5 },
          "item": "Used Burner",
          "perk": "Loyal",
          "flags": ["intro_complete", "maya_mission_unlocked"]
        },
        "smoke": {
          "label": "🚬 Smoke it",
          "response": "You light up. Maya just walks away.",
          "reward": "+🔥 Heat 2 | 📱 Burner OS Acquired | -1 ⚡ Energy",
          "effects": { "heat": 2, "energy": -1, "rep": 1 },
          "item": "Used Burner",
          "perk": "Drifter",
          "flags": ["intro_complete", "maya_mission_unlocked"]
        },
        "nothing": {
          "label": "... Say nothing",
          "response": "You say nothing. Maya walks off in silence.",
          "reward": "+⚡ Energy 1 | 📱 Burner OS Acquired",
          "effects": { "energy": 1, "rep": 3 },
          "item": "Used Burner",
          "perk": "Silent Start",
          "flags": ["intro_complete", "maya_mission_unlocked"]
        }
      }
    };

    async function startIntro() {
      await initFromJson("https://sggregory76.github.io/Cult-of-Vation/data/player-init.json");
      showDialogue();
    }

    function showDialogue() {
      const dialogue = document.getElementById("dialogue");
      if (currentLine < dialogueData.dialogue.length) {
        const entry = dialogueData.dialogue[currentLine];
        dialogue.innerHTML = `<p>💬 ${typeof entry === 'string' ? entry : entry.text}</p>`;
        currentLine++;
      } else {
        document.getElementById("nextBtn").style.display = "none";
        showChoices();
      }
    }

    function showChoices() {
      const choiceContainer = document.getElementById("choices");
      choiceContainer.innerHTML = "";
      console.log("Rendering choices:", dialogueData.choices);
      for (const key in dialogueData.choices) {
        const choice = document.createElement("button");
        choice.className = "link-btn";
        choice.textContent = dialogueData.choices[key].label;
        choice.setAttribute("data-choice", key);
        choice.addEventListener("click", (e) => {
          const selected = e.target.getAttribute("data-choice");
          handleChoice(selected);
        });
        choiceContainer.appendChild(choice);
      }
      choiceContainer.style.display = "block";
    }

    function handleChoice(choiceKey) {
      console.log("CHOICE MADE:", choiceKey);
      const result = dialogueData.choices[choiceKey];
      if (!result) {
        console.error("Choice key not found in dialogueData.choices:", choiceKey);
        return;
      }
      console.log("Confirmed selection:", result);

      if (result.effects) applyEffects(result.effects);
      if (result.item) addInventoryItem(result.item);
      if (result.perk) addPerk(result.perk);
      if (result.flags) result.flags.forEach(flag => setFlag(flag));

      checkLevelUp();

      const resultBox = document.getElementById("result");
      let output = `<p>🗨️ ${result.response}</p><p>🎁 ${result.reward}</p>`;

      if (result.item) {
        output += `<p>🎒 Inventory Gain: <strong>${result.item}</strong></p>`;
      }
      if (result.perk) {
        output += `<p>🧠 New Perk: <strong>${result.perk}</strong></p>`;
      }

      const stats = getPlayerStats();
      output += `<p>📊 Stats: 💰 ${stats.cash} | ⭐ ${stats.rep} | 🔥 ${stats.heat} | ⚡ ${stats.energy}</p>`;

      resultBox.innerHTML = output;
      resultBox.style.display = "block";
      document.getElementById("choices").style.display = "none";

      setTimeout(() => {
        window.location.href = "https://sggregory76.github.io/Cult-of-Vation/index.html";
      }, 3000);
    }

    document.getElementById("nextBtn").addEventListener("click", showDialogue);
    window.onload = startIntro;
  </script>
</body>
</html>
