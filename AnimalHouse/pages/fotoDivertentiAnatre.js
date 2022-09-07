document.onload = loadpage();
var session;

async function loadpage() {
  getSessionInfo();
}

/* ritorna i dati dall'API */
function sendRequest() {
  let request = new XMLHttpRequest();
  request.open("GET", "http://placekitten.com/");
  request.send();
  request.onload = () => {
    if (request.status == 200) {
      var anatreJSON = JSON.parse(request.response);
      mostraFoto(anatreJSON);
      console.log(anatreJSON);
    } else { //errore
      console.log(`error ${request.status} ${request.statusText}`);
    }
  }

}

/* disegna le info provenienti dall'API */
function mostraFoto(anatreJSON) {
  var containerImmagine = document.getElementById("containerImmagine");

  containerImmagine.innerHTML = "";

  console.log(anatreJSON.url);

  var immagine = document.createElement("img");
  immagine.src = anatreJSON.url;

  containerImmagine.appendChild(immagine);
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