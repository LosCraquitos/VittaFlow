// Simulação "Como o VittaFlow reaproveita uma vaga" (página Sobre)

// Cada etapa tem um título e um texto que aparecem na caixa de detalhes
var etapas = [
  {
    titulo: "1. Cancelamento",
    texto: "Um paciente avisa, pelo site ou pelo assistente no Telegram, que não poderá comparecer ao exame marcado."
  },
  {
    titulo: "2. Vaga liberada",
    texto: "O sistema libera o horário e registra que ele está livre para ser usado de novo, em vez de deixá-lo vazio."
  },
  {
    titulo: "3. Fila consultada",
    texto: "O VittaFlow verifica a fila de espera daquele serviço e identifica o primeiro paciente que aguarda."
  },
  {
    titulo: "4. Vaga repassada",
    texto: "O paciente é avisado e o atendimento é agendado na vaga que seria perdida. Menos tempo de espera para quem precisa."
  }
];

var listaEtapas = document.querySelectorAll("#fluxo-etapas .fluxo-etapa");
var tituloEtapa = document.getElementById("fluxo-titulo");
var textoEtapa = document.getElementById("fluxo-texto");
var btnAnterior = document.getElementById("fluxo-anterior");
var btnProximo = document.getElementById("fluxo-proximo");

// Índice da etapa que está sendo mostrada (0 = primeira)
var etapaAtual = 0;

// Atualiza a tela de acordo com a etapa atual
function mostrarEtapa() {
  tituloEtapa.textContent = etapas[etapaAtual].titulo;
  textoEtapa.textContent = etapas[etapaAtual].texto;

  listaEtapas.forEach(function (item, indice) {
    item.classList.toggle("atual", indice === etapaAtual);
    item.classList.toggle("concluida", indice < etapaAtual);

    if (indice === etapaAtual) {
      item.setAttribute("aria-current", "step");
    } else {
      item.removeAttribute("aria-current");
    }
  });

  var ultima = etapaAtual === etapas.length - 1;
  btnAnterior.disabled = etapaAtual === 0;
  btnProximo.textContent = ultima ? "Recomeçar" : "Próximo passo";
}

// Só executa se os elementos existirem nesta página
if (tituloEtapa && textoEtapa && btnAnterior && btnProximo && listaEtapas.length === etapas.length) {
  btnProximo.addEventListener("click", function () {
    // Na última etapa o botão volta ao início
    etapaAtual = etapaAtual === etapas.length - 1 ? 0 : etapaAtual + 1;
    mostrarEtapa();
  });

  btnAnterior.addEventListener("click", function () {
    if (etapaAtual > 0) {
      etapaAtual = etapaAtual - 1;
      mostrarEtapa();
    }
  });

  mostrarEtapa();
}
