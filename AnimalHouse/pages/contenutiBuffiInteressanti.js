document.onload = loadpage();
var session;

async function loadpage() {
    getSessionInfo();
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
                changeNavButton();
            }
        }
    };
}

function changeNavButton() {
    if (!session.admin && session.authenticated) {
        var setHomeButton = document.getElementById("setHome");
        setHomeButton.innerHTML = "FrontOffice";
        setHomeButton.setAttribute("href", "/frontOffice");

        var setLoginButton = document.getElementById("setLogin");
        setLoginButton.innerHTML = "Logout";
        setLoginButton.setAttribute("href", "/logout");

        var setHomeFooter = document.getElementById("setHomeFoot");
        setHomeFooter.innerHTML = "FrontOffice";
        setHomeFooter.setAttribute("href", "/frontOffice");

        var setFooter = document.getElementById("setFoot");
        setFooter.innerHTML = "";

        var setLoginFooter = document.getElementById("setLoginFoot");
        setLoginFooter.innerHTML = "Logout";
        setLoginFooter.setAttribute("href", "/logout");

        var setAdminFooter = document.getElementById("setAdminLoginFoot");
        setAdminFooter.innerHTML = "";

        var setRegFooter = document.getElementById("setRegisterFoot");
        setRegFooter.innerHTML = "";
    }
    if (session.admin) {
        var userNavButton = document.getElementById("userNavButton");
        userNavButton.innerHTML = "BackOffice";
        userNavButton.setAttribute("href", "/backoffice");
    }
}