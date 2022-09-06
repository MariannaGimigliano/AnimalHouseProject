
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

function mostraInfo(animaliJSON) {
  var arrayLength = animaliJSON.length;
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
  var p12 = document.createElement("p");
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