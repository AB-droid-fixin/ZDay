
/* =========================
   PRINCESS PINK BIRTHDAY
   THREE-LEVEL ROYAL QUEST
   ========================= */
const trumpetSound = document.getElementById("trumpetSound");

// Play the trumpet once when the page first opens
window.addEventListener("load", function () {
  trumpetSound.currentTime = 0;

  trumpetSound.play().catch(function () {
    // Some browsers block audio until the visitor interacts.
  });
}, { once: true });

function stopTrumpet() {
  trumpetSound.pause();
  trumpetSound.currentTime = 0;
}
// Screens
const welcomeScreen = document.getElementById("welcomeScreen");
const invitationScreen = document.getElementById("invitationScreen");
const gameScreen = document.getElementById("gameScreen");
const revealScreen = document.getElementById("revealScreen");

// Buttons
const enterButton = document.getElementById("enterButton");
const gameButton = document.getElementById("gameButton");
const revealButton = document.getElementById("revealButton");
const celebrateButton = document.getElementById("celebrateButton");
const musicButton = document.getElementById("musicButton");

// Music
const birthdayMusic = document.getElementById("birthdayMusic");

// Game elements
const levelLabel = document.getElementById("levelLabel");
const gameTitle = document.getElementById("gameTitle");
const gameDescription = document.getElementById("gameDescription");
const jewelCount = document.getElementById("jewelCount");
const jewelTarget = document.getElementById("jewelTarget");
const jewelField = document.getElementById("jewelField");
const gameMessage = document.getElementById("gameMessage");

// Effects
const sparkleLayer = document.getElementById("sparkleLayer");
const confettiLayer = document.getElementById("confettiLayer");

// Customize the birthday details here.
const birthday = {
  name: "Sophia",
  age: 7
};

// The three game levels.
const levels = [
  {
    title: "The Jewel Garden",
    description: "Collect 2 magical jewels to continue your adventure!",
    target: 2,
    treasure: ["💎", "💖", "💎", "🌸", "💖"]
  },
  {
    title: "The Royal Keys",
    description: "Find 5 golden keys to unlock the castle gate!",
    target: 5,
    treasure: ["🔑", "✨", "🔑", "🗝️", "🔑", "✨", "🔑"]
  },
  {
    title: "The Princess Crown",
    description: "Collect 4 royal stars to earn your birthday surprise!",
    target: 4,
    treasure: ["⭐", "💎", "💖", "⭐", "🔑", "🔑", "⭐", "🌸", "💖", "⭐"]
  }
];

let currentLevel = 0;
let collectedCount = 0;

// Show a screen.
function showScreen(screenToShow) {
  const screens = [
    welcomeScreen,
    invitationScreen,
    gameScreen,
    revealScreen
  ];

  screens.forEach(function (screen) {
    screen.classList.remove("active");
  });

  screenToShow.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Start the background music.
async function startMusic() {
  try {
    await birthdayMusic.play();
    musicButton.textContent = "♫ Pause Music";
  } catch (error) {
    musicButton.textContent = "♫ Play Music";
    console.log("Click Play Music to start the soundtrack.");
  }
}

// Music toggle.
musicButton.addEventListener("click", async function () {
  if (birthdayMusic.paused) {
    await startMusic();
  } else {
    birthdayMusic.pause();
    musicButton.textContent = "♫ Play Music";
  }
});

// Welcome -> Invitation.
enterButton.addEventListener("click", function () {
  showScreen(invitationScreen);
  startMusic();
});

// Invitation -> Level 1.
gameButton.addEventListener("click", function () {
  stopTrumpet();

  currentLevel = 0;
  startLevel();
  showScreen(gameScreen);
});

// Set up the current level.
function startLevel() {
  const level = levels[currentLevel];

  collectedCount = 0;

  levelLabel.textContent =
    "LEVEL " + (currentLevel + 1) + " OF " + levels.length;

  gameTitle.textContent = level.title;
  gameDescription.textContent = level.description;
  jewelCount.textContent = collectedCount;
  jewelTarget.textContent = level.target;

  gameMessage.textContent = "Tap each treasure to collect it!";
  revealButton.classList.add("hidden");

  if (currentLevel === levels.length - 1) {
    revealButton.textContent = "Reveal Birthday Surprise 🎂";
  } else {
    revealButton.textContent = "Continue to Next Level ✨";
  }

  // Clear the previous level's treasures.
  jewelField.innerHTML = "";

  // Create the treasures for this level.
  level.treasure.forEach(function (treasure) {
    const button = document.createElement("button");

    button.className = "jewel";
    button.type = "button";
    button.textContent = treasure;
    button.setAttribute("aria-label", "Collect " + treasure);

    button.addEventListener("click", function () {
      collectTreasure(button, level);
    });

    jewelField.appendChild(button);
  });
}

// Collect a treasure.
function collectTreasure(button, level) {
  if (button.disabled) {
    return;
  }

  button.disabled = true;
  button.classList.add("collected");
  button.setAttribute("aria-label", "Treasure collected");

  collectedCount++;
  jewelCount.textContent = collectedCount;

  if (collectedCount < level.target) {
    gameMessage.textContent = "Wonderful! Keep collecting! ✨";
  } else {
    gameMessage.textContent =
      "Level complete! You did it, princess! 💖";

    revealButton.classList.remove("hidden");
    createConfetti(35);
  }
}

// Continue to the next level or reveal the birthday surprise.
revealButton.addEventListener("click", function () {
  if (collectedCount < levels[currentLevel].target) {
    return;
  }

  if (currentLevel < levels.length - 1) {
    currentLevel++;
    startLevel();
  } else {
    const birthdayHeading =
      document.getElementById("birthdayHeading");

    birthdayHeading.textContent =
      "Happy " + birthday.age + "th Birthday, " + birthday.name + "!";

    showScreen(revealScreen);
    createConfetti(120);
  }
});

// Celebrate again.
celebrateButton.addEventListener("click", function () {
  createConfetti(100);
});

// Create floating sparkles.
function createSparkles() {
  const symbols = ["✦", "✧", "⋆", "✨"];

  for (let i = 0; i < 35; i++) {
    const sparkle = document.createElement("span");

    sparkle.className = "sparkle";
    sparkle.textContent =
      symbols[Math.floor(Math.random() * symbols.length)];

    sparkle.style.left = Math.random() * 100 + "%";
    sparkle.style.top = Math.random() * 100 + "%";
    sparkle.style.fontSize = 10 + Math.random() * 16 + "px";
    sparkle.style.setProperty(
      "--duration",
      3 + Math.random() * 5 + "s"
    );
    sparkle.style.animationDelay = Math.random() * 5 + "s";

    sparkleLayer.appendChild(sparkle);
  }
}

// Create falling confetti.
function createConfetti(amount) {
  const colors = [
    "#ff9ed2",
    "#ffd6eb",
    "#ffe7a3",
    "#ffffff",
    "#d9b7ff",
    "#ff75b9"
  ];

  for (let i = 0; i < amount; i++) {
    const piece = document.createElement("span");

    piece.className = "confetti";
    piece.style.left = Math.random() * 100 + "%";
    piece.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = Math.random() * 1.5 + "s";
    piece.style.animationDuration = 2.5 + Math.random() * 2 + "s";

    confettiLayer.appendChild(piece);

    window.setTimeout(function () {
      piece.remove();
    }, 6000);
  }
}

// Initialize sparkles.
createSparkles();
