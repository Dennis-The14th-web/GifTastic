//Initial array of movies	
$(document).ready(function() {

    var animals = ["dog", "cat", "bird", "frog", "goldfish", "badger", "bear", "sloth", "bat", "camel", "bee", "crocodile", "gorilla", "lion", "tiger", "monkey", "kangaroo", "geese", "oxen", "zebra", "whale", "weasel", "swan", "squirrel"];	
  
    //  create topics array buttons
    function renderButtons(){
      $('#animal-buttons').empty();
     
  
      for (var i = 0; i < animals.length; i++) {
              //create all buttons
              var a = $('<button class= "btn btn-primary btn m-1">');
              a.addClass('animal');
              a.attr('data-name', animals[i]);
              a.text(animals[i]);
              $('#animal-buttons').append(a);
            }
          }    
          renderButtons();
  
  //on button click
  $(document).on('click', '.animal', function() {
  
      //new variable will log the text data from each button
      var animal = $(this).html(); 
      // console.log(animal);
  
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=12QiWZ7afZ51SrEggGq3YFKQZELe8Qbd&limit=10";
      // console.log(queryURL);
  
      // Creating an AJAX call for the specific animal button being clicked
      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {
  
        var results = response.data;
          //console.log(results);
          //empties the div before adding more gifs
         $('#animals').empty();
          for ( var q = 0; q < results.length; q++) {
                      var imageDiv = $('<div>');
                      var imageView = results[q].images.fixed_height.url;
                      var still = results[q].images.fixed_height_still.url;
                          // console.log(imageView);  
  
          var gifImage = $('<img>').attr("src", still).attr('data-animate', imageView).attr('data-still', still);
                      gifImage.attr('data-state', 'still');
                      $('#animals').prepend(gifImage);
                      gifImage.on('click', playGif);
  
          // Pulling ratings for each movie
          var rating = results[q].rating;
              // console.log(rating);
          var displayRated= $('<p>').text("Rating: " + rating);
          $('#animals').prepend(displayRated);
    } 
  
  }); 
  
          //function to stop and animate gifs
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
  
            //adding new button to array
          $(document).on('click', '.add-animal', function(){
              if ($('#animal-input').val().trim() == ''){
                alert('Type in the name of an animal, and click on the SUBMIT button');
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