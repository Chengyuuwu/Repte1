# CHENG YU, SERGIO MORENO, ALEJANDRO, LUCAS
// 1. AGAFAM ELS ELEMENTS DE LA PÀGINA
// getElementById cerca a l'HTML l'element que té aquest id
// i el guardam en una variable per poder-lo utilitzar.
const missatge = document.getElementById("missatge");
const boto = document.getElementById("boto");

// 2. EL MOTLLE (expressió regular)
// Descriu com ha de ser el text: nombre, operador, nombre (els nombres poden ser negatius).
const patro = /^\s*(-?\d+(?:\.\d+)?)\s*([+\-*/%])\s*(-?\d+(?:\.\d+)?)\s*$/;

// 3. LA FUNCIÓ QUE FA EL CÀLCUL
// Una funció és un bloc de codi amb nom que només s'executa quan la cridam.
function calcular() {
  try {
    // 3.1 Demanar l'operació
    const entrada = prompt("Escriu una operació, per exemple 3.5 * 2");

    // Si l'usuari prem Cancel·lar, prompt retorna null
    if (entrada === null) {
      throw new Error("Has cancel·lat l'operació");
    }

    // 3.2 Dividir l'entrada en parts
    const parts = entrada.match(patro);

    if (parts === null) {
      throw new SyntaxError("L'expressió no és vàlida. Usa: nombre operador nombre");
    }

    // 3.3 Guardar cada part en una variable (i convertir el text en nombre)
    const nombre1 = parseFloat(parts[1]);
    const operador = parts[2];
    const nombre2 = parseFloat(parts[3]);

    // 3.4 Calcular segons l'operador
    let resultat;

    if (operador === "+") {
      resultat = nombre1 + nombre2;
    } else if (operador === "-") {
      resultat = nombre1 - nombre2;
    } else if (operador === "*") {
      resultat = nombre1 * nombre2;
    } else if (operador === "/") {
      if (nombre2 === 0) {
        throw new RangeError("No es pot dividir entre zero");
      }
      resultat = nombre1 / nombre2;
    } else if (operador === "%") {
      if (nombre2 === 0) {
        throw new RangeError("No es pot calcular el mòdul entre zero");
      }
      resultat = nombre1 % nombre2;
    }

    // 3.5 Mostrar el resultat (a la consola i a la pàgina)
    const text = nombre1 + " " + operador + " " + nombre2 + " = " + resultat;
    console.log(text);
    missatge.textContent = text;

  } catch (error) {
    // Qualsevol throw de dalt acaba aquí
    console.log("Error: " + error.message);
    missatge.textContent = "Error: " + error.message;
  }
}

// 4. CONNECTAR EL BOTÓ AMB LA FUNCIÓ
// "Quan es faci clic al botó, executa calcular"
boto.addEventListener("click", calcular);
