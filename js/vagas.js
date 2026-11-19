// Array de objetos com as vagas (baseado nas classes Consulta, Exame e UnidadeSaude do Java)
// pessoasNaFrente = quantas pessoas já estão na fila
// tempoMedio = minutos que cada atendimento leva
const vagas = [
  { id: 1, tipo: "Consulta", nome: "Clínico geral", unidade: "UBS Vila Prudente", data: "24/11 às 08:30", pessoasNaFrente: 6, tempoMedio: 15 },
  { id: 2, tipo: "Consulta", nome: "Cardiologia", unidade: "AMA Tatuapé", data: "25/11 às 10:00", pessoasNaFrente: 12, tempoMedio: 20 },
  { id: 3, tipo: "Consulta", nome: "Pediatria", unidade: "UBS Mooca", data: "24/11 às 14:00", pessoasNaFrente: 3, tempoMedio: 20 },
  { id: 4, tipo: "Exame", nome: "Hemograma completo", unidade: "UBS Vila Prudente", data: "25/11 às 07:00", pessoasNaFrente: 10, tempoMedio: 5, exigeJejum: true },
  { id: 5, tipo: "Exame", nome: "Raio-X de tórax", unidade: "Hospital Dia Sapopemba", data: "27/11 às 11:00", pessoasNaFrente: 7, tempoMedio: 15, exigeJejum: false },
  { id: 6, tipo: "Exame", nome: "Ultrassom abdominal", unidade: "Hospital Dia Sapopemba", data: "28/11 às 08:00", pessoasNaFrente: 8, tempoMedio: 30, exigeJejum: true },
  { id: 7, tipo: "Vacina", nome: "Influenza (gripe)", unidade: "UBS Mooca", data: "24/11 às 08:00", pessoasNaFrente: 15, tempoMedio: 5 },
  { id: 8, tipo: "Vacina", nome: "Febre amarela", unidade: "UBS Vila Prudente", data: "26/11 às 09:00", pessoasNaFrente: 4, tempoMedio: 5 },
]

// ===== Elementos da página =====
const listaVagas = document.querySelector("#lista-vagas")
const contagem = document.querySelector("#contagem")
const busca = document.querySelector("#busca")
const botoesFiltro = document.querySelectorAll(".filtro")

const secaoFila = document.querySelector("#fila")
const resumoVaga = document.querySelector("#resumo-vaga")
const formFila = document.querySelector("#form-fila")
const comprovante = document.querySelector("#comprovante")
const btnCancelar = document.querySelector("#btn-cancelar")

const inputNome = document.querySelector("#nome")
const inputCpf = document.querySelector("#cpf")
const inputIdade = document.querySelector("#idade")
const inputGestante = document.querySelector("#gestante")
const inputPcd = document.querySelector("#pcd")

let tipoEscolhido = "todas" // filtro que está ativo
let vagaEscolhida = null    // vaga que a pessoa clicou

// ===== Tempo de espera (mesma ideia do calcularTempoEspera) =====
const calcularTempoEspera = (pessoas, tempoMedio) => pessoas * tempoMedio

const formatarTempo = (minutos) => {
  if (minutos === 0) {
    return "Você é o próximo!"
  }
  if (minutos < 60) {
    return `${minutos} min`
  }
  const horas = Math.floor(minutos / 60)
  const resto = minutos % 60
  if (resto === 0) {
    return `${horas}h`
  }
  return `${horas}h ${resto}min`
}

// ===== Mostrar os cards =====
const mostrarVagas = () => {
  const texto = busca.value.toLowerCase()

  // filter: só fica a vaga do tipo escolhido e que tem o texto digitado no nome
  const vagasFiltradas = vagas.filter((vaga) => {
    const tipoOk = tipoEscolhido === "todas" || vaga.tipo === tipoEscolhido
    const textoOk = vaga.nome.toLowerCase().includes(texto)
    return tipoOk && textoOk
  })

  listaVagas.innerHTML = "" // limpa a lista antes de criar de novo
  contagem.textContent = `${vagasFiltradas.length} vaga(s) encontrada(s)`

  if (vagasFiltradas.length === 0) {
    const aviso = document.createElement("li")
    aviso.className = "vagas-vazio"
    aviso.textContent = "Nenhuma vaga encontrada."
    listaVagas.appendChild(aviso)
    return
  }

  vagasFiltradas.forEach((vaga) => {
    const li = document.createElement("li")
    const etiqueta = document.createElement("span")
    const h3 = document.createElement("h3")
    const unidade = document.createElement("p")
    const data = document.createElement("p")
    const fila = document.createElement("p")
    const botao = document.createElement("button")

    li.className = "vaga-card"

    etiqueta.className = `badge badge-${vaga.tipo.toLowerCase()}`
    etiqueta.textContent = vaga.tipo

    h3.textContent = vaga.nome

    unidade.className = "vaga-unidade"
    unidade.textContent = vaga.unidade

    data.className = "vaga-data"
    data.textContent = vaga.data

    const tempo = calcularTempoEspera(vaga.pessoasNaFrente, vaga.tempoMedio)
    fila.className = "vaga-fila"
    fila.textContent = `${vaga.pessoasNaFrente} pessoas na fila · espera de ${formatarTempo(tempo)}`

    botao.type = "button"
    botao.textContent = "Entrar na fila"
    // Todos os botões têm o mesmo texto, então o aria-label diz de qual vaga é
    botao.setAttribute("aria-label", `Entrar na fila de ${vaga.nome}, ${vaga.unidade}`)
    botao.addEventListener("click", () => {
      abrirFormulario(vaga.id)
    })

    li.appendChild(etiqueta)
    li.appendChild(h3)
    li.appendChild(unidade)
    li.appendChild(data)

    // Só exame tem a informação de jejum
    if (vaga.tipo === "Exame") {
      const jejum = document.createElement("p")
      if (vaga.exigeJejum) {
        jejum.className = "tag tag-alerta"
        jejum.textContent = "Exige jejum"
      } else {
        jejum.className = "tag tag-ok"
        jejum.textContent = "Sem jejum"
      }
      li.appendChild(jejum)
    }

    li.appendChild(fila)
    li.appendChild(botao)
    listaVagas.appendChild(li)
  })
}

// ===== Filtros =====
botoesFiltro.forEach((botao) => {
  botao.addEventListener("click", () => {
    botoesFiltro.forEach((b) => {
      b.classList.remove("ativo")
      b.setAttribute("aria-selected", "false")
    })
    botao.classList.add("ativo")
    botao.setAttribute("aria-selected", "true")
    tipoEscolhido = botao.dataset.tipo
    mostrarVagas()
  })
})

busca.addEventListener("input", () => {
  mostrarVagas()
})

// ===== Abrir o formulário da fila =====
const abrirFormulario = (id) => {
  vagaEscolhida = vagas.find((vaga) => vaga.id === id)

  resumoVaga.textContent = `${vagaEscolhida.tipo}: ${vagaEscolhida.nome} | ${vagaEscolhida.unidade} | ${vagaEscolhida.data}`

  formFila.reset()
  limparErros()
  formFila.classList.remove("oculto")
  comprovante.classList.add("oculto")
  secaoFila.classList.remove("oculto")
  secaoFila.scrollIntoView({ behavior: "smooth" })
}

btnCancelar.addEventListener("click", () => {
  secaoFila.classList.add("oculto")
})

// ===== Máscara do CPF (RegEx com replace) =====
inputCpf.addEventListener("input", () => {
  let cpf = inputCpf.value.replace(/\D/g, "") // tira tudo que não é número
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
  inputCpf.value = cpf
})

// ===== Validação (RegEx com test) =====
const regexNome = /^[A-Za-zÀ-ú\s]{3,}$/
const regexCpf = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/
const regexIdade = /^\d{1,3}$/

// Mostra a mensagem embaixo do campo e avisa o leitor de tela que o campo está inválido
const mostrarErro = (input, idErro, mensagem) => {
  document.querySelector(idErro).textContent = mensagem
  input.setAttribute("aria-invalid", "true")
}

const limparErros = () => {
  const campos = [inputNome, inputCpf, inputIdade]
  campos.forEach((campo) => campo.setAttribute("aria-invalid", "false"))
  document.querySelectorAll(".erro").forEach((erro) => {
    erro.textContent = ""
  })
}

formFila.addEventListener("submit", (e) => {
  e.preventDefault()
  limparErros()

  const nome = inputNome.value.trim()
  const cpf = inputCpf.value.trim()
  const idade = inputIdade.value.trim()
  let valido = true

  if (!regexNome.test(nome)) {
    mostrarErro(inputNome, "#erro-nome", "Digite um nome válido (só letras, mínimo 3).")
    valido = false
  }
  if (!regexCpf.test(cpf)) {
    mostrarErro(inputCpf, "#erro-cpf", "Digite o CPF no formato 000.000.000-00.")
    valido = false
  }
  if (!regexIdade.test(idade) || Number(idade) > 120) {
    mostrarErro(inputIdade, "#erro-idade", "Digite uma idade válida.")
    valido = false
  }

  if (valido) {
    entrarNaFila(nome, Number(idade))
  }
})

// ===== Entrar na fila e mostrar o comprovante =====
const entrarNaFila = (nome, idade) => {
  // Mesma regra do Paciente no Java: idoso, gestante ou PCD tem prioridade
  const prioritario = idade >= 60 || inputGestante.checked || inputPcd.checked

  // Prioritário passa na frente de metade da fila
  let pessoasNaFrente = vagaEscolhida.pessoasNaFrente
  if (prioritario) {
    pessoasNaFrente = Math.floor(pessoasNaFrente / 2)
  }

  const tempo = calcularTempoEspera(pessoasNaFrente, vagaEscolhida.tempoMedio)
  const protocolo = `VF-${Math.floor(Math.random() * 9000) + 1000}`

  // Preenche o comprovante
  document.querySelector("#c-protocolo").textContent = protocolo
  document.querySelector("#c-nome").textContent = nome
  document.querySelector("#c-atendimento").textContent = vagaEscolhida.nome
  document.querySelector("#c-unidade").textContent = vagaEscolhida.unidade
  document.querySelector("#c-frente").textContent = pessoasNaFrente
  document.querySelector("#c-tempo").textContent = formatarTempo(tempo)

  const seloPrioridade = document.querySelector("#c-prioridade")
  if (prioritario) {
    seloPrioridade.classList.remove("oculto")
  } else {
    seloPrioridade.classList.add("oculto")
  }

  const lembrete = document.querySelector("#c-lembrete")
  if (vagaEscolhida.tipo === "Exame" && vagaEscolhida.exigeJejum) {
    lembrete.textContent = "Lembrete: este exame exige jejum."
    lembrete.classList.remove("oculto")
  } else if (vagaEscolhida.tipo === "Vacina") {
    lembrete.textContent = "Lembrete: leve sua caderneta de vacinação."
    lembrete.classList.remove("oculto")
  } else {
    lembrete.classList.add("oculto")
  }

  // A fila daquela vaga aumenta em 1 pessoa
  vagaEscolhida.pessoasNaFrente++
  mostrarVagas()

  formFila.classList.add("oculto")
  comprovante.classList.remove("oculto")
}

// ===== Início =====
mostrarVagas()