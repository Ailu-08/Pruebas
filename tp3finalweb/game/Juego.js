class Juego {
  constructor() {
    this.mainScreen = new MainScreen(); //Creo Instancia de la clase MainScreen y asigno a la propiedad mainScreen
//Creo instancias de los personajes 
    this.dastan = new Dastan();     
    this.traitor = new Traitor(); 
// Asigno valores iniciales a las variables del juego
    this.dastanLives = 3;
    this.traitorLives = 3;
    this.secuacesLives = 1;
    this.combustible = 100;
    this.riverWidth = 640;
//Variables de Arreglos
this.secuaces = [];
this.combustibles = [];
// Inicialización de proyectiles
    this.dastanProjectiles = [];
    this.traitorProjectiles = [];
    this.secuazProjectiles = [];
// Gestión de secuaces y combustible
    this.spawnSecuaces();    // Llama a la función para crear los secuaces.
    this.spawnCombustibles();  // Llama a la función para generar los objetos de combustible.
// Temporizador para la generación de combustible
    this.fuelSpawnTime = 200; // Intervalo para generar combustible
  }


  draw() {
    this.mainScreen.draw(this);  //// Dibuja la pantalla principal del juego.
    //Llama al método draw de mainScreen
    //Pasa la referencia al objeto Juego actual como argumento para que pueda ser usado dentro de draw.

  }

  updateGame() {
    image(sandBg, 0, 0, width, height);
    fill(0, 100, 255);
  image(riverBg, (width - this.riverWidth) / 2, 0, this.riverWidth, height);  // Dibuja el fondo del río.

    if (this.riverWidth <= 500 && !this.traitor.aparecido) { // Si el ancho del río es menor a 500 y el Traitor no ha aparecido, lo hace.
      this.traitor.aparecer();
    }
    this.dastan.move();         
    this.dastan.display();     
    this.dastan.shoot();

    if (this.traitor.aparecido) {   // Si el Traitor ha aparecido, se mueve.
      this.traitor.move();
      this.traitor.display();       
      this.traitor.shoot();       
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

//Calculo el combustible y muestro el numero Redondeado

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
    this.combustibles.push(new Combustible(random(100, width - 100), random(50, height - 100)));
  }

  updateFuelCollection() {
    for (let i = this.combustibles.length - 1; i >= 0; i--) {
      let fuel = this.combustibles[i];
      fuel.display(); 
      if (fuel.collected(this.dastan)) { // Si Dastan recoge el combustible
        this.combustible += 20;     // Aumenta el nivel de combustible del jugador en 20.
        this.combustibles.splice(i, 1); // Elimina el combustible recogido.
      }
    }
  }

updateProjectiles() {
    // Actualizar proyectiles de todos los personajes
    this.updateCharacterProjectiles(this.dastanProjectiles, this.traitor, 'dagger');
    this.updateCharacterProjectiles(this.traitorProjectiles, this.dastan, 'sword');
    this.updateCharacterProjectiles(this.secuazProjectiles, this.dastan, 'fireball', true);
  }

  updateCharacterProjectiles(projectiles, target, type, isSecuaz = false) {
    for (let i = projectiles.length - 1; i >= 0; i--) {
        let projectile = projectiles[i];
        projectile.move();
        projectile.display(type);

        // Verificar colisión con el objetivo (si hay un objetivo)
        if (target && projectile.hits(target)) {
            if (target === this.dastan) {
                this.dastanLives--;
                if (this.dastanLives <= 0) this.mainScreen.gameState = "Perdiste";
            } else if (target === this.traitor) {
                this.traitorLives--;
                if (this.traitorLives <= 0) this.mainScreen.gameState = "Ganaste";
            }
            projectiles.splice(i, 1);
        }

        // Eliminar proyectiles que salen de la pantalla
        if (projectile.y < 0 || projectile.y > height) {
            projectiles.splice(i, 1);
        }
    }
}

 updateSecuaces() {
    if (this.traitor.aparecido) {
        return; // No actualizar ni generar secuaces cuando el traidor está activo
    }

    for (let i = this.secuaces.length - 1; i >= 0; i--) {
        let secuaz = this.secuaces[i];
        secuaz.move();
        secuaz.display();
        secuaz.shoot();

        // Verificar colisión con proyectiles de Dastan
        for (let j = this.dastanProjectiles.length - 1; j >= 0; j--) {
            let projectile = this.dastanProjectiles[j];
            if (projectile.hits(secuaz)) {
                this.secuaces.splice(i, 1); // Eliminar secuaz
                this.dastanProjectiles.splice(j, 1); // Eliminar proyectil
            }
        }
    }

    // Verificar si todos los secuaces han sido eliminados
    if (this.secuaces.length === 0) {
        if (!this.secuaceRespawnTimer) {
            this.secuaceRespawnTimer = frameCount + 120; // Temporizador de respawn
        } else if (frameCount >= this.secuaceRespawnTimer) {
            this.spawnSecuaces();
            this.secuaceRespawnTimer = null; // Reiniciar temporizador
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
    this.traitor.aparecido = false;     // Resetea el estado del Traitor.
    this.fuelTimer = this.fuelSpawnTime; // Reinicia el temporizador cuando el juego comienza de nuevo con el valor correcto
  }

spawnSecuaces() {
//Calcula cuántos secuaces generar en función del ancho del río.
  let cantidadSecuaces = int(3 + (640 - this.riverWidth) / 100); // Uso de int() para resultado a entero
  this.secuaces = [];
  for (let i = 0; i < cantidadSecuaces; i++) {
    this.secuaces.push(new Secuaz(random(100, width - 100), random(50, height / 2)));
  }
}

  spawnCombustibles() {
    this.combustibles = [];
    for (let i = 0; i < 1; i++) { //Genera un único combustible en una posición aleatoria.
      this.combustibles.push(new Combustible(random(100, width - 100), random(50, height - 100)));
    }
  }
}
