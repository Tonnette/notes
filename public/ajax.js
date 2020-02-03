// var fs = require('fs');

// $(".saveIt").on("click", function (event) {
//     $("#save-btn").on("click", function (event) {
//     event.preventDefault();
//     var newNote = {
//         title: $("#note-title").val().trim(),
//         note: $("#note-input").val().trim(),

//     }

// });




//     $.post("http://localhost:3000/api/notes", newNote)
//         .then(function (data) {
//             console.log("notes.html", data);
//             alert("Adding note...");
//         });
// });

// notesData();

// function notesData() {
//     var newContentDiv = $(".listNotes")
//     var newBlock = $(".block")

//     var newURL = 'http://localhost:3000/api/notes'
//     $.ajax({
//         url: newURL,
//         method: "GET",
//         dataType: "json",
//         statusCode: {
//             404: function () {
//                 alert("not found");
//                 return;
//             }
//         }

//     })
        // this is getting the data from api info for side list"
    //     .then(function (mydata) {
    //         console.log(mydata);
    //         for (var i = 0; i < mydata.length; i++) {
    //             var userTitle = mydata[i].title;
    //             console.log(mydata[i].title);
    //             var userNote = mydata[i].note;

    //             var divEl = $('<div>').addClass('div-body');


    //             // this is getting the data from api info for block"
    //             var newSaveButton = $('<a class="btn btn-info btn-lg saveIt" role="button">save</a>')
    //             var noteTextEmpty = $('<textarea>').addClass("note-textarea");
    //             var newDeleteButton = $('<a class="btn btn-danger btn-lg deleteOne" role="button">delete</a>')
    //             var mainTitleEl = $('<h2>').addClass('note-title');
    //             var noteTextEl = $('<textarea>').addClass("note-textarea");


    //             mainTitleEl.text(userTitle)
    //             noteTextEl.text(userNote)
    //             newBlock.append(divEl)
    //             divEl.append(mainTitleEl)
    //             divEl.append(noteTextEl)
    //             divEl.append(newSaveButton)
    //             divEl.append(newDeleteButton)

    //         }
    //     })
    // }

    // fs is a Node standard library package for reading and writing files

//     fs.readFile("../db/data/db.json", "utf8", function (error, jsonString) {

//         if (error) {
//             return console.log(error);
//         }

//         console.log("file data: ", jsonString);

//     });

//     const jsonStringData = JSON.stringify(mydata)

//     fs.appendFile('../db/data/db.json', jsonStringData, err => {
//         if (err) {
//             console.log('Error writing file', err)
//         } else {
//             console.log('Successfully wrote file')
//         }
//     })

// }



