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
      mostraInfo(animaliJSON);
      console.log(animaliJSON);
    } else {
      //errore
      console.log(`error ${request.status} ${request.statusText}`);
    }
  }
}

/* disegna le info provenienti dall'API */
function mostraInfo(animaliJSON) {
  var container = document.getElementById("container");
  var imm = document.getElementById("immagine");

  container.innerHTML = "";
  imm.innerHTML = "";

  var h3 = document.createElement("h3");
  var h4 = document.createElement("h4");
  var p2 = document.createElement("p");
  var p3 = document.createElement("p");
  var p4 = document.createElement("p");
  var p5 = document.createElement("p");
  var p7 = document.createElement("p");
  var p8 = document.createElement("p");
  var p9 = document.createElement("p");
  var p10 = document.createElement("p");
  var p11 = document.createElement("p");
  var immagine = document.createElement("img");

  h3.innerHTML = "Animale: " + animaliJSON.name;
  h4.innerHTML = "Nome in latino: " + animaliJSON.latin_name;
  p2.innerHTML = "Classe di vertebrati: " + animaliJSON.animal_type;
  p3.innerHTML = "Ora attiva: " + animaliJSON.active_time;
  p4.innerHTML = "Lunghezza min-max: " + animaliJSON.length_min + " - " + animaliJSON.length_max + "cm";
  p5.innerHTML = "Peso min-max: " + animaliJSON.weight_min + " - " + animaliJSON.weight_max + "kg";
  p8.innerHTML = "Durata di vita: " + animaliJSON.lifespan + " anni";
  p9.innerHTML = "Habitat: " + animaliJSON.habitat;
  p10.innerHTML = "Di cosa si ciba: " + animaliJSON.diet;
  p11.innerHTML = "Dove possiamo trovarlo? " + animaliJSON.geo_range;
  immagine.src = animaliJSON.image_link;

  container.appendChild(h3);
  container.appendChild(h4);
  container.appendChild(p2);
  container.appendChild(p3);
  container.appendChild(p4);
  container.appendChild(p5);
  container.appendChild(p7);
  container.appendChild(p8);
  container.appendChild(p9);
  container.appendChild(p10);
  container.appendChild(p11);

  imm.appendChild(immagine);
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