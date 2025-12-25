let pontos = 0;

document.getElementById("botao").onclick = () => {
  pontos++;
  document.getElementById("pontos").innerText = pontos;
};
