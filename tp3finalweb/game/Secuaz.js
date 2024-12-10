class Secuaz {
// Constructor de la clase 'Secuaz'. Se ejecuta cuando se crea una nueva instancia.

  constructor(x, y) {
    this.x = x;  // Posición horizontal (eje X) del secuaz, se pasa como parámetro al crear la instancia.
    this.y = y; // Posición vertical (eje Y) del secuaz, se pasa como parámetro al crear la instancia.
    this.speed = 2; // Velocidad de movimiento del secuaz, que es 2 por defecto.
  }
  
  move() {
    this.y += this.speed; // Incrementa la posición Y del secuaz, moviéndolo hacia abajo o arriba.
// Si el secuaz llega a la mitad de la pantalla o al borde superior, invierte su dirección. !!!!COMO?????????
    if (this.y > height / 2 || this.y < 0) this.speed *= -1; //variable = variable * valor; // speed *= 2; // Equivalente a speed= speed * -1; (Convierte el valor en negativo)
  }
  
// Método que dibuja al secuaz en la pantalla en las coordenadas (this.x, this.y).
  display() {
  image(minion, this.x, this.y, 30, 50); 
  }
  
// Método que hace que el secuaz dispare proyectiles a intervalos regulares.
  shoot() {
// Si el contador de frames es múltiplo de 90 (es decir, cada 90 cuadros), dispara un proyectil.
    if (frameCount % 90 === 0) {
      let projectile = new Projectile(this.x, this.y, 5); //Velocidad 5
      juego.secuazProjectiles.push(projectile);
    }
  }
}
