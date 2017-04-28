var userLat = "";
var userLong = "";

var high = 0;
var low = 0;

var highF = 0;
var lowF = 0;

var lowFshort = "";
var highFshort = "";

var description = "";

var jumboColor = "-webkit-gradient(linear, left top, left bottom, from(#FF8C00), to(#66CDAA))"
//will need to change indexes 4 and 5 to get proper colors in

console.log("1. No scripts have run yet.")


function weatherAdvice(){

  console.log(high);
  console.log(low);

  $(function(){
    $("#jumbo-high").html("The high today is " + high + "&#176;C.");
    $("#jumbo-low").html("The low today is " + low + "&#176;C." );


    $("#jumbo-high").hover(function(){
      $(this).html("The high today is " + highFshort + "&#176;F.");
    }, function(){
      $(this).html("The high today is " + high + "&#176;C.");
    });

    $("#jumbo-low").hover(function(){
      $(this).html("The low today is " + lowFshort + "&#176;F.");
    }, function(){
      $(this).html("The low today is " + low + "&#176;C.");
    });

    $("#jumbo-description").html("There may be " + description + "." +"<br>"
    + "Hover over temps for Farenheit."
  );


  $(".jumbotron").addClass("temp-background");
  $(".temp-background").css({
    background: jumboColor
  });
});

}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(savePosition);
    console.log("Location coordinates are being retrieved.")


  } else {
    alert("Could not retrieve location.")
  }
}

function savePosition(position) {
  userLat = position.coords.latitude;
  userLong = position.coords.longitude;

  console.log(position.coords.latitude);
  console.log(position.coords.longitude);

  console.log(userLat);
  console.log(userLong);

  userURL = "https://simple-weather.p.mashape.com/weatherdata?lat=" + userLat + "&" + "lng="+ userLong;
  console.log(userURL);

  getWeather();


}

var getWeather = function(){
  console.log(userURL);

  $(function(){
    $.ajax({
      headers: {
        "X-Mashape-Key": "Ghh037dpl4mshCyMzJbzsMaanrO7p1X4htujsnv9v72XCzxObC",
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      async: false,
      type: "GET",
      url: userURL,
      success: function(weatherData){

        console.log("AJAX is trying to get weather.")
        // prep data for handling as object
        weatherData = JSON.parse(weatherData);
        /* just a quick check to make sure the data is coming through */
        console.log("success", weatherData);

        // testing some of the indexes for the info we want to use for website
        console.log(weatherData.query.results.channel.astronomy);
        console.log(weatherData.query.results.channel.item.condition);
        console.log(weatherData.query.results.channel.location);
        console.log(weatherData.query.results.channel.wind);


        $("#hr-1").removeClass("hidden");
        $("#hr-2").removeClass("hidden");


        high = Number(weatherData.query.results.channel.item.forecast[0].high);
        low = Number(weatherData.query.results.channel.item.forecast[0].low );

        highF = high*(9/5)+32;
        lowF = low*(9/5)+32;

        lowFshort = lowF.toString().substr(0,2);
        highFshort = highF.toString().substr(0,2);


        description = weatherData.query.results.channel.item.forecast[0].text.toLowerCase();

        $("#location").html("<h2>Your Location</h2>");
        $("#city").html("<li>City: " + weatherData.query.results.channel.location.city + "</li>" +
        "<li>Region: " + weatherData.query.results.channel.location.region + "</li>" +
        "<li>Country: " + weatherData.query.results.channel.location.country + "</li>");

        $("#forecast").html("<h2>Tomorrow's Forecast</h2>");
        $("#current-weather").html("<li>High: " + high + " &#176;C" + " / " + highFshort + " &#176;F</li>" +
        "<li>Low: " + low + " &#176;C" + " / " + lowFshort + "&#176;F</li>" +
        "<li>" + weatherData.query.results.channel.item.forecast[1].text + "</li>");

        $("#astro").html("<h2>Sun and Wind</h2>");
        $("#sun-wind").html("<li>Sunrise: " + weatherData.query.results.channel.astronomy.sunrise + "</li>" +
        "<li>Sunset: " + weatherData.query.results.channel.astronomy.sunset + "</li>" +
        "<li>Wind: " + weatherData.query.results.channel.wind.speed + " km/h</li>");



        weatherAdvice();

      }
    });
  });
}



getLocation();
