// Game State
const gameState = {
    stress: 50,
    energy: 75,
    grades: 70,
    timeOfDay: 0, // 0=morning, 1=school, 2=afternoon, 3=evening
    sceneIndex: 0,
    dayComplete: false
};

const times = ["🌅 Morning (7:00 AM)", "🏫 School (9:00 AM)", "🌤️ Afternoon (2:00 PM)", "🌙 Evening (7:00 PM)"];
const characters = ["😴", "😊", "😐", "😴"];

const scenes = [
    {
        time: 0,
        character: "😴",
        dialogue: "Your alarm goes off. You have 30 minutes to get ready. What do you do?",
        choices: [
            { text: "Sleep 10 more minutes", stress: -5, energy: 5, grades: -5 },
            { text: "Get up immediately and exercise", stress: -10, energy: -5, grades: 5 },
            { text: "Have a healthy breakfast", stress: -8, energy: 10, grades: 3 }
        ]
    },
    {
        time: 1,
        character: "😊",
        dialogue: "You arrive at school. You have a test today. What's your approach?",
        choices: [
            { text: "Chat with friends before class", stress: -10, energy: -5, grades: -15 },
            { text: "Review notes quickly", stress: -5, energy: -10, grades: 20 },
            { text: "Relax and don't worry about it", stress: -15, energy: 5, grades: -10 }
        ]
    },
    {
        time: 2,
        character: "😐",
        dialogue: "It's afternoon. You're feeling tired. How do you spend your time?",
        choices: [
            { text: "Play video games", stress: -15, energy: -10, grades: -10 },
            { text: "Work on homework", stress: 10, energy: -15, grades: 25 },
            { text: "Take a nap", stress: -10, energy: 20, grades: -5 }
        ]
    },
    {
        time: 3,
        character: "😴",
        dialogue: "Evening approaches. How do you end your day?",
        choices: [
            { text: "Stay up late on phone", stress: 5, energy: -20, grades: -5 },
            { text: "Study for tomorrow's classes", stress: 15, energy: -15, grades: 30 },
            { text: "Sleep early for good rest", stress: -10, energy: 30, grades: 5 }
        ]
    }
];

const randomEvents = [
    {
        title: "Pop Quiz!",
        description: "Your teacher announces a surprise pop quiz!",
        choices: [
            { text: "Try your best", stress: 10, energy: -5, grades: 15 },
            { text: "Panic and rush", stress: 20, energy: -10, grades: -5 }
        ]
    },
    {
        title: "Friend Drama 😬",
        description: "Your friend is upset about something you said.",
        choices: [
            { text: "Apologize and help them", stress: 5, energy: -5, grades: -3 },
            { text: "Ignore it", stress: 15, energy: 5, grades: 0 }
        ]
    },
    {
        title: "Free Time Surprise ✨",
        description: "You found an extra 30 minutes of free time!",
        choices: [
            { text: "Do homework", stress: -5, energy: -5, grades: 20 },
            { text: "Chill and relax", stress: -15, energy: 10, grades: 0 }
        ]
    },
    {
        title: "Caffeine Boost ☕",
        description: "Someone offers you coffee/energy drink.",
        choices: [
            { text: "Accept it", stress: 10, energy: 15, grades: 5 },
            { text: "Decline", stress: 0, energy: 0, grades: 0 }
        ]
    }
];

function updateStats(stress, energy, grades) {
    gameState.stress = Math.max(0, Math.min(100, gameState.stress + stress));
    gameState.energy = Math.max(0, Math.min(100, gameState.energy + energy));
    gameState.grades = Math.max(0, Math.min(100, gameState.grades + grades));
    renderStats();
}

function renderStats() {
    document.getElementById('stressValue').textContent = gameState.stress + '%';
    document.getElementById('energyValue').textContent = gameState.energy + '%';
    document.getElementById('gradesValue').textContent = gameState.grades + '%';

    document.getElementById('stressBar').style.width = gameState.stress + '%';
    document.getElementById('energyBar').style.width = gameState.energy + '%';
    document.getElementById('gradesBar').style.width = gameState.grades + '%';
}

function renderScene() {
    if (gameState.timeOfDay >= scenes.length) {
        showDayEnd();
        return;
    }

    const scene = scenes[gameState.timeOfDay];
    document.getElementById('timeLabel').textContent = times[gameState.timeOfDay];
    document.getElementById('characterFace').textContent = scene.character;
    document.getElementById('dialogue').textContent = scene.dialogue;

    const choicesContainer = document.getElementById('choices');
    choicesContainer.innerHTML = '';

    scene.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.className = 'choice-btn';
        button.textContent = choice.text;
        button.onclick = () => makeChoice(choice, index);
        choicesContainer.appendChild(button);
    });
}

function makeChoice(choice, index) {
    // 30% chance of random event
    if (Math.random() < 0.3) {
        showRandomEvent(choice);
    } else {
        applyChoice(choice);
    }
}

function applyChoice(choice) {
    updateStats(choice.stress, choice.energy, choice.grades);
    gameState.timeOfDay++;
    renderScene();
}

function showRandomEvent(baseChoice) {
    const event = randomEvents[Math.floor(Math.random() * randomEvents.length)];
    const popup = document.getElementById('eventPopup');

    document.getElementById('eventTitle').textContent = event.title;
    document.getElementById('eventDescription').textContent = event.description;

    const buttonsContainer = document.getElementById('eventButtons');
    buttonsContainer.innerHTML = '';

    event.choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice.text;
        button.onclick = () => {
            updateStats(
                baseChoice.stress + choice.stress,
                baseChoice.energy + choice.energy,
                baseChoice.grades + choice.grades
            );
            popup.style.display = 'none';
            gameState.timeOfDay++;
            renderScene();
        };
        buttonsContainer.appendChild(button);
    });

    popup.style.display = 'block';
}

function showDayEnd() {
    const sceneCard = document.getElementById('sceneCard');
    sceneCard.innerHTML = `
        <div style="text-align: center;">
            <div class="character-face" style="font-size: 8rem;">⭐</div>
            <h2 style="margin: 30px 0; font-size: 2.5rem;">Day Complete!</h2>
            <div style="font-size: 1.3rem; line-height: 2; margin: 40px 0;">
                <p><strong>Final Stress Level:</strong> ${gameState.stress}%</p>
                <p><strong>Final Energy Level:</strong> ${gameState.energy}%</p>
                <p><strong>Final Grades:</strong> ${gameState.grades}%</p>
            </div>
            <button class="choice-btn" onclick="location.reload()" style="margin-top: 30px; padding: 20px 40px; font-size: 1.2rem;">
                Play Again
            </button>
        </div>
    `;
}

// Initialize game
renderStats();
renderScene();
