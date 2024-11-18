class arbol {
  constructor(x, y) {
    this.posicionx = x;
    this.posiciony = y;
    this.ancho = 100;  // Ajuste de tamaño
    this.alto = 150;   // Ajuste de tamaño
    this.estadoArb = 0;
  }

  dibujar() {
    if (this.estadoArb === 1) {
      image(imgArbIlu, this.posicionx, this.posiciony, this.ancho, this.alto);
    } else {
      image(imgArb, this.posicionx, this.posiciony, this.ancho, this.alto);
    }
  }

  cambiaEstado() {
    this.estadoArb = 1;
  }
}
