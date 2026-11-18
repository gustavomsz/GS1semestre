if (localStorage.getItem("freeSeats") != null) {
  onibus1.assentosDisponiveis = parseInt(localStorage.getItem("freeSeats"));
}
if (localStorage.getItem("led") == "ACESO") {
  onibus1.led = true;
}

function salvarOnibus() {
  localStorage.setItem("freeSeats", onibus1.assentosDisponiveis);
  localStorage.setItem("led", textoLed());
}

function textoLed() {
  if (onibus1.led) {
    return "ACESO";
  } else {
    return "APAGADO";
  }
}

function mostraTexto(id, texto) {
  let elemento = document.getElementById(id);
  if (elemento != null) {
    elemento.innerText = texto;
  }
}

function mostraErro(texto) {
  let caixa = document.getElementById("message");
  caixa.className = "msg msg-red";
  caixa.innerText = texto;
}

function mostraAssentos() {
  let reservados = onibus1.total - onibus1.assentosDisponiveis;
  for (let i = 1; i <= onibus1.total; i++) {
    let assento = document.getElementById("seat" + i);
    if (i <= reservados) {
      assento.className = "seat seat-on";
      assento.innerText = "LED aceso";
    } else {
      assento.className = "seat";
      assento.innerText = "Livre";
    }
  }
}

function mostraStatus(numero, status) {
  let etiqueta = document.getElementById("status" + numero);
  switch (status) {
    case "A CAMINHO":
      etiqueta.className = "status status-yellow";
      etiqueta.innerText = "A CAMINHO";
      break;
    case "ONIBUS CHEGOU":
      etiqueta.className = "status status-green";
      etiqueta.innerText = "ÔNIBUS CHEGOU";
      break;
    case "ONIBUS ACABOU DE SAIR":
      etiqueta.className = "status status-blue";
      etiqueta.innerText = "ACABOU DE SAIR";
      break;
    default:
      etiqueta.className = "status status-gray";
      etiqueta.innerText = "SEM ÔNIBUS";
      break;
  }
}

function cadastrar() {
  let nome = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let senha = document.getElementById("password").value;
  let tipo = document.getElementById("type").value;
  let concordou = document.getElementById("declaration").checked;

  if (nome == "" || email == "" || tipo == "") {
    mostraErro("Preencha o nome, o e-mail e o tipo de atendimento.");
    return;
  }
  if (senha.length < 8) {
    mostraErro("A senha precisa ter pelo menos 8 caracteres.");
    return;
  }
  if (!concordou) {
    mostraErro("Marque a declaração para continuar.");
    return;
  }

  localStorage.setItem("passengerName", nome);
  localStorage.setItem("passengerType", tipo);
  window.location.href = "request.html";
}

function mostraPaginaSolicitacao() {
  let nome = localStorage.getItem("passengerName");
  let tipo = localStorage.getItem("passengerType");

  if (nome != null) {
    mostraTexto("current-passenger", nome + " (" + tipo + ")");
  }
  mostraTexto("free-seats", onibus1.assentosDisponiveis + " de " + onibus1.total);
  mostraAssentos();
}

function solicitarAtendimento() {
  let nome = localStorage.getItem("passengerName");
  let tipo = localStorage.getItem("passengerType");
  let ponto = document.getElementById("stop").value;
  let assentos = parseInt(document.getElementById("seats").value);

  if (nome == null) {
    mostraErro("Faça seu cadastro antes de solicitar atendimento.");
    return;
  }
  if (localStorage.getItem("requestStop") != null) {
    mostraErro("Você já tem uma solicitação ativa para esta viagem.");
    return;
  }
  if (ponto == "") {
    mostraErro("Escolha o ponto de embarque.");
    return;
  }
  if (isNaN(assentos) || assentos < 1) {
    mostraErro("Informe quantos assentos você precisa.");
    return;
  }

  let passageiro = new Passageiro(nome, tipo);

  if (!passageiro.temDireitoAosAssentos()) {
    mostraErro("Este tipo de atendimento não dá direito ao assento preferencial.");
    return;
  }

  if (onibus1.alugarAssentos(passageiro, assentos)) {
    localStorage.setItem("requestStop", ponto);
    localStorage.setItem("requestSeats", assentos);
    localStorage.setItem("driverAlert", "Novo atendimento: " + nome + " · " + tipo + " · " + ponto + " · " + assentos + " assento(s)");
    salvarOnibus();
    window.location.href = "confirmation.html";
  } else {
    mostraErro("Assentos indisponíveis no momento.");
  }
}

let antenaAtual = 0;
let finalizado = false;

function mostraPaginaConfirmacao() {
  let ponto = localStorage.getItem("requestStop");

  if (ponto == null) {
    document.getElementById("active-request").style.display = "none";
    document.getElementById("no-request").style.display = "block";
    return;
  }

  let nome = localStorage.getItem("passengerName");
  let tipo = localStorage.getItem("passengerType");
  let assentos = localStorage.getItem("requestSeats");

  mostraTexto("driver-message", "[MOTORISTA] - " + nome + " - " + onibus1.id + " - " + tipo + " - " + ponto + " - " + assentos + " assento(s) reservado(s)");
  mostraTexto("bus", onibus1.id);
  mostraTexto("line", rota1.numeroLinha);
  mostraTexto("summary-stop", ponto);
  mostraTexto("summary-seats", assentos);
  mostraTexto("summary-led", textoLed());

  for (let i = 0; i < rota1.antenas.length; i++) {
    if (rota1.antenas[i].ponto == ponto) {
      mostraTexto("stop" + (i + 1), ponto + " (seu ponto)");
      document.getElementById("stop-item" + (i + 1)).className = "here";
    }
  }
}

function moverOnibus() {
  if (antenaAtual >= rota1.antenas.length) {
    mostraTexto("arrival-alert", "PONTO FINAL");
    document.getElementById("move-button").style.display = "none";
    return;
  }

  let antena = rota1.antenas[antenaAtual];
  antena.onibusProximos(onibus1);
  mostraStatus(antenaAtual + 1, antena.status);

  if (antena.ponto == localStorage.getItem("requestStop")) {
    if (antena.status == "A CAMINHO") {
      mostraTexto("arrival-alert", "O ônibus está a caminho do seu ponto.");
    }
    if (antena.status == "ONIBUS CHEGOU") {
      mostraTexto("arrival-alert", "Seu ônibus chegou! O motorista já sabe que você precisa de atendimento.");
      document.getElementById("cancel-box").style.display = "none";
    }
    if (antena.status == "ONIBUS ACABOU DE SAIR" && !finalizado) {
      finalizarAtendimento();
    }
  }

  if (antena.status == "SEM ONIBUS") {
    antenaAtual = antenaAtual + 1;
  }
}

function finalizarAtendimento() {
  let assentos = parseInt(localStorage.getItem("requestSeats"));
  onibus1.cancelarAluguel(assentos);
  salvarOnibus();
  finalizado = true;

  localStorage.setItem("driverAlert", "Atendimento concluído: " + localStorage.getItem("passengerName") + " embarcou em " + localStorage.getItem("requestStop"));
  localStorage.removeItem("requestStop");
  localStorage.removeItem("requestSeats");

  mostraTexto("summary-led", textoLed());
  mostraTexto("arrival-alert", "Você embarcou. Atendimento concluído e LED apagado.");
}

function cancelarSolicitacao() {
  let assentos = parseInt(localStorage.getItem("requestSeats"));

  if (onibus1.cancelarAluguel(assentos)) {
    salvarOnibus();
    localStorage.setItem("driverAlert", "Atendimento cancelado: " + localStorage.getItem("passengerName") + " · " + localStorage.getItem("requestStop") + " · " + assentos + " assento(s) liberado(s)");
    localStorage.removeItem("requestStop");
    localStorage.removeItem("requestSeats");

    document.getElementById("active-request").style.display = "none";
    document.getElementById("cancelled").style.display = "block";
  }
}

function mostraPaginaMotorista() {
  let ultimoAviso = localStorage.getItem("driverAlert");
  if (ultimoAviso != null) {
    mostraTexto("driver-alert", ultimoAviso);
  }

  let reservados = onibus1.total - onibus1.assentosDisponiveis;
  mostraTexto("reserved-seats", reservados + " de " + onibus1.total);
  mostraTexto("driver-led", textoLed());
  mostraAssentos();
}

function reiniciarDemonstracao() {
  localStorage.clear();
  window.location.reload();
}
