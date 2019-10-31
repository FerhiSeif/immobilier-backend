var express = require("express");
var mongoose = require("mongoose");
const cors = require("cors");
var bodyParser = require("body-parser");
//The dotenv package is used to load environmental variables from a .env file into process.env Notice we are referencing a variables.env file at the top of the code. This is where we’ll store all our app credentials.
// require('dotenv').config({ path: 'variables.env' });
// const processMessage = require('../frontOffice/react_test_project/frontend/src/components/reactBot/process-message');

//****************************************************
var client = require("./src/app/controllers/clients");
var conseil = require("./src/app/controllers/conseils");
var agent = require("./src/app/controllers/agents");
//****************************************************
var chefAgence = require("./src/app/controllers/chefAgences");
//*********
var reclamation = require("./src/app/controllers/reclamations");
var mail = require("./src/app/controllers/mails");

var User = require("./src/app/models/UserSchema");

var allUser = require("./src/app/controllers/user");
var offre = require("./src/app/controllers/offres");
var etudeProjet = require("./src/app/controllers/etudeProjet");
var autre = require("./src/app/controllers/autre");
var bienImmobilier = require("./src/app/controllers/bienImmobilier");
var rechercheAvancee = require("./src/app/controllers/rechercheAvancee");
const errorHandler = require("./src/app/_helpers/error-handler");
// create app
var app = express();

//CORS vous permet de configurer la sécurité de l'API Web. Il s'agit de permettre à d'autres domaines de faire des requêtes contre votre API Web. Par exemple, si vous aviez votre API Web sur un serveur et votre application Web sur un autre, vous pouvez configurer CORS dans votre API Web pour permettre à votre application Web d'appeler votre API Web.

app.use(cors()); //pour acceder au backend
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
const passport = require("passport");
app.use(passport.initialize());

// global error handler
app.use(errorHandler);

app.use(bodyParser.json());
app.set("secretKey", "tokentest");
app.use("/clients", client);
app.use("/agents", agent);
app.use("/chefAgences", chefAgence);

app.use("/mails", mail);
app.use("/users", allUser);
app.use("/offres", offre);
app.use("/conseils", conseil); //conseils Router as a Layer in root Router
app.use("/reclamations", reclamation);
app.use("/etudeProjets", etudeProjet);
app.use("/autres", autre);
app.use("/bienImmobiliers", bienImmobilier);
app.use("/rechercheAvancees", rechercheAvancee);
//********

// Connection URL
mongoose
  .connect("mongodb://localhost:27017/mydb", { useNewUrlParser: true })
  .then(() => console.log("MongoDB connect..."))
  .catch(err => console.log("Error:", err.message));

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
//-----
//chatbot
// app.post('/chat', (req, res) => {
//   const { message } = req.body;
//   console.log(message);
// });

app.listen(8080, function() {
  console.log("server connected on port 8080");
});
