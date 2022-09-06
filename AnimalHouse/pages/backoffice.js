document.onload = loadpage();

async function loadpage() {
    getUsers();
    getServices();
    getBookings();
    getPosts();
    getPoints("quiz");
    getPoints("memory");
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

function drawServices(services) {
    var listaServizi = document.getElementById("listaServizi");
    listaServizi.innerHTML = "";

    for (var i = 0; i < services.length; i++) {
        var div = document.createElement("div");
        div.setAttribute("class", "row");

        var divP = document.createElement("div");
        divP.setAttribute("class", "col");

        p = document.createElement("p");
        p.innerHTML = services[i].name + " | " + services[i].description;

        divP.appendChild(p);

        var divButton = document.createElement("div");
        divButton.setAttribute("class", "col");

        var button = document.createElement("button");
        button.innerHTML = "Cancella"
        button.setAttribute("class", "btn btn-primary");
        button.addEventListener("click", removeService.bind(this, services[i]._id));

        divButton.appendChild(button);

        div.appendChild(divP);
        div.appendChild(divButton);

        listaServizi.appendChild(div);
    }
}

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

function drawBookings(bookingsData) {
    var divListaPrenotazioni = document.getElementById("listaPrenotazioni");
    divListaPrenotazioni.innerHTML = "";

    for (var i = 0; i < bookingsData.length; i++) {
        var div = document.createElement("div");
        div.setAttribute("class", "row");

        var divP = document.createElement("div");
        divP.setAttribute("class", "col");

        p = document.createElement("p");
        p.innerHTML = bookingsData[i].user + " | " + bookingsData[i].service + "    Il giorno : " + bookingsData[i].date;

        divP.appendChild(p);

        var divButton = document.createElement("div");
        divButton.setAttribute("class", "col");

        var button = document.createElement("button");
        button.innerHTML = "Cancella"
        button.setAttribute("class", "btn btn-primary");
        button.addEventListener("click", removeBooking.bind(this, bookingsData[i]._id));

        var divTextBox = document.createElement("div"); //div per contenere la text box
        divTextBox.setAttribute("class", "col");

        var textBox = document.createElement("input");
        textBox.setAttribute("type","date");
        textBox.setAttribute("id",bookingsData[i]._id); //come id diamo l'id della prenotazione

        var divChangeButton = document.createElement("div");
        divChangeButton.setAttribute("class","col");

        var changeButton = document.createElement("button");
        changeButton.innerHTML = "Cambia data"
        changeButton.setAttribute("class", "btn btn-warning");
        changeButton.addEventListener("click", changeBooking.bind(this, bookingsData[i]._id));
    
        divButton.appendChild(button);
        divChangeButton.appendChild(changeButton);
        divTextBox.appendChild(textBox);

        div.appendChild(divP);
        div.appendChild(divButton);
        div.appendChild(divTextBox);
        div.appendChild(divChangeButton)

        divListaPrenotazioni.appendChild(div);
    }
}

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

function drawUsers(users) {
    var listaUtenti = document.getElementById("listaUtenti");
    listaUtenti.innerHTML = "";

    for (var i = 0; i < users.length; i++) {
        var div = document.createElement("div");
        div.setAttribute("class", "row");

        var divP = document.createElement("div");
        divP.setAttribute("class", "col");

        p = document.createElement("p");
        p.innerHTML = innerHTML = users[i].email +"| Animali preferiti : " + users[i].animals;

        divP.appendChild(p);

        var divButton = document.createElement("div"); //bottone cancella
        divButton.setAttribute("class", "col");


        var divTextBox = document.createElement("div"); //div per contenere la text box
        divTextBox.setAttribute("class", "col");

        var textBox = document.createElement("input");
        textBox.setAttribute("type","text");
        textBox.setAttribute("id",users[i].email);

        var divChangeButton = document.createElement("div");
        divChangeButton.setAttribute("class","col");

        var changeButton = document.createElement("button");
        changeButton.innerHTML = "Cambia password"
        changeButton.setAttribute("class", "btn btn-warning");
        changeButton.addEventListener("click", changePassword.bind(this, users[i].email));
    
        var button = document.createElement("button");
        button.innerHTML = "Cancella"
        button.setAttribute("class", "btn btn-primary");
        button.addEventListener("click", removeUser.bind(this, users[i].email));

        divButton.appendChild(button);
        divChangeButton.appendChild(changeButton);
        divTextBox.appendChild(textBox);

        div.appendChild(divP);
        div.appendChild(divButton);
        div.appendChild(divTextBox);
        div.appendChild(divChangeButton)
        
        listaUtenti.appendChild(div);
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
    var listaPosts = document.getElementById("listaPosts");
    listaPosts.innerHTML = "";
    
    for (var i = 0; i < posts.length; i++) {
        var div = document.createElement("div");
        div.setAttribute("class", "row");

        var divP = document.createElement("div");
        divP.setAttribute("class", "col");

        p = document.createElement("p");
        p.setAttribute("value", posts[i].phrase);
        p.innerHTML = posts[i].user + " ha postato: " + posts[i].phrase;  

        divP.appendChild(p);

        var divButton = document.createElement("div");
        divButton.setAttribute("class", "col");

        var button = document.createElement("button");
        button.innerHTML = "Cancella"
        button.setAttribute("class", "btn btn-primary");
        button.addEventListener("click", removePost.bind(this, posts[i]._id));

        divButton.appendChild(button);

        div.appendChild(divP);
        div.appendChild(divButton);

        listaPosts.appendChild(div);
    }
}

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
//MD
function removePointMemory(pointId) {
    $.ajax({
        url: "../removePointsMemory",
        method: 'DELETE',
        contentType: 'application/json',
        data: JSON.stringify({
            "_id": pointId,
        }),

        success: function (data) {
            getPoints();
        },
        error: function (err) {
            console.log("C'è stato un errore. Per cortesia riprova")
        }
    })
}
//MD
function removePointQuiz(pointId) {
    $.ajax({
        url: "../removePointsQuiz",
        method: 'DELETE',
        contentType: 'application/json',
        data: JSON.stringify({
            "_id": pointId,
        }),

        success: function (data) {
            getPoints();
        },
        error: function (err) {
            console.log("C'è stato un errore. Per cortesia riprova")
        }
    })
}
//MD
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
//MD
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
            alert("Prenotazione cambiata : " + bookingId);
        },
        error: function (err) {

            alert("Non è possibile modificare la prenotazione!");
            console.log (newData);
        }
    })
}

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
            alert("Password cambiata per l'utente : " + userEmail);
        },
        error: function (err) {

            alert("Questa password è attualmente in uso!");
        }
    })

}

function addService() {
    var newService = document.getElementById("newService").value;

    if (newService.length > 0 ) {

        $.ajax({
            url: " ../addService",
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ "name": newService, "description":description}),

            success: function () {
                alert("servizio aggiunto con successo");
                getServices();

            },
            error: function (err) {

            }
        })
    }
}

function getPoints(gioco) {
    $.ajax({
        url: "../getPoints/" + gioco,
        method: 'GET',
        contentType: 'application/json',
        dataType: 'json',

        success: function (data) {
            drawLeaderboard(data, gioco);
        },
        error: function (err) {
            console.log("Errore, riprova")
        }
    })
}

//MD
function drawLeaderboard(punti, gioco) {
    var leaderbordGioco = "leaderboard" + gioco;
    var leaderboard = document.getElementById(leaderbordGioco);
    leaderboard.innerHTML = "";

    var table = document.createElement("table");

    table.innerHTML = "<thead><tr><th>email</th><th>punti</th></tr></thead>";

    var tbody = document.createElement("tbody");

    for (var i = 0; i < punti.length; i++) {
        var tr = document.createElement("tr");

        var td = document.createElement("td");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");

        var button = document.createElement("button");
        button.innerHTML = "Cancella"
        button.setAttribute("class", "btn btn-primary");
        button.addEventListener("click", removePointMemory.bind(this, punti[i]._id));

        td.innerHTML = punti[i].email;
        td1.innerHTML = punti[i].points;
        td2.appendChild(button);

        tr.appendChild(td);
        tr.appendChild(td1);
        tr.appendChild(td2);

        tbody.appendChild(tr);

    }
    table.appendChild(tbody);
    leaderboard.appendChild(table);
}