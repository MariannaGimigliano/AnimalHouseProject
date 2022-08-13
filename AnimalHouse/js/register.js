express = require("express")
bodyParser = require("body-parser");
router = express.Router();
app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", router); 

router.get('/',function(req,res){
    res.sendfile("./register.html");
});

// Route to Login Page
/*app.get('/register', (req, res) => {
    res.sendFile("./register.html");
});*/

const fs = require('fs')

registerHandler = function(request, response){
    const user = {
        nome: request.body.nomeInput,
        cognome: request.body.cognomeInput,
        email: request.body.emailInput,
        password: request.body.passwordInput
    }
    const jsonString = JSON.stringify(user)

    fs.writeFile('./json/user.json', jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })
    response.send(request.body);
}
app.post("/register", registerHandler);

/*
*  Lancia il server WWW
*  e lo mette in ascolto sulla porta 8099
*/
port = 8099

app.listen(port, function(){
     console.log(`Simple Express app on port ${port}...`)
})