let fotos = [
  "src/assets/img/slide1.svg",
  "src/assets/img/slide2.svg",
  "src/assets/img/slide3.svg"
];

let textos = [
  "O passageiro pede atendimento pelo celular antes de o ônibus chegar.",
  "O motorista recebe o aviso de quem vai embarcar.",
  "O LED do assento preferencial acende para os outros passageiros."
];

let numero = 0;

function mostrarFoto() {
  document.getElementById("foto").src = fotos[numero];
  document.getElementById("foto").alt = textos[numero];
  document.getElementById("legenda").innerText = textos[numero];
}

function proximaFoto() {
  numero = numero + 1;
  if (numero == fotos.length) {
    numero = 0;
  }
  mostrarFoto();
}

function voltarFoto() {
  numero = numero - 1;
  if (numero < 0) {
    numero = fotos.length - 1;
  }
  mostrarFoto();
}
