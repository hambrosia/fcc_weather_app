var userLat = "";
var userLong = "";

var high = 0;
var low = 0;

var highF = 0;
var lowF = 0;

var lowFshort = "";
var highFshort = "";

var iconURL = "";
var description = "";

var weatherData;

var jumboColor = "-webkit-gradient(linear, left top, left bottom, from(#FF8C00), to(#66CDAA))"
//will need to change indexes 4 and 5 to get proper colors in


function weatherDisplay(){


  $(function(){

    //first get the variables setup for output

    // save high and low temps to variables
    console.log("logging WeatherData from WeatherDisplay", weatherData);
    high = Number(weatherData.query.results.channel.item.forecast[0].high);
    low = Number(weatherData.query.results.channel.item.forecast[0].low );

    //create variables for farenheit conversions
    highF = high*(9/5)+32;
    lowF = low*(9/5)+32;

    //chop off the decimals on farenheit temps
    lowFshort = lowF.toString().substr(0,2);
    highFshort = highF.toString().substr(0,2);

    //get the string that contains the icon url
    var longURL = weatherData.query.results.channel.item.description;

    // remove extraneous text from icon url
    var i =18;
    while(longURL[i] !== ">" ){
      iconURL += longURL[i];
      i++;
    }
    // some additional cleaning to remove unneeded text from url
    iconURL = iconURL.substring(0,iconURL.length-1);

    // log it to check the url to make sure it looks good
    console.log(iconURL);

    //start output to screen

    //make units button appear
    $("#units-button").removeClass("hidden");

    //update jumbotron
    $("#jumbo-high").html("The high today is " + high + "&#176;C.");
    $("#jumbo-low").html("The low today is " + low + "&#176;C." );

    //add an icon
    $("#jumbo-description").html("<img src =" + iconURL + ">" + "<br>");

    //make units button appear with weather
    $("#units-button-f").removeClass("hidden");

    //toggle to farenheit display
    $("#units-button-f").click(function(){
      $("#jumbo-high").html("The high today is " + highFshort + "&#176;F.").hide().fadeIn(1500);
      $("#jumbo-low").html("The low today is " + lowFshort + "&#176;F.").hide().fadeIn(1500);
      $(".button").toggle();
    });
    //toggle to celcius display
    $("#units-button-c").click(function(){
      $("#jumbo-high").html("The high today is " + high + "&#176;C.").hide().fadeIn(1500);
      $("#jumbo-low").html("The low today is " + low + "&#176;C.").hide().fadeIn(1500);
      $(".button").toggle();
    });

    //change background color to (soon) match weather
    $(".jumbotron").addClass("temp-background");
    $(".temp-background").css({
      background: jumboColor
    });

    // make horizontal rules reappear
    $("#hr-1").removeClass("hidden");
    $("#hr-2").removeClass("hidden");

    // fill in info into Location Column
    $("#location").html("<h2>Your Location</h2>");
    $("#city").html("<li>City: " + weatherData.query.results.channel.location.city + "</li>" +
    "<li>Region: " + weatherData.query.results.channel.location.region + "</li>" +
    "<li>Country: " + weatherData.query.results.channel.location.country + "</li>");

    //fill in info into Forecast Column
    $("#forecast").html("<h2>Tomorrow's Forecast</h2>");
    $("#current-weather").html("<li>High: " + high + " &#176;C" + " / " + highFshort + " &#176;F</li>" +
    "<li>Low: " + low + " &#176;C" + " / " + lowFshort + "&#176;F</li>" +
    "<li>" + weatherData.query.results.channel.item.forecast[1].text + "</li>");

    //fill in info into Sun and Wind Column
    $("#astro").html("<h2>Sun and Wind</h2>");
    $("#sun-wind").html("<li>Sunrise: " + weatherData.query.results.channel.astronomy.sunrise + "</li>" +
    "<li>Sunset: " + weatherData.query.results.channel.astronomy.sunset + "</li>" +
    "<li>Wind: " + weatherData.query.results.channel.wind.speed + " km/h</li>");

  });
}


function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(savePosition);

  } else {
    alert("Could not retrieve location.")
  }
}


function savePosition(position) {

  userLat = position.coords.latitude;
  userLong = position.coords.longitude;

  userURL = "https://simple-weather.p.mashape.com/weatherdata?lat=" + userLat + "&" + "lng="+ userLong;

  //having issues with asynchronous / order of functions
  // if getWeather and weatherDisplay don't run here, they won't have the URL which is produced from the location
  getWeather();
  weatherDisplay();
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
      success: function(weatherInfo){

        console.log("AJAX is trying to get weather.")
        // prep data for handling as object
        weatherData = JSON.parse(weatherInfo);
        console.log("ajax got the weather", weatherData);

      }
    });
  });
}

getLocation();
