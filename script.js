const scenes = document.querySelectorAll(".scene");
const progress = document.getElementById("progress");
const sound = document.getElementById("trainSound");
const soundBtn = document.getElementById("soundBtn");

let currentScene = 1;
let soundEnabled = false;

function showScene(number) {
  if (number < 1 || number > scenes.length) return;

  currentScene = number;

  scenes.forEach((scene, index) => {
    scene.classList.toggle("active", index === number - 1);
  });

  progress.textContent =
    `0${number} / 0${scenes.length}`;

  document.body.style.setProperty(
    "--scene",
    number
  );

  if (number === 5) {
    sound.pause();
  } else if (soundEnabled && sound.paused) {
    sound.play().catch(() => {});
  }
}

// Next scene buttons
document.querySelectorAll(".next").forEach(button => {
  button.addEventListener("click", () => {
    showScene(Number(button.dataset.next));
  });
});

// Previous
document.getElementById("previous").addEventListener("click", () => {
  showScene(currentScene - 1);
});

// Continue
document.getElementById("continue").addEventListener("click", () => {
  showScene(currentScene + 1);
});

// Restart
document.getElementById("restart").addEventListener("click", () => {
  showScene(1);
});

// Sound
soundBtn.addEventListener("click", async () => {
  soundEnabled = !soundEnabled;

  if (soundEnabled) {
    try {
      await sound.play();
      soundBtn.textContent = "♫ Sound: On";
    } catch (error) {
      soundEnabled = false;
      soundBtn.textContent = "♫ Sound: Off";
    }
  } else {
    sound.pause();
    soundBtn.textContent = "♫ Sound: Off";
  }
});

// Keyboard navigation
document.addEventListener("keydown", event => {
  if (event.key === "ArrowRight") {
    showScene(currentScene + 1);
  }

  if (event.key === "ArrowLeft") {
    showScene(currentScene - 1);
  }
});

// Star background
const starContainer = document.getElementById("stars");

for (let i = 0; i < 80; i++) {
  const star = document.createElement("span");

  star.style.position = "absolute";
  star.style.width = "2px";
  star.style.height = "2px";
  star.style.background = "white";
  star.style.borderRadius = "50%";
  star.style.left = Math.random() * 100 + "%";
  star.style.top = Math.random() * 100 + "%";
  star.style.opacity = Math.random();
  star.style.animation = `twinkle ${
    1 + Math.random() * 4
  }s infinite alternate`;

  starContainer.appendChild(star);
}

// Twinkle animation
const style = document.createElement("style");
style.textContent = `
@keyframes twinkle {
  from { opacity: .15; }
  to { opacity: 1; }
}`;
document.head.appendChild(style);

showScene(1);
