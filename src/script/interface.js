if (localStorage.getItem("freeSeats") != null) {
  onibus1.assentosDisponiveis = parseInt(localStorage.getItem("freeSeats"));
}
if (localStorage.getItem("led") == "ACESO") {
  onibus1.led = true;
}

function saveBus() {
  localStorage.setItem("freeSeats", onibus1.assentosDisponiveis);
  localStorage.setItem("led", ledText());
}

function ledText() {
  if (onibus1.led) {
    return "ACESO";
  } else {
    return "APAGADO";
  }
}

function showText(id, text) {
  let element = document.getElementById(id);
  if (element != null) {
    element.innerText = text;
  }
}

function showError(text) {
  let box = document.getElementById("message");
  box.className = "msg msg-red";
  box.innerText = text;
}

function showSeats() {
  let reserved = onibus1.total - onibus1.assentosDisponiveis;
  for (let i = 1; i <= onibus1.total; i++) {
    let seat = document.getElementById("seat" + i);
    if (i <= reserved) {
      seat.className = "seat seat-on";
      seat.innerText = "LED aceso";
    } else {
      seat.className = "seat";
      seat.innerText = "Livre";
    }
  }
}

function showStatus(number, status) {
  let badge = document.getElementById("status" + number);
  switch (status) {
    case "A CAMINHO":
      badge.className = "status status-yellow";
      badge.innerText = "A CAMINHO";
      break;
    case "ONIBUS CHEGOU":
      badge.className = "status status-green";
      badge.innerText = "ÔNIBUS CHEGOU";
      break;
    case "ONIBUS ACABOU DE SAIR":
      badge.className = "status status-blue";
      badge.innerText = "ACABOU DE SAIR";
      break;
    default:
      badge.className = "status status-gray";
      badge.innerText = "SEM ÔNIBUS";
      break;
  }
}

function register() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let type = document.getElementById("type").value;
  let agreed = document.getElementById("declaration").checked;

  if (name == "" || email == "" || type == "") {
    showError("Preencha o nome, o e-mail e o tipo de atendimento.");
    return;
  }
  if (password.length < 8) {
    showError("A senha precisa ter pelo menos 8 caracteres.");
    return;
  }
  if (!agreed) {
    showError("Marque a declaração para continuar.");
    return;
  }

  localStorage.setItem("passengerName", name);
  localStorage.setItem("passengerType", type);
  window.location.href = "request.html";
}

function showRequestPage() {
  let name = localStorage.getItem("passengerName");
  let type = localStorage.getItem("passengerType");

  if (name != null) {
    showText("current-passenger", name + " (" + type + ")");
  }
  showText("free-seats", onibus1.assentosDisponiveis + " de " + onibus1.total);
  showSeats();
}

function requestService() {
  let name = localStorage.getItem("passengerName");
  let type = localStorage.getItem("passengerType");
  let stop = document.getElementById("stop").value;
  let seats = parseInt(document.getElementById("seats").value);

  if (name == null) {
    showError("Faça seu cadastro antes de solicitar atendimento.");
    return;
  }
  if (localStorage.getItem("requestStop") != null) {
    showError("Você já tem uma solicitação ativa para esta viagem.");
    return;
  }
  if (stop == "") {
    showError("Escolha o ponto de embarque.");
    return;
  }

  let passenger = new Passageiro(name, type);

  if (onibus1.alugarAssentos(passenger, seats)) {
    localStorage.setItem("requestStop", stop);
    localStorage.setItem("requestSeats", seats);
    localStorage.setItem("driverAlert", "Novo atendimento: " + name + " · " + type + " · " + stop + " · " + seats + " assento(s)");
    saveBus();
    window.location.href = "confirmation.html";
  } else {
    showError("Assentos indisponíveis no momento.");
  }
}

let currentAntenna = 0;
let finished = false;

function showConfirmationPage() {
  let stop = localStorage.getItem("requestStop");

  if (stop == null) {
    document.getElementById("active-request").style.display = "none";
    document.getElementById("no-request").style.display = "block";
    return;
  }

  let name = localStorage.getItem("passengerName");
  let type = localStorage.getItem("passengerType");
  let seats = localStorage.getItem("requestSeats");

  showText("driver-message", "[MOTORISTA] - " + name + " - " + onibus1.id + " - " + type + " - " + stop + " - " + seats + " Assentos foram alugados");
  showText("bus", onibus1.id);
  showText("line", rota1.numeroLinha);
  showText("summary-stop", stop);
  showText("summary-seats", seats);
  showText("summary-led", ledText());

  for (let i = 0; i < rota1.antenas.length; i++) {
    if (rota1.antenas[i].ponto == stop) {
      showText("stop" + (i + 1), stop + " (seu ponto)");
      document.getElementById("stop-item" + (i + 1)).className = "here";
    }
  }
}

function moveBus() {
  if (currentAntenna >= rota1.antenas.length) {
    showText("arrival-alert", "PONTO FINAL");
    document.getElementById("move-button").style.display = "none";
    return;
  }

  let antenna = rota1.antenas[currentAntenna];
  antenna.onibusProximos(onibus1);
  showStatus(currentAntenna + 1, antenna.status);

  if (antenna.ponto == localStorage.getItem("requestStop")) {
    if (antenna.status == "A CAMINHO") {
      showText("arrival-alert", "O ônibus está a caminho do seu ponto.");
    }
    if (antenna.status == "ONIBUS CHEGOU") {
      showText("arrival-alert", "Seu ônibus chegou! O motorista já sabe que você precisa de atendimento.");
      document.getElementById("cancel-box").style.display = "none";
    }
    if (antenna.status == "ONIBUS ACABOU DE SAIR" && !finished) {
      finishService();
    }
  }

  if (antenna.status == "SEM ONIBUS") {
    currentAntenna = currentAntenna + 1;
  }
}

function finishService() {
  let seats = parseInt(localStorage.getItem("requestSeats"));
  onibus1.cancelarAluguel(seats);
  saveBus();
  finished = true;

  localStorage.setItem("driverAlert", "Atendimento concluído: " + localStorage.getItem("passengerName") + " embarcou em " + localStorage.getItem("requestStop"));
  localStorage.removeItem("requestStop");
  localStorage.removeItem("requestSeats");

  showText("summary-led", ledText());
  showText("arrival-alert", "Você embarcou. Atendimento concluído e LED apagado.");
}

function cancelRequest() {
  let seats = parseInt(localStorage.getItem("requestSeats"));

  if (onibus1.cancelarAluguel(seats)) {
    saveBus();
    localStorage.setItem("driverAlert", "Atendimento cancelado: " + localStorage.getItem("passengerName") + " · " + localStorage.getItem("requestStop") + " · " + seats + " assento(s) liberado(s)");
    localStorage.removeItem("requestStop");
    localStorage.removeItem("requestSeats");

    document.getElementById("active-request").style.display = "none";
    document.getElementById("cancelled").style.display = "block";
  }
}

function showDriverPage() {
  let lastAlert = localStorage.getItem("driverAlert");
  if (lastAlert != null) {
    showText("driver-alert", lastAlert);
  }

  let reserved = onibus1.total - onibus1.assentosDisponiveis;
  showText("reserved-seats", reserved + " de " + onibus1.total);
  showText("driver-led", ledText());
  showSeats();
}

function resetDemo() {
  localStorage.clear();
  window.location.reload();
}