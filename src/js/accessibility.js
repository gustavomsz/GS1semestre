let tamanhoTexto = 1;
let contraste = "off";

function aplicarAcessibilidade() {
  switch (tamanhoTexto) {
    case 1:
      document.body.style.zoom = 1;
      break;
    case 2:
      document.body.style.zoom = 1.15;
      break;
    case 3:
      document.body.style.zoom = 1.3;
      break;
  }

  if (contraste == "on") {
    document.body.className = "contrast";
  } else {
    document.body.className = "";
  }

  localStorage.setItem("textSize", tamanhoTexto);
  localStorage.setItem("contrast", contraste);
}

function aumentarTexto() {
  if (tamanhoTexto < 3) {
    tamanhoTexto = tamanhoTexto + 1;
  }
  aplicarAcessibilidade();
}

function diminuirTexto() {
  if (tamanhoTexto > 1) {
    tamanhoTexto = tamanhoTexto - 1;
  }
  aplicarAcessibilidade();
}

function alternarContraste() {
  if (contraste == "on") {
    contraste = "off";
  } else {
    contraste = "on";
  }
  aplicarAcessibilidade();
}

if (localStorage.getItem("textSize") != null) {
  tamanhoTexto = parseInt(localStorage.getItem("textSize"));
}
if (localStorage.getItem("contrast") != null) {
  contraste = localStorage.getItem("contrast");
}
aplicarAcessibilidade();
