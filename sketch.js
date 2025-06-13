let perguntas = [
  {
    pergunta: "Qual é a principal atividade econômica no meio rural?",
    opcoes: ["Indústria", "Agricultura", "Comércio", "Tecnologia"],
    resposta: 1
  },
  {
    pergunta: "Qual dessas opções é um exemplo de uma área urbana?",
    opcoes: ["Fazenda", "Rua de cidade", "Campo aberto", "Chácara"],
    resposta: 1
  },
  {
    pergunta: "Qual é o principal meio de transporte no meio rural?",
    opcoes: ["Avião", "Trator", "Metrô", "Ônibus"],
    resposta: 1
  },
  {
    pergunta: "A urbanização é um processo que envolve...",
    opcoes: ["Aumentar a área rural", "Mudança de zona agrícola para cidade", "Abertura de novos campos agrícolas", "Construção de novos rios"],
    resposta: 1
  }
];

let perguntaAtual = 0;
let respostaSelecionada = -1;
let quizFinalizado = false;
let respostaCorreta = false;
let animacaoIniciada = false;
let alpha = 0;

function setup() {
  createCanvas(600, 400);
  noLoop();
}

function draw() {
  background(220);

  if (quizFinalizado) {
    // Animação de transição para a próxima pergunta
    if (!animacaoIniciada) {
      animacaoIniciada = true;
      let t = 0;
      let animInterval = setInterval(() => {
        t += 10;
        alpha = map(t, 0, 255, 0, 255);
        if (t >= 255) {
          clearInterval(animInterval);
        }
      }, 30);
    }

    // Exibe o resultado da pergunta
    textSize(32);
    textAlign(CENTER, CENTER);
    fill(0, 0, 0, alpha);
    text(respostaCorreta ? "Você acertou!" : "Você errou!", width / 2, height / 2 - 50);
    textSize(20);
    text("Clique para a próxima pergunta", width / 2, height / 2 + 50);

    return;
  }

  textSize(24);
  textAlign(LEFT, TOP);
  fill(0);
  text(perguntas[perguntaAtual].pergunta, 20, 20, width - 40, 60);

  for (let i = 0; i < perguntas[perguntaAtual].opcoes.length; i++) {
    let yPos = 100 + i * 60;
    let cor = (respostaSelecionada === i) ? color(200, 100, 100) : color(255);
    fill(cor);
    rect(20, yPos, width - 40, 50, 10);

    // Animação de zoom nas alternativas
    if (respostaSelecionada === i) {
      push();
      translate(width / 2, yPos + 25);
      scale(1.1);
      rect(-width / 2 + 20, -25, width - 40, 50, 10);
      pop();
    }

    fill(0);
    textSize(18);
    text(perguntas[perguntaAtual].opcoes[i], 40, yPos + 15);
  }
}

function mousePressed() {
  if (quizFinalizado) {
    perguntaAtual++;
    if (perguntaAtual >= perguntas.length) {
      perguntaAtual = 0;
    }
    respostaSelecionada = -1;
    quizFinalizado = false;
    animacaoIniciada = false;
    alpha = 0;
    loop(); // Reativa o loop de animação
    return;
  }

  for (let i = 0; i < perguntas[perguntaAtual].opcoes.length; i++) {
    let yPos = 100 + i * 60;
    if (mouseX > 20 && mouseX < width - 20 && mouseY > yPos && mouseY < yPos + 50) {
      respostaSelecionada = i;
      respostaCorreta = (i === perguntas[perguntaAtual].resposta);
      quizFinalizado = true;
      noLoop(); // Desativa o loop de animação até o usuário clicar para seguir
      break;
    }
  }
}
