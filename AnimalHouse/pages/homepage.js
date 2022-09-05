document.onload = loadpage();
var session;

async function loadpage() {
    getSessionInfo();
    getServices2();
}

function getSessionInfo() {
    let request = new XMLHttpRequest();
    request.open('GET', "/cookieSession", true);
    request.send();

    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            var status = request.status;
            if (status === 0 || (status >= 200 && status < 400)) {
                session = JSON.parse(request.responseText);
                console.log(session);
                checkLogoutButton();
            }
        }
    };
}

function checkLogoutButton() {
    if (!session.admin && session.authenticated) {
        var loginNav = document.getElementById("loginNav");
        loginNav.innerHTML ="Logout";
        loginNav.setAttribute("href","/logout");
        
        var loginFooter = document.getElementById("loginFooter");
        loginFooter.innerHTML ="Logout";
        loginFooter.setAttribute("href","/logout");

        var adminLoginFooter =  document.getElementById("adminLoginFooter");
        adminLoginFooter.setAttribute("href","/");
    }
    if(session.admin == true){
      var loginNav = document.getElementById("loginNav");
      loginNav.innerHTML ="Logout";
      loginNav.setAttribute("href","/logout");
      
      var loginFooter = document.getElementById("loginFooter");
      loginFooter.innerHTML ="Logout";
      loginFooter.setAttribute("href","/logout");

      var adminLoginFooter =  document.getElementById("adminLoginFooter");
      adminLoginFooter.setAttribute("href","/backoffice");
    }
    else {
        console.log("Not authenticated");
    }
}

function getServices2() {
    let request = new XMLHttpRequest()
    request.open('GET', "../getServices", true);
    request.send();
    request.onload = () => {
        if (request.status == 200) {
            var servicesJSON = JSON.parse(request.response);
            drawServices2(servicesJSON);
        } else {
            console.log("error:" + request.status);
        }
    }
}

function drawServices2(services) {
    var servizi = document.getElementById("servizi");

    for (var i = 0; i < services.length; i++) {
        p = document.createElement("p");
        p.innerHTML = services[i].name;
        servizi.appendChild(p);
    }
}