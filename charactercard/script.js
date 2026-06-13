// Character object
const character = {
    name: "Snortleblat",
    class: "Swamp Beast Diplomat",
    level: 1,
    health: 100,
    image: "https://andejuli.github.io/wdd131/character_card/snortleblat.webp",
    
    attacked() {
        this.health -= 20;
        if (this.health < 0) {
            this.health = 0;
        }
        return this.health;
    },
    
    levelUp() {
        this.level += 1;
    }
};

// DOM Elements
const characterName = document.getElementById("character-name");
const characterClass = document.getElementById("character-class");
const characterLevel = document.getElementById("character-level");
const characterHealth = document.getElementById("character-health");
const healthFill = document.getElementById("health-fill");
const attackBtn = document.getElementById("attack-btn");
const levelupBtn = document.getElementById("levelup-btn");
const messageDiv = document.getElementById("message");

// Initialize display
function updateDisplay() {
    characterName.textContent = character.name;
    characterClass.textContent = character.class;
    characterLevel.textContent = character.level;
    characterHealth.textContent = character.health;
    
    // Update health bar
    const healthPercentage = character.health;
    healthFill.style.width = healthPercentage + "%";
    
    // Change health bar color based on health level
    if (character.health > 50) {
        healthFill.style.background = "linear-gradient(90deg, #51cf66 0%, #40c057 100%)";
    } else if (character.health > 25) {
        healthFill.style.background = "linear-gradient(90deg, #ffd43b 0%, #f8b500 100%)";
    } else {
        healthFill.style.background = "linear-gradient(90deg, #ff6b6b 0%, #ee5a52 100%)";
    }
}

// Attack button handler
attackBtn.addEventListener("click", () => {
    character.attacked();
    updateDisplay();
    
    if (character.health <= 0) {
        messageDiv.textContent = "☠️ " + character.name + " has died!";
        messageDiv.className = "message death";
        attackBtn.disabled = true;
        levelupBtn.disabled = true;
    } else {
        messageDiv.textContent = character.name + " was attacked! Health: " + character.health;
        messageDiv.className = "message attack";
    }
});

// Level up button handler
levelupBtn.addEventListener("click", () => {
    character.levelUp();
    updateDisplay();
    messageDiv.textContent = character.name + " reached level " + character.level + "!";
    messageDiv.className = "message levelup";
});

// Initial display
updateDisplay();
