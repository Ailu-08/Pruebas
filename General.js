let objJuego;
let img = [];
let imgArb;
let imgArbIlu;
let imgPasto;
let cielo;
let vege;
let glitch;

function preload() {
  img = [
    loadImage('data/abajo.png'),
    loadImage('data/medio.png'),
    loadImage('data/arriba.png')
  ];
  glitch = loadImage('data/glitch.png');
  vege = loadImage('data/vegetacion.png');
  cielo = loadImage('data/cielo.png');
  imgArb = loadImage('data/arbol1.png');
  imgArbIlu = loadImage('data/arbolCambio.png');
  imgPasto = loadImage('data/pasto.png');
}

function setup() {
  createCanvas(1920, 1080);
  objJuego = new Juego();
  objJuego.crearM();
}

function draw() {
  objJuego.cargaPantalla();
  objJuego.dibujar();
  objJuego.verificaPosicion();
  objJuego.verificarColisionRaices();
}

function keyPressed() {
  objJuego.mice.direccionTecla(key);
}

function keyReleased() {
  objJuego.mice.detenerMovimiento();
}
