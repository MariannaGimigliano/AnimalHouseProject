document.onload = loadpage();

async function loadpage() {
  getQuizPoints();
  getMemoryPoints();
  getAnimals();
  getServices();
  getBookings();
  getPosts();
}

// FUNZIONI GIOCHI
/* ritorna il punteggio del memory per ogni utente */
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

/* ritorna il punteggio del quiz per ogni utente */
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
 
/* disegna la tabella della leaderboard per il quiz */ 
function leaderBoardQuiz(data){
  var div = document.getElementById("quizPoints");
  div.innerHTML = "";
  
  var table = document.createElement("table");
  table.innerHTML = "<thead><tr><th>Utente</th><th>Punteggio</th></tr></thead>";
  var tbody = document.createElement("tbody")

  for(var i=0 ; i<data.length ; i++){
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    var td1 = document.createElement("td");

    td.innerHTML = data[i].email;
    td1.innerHTML = data[i].points;

    tr.appendChild(td);
    tr.appendChild(td1);

    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
  div.appendChild(table);
} 

/* disegna la tabella della leaderboard per il memory */ 
function leaderBoardMemory(data){
  var div = document.getElementById("memoryPoints");
  div.innerHTML = "";
  
  var table = document.createElement("table");
  table.innerHTML = "<thead><tr><th>Utente</th><th>Punteggio</th></tr></thead>";
  var tbody = document.createElement("tbody")

  for(var i=0 ; i<data.length ; i++){
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    var td1 = document.createElement("td");

    td.innerHTML = data[i].email;
    td1.innerHTML = data[i].points;

    tr.appendChild(td);
    tr.appendChild(td1);

    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
  div.appendChild(table);
} 

// FUNZIONI ANIMALI PREFERITI
/* aggiunge il nuovo animale preferito dato in input */
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
        alert("Nuovo animale preferito aggiunto con successo!");
        window.location.replace("/animali");
      },
      error: function (err) {
        console.log("C'è stato un errore");
      }
    })
  }
}

/* ritona gli animali preferiti dell'utente */
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
          else { 
            drawAnimals(data[0].animals); 
          }  
      },
      error: function (err) {
          console.log("C'è stato un errore. Per cortesia riprova")
      }
  });
}

/* disegna il div degli animali preferiti */
function drawAnimals(animalName){
    var divLista = document.getElementById("listaAnimaliPreferiti");  
    var animal = document.createElement("p");
    animal.innerHTML = animalName;

    divLista.appendChild(animal);
}

// FUNZIONI SERVIZI
/* ritona tutti i servizi della piattaforma */
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

/* disegna l'option con i servizi prenotabili */
function drawServices(services){
    var servicesInput = document.getElementById("servicesInput");

    for (var i = 0; i < services.length; i++) {
      option = document.createElement("option");
      option.setAttribute("value", services[i].name);
      option.innerHTML = services[i].name + " - Descrizione: " + services[i].description;
    
      servicesInput.appendChild(option);
    }
}

// FUNZIONI PRENOTAZIONI
/* aggiunge il nuovo servizio dato in input */
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
          alert("Servizio prenotato con successo!")
          window.location.replace("/servizi");
      },
      error: function (err) {
          alert("Impossibile effettuare la prenotazione");
      }
    })
  }
}

/* ritona i servizi prenotati dall'utente */
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

/* disegna il div con i servizi prenotati */
function drawBookings(bookingsData){
    var divListaPrenotazioni = document.getElementById("listaPrenotazioni");
    for(var i=0 ; i<bookingsData.length ; i++){
    var bookings = document.createElement("p");
    bookings.innerHTML = bookingsData[i].service + " - Data: "+ bookingsData[i].date;

    divListaPrenotazioni.appendChild(bookings);
  }
}

// FUNZIONI BACHECA
/* aggiunge il nuovo post dato in input */
function addPost() {
  var post = document.getElementById("inputPost").value;
  var image = document.getElementById("inputImage").files[0].name;
  var imagePath = "http://localhost:3000/images/" + image;

  if (post.length > 0) {
    $.ajax({
      url: "../addPost",
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        "phrase": post,
        "image": imagePath
      }),

      success: function () {
        alert("Post aggiunto con successo!");
        window.location.replace("/bacheca");
      },
      error: function (err) {
        console.log("C'è stato un errore");
      }
    })
  }
}

/* ritona tutti i post della bacheca */
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

/* disegna il div con i post della bacheca */
function drawPosts(posts) {
  var bachecaPosts = document.getElementById("bachecaPosts");

  for (var i = 0; i < posts.length; i++) {
      var div = document.createElement("div");

      div.setAttribute("class", "rounded p-3 p-md-3 m-md-3 mb-10 text-center bg-warning");

      p = document.createElement("p");
      img = document.createElement("img");
      img.setAttribute("style", "height: 200px;");
      p.innerHTML = posts[i].user + " ha pubblicato: " + posts[i].phrase;  
      img.src = posts[i].image;

      div.appendChild(p);
      div.appendChild(img);

      bachecaPosts.appendChild(div);
  }
}