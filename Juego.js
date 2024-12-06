// cONTACTO CON PROYECTIL o combustible sacar de la pantalla e inmovilizo (Vivo true/MUERTO; fALSE) 

class Juego {
  constructor() {
    this.mainScreen = new MainScreen(); //Creo Instancia de la clase MainScreen y asigno a la propiedad mainScreen
    
    //Esta no deberia ir en juego CREO porque es parte de pantallas!!!
    this.botones = new Botones(this.mainScreen); //Creo Instancia de la clase Botones y asigno a la propiedad botones
    dastan = new Dastan();     // Crea la instancia del personaje Dastan.
    traitor = new Traitor();  // Crea la instancia del personaje Traitor.
    this.dastanLives = 3;
    this.traitorLives = 3;
    this.secuacesLives = 1;
    this.combustible = 100;
    this.riverWidth = 640;
    this.dastanProjectiles = [];
    this.traitorProjectiles = [];
    this.secuazProjectiles = [];
    this.spawnSecuaces();    // Llama a la función para crear los secuaces.
    this.spawnCombustibles();  // Llama a la función para generar los objetos de combustible.
// Temporizador para la generación de combustible
    this.fuelSpawnTime = 200; // Intervalo para generar combustible
    this.fuelTimer = this.fuelSpawnTime;
  }


  draw() {
    this.mainScreen.draw(this);  //// Dibuja la pantalla principal del juego.
  }

  updateGame() {
    image(sandBg, 0, 0, width, height);
    fill(0, 100, 255);
  image(riverBg, (width - this.riverWidth) / 2, 0, this.riverWidth, height);  // Dibuja el fondo del río.

    if (this.riverWidth <= 500 && !traitor.aparecido) { // Si el ancho del río es menor a 500 y el Traitor no ha aparecido, lo hace.
      traitor.aparecer();
    }

    dastan.move();         
    dastan.display();     
    dastan.shoot();

    if (traitor.aparecido) {   // Si el Traitor ha aparecido, se mueve.
      traitor.move();
      traitor.display();       
      traitor.shoot();       
    }

    this.updateProjectiles(); // Actualiza los proyectiles.
    this.updateSecuaces();    // Actualiza los secuaces.
    this.updateCombustible(); // Actualiza el combustible.
    this.updateFuelCollection();  // Controla la recolección de combustible.
    this.handleFuelSpawn();      // Controla la generación de combustible

    this.riverWidth -= 0.1;     // Reduce gradualmente el ancho del río.

    fill(0, 0, 0);       // Cambia el color de texto a negro.
    textSize(16);        // Define el tamaño de fuente.
    //Muestran las vidas de Dastan, Traitor, Combustible
    text('Vidas Dastan: ' + this.dastanLives, 65, 20);
    text('Vidas Traitor: ' + this.traitorLives, 65, 60);
    
    ///PUEDE QUE ESTA PARTE VAYA EN COMBUSTIBLE CLASS (lo de abajo) !!!!!!!!!!!!
        
let numero = this.combustible; 
if (numero % 1 >= 0.5) { // Si el decimal es 0.5 o más
  numero = numero - (numero % 1) + 1; 
} else {
  numero = numero - (numero % 1); // Baja al entero actual
}
text('Combustible: ' + numero, 65, 40); // Muestra el valor de numero redondeado en pantalla

  }

//Metodo que maneja la generacion de combustible
  handleFuelSpawn() {    
// Control del temporizador para la generación de combustible
    this.fuelTimer--; // Resta un segundo al temporizador.
    if (this.fuelTimer <= 0) {
      this.spawnCombustible(); 
      this.fuelTimer = this.fuelSpawnTime;
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
      if (fuel.collected(dastan)) { // Si Dastan recoge el combustible
        this.combustible += 20;     // Aumenta el nivel de combustible del jugador en 20.
        combustibles.splice(i, 1); // Elimina el combustible recogido.
      }
    }
  }

updateProjectiles() { 
  // Actualizar y mostrar proyectiles de Dastan
    for (let i = this.dastanProjectiles.length - 1; i >= 0; i--) {
      let projectile = this.dastanProjectiles[i];
      projectile.move();
      projectile.display('dagger');

      // Verificar colisión con el traidor
      if (traitor.aparecido && projectile.hits(traitor)) { //Si el traidor ha aparecido y el proyectil golpea al triador: 
        this.traitorLives--; //Se disminuyen las vidas del traidor por la colision.
        this.dastanProjectiles.splice(i, 1); //Se eliminan los proyectiles de dastan.
        if (this.traitorLives <= 0) this.mainScreen.gameState = "Ganaste";
        continue;
      }

      // Eliminar proyectiles que salen de la pantalla
      if (projectile.y < 0) { //Si el proyectil de Dastan sale por arriba
        this.dastanProjectiles.splice(i, 1); //Se elimina
      }
    }
    
     // Actualizar y mostrar proyectiles del traidor
    for (let i = this.traitorProjectiles.length - 1; i >= 0; i--) {
      let projectile = this.traitorProjectiles[i];
      projectile.move();
      projectile.display('sword');

      // Verificar colisión con Dastan
      if (projectile.hits(dastan)) {
        this.dastanLives--;
        this.traitorProjectiles.splice(i, 1);
        if (this.dastanLives <= 0) this.mainScreen.gameState = "Perdiste";
        continue;
      }

      // Eliminar proyectiles que salen de la pantalla
      if (projectile.y > height) { ////Si el proyectil del Traidor sale por abajo
        this.traitorProjectiles.splice(i, 1); //Se elimina
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
      if (projectile.hits(secuaz)) { //Si el proyectil golpea al Secuaz
        secuaces.splice(i, 1); // Elimina al secuaz
        this.dastanProjectiles.splice(j, 1); // Elimina el proyectil
        break; 
      }
    }
  }

  // Mover y mostrar proyectiles de secuaces
  for (let i = this.secuazProjectiles.length - 1; i >= 0; i--) {
    let projectile = this.secuazProjectiles[i];
    projectile.move();
    projectile.display('fireball');

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
    this.combustible -= 0.1; // Decrece el nivel de combustible en 0.1 constantemente
    if (this.combustible <= 0) this.mainScreen.gameState = "Perdiste"; // Si el combustible llega a 0, el jugador pierde
  }

  resetGame() {
    this.dastanLives = 3;     // Reinicia las vidas de Dastan.
    this.traitorLives = 3;   // Reinicia las vidas del Traido.
    this.combustible = 100; // Reinicia el nivel de combustible.
    this.riverWidth = 640;  // Reinicia el ancho del río.
    this.dastanProjectiles = []; // Reinicia los proyectiles de Dastan (vacía el arreglo)
    this.traitorProjectiles = []; // Reinicia los proyectiles del Traidor (vacía el arreglo)
    this.spawnSecuaces();            // Llama al método, que se encarga de generar los secuaces para regenerarlos
    this.spawnCombustibles();       // Llama al metodo, que se encarga de generar los Combustibles para regenerarlos
    traitor.aparecido = false;     // Resetea el estado del Traitor.
    this.fuelTimer = this.fuelSpawnTime; // Reinicia el temporizador cuando el juego comienza de nuevo con el valor correcto
  }

spawnSecuaces() {
//Calcula cuántos secuaces generar en función del ancho del río.
  let cantidadSecuaces = int(3 + (640 - this.riverWidth) / 100); // Uso de int() para resultado a entero
  secuaces = [];
  for (let i = 0; i < cantidadSecuaces; i++) {
    secuaces.push(new Secuaz(random(100, width - 100), random(50, height / 2)));
  }
}


  spawnCombustibles() {
    combustibles = [];
    for (let i = 0; i < 1; i++) { //Genera un único combustible en una posición aleatoria.
      combustibles.push(new Combustible(random(100, width - 100), random(50, height - 100)));
    }
  }
}
