notesData();

function notesData() {
    var newURL = 'http://localhost:3050/api/notes'
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
        })

}