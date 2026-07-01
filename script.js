let stress = 50;
let energy = 50;
let grades = 50;

function startGame() {
  updateUI("Game started! Make your first choice.");
}

function choose(option) {

  if (option === "study") {
    stress += 10;
    energy -= 10;
    grades += 15;
    updateUI("You studied hard.");
  }

  if (option === "relax") {
    stress -= 10;
    energy += 10;
    updateUI("You took a break.");
  }

  if (option === "game") {
    stress += 10;
    energy += 5;
    grades -= 10;
    updateUI("You played games.");
  }

  clamp();
  updateStats();
  checkEnding();
}

function clamp() {
  stress = Math.max(0, Math.min(100, stress));
  energy = Math.max(0, Math.min(100, energy));
  grades = Math.max(0, Math.min(100, grades));
}

function updateStats() {
  document.getElementById("stress").innerText = stress;
  document.getElementById("energy").innerText = energy;
  document.getElementById("grades").innerText = grades;
}

function updateUI(text) {
  const box = document.getElementById("game-output");
  box.style.display = "block";
  box.innerHTML = `<h3>${text}</h3>`;
}

function checkEnding() {
  const box = document.getElementById("game-output");

  if (stress >= 80) {
    box.innerHTML += "<p>🔥 Burnout Ending</p>";
  }

  if (grades >= 80) {
    box.innerHTML += "<p>🎓 Academic Ending</p>";
  }

  if (energy <= 20) {
    box.innerHTML += "<p>😴 Exhausted Ending</p>";
  }
}
