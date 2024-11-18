class micelio {
  constructor(x, y) {
    this.miColor = color(255);
    this.posInicialY = y;
    this.guardaPos = [{ x: x, y: y }];
    this.direccionActual = null;
    this.velocidad = 1;
    this.ramificaciones = [];
    this.estela = []; // Lista para la estela de luz
    this.maxEstela = 500; // Tamaño máximo de la estela
  }

  dibujar() {
    let yPos = this.guardaPos[this.guardaPos.length - 1].y;
    let progress = map(yPos, this.posInicialY, 0, 0, 1);
    this.miColor = lerpColor(color(255), color(59, 255, 237), progress);
    
    stroke(this.miColor);
    strokeWeight(5);
    noFill();
    beginShape();
    for (let punto of this.guardaPos) {
      vertex(punto.x, punto.y);
    }
    endShape();

    for (let rama of this.ramificaciones) {
      line(rama.x1, rama.y1, rama.x2, rama.y2);
    }
    
    // Dibuja la estela de luz
    this.dibujarEstela();

    // Dibuja la "luz" en la punta del micelio
    this.dibujarLuz();

    if (this.direccionActual) {
      this.mover(this.direccionActual);
    }
  }

  dibujarLuz() {
    // Obtiene la posición de la punta del micelio
    let ultimaPos = this.guardaPos[this.guardaPos.length - 1];
    
    // Configura el color de la luz
    fill(255, 255, 200); // Amarillo claro para la luz
    noStroke();
    
    // Dibuja la luz en la punta del micelio
    ellipse(ultimaPos.x, ultimaPos.y, 10, 10);

    // Agrega la posición actual a la estela
    this.estela.push({ x: ultimaPos.x, y: ultimaPos.y, alpha: 60 });

    // Limita la longitud de la estela
    if (this.estela.length > this.maxEstela) {
      this.estela.shift(); // Elimina la posición más antigua si se excede el límite
    }
  }

  dibujarEstela() {
    // Dibuja la estela de luz, desvaneciendo cada punto
    for (let i = 0; i < this.estela.length; i++) {
      let punto = this.estela[i];
      
      // Reduce gradualmente la transparencia de cada punto
      punto.alpha -= 1;
      if (punto.alpha < 0) punto.alpha = 0; // No permitir valores negativos

      // Dibujar cada punto de la estela con transparencia
      fill(255, 255, 200, punto.alpha); // Mismo color que la luz pero con transparencia
      noStroke();
      ellipse(punto.x, punto.y, 10, 10);
    }
  }

  direccionTecla(tecla) {
    const direccionTeclas = {
      't': 'N','g': 'N', 'y': 'N', '3': 'N','¿': 'N', '¡': 'N', ')': 'N',
      'v': 'S','h': 'S', 'b': 'S','5': 'S', '"': 'S','7': 'S',
      'f': 'O', 'd': 'O', 's': 'O', 'a': 'O', '6': 'O', '$': 'O', '=': 'O',
      'j': 'E', 'k': 'E', 'l': 'E', 'ñ': 'E', '{': 'E', '}': 'E', '!': 'E',
      'q': 'NO','w': 'NO','e': 'NO', 'r': 'NO', '4': 'NO', '0': 'NO', '_': 'NO', '&': 'NO',
      'u': 'NE','i': 'NE','o': 'NE', 'p': 'NE', '|': 'NE', '+': 'NE', '?': 'NE', '°': 'NE', '%': 'NE',
      'n': 'SE','m': 'SE', ',': 'SE', '.': 'SE', '-': 'SE','1': 'SE','9': 'SE', '/': 'SE',
      'x': 'SO', 'c': 'SO','<': 'SO', '2': 'SO','#': 'SO', '8': 'SO', '(': 'SO', 'z': 'SO'
    };
    this.direccionActual = direccionTeclas[tecla.toLowerCase()];
  }

  detenerMovimiento() {
    this.direccionActual = null;
  }

  mover(direccion) {
    let ultimaPos = this.guardaPos[this.guardaPos.length - 1];
    let nuevaPos = { x: ultimaPos.x, y: ultimaPos.y };

    switch (direccion) {
      case 'N': nuevaPos.y -= this.velocidad; break;
      case 'S': nuevaPos.y += this.velocidad; break;
      case 'E': nuevaPos.x += this.velocidad; break;
      case 'O': nuevaPos.x -= this.velocidad; break;
      case 'NE': nuevaPos.x += this.velocidad; nuevaPos.y -= this.velocidad; break;
      case 'NO': nuevaPos.x -= this.velocidad; nuevaPos.y -= this.velocidad; break;
      case 'SE': nuevaPos.x += this.velocidad; nuevaPos.y += this.velocidad; break;
      case 'SO': nuevaPos.x -= this.velocidad; nuevaPos.y += this.velocidad; break;
    }

    this.guardaPos.push(nuevaPos);
  }
  
  llegoAlBordeSuperior() {
    return this.guardaPos[this.guardaPos.length - 1].y <= 0;
  }
  
  colisionaCon(arbol) {
    let ultimaPos = this.guardaPos[this.guardaPos.length - 1];
    return (
      ultimaPos.x > arbol.posicionx &&
      ultimaPos.x < arbol.posicionx + arbol.ancho &&
      ultimaPos.y > arbol.posiciony &&
      ultimaPos.y < arbol.posiciony + arbol.alto
    );
  }
}
