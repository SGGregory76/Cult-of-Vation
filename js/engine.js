// engine.js - Universal Blogger Game Loader

function initGamePage(fileKey) {
  const container = document.getElementById("game-root");
  if (!container) return;

  container.innerHTML = `<p>📦 Loading...</p>`;
  const jsonUrl = `https://sggregory76.github.io/Cult-of-Vation/data/${fileKey}.json`;

  fetch(jsonUrl)
    .then(res => {
      if (!res.ok) throw new Error("File not found: " + fileKey);
      return res.json();
    })
    .then(data => renderGameBlock(data))
    .catch(err => {
      container.innerHTML = `<p style='color:red;'>❌ ${err.message}</p>`;
    });
}

function renderGameBlock(data) {
  const container = document.getElementById("game-root");
  container.innerHTML = "";

  // Optional title
  if (data.title) {
    const title = document.createElement("h2");
    title.textContent = data.title;
    container.appendChild(title);
  }

  // Render dialogue
  if (data.dialogue) {
    const dlg = document.createElement("div");
    dlg.className = "dialogue-box";
    dlg.innerHTML = `<p>${data.dialogue}</p>`;
    container.appendChild(dlg);
  }

  // Render choices
  if (data.choices) {
    const choiceBox = document.createElement("div");
    choiceBox.className = "choice-box";

    Object.entries(data.choices).forEach(([key, obj]) => {
      const btn = document.createElement("button");
      btn.className = "choice-btn";
      btn.textContent = obj.label || key;
      btn.onclick = () => {
        container.innerHTML = `
          <p>✅ ${obj.response}</p>
          <p>🎁 ${obj.reward || "No reward"}</p>
        `;
      };
      choiceBox.appendChild(btn);
    });

    container.appendChild(choiceBox);
  }
}
