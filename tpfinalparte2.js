let juego;
let dastan, traitor;
let secuaces = [];
let combustibles = [];
let song;
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
  userStartAudio();
}

function draw() {
  juego.draw();
}

// Clase para manejar todas las pantallas
class MainScreen {
  constructor() {
    this.gameState = "Inicio"; // Estado inicial del juego
  }

  draw() {
    if (this.gameState === "Inicio") {
      this.drawInicio();
    } else if (this.gameState === "Instrucciones") {
      this.drawInstrucciones();
    } else if (this.gameState === "Juego") {
      juego.updateGame();
    } else if (this.gameState === "Ganaste") {
      this.drawGanaste();
    } else if (this.gameState === "Perdiste") {
      this.drawPerdiste();
    } else if (this.gameState === "Creditos") {
      this.drawCreditos();
    }
  }

  drawInicio() {
    image(inicioBg, 0, 0, width, height);
    textAlign(CENTER);
    textSize(32);
    text("El Principe de Persia Juego", width / 2, height / 2 - 100);

    // Dibuja los botones manualmente
    this.drawButton("Jugar", width / 2 - 100, height - 150, 200, 40);
    this.drawButton("Instrucciones", width / 2 - 100, height - 100, 200, 40);
    this.drawButton("Créditos", width / 2 - 100, height - 50, 200, 40);
  }

  drawInstrucciones() {
    image(instructionsBg, 0, 0, width, height);
    textAlign(CENTER);
    textSize(24);
    text("Instrucciones: \n Usa las flechas para mover a Dastan\n  y dispara con la barra espaciadora. \n Recolecta todo el combustible que puedas, \n dispara a los secuaces y mata al traidor. ", width / 2, height / 2);

    // Botón para regresar a la pantalla de Inicio desde Instrucciones
    this.drawButton("Inicio", width / 2 - 100, height - 50, 200, 40);
  }

  drawCreditos() {
    image(creditsBg, 0, 0, width, height);
    textAlign(CENTER);
    textSize(24);
    text("Alumnas y Desarrolladoras: \n Agustina Clar \n Ailen Avanzini", width / 2, height / 2);

    // Botón para regresar a Inicio desde la pantalla de Créditos
    this.drawButton("Inicio", width / 2 - 100, height - 50, 200, 40);
  }

  drawGanaste() {
    image(ganasteBg, 0, 0, width, height);
    textAlign(CENTER);
    textSize(32);
    text("¡Ganaste!", width / 2, height / 2);
    
      // Detén la música o cambia de sonido si lo deseas
    song.stop();
  }

  drawPerdiste() {
    image(perdisteBg, 0, 0, width, height);
    textAlign(CENTER);
    textSize(32);
    text("Perdiste", width / 2, height / 2);
    
      // Detén la música o cambia de sonido si lo deseas
    song.stop();
  }

  drawButton(label, x, y, w, h) {
    fill(200);
    rect(x, y, w, h, 5);
    fill(0);
    textSize(18);
    textAlign(CENTER, CENTER);
    text(label, x + w / 2, y + h / 2);
  }

  checkButtonClick(x, y, w, h) {
    return mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;
  }
}

// Clase para manejar la lógica de los botones manualmente
class Botones {
  constructor(mainScreen) {
    this.mainScreen = mainScreen;
  }

  handleMousePressed() {
    if (this.mainScreen.gameState === "Inicio") {
      this.handleInicioButtons();
    } else if (this.mainScreen.gameState === "Instrucciones") {
      this.handleInstructionsButtons();
    } else if (this.mainScreen.gameState === "Creditos") {
      this.handleCreditsButtons();
    }
  }

  handleInicioButtons() {
   if (this.mainScreen.checkButtonClick(width / 2 - 100, height - 150, 200, 40)) {
      // Reproducir la canción solo si no se ha reproducido antes
      if (!songStarted) {
        song.loop(); // Reproduce la canción en bucle
        songStarted = true; // Marcar que el sonido ha comenzado
      }

      this.mainScreen.gameState = "Juego";
      juego.resetGame();
    } else if (this.mainScreen.checkButtonClick(width / 2 - 100, height - 100, 200, 40)) {
      this.mainScreen.gameState = "Instrucciones";
    } else if (this.mainScreen.checkButtonClick(width / 2 - 100, height - 50, 200, 40)) {
      this.mainScreen.gameState = "Creditos";
    }
  }

  handleInstructionsButtons() {
    if (this.mainScreen.checkButtonClick(width / 2 - 100, height - 50, 200, 40)) {
      this.mainScreen.gameState = "Inicio";
    }
  }

  handleCreditsButtons() {
    if (this.mainScreen.checkButtonClick(width / 2 - 100, height - 50, 200, 40)) {
      this.mainScreen.gameState = "Inicio";
    }
  }
}

// Clase principal del juego
class Juego {
  constructor() {
    this.mainScreen = new MainScreen();
    this.botones = new Botones(this.mainScreen);
    this.dastanLives = 3;
    this.traitorLives = 3;
    this.secuacesLives = 1;
    this.combustible = 100;
    this.riverWidth = 640;
    this.dastanProjectiles = [];
    this.traitorProjectiles = [];
    this.secFireballs = [];
    this.secuazProjectiles = [];
        // Temporizador para la generación de combustible
    this.fuelSpawnTime = 200; // Intervalo para generar combustible
    this.fuelTimer = this.fuelSpawnTime;

  }

  setup() {
    dastan = new Dastan();
    traitor = new Traitor();
    this.spawnSecuaces();
    this.spawnCombustibles();
  }

  draw() {
    this.mainScreen.draw();
  }

  updateGame() {
    image(sandBg, 0, 0, width, height);
    fill(0, 100, 255);
  image(riverBg, (width - this.riverWidth) / 2, 0, this.riverWidth, height);

    if (this.riverWidth <= 500 && !traitor.aparecido) {
      traitor.aparecer();
    }

    dastan.move();
    dastan.display();

    if (traitor.aparecido) {
      traitor.move();
      traitor.display();
      traitor.shoot();
    }

    this.updateProjectiles();
    this.updateSecuaces();
    this.updateCombustible();
    this.updateFuelCollection();
     // Controlar la generación de combustible
    this.handleFuelSpawn();

    this.riverWidth -= 0.1;

    fill(0, 0, 0);
    textSize(16);
    text('Vidas Dastan: ' + this.dastanLives, 65, 20);
    text('Vidas Traitor: ' + this.traitorLives, 65, 60);
    text('Combustible: ' + this.combustible.toFixed(0), 65, 40);
  }

  handleFuelSpawn() {
    // Control del temporizador para la generación de combustible
    this.fuelTimer--;
    if (this.fuelTimer <= 0) {
      this.spawnCombustible();
      this.fuelTimer = this.fuelSpawnTime; // Reinicia el temporizador
    }
  }

  spawnCombustible() {
    // Genera un nuevo objeto combustible en una posición aleatoria
    combustibles.push(new Combustible(random(100, width - 100), random(50, height - 100)));
  }

  updateFuelCollection() {
    for (let i = combustibles.length - 1; i >= 0; i--) {
      let fuel = combustibles[i];
      fuel.display();
      if (fuel.collected(dastan)) {
        this.combustible += 20;
        combustibles.splice(i, 1);
      }
    }

    // Si todos los combustibles han sido recolectados, reinicia el temporizador
    if (combustibles.length === 0) {
      this.fuelTimer = this.fuelSpawnTime;
    }
  }
  
updateProjectiles() {
  // Actualizar y mostrar proyectiles de Dastan
    for (let i = this.dastanProjectiles.length - 1; i >= 0; i--) {
      let projectile = this.dastanProjectiles[i];
      projectile.move();
      projectile.display();

      // Verificar colisión con el traidor
      if (traitor.aparecido && projectile.hits(traitor)) {
        this.traitorLives--;
        this.dastanProjectiles.splice(i, 1);
        if (this.traitorLives <= 0) this.mainScreen.gameState = "Ganaste";
        continue;
      }

      // Eliminar proyectiles que salen de la pantalla
      if (projectile.y < 0) {
        this.dastanProjectiles.splice(i, 1);
      }
    }
    
     // Actualizar y mostrar proyectiles del traidor
    for (let i = this.traitorProjectiles.length - 1; i >= 0; i--) {
      let projectile = this.traitorProjectiles[i];
      projectile.move();
      projectile.display();

      // Verificar colisión con Dastan
      if (projectile.hits(dastan)) {
        this.dastanLives--;
        this.traitorProjectiles.splice(i, 1);
        if (this.dastanLives <= 0) this.mainScreen.gameState = "Perdiste";
        continue;
      }

      // Eliminar proyectiles que salen de la pantalla
      if (projectile.y > height) {
        this.traitorProjectiles.splice(i, 1);
      }
    }
  }
  
  updateSecuaces() {
  // Mover y actualizar secuaces
  if (traitor.aparecido) {
    return;  // No actualiza ni genera secuaces
  }
  for (let i = secuaces.length - 1; i >= 0; i--) {
    let secuaz = secuaces[i];
    secuaz.move();
    secuaz.display();
    secuaz.shoot();

    // Verificar colisión con proyectiles de Dastan
    for (let j = this.dastanProjectiles.length - 1; j >= 0; j--) {
      let projectile = this.dastanProjectiles[j];
      if (projectile.hits(secuaz)) {
        secuaces.splice(i, 1); // Eliminar secuaz
        this.dastanProjectiles.splice(j, 1); // Eliminar proyectil
        break;
      }
    }
  }

  // Mover y mostrar proyectiles de secuaces
  for (let i = this.secuazProjectiles.length - 1; i >= 0; i--) {
    let projectile = this.secuazProjectiles[i];
    projectile.move();
    projectile.display();

    // Verificar colisión con Dastan
    if (projectile.hits(dastan)) {
      this.dastanLives--;
      this.secuazProjectiles.splice(i, 1);
      if (this.dastanLives <= 0) this.mainScreen.gameState = "Perdiste";
      continue;
    }

    // Eliminar proyectiles que salen de la pantalla
    if (projectile.y > height) {
      this.secuazProjectiles.splice(i, 1);
    }
  }

  // Verificar si todos los secuaces han sido eliminados
  if (secuaces.length === 0) {
    // Temporizador antes de regenerar los secuaces
    if (!this.secuaceRespawnTimer) {
      this.secuaceRespawnTimer = frameCount + 120; // Esperar 120 fotogramas (~2 segundos)
    } else if (frameCount >= this.secuaceRespawnTimer) {
      // Regenerar secuaces cuando el temporizador haya terminado
      this.spawnSecuaces();
      this.secuaceRespawnTimer = null; // Reiniciar el temporizador
    }
  }
}

  updateCombustible() {
    this.combustible -= 0.1;
    if (this.combustible <= 0) this.mainScreen.gameState = "Perdiste";
  }

  resetGame() {
    this.dastanLives = 3;
    this.traitorLives = 3;
    this.combustible = 100;
    this.riverWidth = 640;
    this.dastanProjectiles = [];
    this.traitorProjectiles = [];
    this.secFireballs = [];
    this.spawnSecuaces();
    this.spawnCombustibles();
    traitor.aparecido = false;
    this.fuelTimer = this.fuelSpawnTime; // Reinicia el temporizador

  }

spawnSecuaces() {
  let cantidadSecuaces = int(3 + (640 - this.riverWidth) / 100); // Usando int() para convertir el resultado a entero
  secuaces = [];
  for (let i = 0; i < cantidadSecuaces; i++) {
    secuaces.push(new Secuaz(random(100, width - 100), random(50, height / 2)));
  }
}


  spawnCombustibles() {
    combustibles = [];
    for (let i = 0; i < 6; i++) {
      combustibles.push(new Combustible(random(100, width - 100), random(50, height - 100)));
    }
  }
}

class Dastan {
  constructor() {
    this.x = width / 2;
    this.y = height - 100;
    this.speed = 5;
  }

  move() {
  if (keyIsDown(UP_ARROW) && this.y > 0) this.y -= this.speed;
  if (keyIsDown(DOWN_ARROW) && this.y < height) this.y += this.speed;
  if (keyIsDown(LEFT_ARROW) && this.x > 0) this.x -= this.speed;
  if (keyIsDown(RIGHT_ARROW) && this.x < width) this.x += this.speed;
}


  display() {
  image(blueRug, this.x, this.y, 100, 100); // Ajustar el tamaño if we need de Dastan
  }
}
class Traitor {
  constructor() {
    this.x = width / 2;
    this.y = 50;
    this.speed = 2;
    this.aparecido = false; // Inicialmente el traidor no aparece
  }

  aparecer() {
    this.aparecido = true; // Cuando se llame a este método, el traidor aparecerá
  }

  move() {
    if (this.aparecido) {  // Solo mueve al traidor si ha aparecido
      this.x += this.speed;
      if (this.x > width || this.x < 0) this.speed *= -1;
    }
  }

  display() {
    if (this.aparecido) {
  image(redRug, this.x, this.y, 100, 100); // Ajustar el tamaño if we need de el Traidor
    }
  }

  shoot() {
    if (this.aparecido && frameCount % 60 === 0) {
      let projectile = new Projectile(this.x, this.y, 5);
      juego.traitorProjectiles.push(projectile);
    }
  }
}

class Secuaz {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 2;
  }

  move() {
    this.y += this.speed;
    if (this.y > height / 2 || this.y < 0) this.speed *= -1;
  }

  display() {
  image(minion, this.x, this.y, 30, 50); // Ajustar el tamaño if we need de Secuaces
  }

  shoot() {
    if (frameCount % 90 === 0) {
      let projectile = new Projectile(this.x, this.y, 5);
      juego.secuazProjectiles.push(projectile);
    }
  }
}

class Combustible {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  display() {
  image(magicFuel, this.x, this.y, 50, 50); // Ajustar el tamaño if we need del Combustible

  }

  collected(dastan) {
    let d = dist(this.x, this.y, dastan.x, dastan.y);
    return d < 20;
  }
}

class Projectile {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
  }

  move() {
    this.y += this.speed;
  }

  display() {
    fill(0);
    rect(this.x, this.y, 5, 10); // Representa el proyectil con un rectángulo negro
  }

  hits(target) {
    return dist(this.x, this.y, target.x, target.y) < 20;
  }
  }

function keyPressed() {
  // Disparo de Dastan
  if (key === ' ') {
    let projectile = new Projectile(dastan.x, dastan.y, -5);
    juego.dastanProjectiles.push(projectile);
  }
  
  // Reiniciar juego con la tecla 'r'
  if (key === 'r' || key === 'R') {
    juego.resetGame();
    juego.mainScreen.gameState = "Juego"; // Reinicia el juego y cambia el estado
    song.play(); // Reinicia la música cuando se presiona 'R'
  }
   // Volver a la pantalla de inicio si se presiona la tecla 'i' en Ganaste o Perdiste
  if ((juego.mainScreen.gameState === "Ganaste" || juego.mainScreen.gameState === "Perdiste") && (key === 'i' || key === 'I')) {
    juego.mainScreen.gameState = "Inicio"; // Regresar a la pantalla de inicio
    song.stop(); // Detener la música si es necesario
  }
 if (key === 's' || key === 'S') {
    song.play(); // Detener la música si es necesario
  }
  }
// Evento de click del mouse
function mousePressed() {
  juego.botones.handleMousePressed();
}
