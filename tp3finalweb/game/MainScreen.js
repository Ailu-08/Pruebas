// Clase para manejar todas las pantallas
class MainScreen {
  constructor() {
    this.gameState = "Inicio"; // Estado inicial del juego
    this.botones = new Botones(this); // Instancia de la clase Botones
    //Paso como argunmento la instancia recien creada de mainScreen al constructor de Botones.
   //Permitiendo que botones tenga acceso a mainScreen que lo contiene.
  }

  draw(eljuego) { //Pasar el objeto del juego como argumento 
  //permite que MainScreen acceda a las propiedades, métodos, o estados de la instancia del juego desde dentro de su método draw. 

    if (this.gameState === "Inicio") {
      this.drawInicio();
    } else if (this.gameState === "Instrucciones") { 
      this.drawInstrucciones();
    } else if (this.gameState === "Juego") {
      eljuego.updateGame(); ///Pasar juego por parametros (Nombre de parametro con this)
    } else if (this.gameState === "Ganaste") {
      this.drawGanaste();
    } else if (this.gameState === "Perdiste") {
      this.drawPerdiste();
    } else if (this.gameState === "Creditos") {
      this.drawCreditos();
    }
  }

  drawInicio() {
    image(inicioBg, 0, 0, width, height);
    textAlign(CENTER);
    textSize(32);
    text("El Principe de Persia Juego", width / 2, height / 2 - 100);

    // Dibuja los botones manualmente
    this.botones.drawButton("Jugar", width / 2 - 100, height - 150, 200, 40);
    this.botones.drawButton("Instrucciones", width / 2 - 100, height - 100, 200, 40);
    this.botones.drawButton("Créditos", width / 2 - 100, height - 50, 200, 40);
  }

  drawInstrucciones() {
    image(instructionsBg, 0, 0, width, height);
    textAlign(CENTER);
    textSize(25);
    text("Utiliza las flechas para moverte y la barra espaciadora para disparar a los secuaces y al traidor. \n Recolecta el combustible antes que se te acabe. ", width-530, height-400,400,400);
    this.botones.drawButton("Inicio", width / 2 - 100, height - 50, 200, 40);
  }

  drawCreditos() {
    image(creditsBg, 0, 0, width, height);
    textAlign(CENTER);
    textSize(22);
    fill(255);
    text("Alumnas y Desarrolladoras: Agustina Clar y Ailen Avanzini", width / 2, height / 2);

    // Botón para regresar a Inicio desde la pantalla de Créditos
    this.botones.drawButton("Inicio", width / 2 - 100, height - 50, 200, 40);
  }

  drawGanaste() {
    image(ganasteBg, 0, 0, width, height);
    textAlign(CENTER);
    textSize(32);
    text("¡Has salvado al reino!\n Presiona r para reiniciar \n Presiona i para ir a Inicio", width-520, height-450, 400,400);
    
      //La cancion se detiene en esta pantalla
    song.stop();
  }

  drawPerdiste() {
    image(perdisteBg, 0, 0, width, height);
    textAlign(CENTER);
    textSize(32);
    fill(255);
    text("El traidor ha vencido \n Presiona r para reiniciar \n Presiona i para ir a Inicio", width-520, height-450, 400,400);

      //La cancion se detiene en esta pantalla
    song.stop();
  }
}
