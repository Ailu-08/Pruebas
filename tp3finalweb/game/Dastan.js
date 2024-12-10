class Dastan {
// El constructor se ejecuta cuando se crea una nueva instancia de la clase 'Dastan'
  constructor() {
// Inicializa las propiedades del objeto 'Dastan' cuando se crea la instancia
    this.x = width / 2;    // Establece la posición inicial del personaje en el eje X (centro de la pantalla)
    this.y = height - 50;  // Establece la posición inicial del personaje en el eje Y (en la parte inferior de la pantalla, con un margen de 50 píxeles desde el borde)
    this.speed = 5;        // Establece la velocidad de movimiento del personaje
    this.canShoot = true; // Bandera para controlar disparos

  }
  
  move() {
// Si se presiona la tecla de flecha izquierda (LEFT_ARROW) y el personaje no está en el borde izquierdo de la pantalla
    if (keyIsDown(LEFT_ARROW) && this.x > 0) {
// Mueve al personaje hacia la izquierda disminuyendo su posición en 'x'
      this.x -= this.speed; 
    }
    
// Si se presiona la tecla de flecha derecha (RIGHT_ARROW) y el personaje no está en el borde derecho de la pantalla
    if (keyIsDown(RIGHT_ARROW) && this.x < width - 50) { 
// Mueve al personaje hacia la derecha incrementando su posición en 'x'
      this.x += this.speed;
    }
 // Si se presiona la tecla de flecha arriba (UP_ARROW) y el personaje no está en el borde superior de la pantalla
    if (keyIsDown(UP_ARROW) && this.y > 0) {
// Mueve al personaje hacia arriba disminuyendo su posición en 'y'
      this.y -= this.speed;
    }
// Si se presiona la tecla de flecha abajo (DOWN_ARROW) y el personaje no está en el borde inferior de la pantalla
    if (keyIsDown(DOWN_ARROW) && this.y < height - 50) { // Limitacion de movimientos
//// Mueve al personaje hacia abajo incrementando su posición en 'y'
      this.y += this.speed;
    }
  }

  display() {
    image(blueRug, this.x, this.y, 100, 100);  // Posicion y tamaño de Imagen

  }
shoot() {
    if (this.canShoot) {
      juego.dastanProjectiles.push(new Projectile(this.x + 25, this.y, -5));
      this.canShoot = false;
    }
  }

  allowShooting() {
    this.canShoot = true;
  }

  handleKeyPressed() {
    if (key === ' ') this.shoot(); // Dispara al presionar espacio
  }

  handleKeyReleased() {
    if (key === ' ') this.allowShooting(); // Permite disparar de nuevo al soltar espacio
  }
}
