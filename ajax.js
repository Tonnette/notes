notesData();

function notesData() {
    var newContentDiv = $(".listNotes")

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
        // this is getting the data from api info"

        .then(function (mydata) {
            console.log(mydata);
            for (var i = 0; i < mydata.length; i++) {
                var userTitle = mydata[i].title;
                console.log(mydata[i].title);
                var userNote = mydata[i].note;



                var cardDivEl = $('<div>').addClass('card-body');
                var cardContentEl = $('<div>').addClass('card-content');
                var userTitleEl = $('<li>')
                var userNoteEl = $('<li>')
           

                userTitleEl.text("title: " + userTitle)
                userNoteEl.text("note: " + userNote)
              

                newContentDiv.append(cardDivEl)
                cardDivEl.append(cardContentEl)
                cardContentEl.append(userTitleEl)
                cardContentEl.append(userNoteEl)
               


            }
        })

}

