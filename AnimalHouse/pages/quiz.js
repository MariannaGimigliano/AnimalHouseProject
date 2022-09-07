document.onload = loadpage();
var session;

async function loadpage() {
  getSessionInfo();
}

/* ritorna i dati dall'API */
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

//creo una variabile che mi serve per tenere in memoria il punteggio di ogni sessione di quiz
var punteggio = 0;

function mostraDomanda(animaliJSON) {

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

  //mostro pulsante per salvare i punti
  var btn4 = document.getElementById("salvapunti");
  btn4.style.display = "block";

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

function salvaPunti() {
  var points = document.getElementById("punteggiospan").innerHTML;

  console.log(points);
  let request = new XMLHttpRequest();
  request.open("POST", "/salvaPunti");
  request.setRequestHeader("Content-Type", "application/json");
  request.send( //nuova richiesta per salvare i punti con questi parametri
    JSON.stringify({
      "game": "quiz",
      "points": parseInt(points)
    }));
  request.onload = () => {
    if (request.status == 200) {
      alert("punti aggiornati");
      window.location.replace("/frontOffice");
    }
  }
}

/* controlla se è aperta una sessione utente */
function getSessionInfo() {
  let request = new XMLHttpRequest();
  request.open('GET', "/cookieSession", true);
  request.send();

  request.onreadystatechange = function () {
    if (request.readyState === XMLHttpRequest.DONE) {
      var status = request.status;
      if (status === 0 || (status >= 200 && status < 400)) {
        session = JSON.parse(request.responseText);
        console.log(session);
        changeNavButton();
      }
    }
  };
}

/* cambia dinamicamente nav e footer se c'è un utente loggato */
function changeNavButton() {
  if (session.authenticated) {
    var setHomeButton = document.getElementById("setHome");
    setHomeButton.innerHTML = "FrontOffice";
    setHomeButton.setAttribute("href", "/frontOffice");

    var setLoginButton = document.getElementById("setLogin");
    setLoginButton.innerHTML = "Logout";
    setLoginButton.setAttribute("href", "/logout");

    var setHomeFooter = document.getElementById("setHomeFoot");
    setHomeFooter.innerHTML = "FrontOffice";
    setHomeFooter.setAttribute("href", "/frontOffice");

    var setFooter = document.getElementById("setFoot");
    setFooter.innerHTML = "";

    var setLoginFooter = document.getElementById("setLoginFoot");
    setLoginFooter.innerHTML = "Logout";
    setLoginFooter.setAttribute("href", "/logout");

    var setRegFooter = document.getElementById("setRegisterFoot");
    setRegFooter.innerHTML = "";
  }
}
