function sendRequest() {
  let request = new XMLHttpRequest();
  request.open("GET", "https://randomfox.ca/floof/");
  request.send();
  request.onload = () => {
    if (request.status == 200) {
      var volpiJSON = JSON.parse(request.response);
      mostraFoto(volpiJSON);
      //console.log(volpiJSON);
    } else { //errore
      console.log(`error ${request.status} ${request.statusText}`);
    }
  }
}

function mostraFoto(volpiJSON) {
  var containerImmagine = document.getElementById("containerImmagine");
  containerImmagine.innerHTML = "";
  //console.log(volpiJSON.image);

  var immagine = document.createElement("img");
  immagine.src = volpiJSON.image;

  containerImmagine.appendChild(immagine);
}
