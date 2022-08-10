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

/*const customer = {
    name: "Newbie Co.",
    order_count: 0,
    address: "Po Box City",
}
const jsonString = JSON.stringify(customer)*/

let us

var usersArray = JSON.parse(fs.readFileSync("user.json"))

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

/*fs.writeFile('user.json', jsonString, err => {
    if (err) {
        console.log('Error writing file', err)
    } else {
        console.log('Successfully wrote file')
    }
})*/



/*
*  Lancia il server WWW
*  e lo mette in ascolto sulla porta 8099
*/
port = 8099

app.listen(port, function(){
     console.log(`Simple Express app on port ${port}...`)
})