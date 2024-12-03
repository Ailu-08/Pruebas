//Clase Molde o Plantilla que define como se construyen los objetos. Describe las propiedades y métodos que tendrán.
//Una instancia es un objeto específico creado a partir de una clase. Cuando usas una clase para crear un objeto concreto, estás creando una instancia de esa clase.
//Instancia=Objeto


// Clase que maneja la logica de los botones
class Botones {
  constructor(mainScreen) {
    this.mainScreen = mainScreen; //Creo instania de la clase Mainscreen y asigno a la propiedad mainScreen //Cada instancia de una clase tiene sus propias propiedades, que pueden tener valores diferentes.


  }
  
  // Método que maneja las acciones cuando se presiona el mouse
 // Dependiendo del estado actual del juego, llama a diferentes métodos para manejar los botones (Inicio/Instrucciones/Creditos)

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
   // Verifica si se hizo clic en un botón ubicado en el centro de la pantalla (Jugar)
   if (this.mainScreen.checkButtonClick(width / 2 - 100, height - 150, 200, 40)) {
      // Reproduce la canción solo si no se ha reproducido antes
      if (!songStarted) {
        song.loop(); // Reproduce la canción en bucle
        songStarted = true; // Marca que el sonido ha comenzado
      }
      
      // Cambia el estado del juego a "Juego" para comenzar el juego
      this.mainScreen.gameState = "Juego";
           // Llama a la función resetGame de la clase Juego para reiniciar el estado del juego
      juego.resetGame();
          // Verifica si se hizo clic en el botón de "Instrucciones"
    } else if (this.mainScreen.checkButtonClick(width / 2 - 100, height - 100, 200, 40)) {
      this.mainScreen.gameState = "Instrucciones";       // Cambia el estado del juego a "Instrucciones"
    }    // Verifica si se hizo clic en el botón de "Creditos" 
    else if (this.mainScreen.checkButtonClick(width / 2 - 100, height - 50, 200, 40)) {
      this.mainScreen.gameState = "Creditos";       // Cambia el estado del juego a "Creditos"
    }
  }
  
  // Maneja los botones cuando el estado del juego es "Instrucciones"
  handleInstructionsButtons() {
        // Verifica si se hizo clic en el botón de "Volver al Inicio"
    if (this.mainScreen.checkButtonClick(width / 2 - 100, height - 50, 200, 40)) {
      this.mainScreen.gameState = "Inicio";       // Cambia el estado del juego a "Inicio" para volver al menú principal
    }
  }
  
  // Maneja los botones cuando el estado del juego es "Creditos"
  handleCreditsButtons() {
          // Verifica si se hizo clic en el botón de "Volver al Inicio"
    if (this.mainScreen.checkButtonClick(width / 2 - 100, height - 50, 200, 40)) {
            // Cambia el estado del juego a "Inicio" para volver al menú principal
      this.mainScreen.gameState = "Inicio";
    }
  }
}
