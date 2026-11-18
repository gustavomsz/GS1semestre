let textSize = 1;
let contrast = "off";

function applyAccessibility() {
  switch (textSize) {
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

  if (contrast == "on") {
    document.body.className = "contrast";
  } else {
    document.body.className = "";
  }

  localStorage.setItem("textSize", textSize);
  localStorage.setItem("contrast", contrast);
}

function biggerText() {
  if (textSize < 3) {
    textSize = textSize + 1;
  }
  applyAccessibility();
}

function smallerText() {
  if (textSize > 1) {
    textSize = textSize - 1;
  }
  applyAccessibility();
}

function changeContrast() {
  if (contrast == "on") {
    contrast = "off";
  } else {
    contrast = "on";
  }
  applyAccessibility();
}

if (localStorage.getItem("textSize") != null) {
  textSize = parseInt(localStorage.getItem("textSize"));
}
if (localStorage.getItem("contrast") != null) {
  contrast = localStorage.getItem("contrast");
}
applyAccessibility();