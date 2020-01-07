//The dotenv package is used to load environmental variables from a .env file into process.env Notice we are referencing a variables.env file at the top of the code. This is where we’ll store all our app credentials.
require('dotenv').config({ path: 'variables.env' });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const processMessage = require('./process-message');
const mongoose = require("mongoose");
const errorHandler = require("./src/app/_helpers/error-handler");
// create app
const app = express();


//************for notifications*********************//
const path = require("path");
const http = require("http").createServer(app);
const socketIo = require("socket.io");
const webpush = require("web-push"); //requiring the web-push module
const dummyDb = { subscription: null }; //dummy in memory store

//****************************************************
var client = require("./src/app/controllers/clients");
var conseil = require("./src/app/controllers/conseils");
var reclamation = require("./src/app/controllers/reclamations");
var mail = require("./src/app/controllers/mails");
var User = require("./src/app/models/UserSchema");
var etudeProjet = require("./src/app/controllers/etudeProjet");
var autre = require("./src/app/controllers/autre");
var bienImmobilier = require("./src/app/controllers/bienImmobilier");
var rechercheAvancee = require("./src/app/controllers/rechercheAvancee");
var negocierPrix = require("./src/app/controllers/negocierPrix");
var estimation = require("./src/app/controllers/estimation");
var demandeVisite = require("./src/app/controllers/visites");
var demandeAchat = require("./src/app/controllers/demandeAchat");
var demandeLocation = require("./src/app/controllers/demandeLocation");
var avis = require("./src/app/controllers/avis");
var notifications = require("./src/app/controllers/notifications");

//CORS vous permet de configurer la sécurité de l'API Web. Il s'agit de permettre à d'autres domaines de faire des requêtes contre votre API Web. Par exemple, si vous aviez votre API Web sur un serveur et votre application Web sur un autre, vous pouvez configurer CORS dans votre API Web pour permettre à votre application Web d'appeler votre API Web.

app.use(cors()); //pour acceder au backend
// parse application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const passport = require("passport");
app.use(passport.initialize());

// global error handler
app.use(errorHandler);
app.use(express.static('public'));
app.set("secretKey", "tokentest");
app.use("/clients", client);
app.use("/mails", mail);
app.use("/conseils", conseil); //conseils Router as a Layer in root Router
app.use("/reclamations", reclamation);
app.use("/etudeProjets", etudeProjet);
app.use("/autres", autre);
app.use("/bienImmobiliers", bienImmobilier);
app.use("/rechercheAvancees", rechercheAvancee);
app.use("/negocierPrix", negocierPrix);
app.use("/estimations", estimation);
app.use("/demandeVisites", demandeVisite);
app.use("/demandeAchats", demandeAchat);
app.use("/demandeLocations", demandeLocation);
app.use("/avis", avis);
app.use("/notifications", notifications);

//**********Chatbot***************//

app.post('/chat', (req, res) => {
    const { message } = req.body;
    processMessage(message);
});
//**********Chatbot***************//
// Connection URL
mongoose
    .connect("mongodb://localhost:27017/mydb", { useNewUrlParser: true })
    .then(() => console.log("MongoDB connect..."))
    .catch(err => console.log("Error:", err.message));


//*******************notifications************************//

/* web push */
const vapidKeys = {
    publicKey: "BEiRmN-GB1_y0ypcpA0UxoA-5itoQH2vuxchXn5gu-m8P9yi5hBCNForPGkjWnctnFKKAk2mHU1TjgFusj67aZA",
    privateKey: "A6HPKVrYS8zV8bPgIwisnEvkUzAid7Jpu6A_zOeI4oA"
};
//setting our previously generated VAPID keys
webpush.setVapidDetails(
    "mailto:bienimmo2020@gmail.com",
    vapidKeys.publicKey,
    vapidKeys.privateKey
);
//function to send the notification to the subscribed device
const sendNotification = (subscription, dataToSend = "") => {
    webpush.sendNotification(subscription, dataToSend);
};

/* <- web push */

const saveToDatabase = async subscription => {
    // Since this is a demo app, I am going to save this in a dummy in memory store. Do not do this in your apps.
    // Here you should be writing your db logic to save it.
    dummyDb.subscription = subscription;
};
// The new /save-subscription endpoint
app.post("/save-subscription", async(req, res) => {
    const subscription = req.body;
    await saveToDatabase(subscription); //Method to save the subscription to Database
    res.json({ message: "success" });
});

//route to test send notification
app.get("/send-notification", (req, res) => {
    const subscription = dummyDb.subscription; //get subscription from your databse here.
    const message = "Hello World from server";
    sendNotification(subscription, message);
    res.json({ message: "message sent" });
});

http.listen(4001, () => {
    console.log(`Listening on http port 4000`);
});




app.set('port', process.env.PORT || 8080);

const server = app.listen(app.get('port'), () => {
    console.log(`Express running → PORT ${server.address().port}`);
});

const io = socketIo(server)

io.on("connection", function(socket) {
    // This event will trigger when any user is connected.
    // You can use 'socket' to emit and receive events.
    console.log("a user connected.");
});
//**************************************//


// mongoose.connect(
//   "mongodb://localhost:27017/mydb",
//   { useNewUrlParser },
//   function(err) {
//     if (err) {
//       console.log("Not connected to databases: " + err);
//     } else {
//       console.log("Successfully connected to MongoDB");
//     }
//   }
// );