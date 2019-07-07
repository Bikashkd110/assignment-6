
$(document).ready(function(){

  var countries =[
      "USA", "China","Mexico","Egypt"
  ];
  

    function populateButtons(arrayToUse, classToAdd, areaToAddTo){
        $(areaToAddTo).empty();

        for (var i=0; i < arrayToUse.length; i++) {
            var a = $("<button>");
            a.addClass(classToAdd);
            a.attr("data-type",arrayToUse[i]);
            a.text(arrayToUse[i]);
            $(areaToAddTo).append(a);
        }
    }
 



  $(document).on("click", ".country-button", function(){
      $("#images").empty();
      
      $(".country-button").removeClass("active");
      $(this).addClass("active");

      var type = $(this).attr("data-type");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=zLFu3I8dKsbA0gTIqFZ0O904KvlXcJC1";
      
      //making a AJAX call

      $.ajax({
          url:queryURL,
          method: "GET"
      })

      .then(function(response){
          var results = response.data;

          for (var i = 0; i < results.length; i++) {
              var countryDiv = $("<div class=\"country-item\">");

              var rating = results[i].rating;

              var p = $("<p>").text("Rating: " + rating);

              var animated = results[i].images.fixed_height.url;
              var still = results[i].images.fixed_height_still.url;

              var countryImage = $("<img>");
              countryImage.attr("src", still);
              countryImage.attr("data-still", still);
              countryImage.attr("data-animate", animated);
              countryImage.attr("data-state", "still");
              countryImage.addClass("country-image");

              countryDiv.append(p);
              countryDiv.append(countryImage);

              $("#images").append(countryDiv);

          }
      });
  });

  //pausing and playing the giff

  $(document).on("click", ".country-image", function(){
      var state = $(this).attr("data-state");

      if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        }
        else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
  });

  $("#add-country").on("click", function(event) {
      event.preventDefault();
      var newCountry = $("input").eq(0).val();

      if (newCountry.length > 2) {
          countries.push(newCountry);

      }
      
      populateButtons(countries, "country-button", "#country-buttons");

  });


  populateButtons(countries, "country-button", "#country-buttons");


});