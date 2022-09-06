
function sendRequest() {
  let request = new XMLHttpRequest();
  request.open("GET", "https://zoo-animal-api.herokuapp.com/animals/rand/");
  request.send();
  request.onload = () => {
    if (request.status == 200) {
      var animaliJSON = JSON.parse(request.response);
      mostraDomanda(animaliJSON);
      creoRadio(animaliJSON);
      nuovaRequest(); //serve per fare una nuova richiesta all'api e stampare un'altro nome dell'animale
      newRequest();
      //console.log(animaliJSON);
    } else {
      //errore
      console.log(`error ${request.status} ${request.statusText}`);
    }
  }
}

function nuovaRequest() {
  let request = new XMLHttpRequest();
  request.open("GET", "https://zoo-animal-api.herokuapp.com/animals/rand/");
  request.send();
  request.onload = () => {
    if (request.status == 200) {
      var animaliJSON = JSON.parse(request.response);
      creoRadio(animaliJSON);
      //console.log(animaliJSON);
    }
  }
}

function newRequest() {
  let request = new XMLHttpRequest();
  request.open("GET", "https://zoo-animal-api.herokuapp.com/animals/rand/");
  request.send();
  request.onload = () => {
    if (request.status == 200) {
      var animaliJSON = JSON.parse(request.response);
      creoRadio(animaliJSON);
      //console.log(animaliJSON);
    }
  }
}

//creo una variabile/contatore (i) che mi serve per controllare quante domande vengono passate all'utente
var i = 0;

//creo una variabile che mi serve per tenere in memoria il punteggio di ogni sessione di quiz
var punteggio = 0;

function mostraDomanda(animaliJSON) {
  i++; //si incrementa tutte le volte che viene passata all'utente una nuova domanda, quindi quando clicca per la prima volta il bottone "Inizia quiz" e quando clicca quello per la prossima domanda

  var containerDomanda = document.getElementById("domanda");
  var containerImmagine = document.getElementById("immagine");
  var containerRisposte = document.getElementById("risposte");
  var containerNuovoBottone = document.getElementById("nuovoBottone");
  var rispostaCorretta = document.getElementById("rispostaCorretta");
  var rispostaSelezionata = document.getElementById("rispostaSelezionata");
  var containerMain = document.getElementById("contenitoreMain");

  //resetto i contenitori ogni volta che clicco il bottone
  containerDomanda.innerHTML = "";
  containerImmagine.innerHTML = "";
  containerRisposte.innerHTML = "";
  rispostaCorretta.innerHTML = "";
  rispostaSelezionata.innerHTML = "";

  var domanda = document.createElement("p");
  domanda.innerHTML = "Di che animale si tratta?";
  containerDomanda.appendChild(domanda);

  //estraiamo un immagine e la appendiamo al suo contenitore
  var immagine = document.createElement("img");
  immagine.src = animaliJSON.image_link;
  containerImmagine.appendChild(immagine);

  //nascondiamo il bottone inizia il quiz 
  var btn1 = document.getElementById("inizia");
  btn1.style.display = "none";

  //mostro pulsante per passare alla domanda successiva
  var btn2 = document.getElementById("next");
  btn2.style.display = "block";

  //mostro pulsante per controllare la risposta data
  var btn3 = document.getElementById("controlla");
  btn3.style.display = "block";

  //salviamo il nome dell'animale dell'immagine
  var nomeAnimaleCorretto = animaliJSON.name;

  //creo un elemento p per stampare il risultato
  var containerRisultato = document.getElementById("mostraRisultato");
  var p = document.createElement("p");

  const form = document.querySelector("form");
  //controllo che il radio è stato cliccato ed estrapolo il suo valore
  form.addEventListener("submit", (event) => {
    const data = new FormData(form);
    let output = "";
    for (const entry of data) {
      output = `${output}${entry[1]}\r`;
      valoreRadioSelezionato = `${entry[1]}\r`;
    };

    //nascondo il bottone quando la risposta è già stata data
    btn3.style.display = "none";

    //mostro pulsante per passare alla domanda successiva
    btn2.style.display = "block";

    rispostaSelezionata.innerHTML = "Hai selezionato questa risposta: " + output;
    event.preventDefault();

    rispostaCorretta.innerHTML = "La risposta corretta è: " + nomeAnimaleCorretto;

    console.log(valoreRadioSelezionato + "/");
    console.log(nomeAnimaleCorretto + "/");

    if (valoreRadioSelezionato.trim() == nomeAnimaleCorretto.trim()) {
      console.log("RISPOSTA SELEZIONATA CORRETTA");
      punteggio++;
      console.log("Punteggio: " + punteggio);

    } else if (valoreRadioSelezionato.trim() != nomeAnimaleCorretto.trim()) {
      console.log("RISPOSTA SELEZIONATA NON CORRETTA");
      console.log("Punteggio: " + punteggio);

    }
    containerRisultato.innerHTML = "";
    p.innerHTML = 'Il tuo punteggio è: <span id = "punteggiospan">' + punteggio + '</span>';
    containerRisultato.appendChild(p);

  }, false);

  //console.log(i);

  if (i >= 6) { //blocco il gioco alla sesta domanda e mostro i punteggi
    console.log("Quiz terminato");
    btn2.style.display = "none";
    btn3.style.display = "none";

    containerMain.innerHTML = "";

    var h3 = document.createElement("h3");

    if (punteggio >= 3) {
      //molto bene
      h3.innerHTML = "Ben fatto, ottimo risultato!";
    } else {
      //male male
      h3.innerHTML = "Che peccato! Ritenta e impegnati di più";
    }

    containerRisultato.appendChild(h3);

    var h4 = document.createElement("h4");
    h4.innerHTML = "Il quiz è terminato! Torna nella home dei giochi e scopri gli altri nostri giochi!";
    containerRisultato.appendChild(h4);

  }

}

function creoRadio(animaliJSON) {
  var containerRisposte = document.getElementById("risposte");
  var label = document.createElement("label");
  var input = document.createElement("input");

  input.value = "";
  input.innerHTML = "";

  label.innerHTML = animaliJSON.name;
  label.for = "radio";

  input.type = "radio";
  //console.log (animaliJSON.name);
  input.value = animaliJSON.name;
  input.name = "radio";
  input.innerHTML = animaliJSON.name;

  containerRisposte.appendChild(label);
  containerRisposte.appendChild(input);

}
