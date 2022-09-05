document.onload = loadpage();

async function loadpage() {
  getQuizPoints();
  getMemoryPoints();
  getAnimals();
  getServices();
  getBookings();
  getPosts();
}

function getMemoryPoints() {
  var urlreq = "../getPoints/memory";

  $.ajax({
    url: urlreq,
    method: 'GET',
    contentType: 'application/json',
    dataType: 'json',

    success: function (data) {
      leaderBoardMemory(data);
    },
    error: function (err) {
      console.log("C'è stato un errore. Per cortesia riprova")
    }
  })
}

function getQuizPoints() {
  var urlreq = "../getPoints/quiz" ;

  $.ajax({
    url: urlreq,
    method: 'GET',
    contentType: 'application/json',
    dataType: 'json',

    success: function (data) {
      leaderBoardQuiz(data);
    },
    error: function (err) {
      console.log("C'è stato un errore. Per cortesia riprova")
    }
  })
}

function leaderBoardQuiz(data){
  var div = document.getElementById("quizPoints");
  
  for(var i=0 ; i<data.length ; i++){
    var user = document.createElement("p");
    user.innerHTML = "Utente: " + data[i].email + " Punteggio: " + data[i].points;

    div.appendChild(user);
  }
} 

function leaderBoardMemory(data){
  var div = document.getElementById("memoryPoints");
  
  for(var i=0 ; i<data.length ; i++){
    var user = document.createElement("p");
    user.innerHTML = "Utente: " + data[i].email + " Punteggio: " + data[i].points;

    div.appendChild(user);
  }
} 

function insertAnimal() {
  var animal = document.getElementById("inputAnimal").value;

  if (animal.length > 0) {
    $.ajax({
      url: "../insertAnimal",
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        "animal": animal
      }),

      success: function () {
        alert("Animale aggiunto");
      },
      error: function (err) {
        console.log("C'è stato un errore");
      }
    })
  }
}

function getAnimals() {
  $.ajax({
      url: "../getAnimals",
      method: 'GET',
      contentType: 'application/json',
      dataType: 'json',

      success: function (data) {
          if (data[0].animals == undefined) {
              //nessun animale preferito
          }
          else { drawAnimals(data[0].animals); }  
      },
      error: function (err) {
          console.log("C'è stato un errore. Per cortesia riprova")
      }
  });
}

function drawAnimals(animalName){

    var divLista = document.getElementById("listaAnimaliPreferiti");  
    var animal = document.createElement("p");
    animal.innerHTML = animalName;

    divLista.appendChild(animal);
}

function getServices() {
    let request = new XMLHttpRequest()
    request.open('GET', "../getServices", true);
    request.send();
    request.onload = () => {
      if (request.status == 200) {
        var servicesJSON = JSON.parse(request.response);
        drawServices(servicesJSON);
      } else {
        console.log("error:" + request.status);
      }
    }
}

function drawServices(services){
    var servicesInput = document.getElementById("servicesInput");

    for (var i = 0; i < services.length; i++) {
      option = document.createElement("option");
      option.setAttribute("value", services[i].name);
      option.innerHTML = services[i].name;
    
      servicesInput.appendChild(option);
    }
}

function addBooking() {
  var service = document.getElementById("servicesInput").value;
  var date = document.getElementById("inputDate").value;

  if (service !="Scegli il servizio" && date != "") {

    $.ajax({
      url: "../addBooking",
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        "service": service,
        "date": date
      }),

      success: function (responseText) {
          alert("Prenotato!")
      },
      error: function (err) {
          alert("Impossibile effettuare la prenotazione");
      }
    })
  }
}

function getBookings() {
  $.ajax({
      url: "../getBookingsByUser",
      method: 'GET',
      contentType: 'application/json',
      dataType: 'json',

      success: function (data) {
          drawBookings(data);
      },
      error: function (err) {
          console.log("C'è stato un errore. Per cortesia riprova")
      }
  })
}

function drawBookings(bookingsData){

    var divListaPrenotazioni = document.getElementById("listaPrenotazioni");
    for(var i=0 ; i<bookingsData.length ; i++){
    var bookings = document.createElement("p");
    bookings.innerHTML = bookingsData[i].service + "    Il giorno : "+ bookingsData[i].date;

    divListaPrenotazioni.appendChild(bookings);
  }
}

function addPost() {
  var post = document.getElementById("inputPost").value;

  if (post.length > 0) {
    $.ajax({
      url: "../addPost",
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        "phrase": post
      }),

      success: function () {
        alert("Post aggiunto");
        window.location.replace("/bacheca");
      },
      error: function (err) {
        console.log("C'è stato un errore");
      }
    })
  }
}

function getPosts() {
  let request = new XMLHttpRequest()
  request.open('GET', "../getPosts", true);
  request.send();
  request.onload = () => {
      if (request.status == 200) {
          var postsJson = JSON.parse(request.response);
          drawPosts(postsJson);
      } else {
          console.log("error:" + request.status);
      }
  }
}

function drawPosts(posts) {
  var bachecaPosts = document.getElementById("bachecaPosts");

  for (var i = 0; i < posts.length; i++) {
      var div = document.createElement("div");
      div.setAttribute("class", "rounded p-3 p-md-3 m-md-3 mb-10 text-center bg-info");

      p = document.createElement("p");
      p.innerHTML = posts[i].user + " ha pubblicato: " + posts[i].phrase;  

      div.appendChild(p);

      bachecaPosts.appendChild(div);
  }
}