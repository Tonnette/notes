// const fs = require('fs');

$(".saveIt").on("click", function (event) {
    event.preventDefault();
    var newNote = {
        title: $("#note-title").val().trim(),
        note: $("#note-input").val().trim(),

    };

    $.post("http://localhost:3000/api/notes", newNote)
        .then(function (data) {
            console.log("notes.html", data);
            alert("Adding note...");
        });
});

notesData();

function notesData() {
    var newContentDiv = $(".listNotes")
    var newBlock = $(".block")

    var newURL = 'http://localhost:3000/api/notes'
    $.ajax({
        url: newURL,
        method: "GET",
        dataType: "json",
        statusCode: {
            404: function () {
                alert("not found");
                return;
            }
        }

    })
        // this is getting the data from api info for side list"
        .then(function (mydata) {
            console.log(mydata);
            for (var i = 0; i < mydata.length; i++) {
                var userTitle = mydata[i].title;
                console.log(mydata[i].title);
                var userNote = mydata[i].note;

                var divEl = $('<div>').addClass('div-body');
                // var divContentEl = $('<div>').addClass('div-content');
                // var userTitleEl = $('<strong>').addClass('list-group-item d-flex justify-content-between align-items-center')
                // var userNoteEl = $('<li>')

                // userTitleEl.text(userTitle)
                // userNoteEl.text(userNote)

                // newContentDiv.append(divEl)
                // divEl.append(divContentEl)
                // divContentEl.append(userTitleEl)
                // divContentEl.append(userNoteEl)

                // this is getting the data from api info for block"
                var newSaveButton = $('<a class="btn btn-info btn-lg saveIt" role="button">save</a>')
                var noteTextEmpty = $('<textarea>').addClass("note-textarea");
                var newDeleteButton = $('<a class="btn btn-danger btn-lg deleteOne" role="button">delete</a>')
                var mainTitleEl = $('<h2>').addClass('note-title');
                var noteTextEl = $('<textarea>').addClass("note-textarea");


                mainTitleEl.text(userTitle)
                noteTextEl.text(userNote)
                newBlock.append(divEl)
                divEl.append(mainTitleEl)
                divEl.append(noteTextEl)
                divEl.append(newSaveButton)
                divEl.append(newDeleteButton)

            }
        })

}



