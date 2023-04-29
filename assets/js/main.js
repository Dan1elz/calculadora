const numeroBtns = document.querySelectorAll("[data-type='numero']");
const operadorBtns = document.querySelectorAll("[data-type='operador']");
const igualBtn = document.querySelector("[data-type='igual']");
const limparBtn = document.querySelector("[data-type='limpar']");
const limparAllBtn = document.querySelector("[data-limparAll]");
const displaySecundarioTextElement = document.querySelector(
  "[data-display-secundario]"
);
const displayPrincipalTextElement = document.querySelector(
  "[data-display-principal]"
);

class Calculadora {
  constructor(displaySecundarioTextElement, displayPrincipalTextElement) {
    this.displaySecundarioTextElement = displaySecundarioTextElement;
    this.displayPrincipalTextElement = displayPrincipalTextElement;
    this.limparAll();
  }
  limpar() {
    if (this.displayPrincipal.length == 1) {
      this.displayPrincipal = "0";
    } else {
      this.displayPrincipal = this.displayPrincipal.slice(0, -1);
    }
  }
  limparAll() {
    this.displayPrincipal = "0";
    this.displaySecundario = "";
    this.operadorBtn = undefined;
  }
  atualizarDisplay() {
    this.displayPrincipalTextElement.innerText = this.displayPrincipal;
    this.displaySecundarioTextElement.innerText = `${this.displaySecundario} ${
      this.operadorBtn || ""
    }`;
  }
  PegarNumero(numero) {
    if (this.displayPrincipal.includes(".") && numero == ".") return;
    if (this.displayPrincipal == "0") {
      this.displayPrincipal = numero.toString();
    } else {
      this.displayPrincipal += numero.toString();
    }
  }
  Operador(operacao) {
    if (this.displayPrincipal === "") return;
    if (this.displaySecundario !== "") {
      this.Calcular();
    }
    this.operadorBtn = operacao;
    this.displaySecundario = this.displayPrincipal;
    this.displayPrincipal = "";
  }
  Calcular() {
    let resultado;
    const _displayPrincipal = parseFloat(this.displayPrincipal);
    const _displaySecundario = parseFloat(this.displaySecundario);
    if (isNaN(_displayPrincipal) || isNaN(_displaySecundario)) return;
    switch (this.operadorBtn) {
      case "+":
        resultado = _displaySecundario + _displayPrincipal;
        break;
      case "-":
        resultado = _displaySecundario - _displayPrincipal;
        break;
      case "x":
        resultado = _displaySecundario * _displayPrincipal;
        break;
      case "÷":
        resultado = _displaySecundario / _displayPrincipal;
        break;
      default:
        return;
    }
    this.displayPrincipal = resultado;
    this.operadorBtn = undefined;
    this.displaySecundario = "";
  }
}
const minhaCalculadora = new Calculadora(
  displaySecundarioTextElement,
  displayPrincipalTextElement
);

limparBtn.addEventListener("click", () => {
  minhaCalculadora.limpar();
  minhaCalculadora.atualizarDisplay();
});
limparAllBtn.addEventListener("click", () => {
  minhaCalculadora.limparAll();
  minhaCalculadora.atualizarDisplay();
});
igualBtn.addEventListener("click", () => {
  minhaCalculadora.Calcular();
  minhaCalculadora.atualizarDisplay();
});

for (const numeroBtn of numeroBtns) {
  numeroBtn.addEventListener("click", () => {
    minhaCalculadora.PegarNumero(numeroBtn.innerText);
    minhaCalculadora.atualizarDisplay();
  });
}
for (const operadorBtn of operadorBtns) {
  operadorBtn.addEventListener("click", () => {
    minhaCalculadora.Operador(operadorBtn.innerText);
    minhaCalculadora.atualizarDisplay();
  });
}
