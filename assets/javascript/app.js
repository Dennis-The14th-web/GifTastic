var APIKEY = '12QiWZ7afZ51SrEggGq3YFKQZELe8Qbd';


//Create an array of Animals=Topics	
$(document).ready(function() {
  

  var animals = ["dog", "goat", "michael jordan", "kobe bryant", "mike tyson", "will smith", "mustang"];	

  //  create animal array buttons
  function renderButtons(){
    $('#animal-buttons').empty();
   

    for (var i = 0; i < animals.length; i++) {
            //create all buttons and style apperance in bootstrap class
            var a = $('<button class= "btn-success btn m-1">');
            a.addClass('animal');
            a.attr('data-name', animals[i]);
            a.text(animals[i]);
            $('#animal-buttons').append(a);
          }
        }    
        renderButtons();

//create an event when button is clicked 
$(document).on('click', '.animal', function() {

    //new variable will log the text data from each button
    var animal = $(this).html(); 
    // console.log(animal);

   // Create an AJAX call for the specific animal button being clicked
   
    // var api = "https://api.giphy.com/v1/gifs/search?",
    // var apiKey = "&api_key=12QiWZ7afZ51SrEggGq3YFKQZELe8Qbd",
    // var query = "&q=animal&limit=10"

    var queryURL = `https://api.giphy.com/v1/gifs/search?q=` + animal + `&api_key=${APIKEY}&limit=3`;
    // console.log(queryURL);
    
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {

      var results = response.data;
        // console.log(results);

      //   //This will empty the div before adding more gifs
      //  $('#animals').empty();

      //Create individual gif with it's ratings to display in div  
       var resultsContainerSection = $("<section class='flex-container'>");

        for ( var i = 0; i < results.length; i++) {
                    var singleImageDiv = $('<div class="result-container">'); 
                        var rating = results[i].rating;
                        var displayRated = $('<p>').text("Rating: " + rating);

      //Create variable that holds the animation display of gifs 
      var playImg = $("<img class='result'>");
      playImg.attr("src", results[i].images.fixed_width_still.url);
      playImg.attr("data-state", "still");
      playImg.attr("data-still", results[i].images.fixed_width_still.url);
      playImg.attr("data-animate", results[i].images.fixed_width.url);

        //Add ratings before each gif
      singleImageDiv.prepend(playImg); 
      singleImageDiv.prepend(displayRated); 
            // console.log(rating);
       resultsContainerSection.prepend(singleImageDiv);
      $("#animals").prepend(resultsContainerSection);
      playImg.on('click', playGif);
  } 

}); 

        //Create a function to stop and animate gifs
        function playGif() { 
                    var state = $(this).attr('data-state');
                    // console.log(state);
                 if (state == 'still'){
                     $(this).attr('src', $(this).data('animate'));
                      $(this).attr('data-state', 'animate');
                 } else{
                     $(this).attr('src', $(this).data('still'));
                     $(this).attr('data-state', 'still');
                    }

                }
      }); 
      

          //Create function to add new button to array
        $('#add-animal-button').on('click', function(){
            if ($('#search-input').val().trim() == ''){
              alert('Type in the name of an animal, and click on the ADD button to see gif display');
           }
           else {
            var animalPlace = $('#search-input').val().trim();
            animals.push(animalPlace);
            $('#search-input').val('');
            renderButtons();
           return false;
            }

        });
  });


 