class Combustible {
  constructor(x, y) {  // Recibe las coordenadas 'x' y 'y' para colocar el combustible en una ubicación específica
    this.x = x;
    this.y = y;
  }
  
  // Método para mostrar el combustible en el canvas
  display() {
  image(magicFuel, this.x, this.y, 50, 50); //Posicion y Tamaño Imagen

  }
  
 // Método para verificar si el personaje 'dastan' ha recogido el combustible
  collected(dastan) {
    
// Calcula la distancia entre el combustible (this.x, this.y) y el personaje 'dastan' (dastan.x, dastan.y)
    let d = dist(this.x, this.y, dastan.x, dastan.y);
    
// Retorna 'true' si la distancia es menor que 20 (indica que 'dastan' ha recogido el combustible

    return d < 20;
  }
}
