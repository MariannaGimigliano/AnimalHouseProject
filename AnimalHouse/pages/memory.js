document.onload = loadpage();
var session;
var loggato = false;

async function loadpage() {
  getSessionInfo();
}

var primagirata = false;
var cartauno; var cartadue;
var divuno; var divdue;

/* ritorna i dati dall'API */
function sendRequest() {
  let request = new XMLHttpRequest();
  request.open("GET", "https://dog.ceo/api/breeds/image/random");
  request.send();
  request.onload = () => {
    if (request.status == 200) {
      var caniJSON = JSON.parse(request.response);
      disegnaCane(caniJSON);
      disegnaCane(caniJSON);
    } else {
      console.log(`error ${request.status} ${request.statusText}`);
    }
  }
}

/* disegna le immagini provenienti dall'API per creare il memory */
function disegnaCane(caniJSON) {
  console.log(caniJSON);
  var div = document.getElementsByClassName("empty")[0];
  div.classList.remove("empty");
  var img = document.createElement("img");
  img.setAttribute("src", caniJSON.message);
  img.setAttribute("class", "nascosta");
  div.addEventListener("click", flip);
  div.appendChild(img);
}

/* carica le carte */
function loadPhotos() { //chiama quante volte ci serve la sendRequest
  for (var i = 0; i < 8; i++) {
    sendRequest();
  }
  shuffleCards();
}

/* mischia le carte */
function shuffleCards() {
  var cards = document.getElementsByClassName("card");

  for (var i = 0; i < 16; i++) {
    let random = Math.floor(Math.random() * 12);
    let randomOrd = "order-" + random;
    cards[i].classList.add(randomOrd);
  }
}

/* gira le carte */
function flip() {
  console.log(this);
  var div = this;
  var retro = div.childNodes[1];
  retro.classList.add("nascosta");

  var fronte = div.childNodes[3];
  fronte.classList.remove("nascosta");
  if (primagirata == true) {
    cartadue = fronte.src;
    divdue = this;

    blockuserinput();

    check();
  } else {
    primagirata = true;
    cartauno = fronte.src;
    divuno = this;
  }
}

/* blocca momentaneamente l'input dell'utente tra una coppia e l'altra */
function blockuserinput() {
  var cards = document.getElementsByClassName("card");
  for (var i = 0; i < 16; i++) {
    cards[i].removeEventListener("click", flip);
  }
  setTimeout(function () {
    for (var i = 0; i < 16; i++) {
      cards[i].addEventListener("click", flip);
    }
  }, 1000)

}

/* controlla se l'utente ha trovato carte uguali */
function check() {
  console.log(cartadue);
  console.log(cartauno);

  if (cartadue == cartauno && divuno != divdue) {
    console.log("corretto")
    primagirata = false;
    checkVittoria();
  } else {
    setTimeout(function () {
      var retrouno = divuno.childNodes[1];
      retrouno.classList.remove("nascosta");
      var retrodue = divdue.childNodes[1];
      retrodue.classList.remove("nascosta");

      var fronteuno = divuno.childNodes[3];
      fronteuno.classList.add("nascosta");
      var frontedue = divdue.childNodes[3];
      frontedue.classList.add("nascosta");

      console.log("errato")
      primagirata = false;
      checkVittoria();
    }, 1000)
  }
}

/* controlla se l'uente ha trovato tutte le coppie */
function checkVittoria() {
  var cards = document.getElementsByClassName("card");
  var countgirate = 0;
  for (var i = 0; i < cards.length; i++) {
    if (cards[i].childNodes[1].classList.contains("nascosta")) {
      console.log("carta numero" + countgirate + "--> GIRATA");
      countgirate++;
    } else {
      console.log("carta numero" + countgirate + "--> NASCOSTA");

    }
  }

  if (countgirate == 16) {
    if (loggato) {
      var messaggiovittoria = document.getElementById("msgvittoria");
      messaggiovittoria.innerHTML = "Complimenti! Hai trovato tutte le coppie. Hai guadagnato un punto.";
      messaggiovittoria.classList.remove("nascosta");
      salvaPunti();
    } else {
      var messaggiovittoria = document.getElementById("msgvittoria");
      messaggiovittoria.innerHTML = "Complimenti! Hai trovato tutte le coppie.";
      messaggiovittoria.classList.remove("nascosta");
    }
  }
}

/* salva il punteggio */
function salvaPunti() {
  let request = new XMLHttpRequest();
  request.open("POST", "/salvaPunti");
  request.setRequestHeader("Content-Type", "application/json");
  request.send(
    JSON.stringify({
      "game": "memory",
      "points": 1
    }));
  request.onload = () => {
    if (request.status == 200) {
      alert("punti aggiornati");
      window.location.replace("/games"); 
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
    loggato = true;
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