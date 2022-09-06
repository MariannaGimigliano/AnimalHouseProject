
function sendRequest() {
  let request = new XMLHttpRequest();
  request.open("GET", "https://dog.ceo/api/breed/hound/images");
  request.send();
  request.onload = () => {
    if (request.status == 200) {
      var houndJSON = JSON.parse(request.response);
      mostraInfo(houndJSON);
      //console.log(houndJSON);
    } else { //errore
      console.log(`error ${request.status} ${request.statusText}`);
    }
  }
}

function mostraInfo(houndJSON) {
  var arrayLength = houndJSON.message.length;

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
    //console.log(houndJSON.message[i]);
    containerAfghan.appendChild(immagine);
  }

  var basset = document.createElement("h4");
  basset.innerHTML = "Hound Basset";
  containerBasset.appendChild(basset);

  for (var i = 239; i < 243; i++) { //414
    var immagine = document.createElement("img");
    immagine.src = houndJSON.message[i];
    //console.log(houndJSON.message[i]);
    //console.log(i);
    containerBasset.appendChild(immagine);
  }

  var blood = document.createElement("h4");
  blood.innerHTML = "Hound Blood";
  containerBlood.appendChild(blood);

  for (var i = 414; i < 418; i++) { //601
    var immagine = document.createElement("img");
    immagine.src = houndJSON.message[i];
    //console.log(houndJSON.message[i]);
    //console.log(i);
    containerBlood.appendChild(immagine);
  }

  var english = document.createElement("h4");
  english.innerHTML = "Hound English";
  containerEnglish.appendChild(english);

  for (var i = 601; i < 605; i++) { //758
    var immagine = document.createElement("img");
    immagine.src = houndJSON.message[i];
    //console.log(houndJSON.message[i]);
    //console.log(i);
    containerEnglish.appendChild(immagine);
  }

  var ibizan = document.createElement("h4");
  ibizan.innerHTML = "Hound Ibizan";
  containerIbizan.appendChild(ibizan);

  for (var i = 758; i < 762; i++) { //946
    var immagine = document.createElement("img");
    immagine.src = houndJSON.message[i];
    //console.log(houndJSON.message[i]);
    //console.log(i);
    containerIbizan.appendChild(immagine);
  }

  var plott = document.createElement("h4");
  plott.innerHTML = "Hound Plott";
  containerPlott.appendChild(plott);

  for (var i = 946; i < 948; i++) {
    var immagine = document.createElement("img");
    immagine.src = houndJSON.message[i];
    //console.log(houndJSON.message[i]);
    //console.log(i);
    containerPlott.appendChild(immagine);
  }

  var walker = document.createElement("h4");
  walker.innerHTML = "Hound Walker";
  containerWalker.appendChild(walker);

  for (var i = 948; i < 952; i++) { //arrayLength
    var immagine = document.createElement("img");
    immagine.src = houndJSON.message[i];
    //console.log(houndJSON.message[i]);
    //console.log(i);
    containerWalker.appendChild(immagine);
  }


}

/*
 if (i < 239){
      console.log("hound-afghan");

    } else if (i < 414){
      console.log("hound-basset");

    } else if (i < 601){
      console.log("hound-blood");
    
    } else if (i < 758){
      console.log("hound-english");
      
    } else if (i < 946){
      console.log("hound-ibizan");
      
    } else if (i < 948){
      console.log("hound-plott");
      
    } else {
      console.log("hound-walker");
    }
*/
