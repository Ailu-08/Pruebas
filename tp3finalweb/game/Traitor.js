class Traitor {
  constructor() {   // Se inicializan las propiedades del objeto 'Traitor'
    this.x = width / 2;  // Posición horizontal del traidor, inicialmente en el centro de la pantalla
    this.y = 50;        // Posición vertical del traidor, fija en 50 píxeles
    this.speed = 2;     // Velocidad de movimiento del traidor
    this.aparecido = false; // Inicialmente el traidor no aparece
  }
  
// Método para hacer que el traidor aparezca en la pantalla
  aparecer() {
    this.aparecido = true; // Cuando se llame a este método, el traidor aparecerá
  }
  
// Método para mover al traidor
  move() {
    if (this.aparecido) {  // Solo mueve al traidor si ha aparecido
      this.x += this.speed; // Mueve al traidor horizontalmente, según la velocidad definida
      if (this.x > width || this.x < 0) this.speed *= -1;  
// Invierte la dirección del movimiento (si va a la derecha, irá a la izquierda y viceversa)
    }
  }
  
  display() {
    if (this.aparecido) { // Solo dibuja al traidor si ha aparecido
  image(redRug, this.x, this.y, 100, 100);
    }
  }
  
// Método para hacer que el traidor dispare proyectiles
  shoot() {
    if (this.aparecido && frameCount % 60 === 0) {  // Si el traidor ha aparecido y ha pasado un tiempo (cada 60 frames)
      let projectile = new Projectile(this.x, this.y, 5); // Crea un nuevo proyectil en la posición del traidor con una velocidad de 5
      juego.traitorProjectiles.push(projectile); // Agrega el proyectil a la lista de proyectiles del traidor

    }
  }
}
