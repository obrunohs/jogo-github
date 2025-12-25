let pontos = 0;

const botao = document.getElementById("botao");
const pontosSpan = document.getElementById("pontos");

botao.addEventListener("click", () => {
    pontos++;
    pontosSpan.textContent = pontos;
});
