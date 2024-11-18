class Glitch {
  constructor() {
    this.activo = false;
    this.tiempoActivacion = 0;
    this.arbol = null;
  }

  activar(arboles) {
    if (!this.activo) {
      this.arbol = random(arboles);
      this.activo = true;
      this.tiempoActivacion = millis();
    }
  }

  desactivar() {
    this.activo = false;
    this.arbol = null;
  }

  dibujar() {
    if (this.activo && this.arbol) {
      image(glitch, this.arbol.posicionx, this.arbol.posiciony);
    }
  }
}
