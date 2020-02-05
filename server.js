// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
const fs = require("fs");
const util = require("util");
const stringify = require("json-stringify-safe");

// Sets up the Express App
// =============================================================
var app = express();
app.use(express.static(path.join(__dirname, '/public')));
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname,'/public')));
app.use(express.static(path.join(__dirname,'/db')));

var notes = [
    {
        routeName: 0,
        title: "Make breakfast",
        note: "cook toast, make tea",
        id: 0,
    }
];

// Basic route that sends the user first to the AJAX Page

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
        throw err;
    }
    newNotesString = JSON.parse(data);
    // console.log(newNotesString);
});



// Displays all notes in JSON api format
app.get("/api/notes", function (req, res) {
    return res.json(newNotesString);
});


// Displays a single note, or returns false
app.get("/api/notes/:character", function (req, res) {
    var chosen = req.params.character;
    console.log(chosen);

    for (var i = 0; i < notes.length; i++) {
        if (chosen === newNotesString[i].id) {
            return res.json(newNotesString[i]);
        }
    }

    return res.json(false);
});

// Create New note - takes in JSON input
app.post("/api/notes", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newNote = req.body;

    var newID = newNotesString.length + 1;

    newNote.id = newID.toString();

    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    // newNote.routeName = newNote.name.replace(/\s+/g, "").toLowerCase();

    console.log(newNote);

    newNotesString.push(newNote);
    res.json(newNote);

    var newData = JSON.stringify(newNotesString)

    fs.writeFile("./db/db.json", newData, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })
});

app.delete("/api/notes/:id", function (req, res) {
    var chosen = req.params.id;
    console.log("api test delete"+chosen);

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        // newNotesString = JSON.parse(data);
        // console.log(newNotesString);
    });

    for (var i = 0; i < newNotesString.length; i++) {
        if (chosen === newNotesString[i].id) {
            newNotesString.splice(i, 1);
            var newData = JSON.stringify(newNotesString)

            fs.writeFile("./db/db.json", newData, function (err) {
                if (err) {
                    return console.log(err);
                }
            });
            return res.json(newNotesString);
        }
    }

    return res.json(false);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

