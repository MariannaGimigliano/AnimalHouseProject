document.onload = loadpage();
var session;

async function loadpage() {
  getSessionInfo();
}

/* ritorna i dati dall'API */
function sendRequest() {
  let request = new XMLHttpRequest();
  request.open("GET", "https://dog.ceo/api/breed/hound/images");
  request.send();
  request.onload = () => {
    if (request.status == 200) {
      var houndJSON = JSON.parse(request.response);
      mostraInfo(houndJSON);
    } else { 
      console.log(`error ${request.status} ${request.statusText}`);
    }
  }
}

/* disegna le info provenienti dall'API */
function mostraInfo(houndJSON) {
  var containerAfghan = document.getElementById("razzaAfghan");
  var containerBasset = document.getElementById("razzaBasset");
  var containerBlood = document.getElementById("razzaBlood");
  var containerEnglish = document.getElementById("razzaEnglish");
  var containerIbizan = document.getElementById("razzaIbizan");
  var containerPlott = document.getElementById("razzaPlott");
  var containerWalker = document.getElementById("razzaWalker");

  var afghan = document.createElement("h4");
  afghan.innerHTML = "Hound Afghan";
  containerAfghan.appendChild(afghan);
  //per 4 volte mi stampa 1 immagine prendendo dei numeri a random come indice 
  for (var i = 0; i < 4; i++) { //239
    var immagine = document.createElement("img");
    immagine.src = houndJSON.message[i];
    containerAfghan.appendChild(immagine);
  }

  var basset = document.createElement("h4");
  basset.innerHTML = "Hound Basset";
  containerBasset.appendChild(basset);
  for (var i = 239; i < 242; i++) { //414
    var immagine = document.createElement("img");
    immagine.src = houndJSON.message[i];
    containerBasset.appendChild(immagine);
  }

  var blood = document.createElement("h4");
  blood.innerHTML = "Hound Blood";
  containerBlood.appendChild(blood);
  for (var i = 414; i < 417; i++) { //601
    var immagine = document.createElement("img");
    immagine.src = houndJSON.message[i];
    containerBlood.appendChild(immagine);
  }

  var english = document.createElement("h4");
  english.innerHTML = "Hound English";
  containerEnglish.appendChild(english);
  for (var i = 601; i < 605; i++) { //758
    var immagine = document.createElement("img");
    immagine.src = houndJSON.message[i];
    containerEnglish.appendChild(immagine);
  }

  var ibizan = document.createElement("h4");
  ibizan.innerHTML = "Hound Ibizan";
  containerIbizan.appendChild(ibizan);
  for (var i = 758; i < 761; i++) { //946
    var immagine = document.createElement("img");
    immagine.src = houndJSON.message[i];
    containerIbizan.appendChild(immagine);
  }

  var plott = document.createElement("h4");
  plott.innerHTML = "Hound Plott";
  containerPlott.appendChild(plott);
  for (var i = 946; i < 948; i++) {
    var immagine = document.createElement("img");
    immagine.src = houndJSON.message[i];
    containerPlott.appendChild(immagine);
  }

  var walker = document.createElement("h4");
  walker.innerHTML = "Hound Walker";
  containerWalker.appendChild(walker);
  for (var i = 948; i < 951; i++) { //arrayLength
    var immagine = document.createElement("img");
    immagine.src = houndJSON.message[i];
    containerWalker.appendChild(immagine);
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