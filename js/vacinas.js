//Dados: cada linha é idade, vacina e dose.
var CAL = {
  crianca: {
    nota: "",
    linhas: [
      ["Ao nascer", "BCG", "Dose única"],
      ["", "Hepatite B", "Dose ao nascer"],
      ["2 meses", "Pentavalente (DTP + HB + Hib)", "1ª dose"],
      ["", "VIP (poliomielite inativada)", "1ª dose"],
      ["", "Rotavírus humano", "1ª dose"],
      ["", "Pneumocócica conjugada", "1ª dose"],
      ["3 meses", "Meningocócica C", "1ª dose"],
      ["4 meses", "Pentavalente (DTP + HB + Hib)", "2ª dose"],
      ["", "VIP (poliomielite inativada)", "2ª dose"],
      ["", "Rotavírus humano", "2ª dose"],
      ["", "Pneumocócica conjugada", "2ª dose"],
      ["5 meses", "Meningocócica C", "2ª dose"],
      ["6 meses", "Pentavalente (DTP + HB + Hib)", "3ª dose"],
      ["", "VIP (poliomielite inativada)", "3ª dose"],
      ["", "Covid-19 (menores de 5 anos)", "1ª dose"],
      ["", "Influenza", "1ª dose"],
      ["7 meses", "Covid-19 (menores de 5 anos)", "2ª dose"],
      ["", "Influenza", "2ª dose"],
      ["9 meses", "Febre amarela", "1ª dose"],
      ["", "Covid-19 (menores de 5 anos)", "3ª dose"],
      ["12 meses", "Tríplice viral (sarampo, caxumba, rubéola)", "1ª dose"],
      ["", "Pneumocócica conjugada", "Reforço"],
      ["", "Meningocócica ACWY", "1º reforço"],
      ["15 meses", "VIP (poliomielite inativada)", "Reforço"],
      ["", "Hepatite A", "Dose única"],
      ["", "DTP (tríplice bacteriana)", "1º reforço"],
      ["", "Tetraviral (sarampo, caxumba, rubéola, varicela)", "Dose única"],
      ["4 anos", "DTP (tríplice bacteriana)", "2º reforço"],
      ["", "Varicela", "2ª dose"],
      ["", "Febre amarela", "Reforço"],
      ["9 anos", "HPV", "Dose única"]
    ]
  },
  adolescente: {
    nota: "",
    linhas: [
      ["9 a 14 anos", "HPV", "Dose única"],
      ["10 a 14 anos", "Dengue", "2 doses"],
      ["11 a 14 anos", "Meningocócica ACWY", "Dose única"],
      ["11 a 19 anos", "Hepatite B", "3 doses"],
      ["", "dT (dupla adulto)", "3 doses ou reforço"],
      ["", "Tríplice viral", "2 doses"],
      ["", "Febre amarela", "Dose única"]
    ]
  },
  adulto: {
    nota: "",
    linhas: [
      ["25 a 59 anos", "Hepatite B", "3 doses (conforme histórico)"],
      ["", "dT (dupla adulto)", "3 doses + reforço a cada 10 anos"],
      ["", "Febre amarela", "1 dose (conforme histórico)"],
      ["", "Tríplice viral", "Conforme histórico"],
      ["", "Pneumocócica 23-valente", "2 doses (somente indígenas)"],
      ["", "Varicela", "2 doses (indígenas e trabalhadores de saúde)"]
    ]
  },
  gestante: {
    nota: "Procure o pré-natal na UBS assim que souber da gravidez.",
    linhas: [
      ["Ao saber da gravidez", "Hepatite B", "3 doses (conforme histórico)"],
      ["", "dT (dupla adulto)", "3 doses (conforme histórico)"],
      ["", "Influenza", "1 dose por temporada"],
      ["", "Covid-19", "1 dose a cada gestação"],
      ["A partir da 20ª semana", "dTpa", "1 dose em cada gestação"],
      ["A partir da 28ª semana", "VSR (vírus sincicial respiratório)", "1 dose em cada gestação"],
      ["Casos excepcionais", "Febre amarela", "Com avaliação do serviço de saúde"]
    ]
  },
  idoso: {
    nota: "A vacina de febre amarela só é indicada em casos excepcionais, após avaliação de saúde.",
    linhas: [
      ["60 anos ou mais", "Influenza", "1 dose por ano"],
      ["", "Covid-19", "1 dose semestral"],
      ["", "Hepatite B", "3 doses (conforme histórico)"],
      ["", "dT (dupla adulto)", "3 doses + reforço a cada 10 anos"],
      ["", "Pneumocócica 23-valente", "2 doses (acamados ou institucionalizados)"],
      ["", "Febre amarela", "Com avaliação do serviço de saúde"]
    ]
  }
};

//Nome que aparece em cada botão.
var ABAS = {
  crianca: "Criança",
  adolescente: "Adolescente",
  adulto: "Adulto",
  gestante: "Gestante",
  idoso: "Idoso"
};

var elAbas = document.getElementById("tabs");
var elCorpo = document.getElementById("cal");
var elNota = document.getElementById("calnote");

// Evita que textos com < ou & quebrem o HTML da lista.
function escapar(texto) {
  return String(texto)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function mostrar(chave) {
  var chaves = Object.keys(ABAS);

  //Cria botões das abas
  elAbas.innerHTML = "";
  elAbas.setAttribute("role", "tablist");

  chaves.forEach(function (c, i) {
    var botao = document.createElement("button");
    botao.type = "button";
    botao.textContent = ABAS[c];
    botao.className = c === chave ? "on" : "";
    botao.setAttribute("role", "tab");
    botao.setAttribute("aria-selected", c === chave);

    botao.addEventListener("click", function () {
      mostrar(c);
    });

    botao.addEventListener("keydown", function (e) {
      var destino = null;
      if (e.key === "ArrowRight") destino = (i + 1) % chaves.length;
      if (e.key === "ArrowLeft") destino = (i - 1 + chaves.length) % chaves.length;
      if (destino === null) return;
      mostrar(chaves[destino]);
      elAbas.querySelectorAll("button")[destino].focus();
    });

    elAbas.appendChild(botao);
  });

  //Monta a lista-idade/fase
  var html = "";
  CAL[chave].linhas.forEach(function (l) {
    if (l[0] !== "") {
      html += '<li class="cal-grupo">' + escapar(l[0]) + "</li>";
    }
    html +=
      "<li><span>" + escapar(l[1]) + "</span>" +
      '<span class="cal-dose">' + escapar(l[2]) + "</span></li>";
  });
  elCorpo.innerHTML = html;

  //Atualiza a observação abaixo da tabela
  elNota.textContent = CAL[chave].nota;
}

//Começa na aba "Criança"
mostrar("crianca");