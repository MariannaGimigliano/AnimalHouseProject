express = require("express")
bodyParser = require("body-parser");
router = express.Router();
app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", router);

// Route to Login Page
app.get('/login', (req, res) => {
    res.sendFile("./login.html");
});

const fs = require('fs')

let us

var usersArray = JSON.parse(fs.readFileSync("./json/user.json"))

loginHandler = function(request, response){
    email = request.body.emailInput
	password = request.body.passwordInput

    var msg = "Username o password non corretti";

    for (const user of usersArray) {
        if (email == user.email) {
            us = user
            msg = "Corretto"
        }
    }
    //alert("<h1>" + msg + "</h1>")
    response.send("<h1>" + msg + "</h1>");
}
app.post("/login", loginHandler);

/*
*  Lancia il server WWW
*  e lo mette in ascolto sulla porta 8099
*/
port = 8099

app.listen(port, function(){
     console.log(`Simple Express app on port ${port}...`)
})