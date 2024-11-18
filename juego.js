class Juego {
  constructor() {
    this.mice = null;
    this.estado = 0;
    this.arboles = [];
    this.glitch = new Glitch();
    this.crearArboles();
    this.tiempoIgnorado = 0;
    this.perder = false;
    this.arbolesIluminadosPorGlitch = 0;
  }

  crearArboles() {
    for (let i = 0; i < 8; i++) {
      let x = 100 + i * (150 + 20); // Ajuste de separación y tamaño
      let y = 250;
      this.arboles.push(new arbol(x, y));
    }
  }

  crearM() {
    this.mice = new micelio(width / 2, height);
  }

  cargaPantalla() {
    if (img[this.estado]) {
      image(img[this.estado], 0, 0);
    }
  }

  verificaPosicion() {
    if (this.mice && this.mice.llegoAlBordeSuperior()) {
      if (this.estado < 2) {
        this.estado += 1;
        this.crearM();
      }
    }
  }

  dibujar() {
    this.mice.dibujar();
    if (this.estado === 2) {
      image(cielo,0,0,width,100);
      image(vege,0,50,width,100);
      for (let arbol of this.arboles) {
        arbol.dibujar();
      }
      image(imgPasto, 0, 100, width, 150);
      this.glitch.dibujar();

      this.controlGlitches();
      this.verificarGanador();
    } else if (this.estado === 3) {
      this.mostrarCreditos();
    }
  }

  verificarColisionRaices() {
    if (this.estado === 2) {
      for (let arbol of this.arboles) {
        if (this.mice.colisionaCon(arbol)) {
          if (this.glitch.activo && arbol === this.glitch.arbol) {
            arbol.cambiaEstado();
            this.glitch.desactivar();
            this.tiempoIgnorado = 0;
            this.arbolesIluminadosPorGlitch++;
          } else if (arbol.estadoArb === 0) {
            arbol.cambiaEstado();
          }
        }
      }

      if (this.todosArbolesIluminados() && !this.glitch.activo) {
        this.glitch.activar(this.arboles);
      }
    }
  }

  todosArbolesIluminados() {
    return this.arboles.every(arbol => arbol.estadoArb === 1);
  }

  verificarPerdida() {
    if (this.glitch.activo) {
      if (millis() - this.glitch.tiempoActivacion > 20000) {
        this.perder = true;
        this.estado = 0;
        this.crearM();
      }
    }
  }

  verificarGanador() {
    if (this.arbolesIluminadosPorGlitch >= 5) {
      this.estado = 3;
    }
  }

  controlGlitches() {
    if (this.todosArbolesIluminados() && !this.perder) {
      this.glitch.activar(this.arboles);
      this.verificarPerdida();
    }
  }

  mostrarCreditos() {
    fill(0);
    rect(0, 0, width, height);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(32);
    text("¡Ganaste!", width / 2, height / 2 - 20);
    textSize(16);
    text("Gracias por jugar", width / 2, height / 2 + 20);
  }
}
