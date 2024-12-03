//.splice Permite agregar, eliminar o reemplazar elementos en cualquier posición del array. Recibe al menos dos parámetros:
//El primer parámetro es el índice donde se comenzarán a modificar los elementos.
//El segundo parámetro es el número de elementos a eliminar (si es 0, no se elimina ninguno).
//Los parámetros adicionales (si los hay) son los elementos que se agregarán en el lugar indicado.
//Modifica el array original y devuelve un nuevo array con los elementos eliminados (si los hay).

//.push() Sirve para agregar uno o más elementos al final de un array.
//Modifica el array original y devuelve la nueva longitud del array.

//En Resumen: .push() agrega elementos al final de un array.  // .splice() puede agregar, eliminar o reemplazar elementos en cualquier parte del array.

//.length es una propiedad. Se utiliza para obtener el número de elementos en un array (o la longitud de una cadena de texto).
//.length devuelve la cantidad de elementos presentes en un array.
//La propiedad .length siempre devuelve un número que representa el total de elementos o caracteres.
//El valor de .length es dinámico. Si agregas o eliminas elementos de un array, el valor de .length se actualiza automáticamente.
//Los índices en los arrays comienzan en 0, por lo que el índice más alto de un array es .length - 1.

// cONTACTO CON PROYECTIL o combustible sacar de la pantalla e inmovilizo (Vivo true/MUERTO; fALSE) 


// Clase principal del juego
class Juego {
  constructor() {
    this.mainScreen = new MainScreen(); //Creo Instancia de la clase MainScreen y asigno a la propiedad mainScreen
    //Esta no deberia ir en juego creo porque es parte de pantallas!!!
    this.botones = new Botones(this.mainScreen); //Creo Instancia de la clase Botones y asigno a la propiedad botones
    this.dastanLives = 3;
    this.traitorLives = 3;
    this.secuacesLives = 1;
    this.combustible = 100;
    this.riverWidth = 640;
    this.dastanProjectiles = [];
    this.traitorProjectiles = [];
    this.secuazProjectiles = [];
// Temporizador para la generación de combustible
    this.fuelSpawnTime = 200; // Intervalo para generar combustible
    this.fuelTimer = this.fuelSpawnTime;

  }

  setup() {
    dastan = new Dastan();     // Crea la instancia del personaje Dastan.
    traitor = new Traitor();  // Crea la instancia del personaje Traitor.
    this.spawnSecuaces();    // Llama a la función para crear los secuaces.
    this.spawnCombustibles();  // Llama a la función para generar los objetos de combustible.
  } 

  draw() {
    this.mainScreen.draw(this);  //// Dibuja la pantalla principal del juego.
  }

  updateGame() {
    image(sandBg, 0, 0, width, height);
    fill(0, 100, 255);
  image(riverBg, (width - this.riverWidth) / 2, 0, this.riverWidth, height);  // Dibuja el fondo del río.

    if (this.riverWidth <= 500 && !traitor.aparecido) { // Si el ancho del río es menor a 500 y el Traitor no ha aparecido, lo hace.
      traitor.aparecer();
    }

    dastan.move();         //Mueve a Dastan
    dastan.display();      //Muestra a Dastan

    if (traitor.aparecido) {   // Si el Traitor ha aparecido, se mueve.
      traitor.move();
      traitor.display();       //Se muestra al Traidor
      traitor.shoot();        // El Traitor dispara
    }

    this.updateProjectiles(); // Actualiza los proyectiles.
    this.updateSecuaces();    // Actualiza los secuaces.
    this.updateCombustible(); // Actualiza el combustible.
    this.updateFuelCollection();  // Controla la recolección de combustible.
    this.handleFuelSpawn();      // Controla la generación de combustible

    this.riverWidth -= 0.1;     // Reduce gradualmente el ancho del río.

    fill(0, 0, 0);       // Cambia el color de texto a negro.
    textSize(16);        // Define el tamaño de fuente.
    //Muestran las vidas de Dastan, Traitor, Combustible
    text('Vidas Dastan: ' + this.dastanLives, 65, 20);
    text('Vidas Traitor: ' + this.traitorLives, 65, 60);
    
    ///PUEDE QUE ESTA PARTE VAYA EN COMBUSTIBLE CLASS
    
//    / Divide normalmente y te da como resultado el cociente de la division 
//    %  Divide pero te da como resultado el resto (lo que sobra) de la division
    
let numero = this.combustible; // Guarda el valor actual de this.combustible en la variable numero
//// Comprueba si la parte decimal (el resto de la division)  del número es mayor o igual a 0.5.
if (numero % 1 >= 0.5) { // Si el decimal es 0.5 o más
// A numero se le resta la parte decimal para que quede el entero y se le suma 1 para subir al siguiente entero
  numero = numero - (numero % 1) + 1; 
} else {
// A numero se le resta la parte decimal para que quede el entero Actual
  numero = numero - (numero % 1); // Baja al entero actual
}
text('Combustible: ' + numero, 65, 40); // Muestra el valor de numero redondeado en pantalla

  }
 
// this.fuelTimer: Es una propiedad de la clase Juego, y en este contexto se utiliza para llevar un registro del tiempo 
//que falta para que se genere más combustible. Es un contador que va disminuyendo con el tiempo. 
//Cuando llega a 0, se genera un nuevo objeto de combustible en el juego.
//this.fuelSpawnTime: Esta es otra propiedad de la clase Juego que define el intervalo de tiempo en el que 
//debe generarse el combustible. Esta propiedad tiene un valor inicial de 200, lo que significa que 
//el combustible debería generarse cada 200 unidades de tiempo (o fotogramas,
//dependiendo de cómo esté implementado el ciclo de actualización del juego). 

//Metodo que maneja la generacion de combustible
  handleFuelSpawn() {    
// Control del temporizador para la generación de combustible
    this.fuelTimer--; // Resta un segundo al temporizador.
    if (this.fuelTimer <= 0) { // Si el temporizador llega a 0, genera un nuevo objeto de combustible.
      this.spawnCombustible(); //Llamo al metodo generador de combustible
      this.fuelTimer = this.fuelSpawnTime; // (Asignacion de valor) que configura el reinicio del temporizador
                                           // Resetea el temporizador de generación de combustible a su valor inicial (200)
    }
  }

//Método que genera un objeto de combustible y lo agrega al arreglo combustibles.
//La posición de este combustible es aleatoria, con coordenadas generadas dentro de un rango específico
//(de 100 a width - 100 para la coordenada x, y de 50 a height - 100 para la coordenada y)

  spawnCombustible() {
    // Genera un nuevo objeto combustible en una posición aleatoria
    combustibles.push(new Combustible(random(100, width - 100), random(50, height - 100)));
  }
//combustibles: Es un arreglo (o lista) que contiene todos los objetos "Combustible" que se generan. 
//Cada elemento del arreglo representa un combustible disponible en el juego.
//push(): Es un método de los arreglos que añade un nuevo elemento al final del arreglo. 
//En este caso, agrega un objeto de la clase Combustible.
//new Combustible(x, y):
//Crea un nuevo objeto "Combustible". Este objeto requiere dos valores: x y y, que son las coordenadas 
//donde aparecerá el combustible.
//random(100, width - 100) y random(50, height - 100): Generan coordenadas aleatorias dentro de ciertos límites:
//El valor de x estará entre 100 y el ancho de la pantalla menos 100 (width - 100), para evitar que el combustible 
//salga de los bordes.
//El valor de y estará entre 50 y la altura de la pantalla menos 100 (height - 100),
//también para que esté dentro del área jugable.

//------------------------------------------------------------------

//Método que actualiza la recolección de combustible.
//Recorre los objetos combustibles desde el último hasta el primero 
//(esto es para evitar errores cuando eliminamos elementos del arreglo mientras lo recorremos).
//Si un objeto de combustible es recogido por dastan (verificado por fuel.collected(dastan)),
//se aumenta el nivel de combustible del jugador en 20 unidades y el objeto de combustible es eliminado del arreglo usando 
//combustibles.splice(i, 1).


  updateFuelCollection() {
    for (let i = combustibles.length - 1; i >= 0; i--) {
      
//let i = combustibles.length - 1: Inicializa la variable i con el índice del último elemento del arreglo combustibles
//(es decir, el tamaño del arreglo menos 1).
//Ejemplo, si hay 3 combustibles, sus índices son 0, 1, 2. Entonces, combustibles.length - 1 será 2.
//Osea que va de 2 a 1 a 0 a -1 (y en -1 se detiene)
//i >= 0: Define la condición para seguir iterando: mientras i sea mayor o igual a 0 (recorriendo desde el último 
//al primer elemento).
//i--: Después de cada iteración, reduce el valor de i en 1 para avanzar hacia el siguiente elemento hacia atrás.


      let fuel = combustibles[i];
//fuel: Es una variable que contiene el combustible en la posición i del arreglo combustibles. 
//Esto permite trabajar con un combustible específico.

      fuel.display(); // Llama al metodo display del objeto fuel para mostrar el objeto combustible en pantalla.
      if (fuel.collected(dastan)) { // Si Dastan recoge el combustible
//fuel.collected(dastan): Llama al método collected() del objeto fuel.
//Este método verifica si el personaje dastan ha "recogido" el combustible. Por lo general, esto implica comprobar
//si las coordenadas del personaje y del combustible se superponen.
// Si El combustible fue recogido (fuel.collected(dastan) devolvió """""true), se: 

        this.combustible += 20;     // Aumenta el nivel de combustible del jugador en 20.
        
        combustibles.splice(i, 1); // Elimina el combustible recogido.
        
//splice(): Es un método que modifica el arreglo eliminando o reemplazando elementos.
//En este caso, elimina 1 elemento en la posición i. Esto significa que el combustible que fue recogido ya no estará en el arreglo.
//Por qué eliminar hacia atrás (i--):
//Recorrer el arreglo al revés evita problemas cuando se eliminan elementos. 
//Si recorres de adelante hacia atrás y eliminas un elemento, los índices del resto cambian, lo que puede causar errores.
      }
    }
  }
//Se encarga de actualizar todos los proyectiles en el juego
//Se separan los proyectiles de Dastan y los del Traidor.
//Para cada proyectil de Dastan, se mueve y se muestra, luego se verifica si ha alcanzado al Traidor. 
//Si es así, se disminuye la vida del traidor y el proyectil es eliminado.
//Si el proyectil de Dastan sale de la pantalla (es decir, su y es menor que 0), se elimina.
//Se hace lo mismo para los proyectiles del Traidor: si golpea a Dastan, se reduce la vida de Dastan, 
//y si el proyectil sale de la pantalla, también se elimina.
//Osea Resumen: Procesa proyectiles de Dastan y del Traidor.
//Verifica colisiones y elimina los proyectiles si:
//Salen de la pantalla.
//Impactan al objetivo.
//También reduce las vidas del objetivo y cambia el estado del juego si llega a 0.

updateProjectiles() { 
  // Actualizar y mostrar proyectiles de Dastan
    for (let i = this.dastanProjectiles.length - 1; i >= 0; i--) {
//Tambien la logica recorre el arreglo de proyectiles de Dastan hacia atrás.
//Lo que permite eliminar elementos del arreglo sin desajustar los índices de los demás. Como anteriormente.

      let projectile = this.dastanProjectiles[i];
      projectile.move();
      projectile.display('dagger');

      // Verificar colisión con el traidor
      if (traitor.aparecido && projectile.hits(traitor)) { //Si el traidor ha aparecido y el proyectil golpea al triador: 
        this.traitorLives--; //Se disminuyen las vidas del traidor por la colision.
        this.dastanProjectiles.splice(i, 1); //Se eliminan los proyectiles de dastan.
        if (this.traitorLives <= 0) this.mainScreen.gameState = "Ganaste";
//Si las vidas del Traidor llegan a 0, el estado del juego cambia a "Ganaste".

        continue;
//El continue salta al siguiente proyectil (no verifica si el proyectil sale de la pantalla porque ya fue eliminado).
      }

      // Eliminar proyectiles que salen de la pantalla
      if (projectile.y < 0) { //Si el proyectil de Dastan sale por arriba
        this.dastanProjectiles.splice(i, 1); //Se elimina
      }
    }
    //La misma lógica se aplica a los proyectiles del Traidor, pero con las diferencias de que:
//Verifica colisiones con Dastan.
//Elimina proyectiles que salen por la parte inferior.
////Si las vidas de Dastan llegan a 0, el estado del juego cambia a "Perdiste".

    
     // Actualizar y mostrar proyectiles del traidor
    for (let i = this.traitorProjectiles.length - 1; i >= 0; i--) {
      let projectile = this.traitorProjectiles[i];
      projectile.move();
      projectile.display('sword');

      // Verificar colisión con Dastan
      if (projectile.hits(dastan)) {
        this.dastanLives--;
        this.traitorProjectiles.splice(i, 1);
        if (this.dastanLives <= 0) this.mainScreen.gameState = "Perdiste";
        continue;
      }

      // Eliminar proyectiles que salen de la pantalla
      if (projectile.y > height) { ////Si el proyectil del Traidor sale por abajo
        this.traitorProjectiles.splice(i, 1); //Se elimina
      }
    }
  }

//Metodo que se encarga de manejar a los secuaces (enemigos).
//Si no ha aparecido el traidor, se mueve cada secuaz, se muestra, y se les permite disparar. 
//Si un proyectil de Dastan golpea a un secuaz, este es eliminado junto con el proyectil.
//Los proyectiles de los secuaces se mueven y se muestran como fireball. 
//Si golpean a Dastan, disminuyen sus vidas. Si un proyectil sale de la pantalla, también se elimina.
//Si todos los secuaces son eliminados, se activa un temporizador para generar nuevos secuaces después 
//de un tiempo (120 fotogramas).
//Similar a updateProjectiles(), elimina proyectiles de secuaces que salen de la pantalla o impactan al jugador.
//El ciclo for recorre el arreglo de secuaces (hacia atras) de atras para adelante para evitar errores. Como arriba.

  updateSecuaces() {
  // Mover y actualizar secuaces
  if (traitor.aparecido) {
    return;  // No actualiza ni genera secuaces
  }
  for (let i = secuaces.length - 1; i >= 0; i--) {
    let secuaz = secuaces[i];
    secuaz.move();
    secuaz.display();
    secuaz.shoot();

    // Verificar colisión con proyectiles de Dastan
    for (let j = this.dastanProjectiles.length - 1; j >= 0; j--) {
      let projectile = this.dastanProjectiles[j]; 
      if (projectile.hits(secuaz)) { //Si el proyectil golpea al Secuaz
        secuaces.splice(i, 1); // Elimina al secuaz
        this.dastanProjectiles.splice(j, 1); // Elimina el proyectil
        break; //El break detiene la verificación de más proyectiles para ese secuaz (ya fue eliminado).
      }
    }
  }

  // Mover y mostrar proyectiles de secuaces
  for (let i = this.secuazProjectiles.length - 1; i >= 0; i--) {
    let projectile = this.secuazProjectiles[i];
    projectile.move();
    projectile.display('fireball');

    // Verificar colisión con Dastan
    if (projectile.hits(dastan)) {
      this.dastanLives--;
      this.secuazProjectiles.splice(i, 1);
      if (this.dastanLives <= 0) this.mainScreen.gameState = "Perdiste";
      continue;
    }

    // Eliminar proyectiles que salen de la pantalla
    if (projectile.y > height) {
      this.secuazProjectiles.splice(i, 1);
    }
  }

  // Verificar si todos los secuaces han sido eliminados
  if (secuaces.length === 0) {
    // Temporizador antes de regenerar los secuaces
    if (!this.secuaceRespawnTimer) {
      this.secuaceRespawnTimer = frameCount + 120; // Esperar 120 fotogramas (~2 segundos)
    } else if (frameCount >= this.secuaceRespawnTimer) {
      // Regenerar secuaces cuando el temporizador haya terminado
      this.spawnSecuaces();
      this.secuaceRespawnTimer = null; // Reiniciar el temporizador
    }
  }
}

  updateCombustible() {
    this.combustible -= 0.1; // Decrece el nivel de combustible en 0.1 constantemente
    if (this.combustible <= 0) this.mainScreen.gameState = "Perdiste"; // Si el combustible llega a 0, el jugador pierde
  }
  
//resetGame() RESUMEN
//Restablece el estado inicial del juego:
//Reinicia las vidas de Dastan y el Traidor, el combustible, y el ancho del río.
//Vacía los arreglos de proyectiles y regenera secuaces y combustibles.
//Restablece el estado del Traidor y reinicia temporizadores.

  resetGame() {
    this.dastanLives = 3;     // Reinicia las vidas de Dastan.
    this.traitorLives = 3;   // Reinicia las vidas del Traido.
    this.combustible = 100; // Reinicia el nivel de combustible.
    this.riverWidth = 640;  // Reinicia el ancho del río.
    this.dastanProjectiles = []; // Reinicia los proyectiles de Dastan (vacía el arreglo)
    this.traitorProjectiles = []; // Reinicia los proyectiles del Traidor (vacía el arreglo)
    this.spawnSecuaces();            // Llama al método, que se encarga de generar los secuaces para regenerarlos
    this.spawnCombustibles();       // Llama al metodo, que se encarga de generar los Combustibles para regenerarlos
    traitor.aparecido = false;     // Resetea el estado del Traitor.
    this.fuelTimer = this.fuelSpawnTime; // Reinicia el temporizador cuando el juego comienza de nuevo con el valor correcto
                                        // Temporizador que controlará la generación de combustible.

  }

spawnSecuaces() {
//Calcula cuántos secuaces generar en función del ancho del río.
  let cantidadSecuaces = int(3 + (640 - this.riverWidth) / 100); // Uso de int() para resultado a entero
  secuaces = [];
  for (let i = 0; i < cantidadSecuaces; i++) {
    secuaces.push(new Secuaz(random(100, width - 100), random(50, height / 2)));
//Genera secuaces en posiciones aleatorias.
  }
}


  spawnCombustibles() {
    combustibles = [];
    for (let i = 0; i < 1; i++) { //Genera un único combustible en una posición aleatoria.
      combustibles.push(new Combustible(random(100, width - 100), random(50, height - 100)));
    }
  }
}
//Que hace cada uno en gral y en nuestro codigo: 
//Return: En general: Detiene la ejecución de una función y, opcionalmente, devuelve un valor.
// En nuestro codigo: if (traitor.aparecido) {return;  // Detiene la ejecución de updateSecuaces si el traidor está activo}
//Continue: Salta al siguiente ciclo del bucle, ignorando cualquier código restante en la iteración actual.
//Ej General: for (let i = 0; i < 5; i++) { if (i === 2) continue; // Salta cuando i es igual a 2
//console.log(i); // Imprime 0, 1, 3, 4 }
//En nuestro codigo: if (this.traitorLives <= 0) { this.mainScreen.gameState = "Ganaste";
//continue; // Salta al siguiente proyectil }
//break: Sale inmediatamente de un bucle o switch.
//General: for (let i = 0; i < 5; i++) { if (i === 2) break; // Detiene el bucle cuando i es igual a 2
// console.log(i); // Imprime 0, 1}
//Nuestro codigo: if (projectile.hits(secuaz)) {secuaces.splice(i, 1); this.dastanProjectiles.splice(j, 1);
//break; // Deja de revisar más proyectiles para ese secuaz}
//shoot()Es una función/método que pertenece a un objeto, como secuaz/dastan/traitor para que disparen.
//.display() Es otra función/método usada para dibujar un objeto en la pantalla.
//.length: Devuelve la cantidad de elementos de un arreglo o cadena.
//Ej General: let arr = [1, 2, 3];   console.log(arr.length); // Imprime 3

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//splice(index, howMany) Modifica un arreglo eliminando elementos, y opcionalmente, añade nuevos elementos.
//arreglo.splice(index, howMany, item1, item2, ...);
//index: Posición inicial donde comienza el cambio.
//howMany: Cantidad de elementos a eliminar (si es 0, no elimina).
//Opcionalmente, puedes añadir nuevos elementos a partir de index.
//Ej Gral: let arr = [1, 2, 3, 4];  //arr.splice(1, 2); // Elimina 2 elementos desde el índice 1
//console.log(arr); // Imprime [1, 4]
//Ej de nuestro Codigo: this.dastanProjectiles.splice(i, 1);
//Elimina 1 elemento del arreglo dastanProjectiles en el índice i.

//Parámetros en splice (por ejemplo, (i, 1) o (j, 1))
//i o j: Representan el índice del elemento en el arreglo que quieres modificar.
//1: Especifica cuántos elementos se deben eliminar a partir de ese índice.
//Ejemplo del codigothis.dastanProjectiles.splice(j, 1);
//Significa: "Elimina 1 elemento del arreglo dastanProjectiles en la posición j".
//¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡
//.push Añade elementos al final de un arreglo
//Ej Gral: let arr = [1, 2]; //arr.push(3); // Añade 3 al final // console.log(arr); // Imprime [1, 2, 3]
//Ej en nuestro Codigo: secuaces.push(new Secuaz(x, y)); //Agrega un nuevo secuaz al arreglo secuaces.
//hits() Mmétodo definido en los objetos como projectile o secuaz, que verifica si hay una colisión.
//Generalmente, evalúa si dos objetos se tocan en términos de coordenadas.


// Resumen
//return: Finaliza la función.
//continue: Salta al siguiente ciclo del bucle.
//break: Sale inmediatamente del bucle.
//shoot() y display(): Métodos de los objetos para disparar y dibujar.
//length: Tamaño de un arreglo.
//splice: Elimina o reemplaza elementos de un arreglo.
//push: Agrega elementos al final de un arreglo.
//hits(): Método personalizado que verifica colisiones.
