
function sendRequest() {
  let request = new XMLHttpRequest();
  request.open("GET", "https://dog.ceo/api/breeds/image/random");
  request.send();
  request.onload = () => {
    if (request.status == 200) {
      var caniJSON = JSON.parse(request.response);
      mostraFoto(caniJSON);
      //console.log(caniJSON);
    } else { //errore
      console.log(`error ${request.status} ${request.statusText}`);
    }
  }
}

function mostraFoto(caniJSON) {
  var containerImmagine = document.getElementById("containerImmagine");
  containerImmagine.innerHTML = "";
  //console.log(caniJSON.message);

  var immagine = document.createElement("img");
  immagine.src = caniJSON.message;

  containerImmagine.appendChild(immagine);
}