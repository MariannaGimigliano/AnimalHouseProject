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

function mostraFoto(anatreJSON) {
  var containerImmagine = document.getElementById("containerImmagine");

  containerImmagine.innerHTML = "";

  console.log(anatreJSON.url);

  var immagine = document.createElement("img");
  immagine.src = anatreJSON.url;

  containerImmagine.appendChild(immagine);
}

