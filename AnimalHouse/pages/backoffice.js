document.onload = loadpage();

async function loadpage() {
    getUsers();
    getServices();
    getBookings();
    getPosts();
    getMemoryPoints();
    getQuizPoints();
}

// FUNZIONI SERVIZI
/* ritorna tutti i servizi della piattaforma */
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

/* disegna tutti i servizi */
function drawServices(services) {
    var listaServizi = document.getElementById("listaServizi");
    listaServizi.innerHTML = "";

    for (var i = 0; i < services.length; i++) {
        var div = document.createElement("div");
        div.setAttribute("class", "row");

        var divP = document.createElement("div"); // div dei servizi
        divP.setAttribute("class", "col");
        p = document.createElement("p");
        p.innerHTML = services[i].name + " - Descrizione: " + services[i].description;

        divP.appendChild(p);

        var divButton = document.createElement("div"); //bottone elimina servizio
        divButton.setAttribute("class", "col");
        var button = document.createElement("button");
        button.innerHTML = "Elimina"
        button.setAttribute("class", "btn btn-danger");
        button.addEventListener("click", removeService.bind(this, services[i]._id));
        //button.addEventListener("click", removeBookingByService.bind(this, services[i]._id));

        divButton.appendChild(button);
        div.appendChild(divP);
        div.appendChild(divButton);

        listaServizi.appendChild(div);
    }
}

/* aggiunge un nuovo servizio */
function addService() {
    var newService = document.getElementById("newService").value;
    var description = document.getElementById("newDescription").value;

    if (newService.length > 0 ) {
        $.ajax({
            url: " ../addService",
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ "name": newService, "description":description}),
            success: function () {
                alert("Servizio aggiunto con successo!");
                window.location.replace("/serviziback");
            },
            error: function (err) {
                console.log("C'è stato un errore. Per cortesia riprova")
            }
        })
    }
}

/* elimina un servizio */
function removeService(serviceId) {
    $.ajax({
        url: "../removeService",
        method: 'DELETE',
        contentType: 'application/json',
        data: JSON.stringify({
            "_id": serviceId,
        }),
        success: function (data) {
            getServices();
        },
        error: function (err) {
            console.log("C'è stato un errore. Per cortesia riprova")
        }
    })
}

//FUNZIONI PRENOTAZIONI
/* ritorna tutte le prenotazioni */
function getBookings() {
    $.ajax({
        url: "../getBookings",
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

/* disegna tutte le prenotazioni */
function drawBookings(bookingsData) {
    var divListaPrenotazioni = document.getElementById("listaPrenotazioni");
    divListaPrenotazioni.innerHTML = "";

    for (var i = 0; i < bookingsData.length; i++) {
        var div = document.createElement("div");
        div.setAttribute("class", "row");

        var divP = document.createElement("div"); // div elenco prenotazioni
        divP.setAttribute("class", "col");
        p = document.createElement("p");
        p.innerHTML = bookingsData[i].user + " - " + bookingsData[i].service + " - Data: " + bookingsData[i].date;

        divP.appendChild(p);

        var divButton = document.createElement("div"); // bottone elimina prenotazione
        divButton.setAttribute("class", "col");
        var button = document.createElement("button");
        button.innerHTML = "Elimina Prenotazione"
        button.setAttribute("class", "btn btn-danger");
        button.addEventListener("click", removeBooking.bind(this, bookingsData[i]._id));

        var divTextBox = document.createElement("div"); //div per contenere la text box
        divTextBox.setAttribute("class", "col");
        var textBox = document.createElement("input");
        textBox.setAttribute("type","date");
        textBox.setAttribute("id",bookingsData[i]._id); //come id diamo l'id della prenotazione

        let today = new Date().toISOString().slice(0, 10);
        //console.log("la data di oggi è: " + today);
        textBox.min = today;

        var divChangeButton = document.createElement("div"); // bottone modifica data
        divChangeButton.setAttribute("class","col");
        var changeButton = document.createElement("button");
        changeButton.innerHTML = "Cambia data prenotazione"
        changeButton.setAttribute("class", "btn btn-warning");
        changeButton.addEventListener("click", changeBooking.bind(this, bookingsData[i]._id));
    
        divButton.appendChild(button);
        divChangeButton.appendChild(changeButton);
        divTextBox.appendChild(textBox);

        div.appendChild(divP);
        div.appendChild(divTextBox);
        div.appendChild(divChangeButton)
        div.appendChild(divButton);

        divListaPrenotazioni.appendChild(div);
    }
}

/* modifica una prenotazione */
function changeBooking(bookingId) {
    var newData = document.getElementById(bookingId).value;

    $.ajax({
        url: "../changeBooking",
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            "_id": bookingId,
            "date": newData
        }),
        success: function () {
            alert("Prenotazione modificata con successo!");
            window.location.replace("/serviziback");
        },
        error: function (err) {
            alert("Non è possibile modificare la prenotazione!");
            console.log(newData);
        }
    })
}

/* elimina una prenotazione */
/*function removeBookingByService(bookingId) {                      //NON FUNZIONA
    var serviceName = document.getElementById(bookingId).value;
    $.ajax({
        url: "../removeBookingByService",
        method: 'DELETE',
        contentType: 'application/json',
        data: JSON.stringify({
            "service": serviceName,
        }),
        success: function (data) {
            alert("Prenotazioni eliminate");
        },
        error: function (err) {
            alert("Prenotazioni non eliminate");
        }
    })
}*/

//MD
/* elimina una prenotazione */
function removeBooking(bookingId) {
    $.ajax({
        url: "../removeBooking",
        method: 'DELETE',
        contentType: 'application/json',
        data: JSON.stringify({
            "_id": bookingId,
        }),

        success: function (data) {
            getBookings();
        },
        error: function (err) {
            console.log("C'è stato un errore. Per cortesia riprova")
        }
    })
}

// FUNZIONI UTENTI
/* ritorna tutti gli utenti nel db */
function getUsers() {
    let request = new XMLHttpRequest()
    request.open('GET', "../getUsers", true);
    request.send();
    request.onload = () => {
        if (request.status == 200) {
            var usersJson = JSON.parse(request.response);
            drawUsers(usersJson);
        } else {
            console.log("error:" + request.status);
        }
    }
}

/* disegna la lista di utenti */
function drawUsers(users) {
    var listaUtenti = document.getElementById("listaUtenti");
    listaUtenti.innerHTML = "";

    for (var i = 0; i < users.length; i++) {
        var div = document.createElement("div");
        div.setAttribute("class", "row");

        var divP = document.createElement("div"); //div con elenco utenti
        divP.setAttribute("class", "col");
        p = document.createElement("p");
        if (users[i].animals == undefined) {
            p.innerHTML = innerHTML = users[i].email + " - Animali preferiti : nessun animale inserito";
            divP.appendChild(p);
        } else {
            p.innerHTML = innerHTML = users[i].email + " - Animali preferiti : " + users[i].animals;
            divP.appendChild(p);
        }

        var divTextBox = document.createElement("div"); //div per contenere la text box
        divTextBox.setAttribute("class", "col");
        var textBox = document.createElement("input");
        textBox.setAttribute("type","text");
        textBox.setAttribute("id",users[i].email);

        var divChangeButton = document.createElement("div"); //bottone cambia password
        divChangeButton.setAttribute("class","col");
        var changeButton = document.createElement("button");
        changeButton.innerHTML = "Modifica password"
        changeButton.setAttribute("class", "btn btn-warning");
        changeButton.addEventListener("click", changePassword.bind(this, users[i].email));
    
        var divButton = document.createElement("div"); //bottone cancella
        divButton.setAttribute("class", "col");
        var button = document.createElement("button");
        button.innerHTML = "Cancella Utente"
        button.setAttribute("class", "btn btn-danger");
        button.addEventListener("click", removeUser.bind(this, users[i].email));

        var divButtonList = document.createElement("div"); //bottone cancella lista animali preferiti
        divButtonList.setAttribute("class", "col");
        var buttonList = document.createElement("button");
        buttonList.innerHTML = "Rimuovi Lista Animali"
        buttonList.setAttribute("class", "btn btn-danger");
        buttonList.addEventListener("click", removeAnimalList.bind(this, users[i].email));

        divButton.appendChild(button);
        divChangeButton.appendChild(changeButton);
        divTextBox.appendChild(textBox);
        divButtonList.appendChild(buttonList);

        div.appendChild(divP);
        div.appendChild(divTextBox);
        div.appendChild(divChangeButton)
        div.appendChild(divButton);
        div.appendChild(divButtonList);

        listaUtenti.appendChild(div);
    }
}

/* elimina un utente */
function removeUser(email) {
    $.ajax({
        url: "../removeUser",
        method: 'DELETE',
        contentType: 'application/json',
        data: JSON.stringify({
            "email": email,
        }),
        success: function (data) {
            getUsers();
        },
        error: function (err) {
            console.log("C'è stato un errore. Per cortesia riprova")
        }
    })
}

/* aggiorna la password dell'utente */
function changePassword(userEmail) {
    var newPassword = document.getElementById(userEmail).value;
    $.ajax({
        url: "../changePassword",
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            "userEmail" : userEmail, 
            "password": newPassword
        }),
        success: function () {
            alert("Password cambiata con successo!");
            window.location.replace("/utentiback");
        },
        error: function (err) {
            alert("Questa password è attualmente in uso!");
        }
    })
}

/* elimina la lista degli animali preferiti utente */
function removeAnimalList(email) {
    $.ajax({
        url: "../removeAnimalList",
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            "email": email,
        }),
        success: function () {
            alert("Lista animali preferiti rimossa con successo!");
            getUsers();
        },
        error: function (err) {
            alert("Lista non rimossa");
        }
    })
}

// FUNZIONI BACHECA
/* ritorna tutti i post nella bacheca */
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

/* disegna i post */
function drawPosts(posts) {
    var listaPosts = document.getElementById("listaPosts");
    listaPosts.innerHTML = "";
    
    for (var i = 0; i < posts.length; i++) {
        var div = document.createElement("div");
        div.setAttribute("class", "row");

        var divP = document.createElement("div"); // div elenco post
        divP.setAttribute("class", "col");
        p = document.createElement("p");
        p.setAttribute("value", posts[i].phrase);
        p.innerHTML = posts[i].user + " ha postato: " + posts[i].phrase;  

        divP.appendChild(p);

        var divButton = document.createElement("div"); // bottone cancella post
        divButton.setAttribute("class", "col");
        var button = document.createElement("button");
        button.innerHTML = "Elimina Post"
        button.setAttribute("class", "btn btn-danger");
        button.addEventListener("click", removePost.bind(this, posts[i]._id));

        divButton.appendChild(button);
        div.appendChild(divP);
        div.appendChild(divButton);

        listaPosts.appendChild(div);
    }
}

/* elimina il post selezionato */
function removePost(postId) {
    $.ajax({
        url: "../removePost",
        method: 'DELETE',
        contentType: 'application/json',
        data: JSON.stringify({
            "_id": postId,
        }),
        success: function (data) {
            getPosts();
        },
        error: function (err) {
            console.log("C'è stato un errore. Per cortesia riprova")
        }
    })
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
    var urlreq = "../getPoints/quiz";
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
function leaderBoardQuiz(data) {
    var div = document.getElementById("leaderboardquiz");
    div.innerHTML = "";

    var table = document.createElement("table");
    table.innerHTML = "<thead><tr><th>Utente</th><th>Punteggio</th></tr></thead>";
    var tbody = document.createElement("tbody")

    for (var i = 0; i < data.length; i++) {
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");

        var button = document.createElement("button");
        button.innerHTML = "Azzera"
        button.setAttribute("class", "btn btn-warning");
        button.addEventListener("click", removePointQuiz.bind(this, data[i]._id));

        td.innerHTML = data[i].email;
        td1.innerHTML = data[i].points;
        td2.appendChild(button);

        tr.appendChild(td);
        tr.appendChild(td1);
        tr.appendChild(td2);

        tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    div.appendChild(table);
}

/* disegna la tabella della leaderboard per il memory */
function leaderBoardMemory(data) {
    var div = document.getElementById("leaderboardmemory");
    div.innerHTML = "";

    var table = document.createElement("table");
    table.innerHTML = "<thead><tr><th>Utente</th><th>Punteggio</th></tr></thead>";
    var tbody = document.createElement("tbody")

    for (var i = 0; i < data.length; i++) {
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");

        var button = document.createElement("button");
        button.innerHTML = "Azzera"
        button.setAttribute("class", "btn btn-warning");
        button.addEventListener("click", removePointMemory.bind(this, data[i]._id));

        td.innerHTML = data[i].email;
        td1.innerHTML = data[i].points;
        td2.appendChild(button);

        tr.appendChild(td);
        tr.appendChild(td1);
        tr.appendChild(td2);

        tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    div.appendChild(table);
} 

/*  azzera i punti del memory */
function removePointMemory(pointId) {
    $.ajax({
        url: "../removePointsMemory",
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            "_id": pointId,
        }),

        success: function (data) {
            getMemoryPoints();
        },
        error: function (err) {
            console.log("C'è stato un errore. Per cortesia riprova")
        }
    })
}

/*  azzera i punti del quiz */
function removePointQuiz(pointId) {
    $.ajax({
        url: "../removePointsQuiz",
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            "_id": pointId,
        }),

        success: function (data) {
            getQuizPoints();
        },
        error: function (err) {
            console.log("C'è stato un errore. Per cortesia riprova")
        }
    })
}