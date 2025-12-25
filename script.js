const firebaseConfig = {
  apiKey: "AIzaSyAmbd_r1UHeFoQXVPO6HyUHeFoQXVPO6HyUj7ZP9ioID0Lw",
  authDomain: "ranking-dino.firebaseapp.com",
  databaseURL: "https://ranking-dino-default-rtdb.firebaseio.com",
  projectId: "ranking-dino",
  storageBucket: "ranking-dino.firebasestorage.app",
  messagingSenderId: "935308498886",
  appId: "1:935308498886:web:c6dbf94d10f5a1e88904c7"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);

// Referência do ranking
const db = firebase.database();
const rankingRef = db.ref("ranking");

// ESCUTA EM TEMPO REAL
rankingRef.on("value", snapshot => {
  const ranking = document.getElementById("ranking");
  ranking.innerHTML = "";

  const dados = snapshot.val();
  if (!dados) return;

  const lista = Object.values(dados).sort((a, b) => b.score - a.score);

  lista.forEach(player => {
    const li = document.createElement("li");
    li.textContent = `${player.nome} - ${player.score} pts`;
    ranking.appendChild(li);
  });
});
