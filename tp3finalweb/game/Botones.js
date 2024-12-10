class Botones {
  constructor(mainScreen) {
    this.mainScreen = mainScreen; //Creo instancia de la clase Mainscreen y asigno a la propiedad mainScreen 
  }
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
  
  handleMousePressed() {
    if (this.mainScreen.gameState === "Inicio") {
      this.handleInicioButtons();
    } else if (this.mainScreen.gameState === "Instrucciones") {
      this.handleInstructionsButtons();
    } else if (this.mainScreen.gameState === "Creditos") {
      this.handleCreditsButtons();
    }
  }

  handleInicioButtons() {
   // Verifica si se hizo clic en el botón jugar ubicado en el centro de la pantalla
   if (this.checkButtonClick(width / 2 - 100, height - 150, 200, 40)) {
      // Reproduce la canción solo si no se ha reproducido antes
      if (!songStarted) {
        song.loop(); // Reproduce la canción en bucle
        songStarted = true; // Marca que el sonido ha comenzado
      }
      this.mainScreen.gameState = "Juego";
           // Llama a la función resetGame de la clase Juego para reiniciar el estado del juego
      juego.resetGame();
          // Verifica si se hizo clic en el botón de "Instrucciones"
    } else if (this.checkButtonClick(width / 2 - 100, height - 100, 200, 40)) {
      this.mainScreen.gameState = "Instrucciones";       // Cambia el estado del juego a "Instrucciones"
    }    // Verifica si se hizo clic en el botón de "Creditos" 
    else if (this.checkButtonClick(width / 2 - 100, height - 50, 200, 40)) {
      this.mainScreen.gameState = "Creditos";       // Cambia el estado del juego a "Creditos"
    }
  }
  
  // Maneja los botones cuando el estado del juego es "Instrucciones"
  handleInstructionsButtons() {
        // Verifica si se hizo clic en el botón de "Volver al Inicio"
    if (this.checkButtonClick(width / 2 - 100, height - 50, 200, 40)) {
      this.mainScreen.gameState = "Inicio";       // Cambia el estado del juego a "Inicio" para volver al menú principal
    }
  }
  
  // Maneja los botones cuando el estado del juego es "Creditos"
  handleCreditsButtons() {
          // Verifica si se hizo clic en el botón de "Volver al Inicio"
    if (this.checkButtonClick(width / 2 - 100, height - 50, 200, 40)) {
            // Cambia el estado del juego a "Inicio" para volver al menú principal
      this.mainScreen.gameState = "Inicio";
    }
  }
}
