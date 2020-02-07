// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
const fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
app.use(express.static(path.join(__dirname, '/public')));
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/db')));

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
    console.log(newNotesString);
});



// Displays all notes in JSON api format
app.get("/api/notes", function (req, res) {

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        newNotesString = JSON.parse(data);
        // console.log("what is newNotesString" + newNotesString);
        // console.log("what is data" + data);
        return res.json(newNotesString);
    });
});


// Displays a single note, or returns false
app.get("/api/notes/:id", function (req, res) {
    var chosen = req.params.id;
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            throw err;
        }

        // console.log("wehat is chosen" + chosen);
        // console.log("whatey is reS" + res);
        // console.log({data})
        var updatedData = JSON.parse(data);

        for (var i = 0; i < updatedData.length; i++) {
            if (chosen == updatedData[i].id) {
                return res.json(updatedData[i]);
            }
        }

        return res.json(false);
    });

});

// Create New note - takes in JSON input
app.post("/api/notes", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newNote = req.body;
    // console.log("what is newNotesString " + newNotesString);
    // console.log({ newNotesString })
    let greatestID = 1
    for (var i = 0; i < newNotesString.length; i++) {
        if (Number(newNotesString[i].id) > greatestID) {
            greatestID = Number(newNotesString[i].id)
        }
    }
    var newID = greatestID + 1;
    newNote.id = String(newID)
  
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
    // console.log("api test delete" + chosen);

    fs.readFile('./db/db.json', 'utf8', (err, dataString) => {
        if (err) {
            throw err;
        }
        const data = JSON.parse(dataString)
        const newData = [];
        for (var i = 0; i < data.length; i++) {

            if (chosen != data[i].id) {
                const currentTask = data[i];
                // console.log(`Adding ${currentTask}`)
                newData.push(currentTask);
            }
        }
        // console.log(`newData ${newData}`)

        fs.writeFile("./db/db.json", JSON.stringify(newData), function (err) {
            if (err) {
                return console.log(err);
            }
        });
        return res.json(newData);
    });


});





// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

