class Projectile {
  constructor(x, y, speed) {
    this.x = x; // Posición horizontal (eje X) del proyectil, se pasa como parámetro al crear la instancia.
    this.y = y; // Posición vertical (eje Y) del proyectil, se pasa como parámetro al crear la instancia.
    this.speed = speed; // Velocidad de movimiento del proyectil, se pasa como parámetro al crear la instancia.
  }

  move() {  
    this.y += this.speed; // Incrementa la posición en Y según la velocidad, moviendo el proyectil hacia abajo.
  }
  
// Método para dibujar el proyectil en la pantalla dependiendo de su tipo ('dagger', 'sword', 'fireball').
  display(type) {
    if (type === 'dagger') {
      image(dagger, this.x, this.y, 50, 50);  
    } else if (type === 'sword') {
      image(sword, this.x, this.y, 50, 50);  
    } else if (type === 'fireball') {
      image(fireball, this.x, this.y, 50, 50); 
    }
  }
// Método para verificar si el proyectil ha golpeado un objetivo.
  hits(target) {
// Si la distancia es menor a 20 píxeles, se considera que el proyectil ha golpeado el objetivo.
    return dist(this.x, this.y, target.x, target.y) < 20;
  }
}
