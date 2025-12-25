const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let dino = {
  x: 50,
  y: 150,
  width: 30,
  height: 30,
  vy: 0,
  jumping: false
};

let obstacle = {
  x: 800,
  y: 150,
  width: 20,
  height: 30
};

let gravity = 0.6;
let score = 0;
let gameOver = false;

function drawDino() {
  ctx.fillStyle = "green";
  ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
}

function drawObstacle() {
  ctx.fillStyle = "black";
  ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
}

function update() {
  if (gameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dino
  dino.y += dino.vy;
  dino.vy += gravity;

  if (dino.y >= 150) {
    dino.y = 150;
    dino.jumping = false;
  }

  // Obstáculo
  obstacle.x -= 5;
  if (obstacle.x < -20) {
    obstacle.x = 800;
    score++;
    document.getElementById("score").innerText = score;
  }

  // Colisão
  if (
    dino.x < obstacle.x + obstacle.width &&
    dino.x + dino.width > obstacle.x &&
    dino.y < obstacle.y + obstacle.height &&
    dino.y + dino.height > obstacle.y
  ) {
    gameOver = true;
    alert("Game Over! Pontos: " + score);
    location.reload();
  }

  drawDino();
  drawObstacle();
  requestAnimationFrame(update);
}

// Pular
document.addEventListener("keydown", e => {
  if (e.code === "Space" && !dino.jumping) {
    dino.vy = -12;
    dino.jumping = true;
  }
});

// Toque no celular
canvas.addEventListener("touchstart", () => {
  if (!dino.jumping) {
    dino.vy = -12;
    dino.jumping = true;
  }
});

update();
