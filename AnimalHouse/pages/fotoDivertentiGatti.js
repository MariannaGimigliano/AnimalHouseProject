
function sendRequest() {
  let request = new XMLHttpRequest();
  request.open("GET", "https://api.thecatapi.com/v1/images/search");
  request.send();
  request.onload = () => {
    if (request.status == 200) {
      var gattiJSON = JSON.parse(request.response);
      mostraFoto(gattiJSON);
      //console.log(gattiJSON);
    } else { //errore
      console.log(`error ${request.status} ${request.statusText}`);
    }
  }
}

function mostraFoto(gattiJSON) {
  var arrayLength = gattiJSON.length;
  var containerImmagine = document.getElementById("containerImmagine");
  containerImmagine.innerHTML = "";

  for (var i = 0; i < arrayLength; i++) {
    console.log(gattiJSON[i].url);

    var immagine = document.createElement("img");
    immagine.src = gattiJSON[i].url;

    containerImmagine.appendChild(immagine);
  }
}
