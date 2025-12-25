/* ========= FIREBASE ========= */
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "ranking-dino.firebaseapp.com",
  databaseURL: "https://ranking-dino-default-rtdb.firebaseio.com",
  projectId: "ranking-dino",
  storageBucket: "ranking-dino.firebasestorage.app",
  messagingSenderId: "935308498886",
  appId: "SEU_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const rankingRef = db.ref("ranking");

/* ========= RANKING TEMPO REAL ========= */
rankingRef.on("value", snapshot => {
  const ul = document.getElementById("ranking");
  ul.innerHTML = "";
  const data = snapshot.val();
  if (!data) return;

  Object.values(data)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .forEach(p => {
      const li = document.createElement("li");
      li.textContent = `${p.nome} - ${p.score} pts`;
      ul.appendChild(li);
    });
});

/* ========= JOGO DINO SIMPLES ========= */
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let dino = { x: 50, y: 150, w: 30, h: 30, vy: 0 };
let obst = { x: 600, y: 150, w: 20, h: 30 };
let gravity = 0.8;
let score = 0;
let gameOver = false;

const nomeJogador = prompt("Digite seu nome:") || "Jogador";

document.addEventListener("keydown", e => {
  if (e.code === "Space" && dino.y === 150) {
    dino.vy = -12;
  }
});

function colisao(a, b) {
  return (
    a.x < b.x + b.w &&
    a.x + a.w > b.x &&
    a.y < b.y + b.h &&
    a.y + a.h > b.y
  );
}

function loop() {
  if (gameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dino
  dino.vy += gravity;
  dino.y += dino.vy;
  if (dino.y > 150) {
    dino.y = 150;
    dino.vy = 0;
  }
  ctx.fillRect(dino.x, dino.y, dino.w, dino.h);

  // Obstáculo
  obst.x -= 5;
  if (obst.x < -20) {
    obst.x = 600;
    score++;
  }
  ctx.fillRect(obst.x, obst.y, obst.w, obst.h);

  // Score
  ctx.fillText("Pontos: " + score, 10, 20);

  // Colisão
  if (colisao(dino, obst)) {
    gameOver = true;

    // ENVIA SCORE ONLINE 🔥
    rankingRef.push({
      nome: nomeJogador,
      score: score
    });

    alert("Game Over! Pontos: " + score);
    location.reload();
  }

  requestAnimationFrame(loop);
}

loop();
