// Clase para manejar todas las pantallas
class MainScreen {
  constructor() {
    this.gameState = "Inicio"; // Estado inicial del juego
  }

  draw(eljuego) { //Poner de parametro el objeto juego 
    if (this.gameState === "Inicio") {
      this.drawInicio();
    } else if (this.gameState === "Instrucciones") { ///Cargar instancia de pantallasy meter las condicionales de los botones ( y hacer una clase con las variables de pantallas
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
    this.drawButton("Jugar", width / 2 - 100, height - 150, 200, 40);
    this.drawButton("Instrucciones", width / 2 - 100, height - 100, 200, 40);
    this.drawButton("Créditos", width / 2 - 100, height - 50, 200, 40);
  }

  drawInstrucciones() {
    image(instructionsBg, 0, 0, width, height);
    textAlign(CENTER);
    textSize(17);
    text("Utilizar flechas y barra espaciadora para matar a los secuaces y al traidor ", 300, 250);
    // Botón para regresar a la pantalla de Inicio desde Instrucciones
    this.drawButton("Inicio", width / 2 - 100, height - 50, 200, 40);
  }

  drawCreditos() {
    image(creditsBg, 0, 0, width, height);
    textAlign(CENTER);
    textSize(20);
    fill(255);
    text("Alumnas y Desarrolladoras: Agustina Clar y Ailen Avanzini", width / 2, height / 2);

    // Botón para regresar a Inicio desde la pantalla de Créditos
    this.drawButton("Inicio", width / 2 - 100, height - 50, 200, 40);
  }

  drawGanaste() {
    image(ganasteBg, 0, 0, width, height);
    textAlign(CENTER);
    textSize(32);
    text("¡Has salvado al reino!", width / 2, height / 2);
    
      //La cancion se detiene en esta pantalla
    song.stop();
  }

  drawPerdiste() {
    image(perdisteBg, 0, 0, width, height);
    textAlign(CENTER);
    textSize(32);
    fill(255);
    text("El traidor ha vencido \n Presiona r para reiniciar \n Presiona i para ir a Inicio", width / 2, height-100, 300,300);
  

      //La cancion se detiene en esta pantalla
    song.stop();
  }
 //METER DENTRO DE LA CLASE BOTON
  drawButton(label, x, y, w, h) {
    fill(200);
    rect(x, y, w, h, 5);
    fill(0);
    textSize(18);
    textAlign(CENTER, CENTER);
    text(label, x + w / 2, y + h / 2);
  }

  checkButtonClick(x, y, w, h) {
    return mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;
  }
}
