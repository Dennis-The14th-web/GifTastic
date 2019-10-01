//Create an array of Animals=Topics	
$(document).ready(function() {

    var animals = ["dog", "cat", "frog", "badger", "sloth", "bat", "bee", "crocodile", "gorilla", "lion", "tiger", "monkey", "kangaroo", "geese", "dolphin", "zebra", "whale", "weasel", "swan", "squirrel"];	
  
    //  create animal array buttons
    function renderButtons(){
      $('#animal-buttons').empty();
     
  
      for (var i = 0; i < animals.length; i++) {
              //create all buttons and style apperance in bootstrap class
              var a = $('<button class= "btn btn-primary btn m-1">');
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
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=12QiWZ7afZ51SrEggGq3YFKQZELe8Qbd&limit=10";
      // console.log(queryURL);
  
      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {
  
        var results = response.data;
          //console.log(results);

          //This will empty the div before adding more gifs
         $('#animals').empty();

        //Create individual gif with it's ratings to display in div  
         var resultsContainerSection = $("<section class='flex-container'>");

          for ( var q = 0; q < results.length; q++) {
                      var singleImageDiv = $('<div class="result-container">'); 
                          var rating = results[q].rating;
                          var displayRated = $('<p>').text("Rating: " + rating);
  
        //Create variable that holds the animation display of gifs 
        var playImg = $("<img class='result'>");
        playImg.attr("src", results[q].images.fixed_height_still.url);
        playImg.attr("data-state", "still");
        playImg.attr("data-still", results[q].images.fixed_height_still.url);
        playImg.attr("data-animate", results[q].images.fixed_height.url);
  
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
          $(document).on('click', '.add-animal', function(){
              if ($('#animal-input').val().trim() == ''){
                alert('Type in the name of an animal, and click on the SUBMIT button to see gif display');
             }
             else {
              var animalPlace = $('#animal-input').val().trim();
              animals.push(animalPlace);
              $('#animal-input').val("");
              renderButtons();
            //   return false;
              }

          });
    });