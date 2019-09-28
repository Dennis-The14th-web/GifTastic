$(document).ready(function(){
    var animals = ["dog", "cat", "bird", "frog", "goldfish", "badger", "bear", "sloth", "bat", "camel", "bee", "crocodiles", "gorillas", "lions", "tigers", "monkey", "kangaroo", "geese", "oxen", "zebra", "whales", "weasels", "swans", "squirrels"];

    // Add buttons for animal array
    function renderButtons() {
        $("#animal-buttons").empty();
        for(var i = 0; i < animals.length; i++) {
             $("#animal-buttons").append("<button class='btn btn-primary' data-animal='" + animals[i] + "'>" + animals[i] + "</button>");
            // var a = $("<button>");
            //  a.addclass("animal");
            //  a.attr("data-name", animals[i]);
            //  a.text(animals[i]);
            //  $("#animal-buttons").append(a);
        }
    }
    renderButtons();

    $(".add-animal").on("click", function(){
        event.preventDefault();
        var animal = $("#animal-input").val().trim();
        animals.push(animal);
        renderButtons();
        return;
    });

    $("button").on("click", function () {
		var animal = $(this).attr("data-animal");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            animal + "&api_key=12QiWZ7afZ51SrEggGq3YFKQZELe8Qbd&limit=10";
            
            $.ajax({
                url: queryURL,
                method: "GET"
            })
            
            .then(function (response) {
                var results = response.data;
                $("#animals").empty();
                for (var i = 0; i < results.length; i++) {
                    if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

                   var animalDiv = $("<div>");
                   var rating = results[i].rating;
                   var p = $("<p>").text("Rating: " + rating);
                   var animalImg = $("<img>");

                   animalImg.attr("src", results[i].images.fixed_height_still.url);
                   animalImg.attr("data-still", results[i].images.original_still.url);
                   animalImg.attr("data-animate", results[i].images.original.url);
                   animalImg.attr("data-state", "still");
                   animalImg.attr("class", "gif");
                   animalDiv.append(p);
                   animalDiv.append(animalImg);
                   $("#animals").append(animalDiv);
                }
             }  
        });
    });
        
      
        function changeState(){
            var state = $(this).attr("data-state");
            var animateImage = $(this).attr("data-animate");
            var stillImage = $(this).attr("data-still");
    
            if (state === "still") {
                $(this).attr("src", animateImage);
                $(this).attr("data-state", "animate");
            }
    
            else if (state === "animate") {
                $(this).attr("src", stillImage);
                $(this).attr("data-state", "still");
            }
        }
    
        $(document).on("click", ".gif", changeState);
});