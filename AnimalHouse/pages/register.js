function register() {
  var email = document.getElementById("emailInput").value;
  var password = document.getElementById("passwordInput").value;

  let request = new XMLHttpRequest()
  request.open('POST', "/register", true);
  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  var reqBodyJSON = JSON.stringify({ "email": email, "password": password });
  request.send(reqBodyJSON);

  request.onreadystatechange = function () {
    if (request.readyState === XMLHttpRequest.DONE) {
      var status = request.status;
      if (status === 0 || (status >= 200 && status < 400)) {

        if (request.responseText == "UTENTE ESISTENTE") {
          alert("Utente già esistente");
        }
        else {
          alert("Registrazione avvenuta con successo");
          window.location.replace("/loginPage");
        }

      } else {
        console.log("Error: " + request.status)
      }
    }
  };
}
  