/* $('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
}) */

// Creamos un objeto con algunos mensajes sorpresa
var sorpresas = {
  "🕌": "🕌 ¡Marhaba (مرحبا) - Hola!",
  "🐪": "🐪 ¡Ma'a as-salama (مع السلامة) - Adiós!",
  "⚔️": "⚔️ ¡Shukran (شكراً) - Gracias!",
  "💎": "💎 ¡Salam aleikum (السلام عليكم) - La paz esté contigo!",
  "🎶": "🎶 ¡Wa aleikum as-salam (وَعَلَيْكُمُ السَّلَامُ) - Y contigo esté la paz!",
};

// Creamos una variable para indicar si el botón ya fue presionado
var presionado = false;

// Creamos una función para ejecutar el código
function ejecutarCodigo() {
  // Solo ejecutamos el código si el botón no fue presionado
  if (!presionado) {
    // Ejecutamos la función de mostrar sorpresas y guardamos el emoji seleccionado
    mostrarSorpresas();
    // Ejecutamos la función de llover emojis con el emoji seleccionado
    createRain();

    // Cambiamos la variable a verdadera para evitar que se vuelvan a ejecutar
    presionado = true;
  }
}

// Creamos una función para mostrar los mensajes sorpresa de forma aleatoria
function mostrarSorpresas() {
  // Obtenemos un arreglo con las claves del objeto de sorpresas
  var claves = Object.keys(sorpresas);

  // Elegimos una clave aleatoria del arreglo
  var clave = claves[Math.floor(Math.random() * claves.length)];

  // Mostramos el mensaje sorpresa en una ventana emergente
  alert(sorpresas[clave]);
}

// Configuración de confetti (ajustar emojis para el tema árabe)
const containerSlot = document.querySelector(".slot");
const btnConfettis = document.querySelector(".btn-confettis");
const emojis = ["🕌", "🐪", "💎", "🌙"]; // Nuevos emojis representativos

btnConfettis.addEventListener("click", fiesta);

function fiesta() {
  if (isTweening()) return;

  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("div");
    confetti.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    containerSlot.appendChild(confetti);
  }

  animateConfettis();
}

function animateConfettis() {
  const TLCONF = gsap.timeline();

  TLCONF.to(".slot div", {
    y: "random(-100,100)",
    x: "random(-100,100)",
    z: "random(0,1000)",
    rotation: "random(-90,90)",
    duration: 1,
  })
    .to(".slot div", { autoAlpha: 0, duration: 0.3 }, "-=0.2")
    .add(() => {
      containerSlot.innerHTML = "";
    });
}

function isTweening() {
  return gsap.isTweening(".slot div");
}
