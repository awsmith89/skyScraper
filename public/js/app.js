$.getJSON("/articles", (data) => {

    data.forEach((() => {
        $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].headline + "<br />" + data[i].link + "</p>")
     }))
 })

$.getJSON("/articles", function(data) {

    for (var i = 0; i < data.length; i++) {
        let button = $("<button>")
      $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].headline + "<br />" + data[i].link + "<button 'class=button-success'> Save </button>" + "</p>");

    }
  });
  