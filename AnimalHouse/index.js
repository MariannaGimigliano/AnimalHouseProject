const { response } = require("express");
const express = require("express");
const { json, render } = require("express/lib/response");
const { MongoClient, ObjectId } = require('mongodb');
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express()

app.use(express.json());
app.use(express.urlencoded());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: "secret",
    saveUninitialized: false,
    cookie: { maxAge: oneDay, httpOnly: false },
}));

app.use(cookieParser());
app.use(express.static(__dirname));

var client;

async function main() {
    console.log("Server avviato");
    const uri = "mongodb+srv://admin:admin@cluster0.ltitfkd.mongodb.net/?retryWrites=true&w=majority";
    client = new MongoClient(uri);
    try {
        await client.connect();
    } catch (e) {
        console.error(e);
    }
}

main().catch(console.error);

login = async function (req, res) {
    const db = client.db("progetto");
    const col = db.collection("users");
    var userEmail = req.body.email;
    var hashedPsw = req.body.password;
    var query = {
        "email": userEmail,
        "password": hashedPsw
    }

    if (req.session.authenticated) {
        console.log("# user already authenticated");
    }

    var p = await col.findOne(query);
    if (p == null) {
        res.status(401).end();
        console.log("# user wrong login: " + userEmail);
    } else {
        res.status(200);
        req.session.authenticated = true;
        req.session.user = userEmail;
        console.log("# user successfully login: " + userEmail);
        res.end();
    }
}

adminLogin = async function (req, res) {
    const db = client.db("progetto");
    const col = db.collection("admins");
    var userEmail = req.body.email;
    var hashedPsw = req.body.password;
    var query = {
        "email": userEmail,
        "password": hashedPsw
    }

    if (req.session.authenticated && req.session.admin) {
        console.log("# admin already authenticated");
    }

    var p = await col.findOne(query);
    console.log(p);
    if (p == null) {
        res.status(401).end();
        console.log("# admin wrong login: " + userEmail);
    } else {
        res.status(200);
        req.session.authenticated = true;
        req.session.admin = true;
        req.session.user = userEmail;
        console.log("# admin successfully login: " + userEmail);
        res.end();
    }
}

logout = async function (req, res) {
    req.session.authenticated = false;
    if (req.session.admin) {
        req.session.admin = undefined;
    }
    res.redirect("/");
}

cookieSession = async function (req, res) {
    if (req.session.authenticated) {
        res.send(req.session);
    }
    else { 
        res.status(401).end() 
    };
}

register = async function (req, res) {
    const db = client.db("progetto");
    const col = db.collection("users");
    let newUserJSON = {
        "email": req.body.email,
        "password": req.body.password
    }

    const user = await col.findOne({ "email": req.body.email });
    if (user == null) {
        try {
            const p = await col.insertOne(newUserJSON);
            res.status(200);
            res.sendFile(__dirname + "/pages/homepage.html");
        } catch (e) {
            console.log(e);
            res.status(500);
            res.send("error");
        }
        startPoint(req.body.email, "memory");
        startPoint(req.body.email, "quiz");
    }
    else {
        res.status(200);
        res.send("UTENTE ESISTENTE");
    }
}

changePassword = async function (req, res) {
    const db = client.db("progetto");
    const col = db.collection("users");

    const up = await col.updateOne({ "email": req.body.userEmail }, { $set: { "password": req.body.password } });
    if (up.modifiedCount === 1) {
        res.status(200).end();
    } else {
        res.status(401).end();
    }
}

//MD
changeBooking = async function (req, res) {
    const db = client.db("progetto");
    const col = db.collection("bookings");

    const up = await col.updateOne({ "_id": req.body.bookingId }, { $set: { "date": req.body.newData } });
    if (up.modifiedCount === 1) {
        res.status(200).end();
    } else {
        res.status(401).end();
    }
}

getBacheca = async function (req, res) {
    res.sendFile(__dirname + "/pages/bacheca.html");
}

getBackOffice = async function (req, res) {
    res.sendFile(__dirname + "/pages/backoffice.html");
}

getUsersFromDB = async function (req, res) {
    const db = client.db("progetto");
    const col = db.collection("users");

    const cursor = col.find();
    var usersJSON = JSON.stringify(await cursor.toArray());
    res.send(usersJSON);
}

getServicesFromDB = async function (req, res) {
    const db = client.db("progetto");
    const col = db.collection("services");

    const cursor = col.find();
    var servicesJSON = JSON.stringify(await cursor.toArray());
    res.send(servicesJSON);
}

insertServiceInDB = async function (req, res) {
    const db = client.db("progetto");
    const col = db.collection("services");

    let newServiceJSON = {
        "name": req.body.name,
        "description": req.body.description
    }
    try {
        const p = await col.insertOne(newServiceJSON);
        res.status(200).end();
    } catch (e) {
        console.log(e);
        res.status(500);
        res.send("error");
    }
}

getBookingsByUserFromDB = async function (req, res) {
    const db = client.db("progetto");
    const col = db.collection("bookings");

    const cursor = col.find({ user: req.session.user });
    var bookingsJSON = JSON.stringify(await cursor.toArray());
    res.send(bookingsJSON);
}

getBookingsFromDB = async function (req, res) {
    const db = client.db("progetto");
    const col = db.collection("bookings");
    const cursor = col.find();

    var bookings = (await cursor.toArray());
    bookings.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date);
    });

    var bookingsJSON = JSON.stringify(bookings);
    res.send(bookingsJSON);
}

insertBooking = async function (req, res) {
    const db = client.db("progetto");
    const col = db.collection("bookings");

    let bookingJSON = {
        "user": req.session.user,
        "service": req.body.service,
        "date": req.body.date
    }
    try {
        const p = await col.insertOne(bookingJSON);
        res.status(200).end();
    } catch (e) {
        console.log(e);
        res.status(500);
        res.send("error");
    }
}

getPostsFromDB = async function (req, res) {
    const db = client.db("progetto");
    const col = db.collection("posts");

    const cursor = col.find();
    var postsJSON = JSON.stringify(await cursor.toArray());
    res.send(postsJSON);
}

insertPostInDB = async function (req, res) {
    const db = client.db("progetto");
    const col = db.collection("posts");
    let newPostJSON = {
        "user": req.session.user,
        "phrase": req.body.phrase
    }

    try {
        const p = await col.insertOne(newPostJSON);
        res.status(200).end();
    } catch (e) {
        console.log(e);
        res.status(500);
        res.send("error");
    }
}

startPoint = async function (userEmail, game) {
    const db = client.db("progetto");
    var pointsCollection = "points_" + game;
    let newPointsJSON = {
        "email": userEmail,
        "points": 0
    }

    const col = db.collection(pointsCollection);
    try {
        const up = await col.insertOne(newPointsJSON);
    } catch (e) {
        console.log(e);
    }
}

insertAnimalInDb = async function (req, res) {
    const db = client.db("progetto");
    const col = db.collection("users");
    try {
        const up = await col.updateOne({"email": req.session.user}, { $push: { "animals": req.body.animal }},
            { upsert: true });
    } catch (e) {
        console.log(e);
        res.status(500);
        res.send("error");
    }
    res.status(200).end();
}

removeAnimalList = async function (req, res) {
    const db = client.db("progetto");
    const col = db.collection("users");

    var email = req.body.email;

    try {
        const up = await col.updateOne({ "email": email }, { $unset: { animals: ""}});
    } catch (e) {
        console.log(e);
        res.status(500);
        res.send("error");
    }
    res.status(200).end();
}

getPointsFromDB = async function (req, res) {
    const db = client.db("progetto");
    const col = db.collection("points_" + req.params.gameName);

    const cursor = col.find();
    var points = (await cursor.toArray());
    points.sort(function (a, b) {
        return b.points - a.points;
    });
    var pointsJSON = JSON.stringify(points);

    res.send(pointsJSON);
    res.status(200);
}


insertPointsInDB = async function (req, res) {
    if (req.session.authenticated) {
        var points = req.body.points;
        console.log(points);
        var userEmail = req.session.user;

        const db = client.db("progetto");
        var pointsCollection = "points_" + req.body.game;

        const col = db.collection(pointsCollection);
        try {
            const up = await col.updateOne(
                {
                    "email": userEmail
                },
                {
                    $set: { "email": userEmail },
                    $inc: { "points": points },
                },
                {
                    upsert: true
                });
        } catch (e) {
            console.log(e);
            res.status(500);
            res.send("error");
        }
        res.status(200).end();

    } else {
        res.status(401).end();
    }
}

getAnimals = async function (req, res) {
    const db = client.db("progetto");
    const col = db.collection("users");

    const cursor = col.find({ "email": req.session.user }, { projection: { _id: 0, animals: 1 } });
    var animals = (await cursor.toArray());
    var animalsJSON = JSON.stringify(animals);

    res.send(animalsJSON);
}

removePost = async function (req, res) {
    const db = client.db("progetto");
    const col = db.collection("posts");

    var id = req.body._id;

    const del = await col.deleteOne({ "_id": ObjectId(id) });
    if (del.deletedCount === 1) {
        res.status(200).end();
    } else {
        res.status(401).end();
    }
}

removePointMemory = async function (req, res) {
    const db = client.db("progetto");
    const col = db.collection("points_memory");

    var id = req.body._id;

    try {
        const up = await col.updateOne(
            {
                "_id": ObjectId(id)
            },
            {
                $set: { "points": 0 },
            },
            {
                upsert: true
            });
    } catch (e) {
        console.log(e);
        res.status(500);
        res.send("error");
    }
    res.status(200).end();
}

removePointQuiz = async function (req, res) {
    const db = client.db("progetto");
    const col = db.collection("points_quiz");

    var id = req.body._id;

    try {
        const up = await col.updateOne(
            {
                "_id": ObjectId(id)
            },
            {
                $set: { "points": 0 },
            },
            {
                upsert: true
            });
    } catch (e) {
        console.log(e);
        res.status(500);
        res.send("error");
    }
    res.status(200).end();
}

removeUser = async function (req, res) {
    const db = client.db("progetto");
    const col = db.collection("users");

    var email = req.body.email;

    const del = await col.deleteOne({ "email": email });
    if (del.deletedCount === 1) {
        res.status(200).end();
    } else {
        res.status(401).end();
    }
}

removeService = async function (req, res) {
    const db = client.db("progetto");
    const col = db.collection("services");

    var id = req.body._id;

    const del = await col.deleteOne({ "_id": ObjectId(id) });
    if (del.deletedCount === 1) {
        res.status(200).end();
    } else {
        res.status(401).end();
    }
}

removeBooking = async function (req, res) {
    const db = client.db("progetto");
    const col = db.collection("bookings");

    var id = req.body._id;

    const del = await col.deleteOne({ "_id": ObjectId(id) });
    if (del.deletedCount === 1) {
        res.status(200).end();
    } else {
        res.status(401).end();
    }
}

/*removeBookingByService = async function (req, res) {
    const db = client.db("progetto");
    const col = db.collection("bookings");

    var serviceName = req.body.service;

    const del = await col.deleteOne({ "service": serviceName });
    if (del.deletedCount === 1) {
        res.status(200).end();
    } else {
        res.status(401).end();
    }
}*/

getGames = async function (req, res) {
    res.sendFile(__dirname + "/pages/game.html");
}

getHomePage = async function (req, res) {
    res.sendFile(__dirname + "/pages/homepage.html");
}

getLoginPage = async function (req, res) {
    res.sendFile(__dirname + "/pages/login.html");
}

getAdminLoginPage = async function (req, res) {
    res.sendFile(__dirname + "/pages/adminLogin.html");
}

getRegisterPage = async function (req, res) {
    res.sendFile(__dirname + "/pages/register.html");
}

getContenutiBuffiInteressanti = async function (req, res) {
    res.sendFile(__dirname + "/pages/contenutiBuffiInteressanti.html");
}

getFotoDivertentiGatti = async function (req, res) {
    res.sendFile(__dirname + "/pages/fotoDivertentiGatti.html");
}

getFotoDivertentiCani = async function (req, res) {
    res.sendFile(__dirname + "/pages/fotoDivertentiCani.html");
}

getFotoDivertentiAnatre = async function (req, res) {
    res.sendFile(__dirname + "/pages/fotoDivertentiAnatre.html");
}

getFotoDivertentiVolpe = async function (req, res) {
    res.sendFile(__dirname + "/pages/fotoDivertentiVolpe.html");
}

getFotoDivertentiHound = async function (req, res) {
    res.sendFile(__dirname + "/pages/fotoDivertentiHound.html");
}

getCuriositaAnimali = async function (req, res) {
    res.sendFile(__dirname + "/pages/curiositaAnimali.html");
}

getMemory = async function (req, res) {
    res.sendFile(__dirname + "/pages/memory.html");
}

getMemoryGenerico = async function (req, res) {
    res.sendFile(__dirname + "/pages/memoryGenerico.html");
}

getQuiz = async function (req, res) {
    res.sendFile(__dirname + "/pages/quiz.html");
}

getQuizGenerico = async function (req, res) {
    res.sendFile(__dirname + "/pages/quizGenerico.html");
}

getInfo = async function (req, res) {
    res.sendFile(__dirname + "/pages/info.html");
}

getBachecaBack = async function (req, res) {
    res.sendFile(__dirname + "/pages/bachecaBack.html");
}

getServiziBack = async function (req, res) {
    res.sendFile(__dirname + "/pages/serviziBack.html");
}

getLeaderboardBack = async function (req, res) {
    res.sendFile(__dirname + "/pages/leaderboardBack.html");
}

getUtentiBack = async function (req, res) {
    res.sendFile(__dirname + "/pages/utentiBack.html");
}

getServizi = async function (req, res) {
    res.sendFile(__dirname + "/pages/servizi.html");
}

getAnimali = async function (req, res) {
    res.sendFile(__dirname + "/pages/animaliPreferiti.html");
}

getLeaderboard = async function (req, res) {
    res.sendFile(__dirname + "/pages/leaderboard.html");
}

getFrontOffice = async function (req, res) {
    res.sendFile(__dirname + "/pages/frontoffice.html");
}

app.get("/games", getGames);

app.get("/loginPage", getLoginPage);

app.get("/adminLogin", getAdminLoginPage);

app.get("/registerPage", getRegisterPage);

app.get("/", getHomePage);

app.post("/login", login);

app.post("/register", register);

app.get("/contenutiBuffiInteressanti", getContenutiBuffiInteressanti);

app.get("/fotoDivertentiGatti", getFotoDivertentiGatti);

app.get("/fotoDivertentiCani", getFotoDivertentiCani);

app.get("/fotoDivertentiAnatre", getFotoDivertentiAnatre);

app.get("/fotoDivertentiVolpe", getFotoDivertentiVolpe);

app.get("/fotoDivertentiHound", getFotoDivertentiHound);

app.get("/curiositaAnimali", getCuriositaAnimali);

app.get("/memory", getMemory);

app.get("/memoryGenerico", getMemoryGenerico);

app.get("/quiz", getQuiz);

app.get("/quizGenerico", getQuizGenerico);

app.get("/logout", logout);

app.get("/frontoffice", getFrontOffice);

app.post("/adminLogin", adminLogin);

app.get("/cookieSession", cookieSession);

app.post("/salvaPunti", insertPointsInDB);

app.post("/addBooking", insertBooking);

app.get("/getServices", getServicesFromDB);

app.post("/insertAnimal", insertAnimalInDb);

app.get("/getAnimals", getAnimals);

app.get("/getPoints/:gameName", getPointsFromDB);

app.get("/backoffice", getBackOffice);

app.get("/getUsers", getUsersFromDB);

app.get("/getBookings", getBookingsFromDB);

app.get("/getPosts", getPostsFromDB);

app.get("/getBookingsByUser", getBookingsByUserFromDB);

app.post("/addPost", insertPostInDB);

app.delete("/removePost", removePost);

app.post("/removePointsMemory", removePointMemory);

app.post("/removePointsQuiz", removePointQuiz);

app.delete("/removeBooking", removeBooking);

//app.delete("/removeBookingByService", removeBookingByService);

app.delete("/removeService", removeService);

app.delete("/removeUser", removeUser);

app.post("/changePassword", changePassword);

app.post("/removeAnimalList", removeAnimalList);

app.post("/changeBooking", changeBooking);

app.post("/addService", insertServiceInDB);

app.get("/bacheca", getBacheca);

app.get("/leaderboard", getLeaderboard);

app.get("/servizi", getServizi);

app.get("/animali", getAnimali);

app.get("/bachecaback", getBachecaBack);

app.get("/leaderboardback", getLeaderboardBack);

app.get("/serviziback", getServiziBack);

app.get("/utentiback", getUtentiBack);

app.get("/info", getInfo);

app.listen(3000);
