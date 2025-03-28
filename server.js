// Loads the express module
const express = require("express");
const hbs = require("hbs");

const bodyParser = require("body-parser");

const path = require("path");

//Creates our express server
const app = express();
const port = 3000;

//Serves static files (we need it to import a css file)
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "hbs");
app.use(bodyParser.urlencoded({ extended: true }));

//Sets a basic route

// Render the initial page with the number input form
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/happy", (req, res) => {
  res.render("happy");
});

app.post("/happy", (req, res) => {
  let gender = req.body.gender;
  let name = req.body.name;
  const output = []; //array
  let pronouns = "she's"; //initial pronoun
  const people = [];
  const message = [];

  console.log(req.body);

  if (name == "" || gender == "") {
    output.push("Error, please fill out your details!");
  } //check if name and gender have values

  if (gender == "Male") {
    pronouns = "he's"; //change initial pronoun if gender is male
  }

  const lyrics = [
    "Happy", "birthday", "to", "you!", 
    "Happy", "birthday", "to", "you!",
    "Happy", "birthday", "dear", `${name},`,
    "Happy", "birthday", "to", "you!",
    `For ${pronouns} a jolly good fellow, 
    For ${pronouns} a jolly good fellow, 
    For ${pronouns} a jolly good fellow, 
    "That nobody can deny!"`
  ]; //last 4 lines are merged for a cleaner output

  for (let i = 1; req.body[`name${i}`]; i++){
    if (req.body[`checkbox${i}`] == "on"){ 
      people.push(req.body[`name${i}`]); //if checkbox == "on" it includes it in the people singing
    }
  }

  console.log(people);

  if (people.length > 0){
    for (let z = 0; z < lyrics.length; z++) {
      let person = people[z % people.length]; //so the names are looped properly 
      output.push(`${person}: ${lyrics[z]}`); //name matching with corresponding lyric
    }
  }
    
  console.log(output);
  
  res.render("happy", {finalOutput: output.join('\n')});

});

// Create express route binder for draw.hbs and get the data from the url as parameters
// that came from index.hbs



//Makes the app listen to port 3000
app.listen(port, () => console.log(`App listening to port ${port}`));
