const pantalla = document.getElementById("pantalla");
const botones = document.querySelectorAll(".btn");

let expresion = "";

function actualizarPantalla(valor) {
  pantalla.value = valor || "0";
}

function evaluarExpresion(expr) {
  const limpia = expr.replace(/\s+/g, "");
  if (!/^[0-9+\-*/.]+$/.test(limpia)) {
    throw new Error("Expresión no válida");
  }
  const tokens = limpia.match(/(\d+\.?\d*|[+\-*/])/g);
  if (!tokens) return "0";

  const numeros = [parseFloat(tokens[0])];
  const operadores = [];

  for (let i = 1; i < tokens.length; i += 2) {
    const op = tokens[i];
    const num = parseFloat(tokens[i + 1]);
    if (Number.isNaN(num)) throw new Error("Error");

    if (op === "*" || op === "/") {
      const previo = numeros.pop();
      if (op === "/" && num === 0) throw new Error("Error");
      numeros.push(op === "*" ? previo * num : previo / num);
    } else {
      numeros.push(num);
      operadores.push(op);
    }
  }

  let resultado = numeros[0];
  for (let i = 0; i < operadores.length; i++) {
    resultado = operadores[i] === "+" ? resultado + numeros[i + 1] : resultado - numeros[i + 1];
  }

  return Number(resultado.toFixed(10)).toString();
}

botones.forEach((boton) => {
  boton.addEventListener("click", () => {
    const { value, action } = boton.dataset;

    if (action === "clear") {
      expresion = "";
      actualizarPantalla("0");
      return;
    }

    if (action === "delete") {
      expresion = expresion.slice(0, -1);
      actualizarPantalla(expresion);
      return;
    }

    if (action === "calculate") {
      try {
        expresion = evaluarExpresion(expresion);
        actualizarPantalla(expresion);
      } catch {
        expresion = "";
        actualizarPantalla("Error");
      }
      return;
    }

    if (value) {
      const ultimoChar = expresion.slice(-1);
      const esOperador = ["+", "-", "*", "/"].includes(value);
      if (esOperador && (!expresion || ["+", "-", "*", "/"].includes(ultimoChar))) {
        return;
      }
      expresion += value;
      actualizarPantalla(expresion);
    }
  });
});
