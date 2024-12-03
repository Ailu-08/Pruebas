let juego;
//Las de abajo sacar!!!!
let dastan, traitor;
let secuaces = [];
let combustibles = [];
//Estas si: !!!!!
let song;
//Meter dentro de constructor load image dentro de cada clase 
let inicioBg, instructionsBg, ganasteBg, perdisteBg, creditsBg;  // Variables para almacenar las imágenes de fondos
let sandBg,riverBg;  // Variables para almacenar las imágenes de fondo Juego
let blueRug, redRug, minion, sword, fireball, magicFuel, dagger;

let songStarted = false; // Variable para controlar el estado del sonido


function preload() {
  // Cargar el sonido
  song = loadSound('assets/Song.mp3');
  
// Cargar la imagen de fondo para la pantalla de inicio
  inicioBg = loadImage('assets/Inicio.jpg');
  instructionsBg = loadImage('assets/Instructions.jpg');
  creditsBg = loadImage('assets/Creditos.jpg');
  ganasteBg = loadImage('assets/Ganaste.jpg');
  perdisteBg = loadImage('assets/Perdiste.jpg');
  sandBg = loadImage('assets/Sand.jpg');
  riverBg = loadImage('assets/Rio.jpg');
  blueRug = loadImage('assets/Dastan.png');
  redRug = loadImage('assets/Traitor.png');
  minion = loadImage('assets/MinionBoat.png');
  sword = loadImage('assets/Sword.png');
  fireball = loadImage('assets/Fireball.png');
  magicFuel = loadImage('assets/MagicFuel.png');
  dagger = loadImage('assets/Dagger.png');


}
function setup() {
  createCanvas(640, 480);
  juego = new Juego();
  juego.setup();
}

function draw() {
  juego.draw();
}

function keyPressed() {
  
  ///Meter dentro de la clase dastan
  // Disparo de Dastan
  if (key === ' ') {
    let projectile = new Projectile(dastan.x, dastan.y, -5); //Se crea un nuevo proyextil con la posicion Actual de dastan en x e y
    juego.dastanProjectiles.push(projectile);     // Se añade el proyectil al arreglo de proyectiles disparados por Dastan
  }
  
  // Reiniciar juego con la tecla 'r'
  if (key === 'r' || key === 'R') {
    juego.resetGame();    
    //Objetos: Coleccion de Propiedades
    //Objeto contenido dentro de otro objeto que llama a propiedad
    //Las propiedades/Atributos (Caracteristicas) son variables asociadas a un objeto o instancia de una clase. Sirven para almacenar información específica y características del objeto. 
    //Ej: Propiedad: gameState
    
    juego.mainScreen.gameState = "Juego"; // Reinicia el juego y cambia el estado
    song.play(); // Reinicia la música cuando se presiona 'R'
  }
   // Volver a la pantalla de inicio si se presiona la tecla 'i' en Ganaste o Perdiste
  if ((juego.mainScreen.gameState === "Ganaste" || juego.mainScreen.gameState === "Perdiste") && (key === 'i' || key === 'I')) {
    juego.mainScreen.gameState = "Inicio"; // Regresa a la pantalla de inicio
    song.stop(); // Detiene la musica al volver a inicio
  }
 if (key === 's' || key === 'S') {
    song.play(); // Si esta en silencio puedo tocar s y devolver la musica
  }
  }
  
 //Un método es una función asociada a un objeto o a una clase. Define un comportamiento que el objeto puede realizar. Los métodos son como funciones, pero están definidos dentro de la clase u objeto.
 //Una función es un bloque de código que se puede llamar desde cualquier parte del programa. No necesita estar asociada a un objeto o clase en particular. Una función puede existir de forma independiente.

// Evento de click del mouse
function mousePressed() {
  juego.botones.handleMousePressed();   // Detecta clics del mouse en botones del juego con el metodo/funcion (MousePressed)

}
