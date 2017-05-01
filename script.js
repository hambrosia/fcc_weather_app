

function weatherDisplay(){


  $(function(){

    var jumboColor = "-webkit-gradient(linear, left bottom, left top, ";

    var high = 0;
    var low = 0;

    var currentTemp = 0;
    var currentF = 0;

    var highF = 0;
    var lowF = 0;

    var lowFshort = "";
    var highFshort = "";

    var iconURL = "";
    var description = "";

    //first get the variables setup for output

    // save high and low temps to variables
    high = Number(weatherData.query.results.channel.item.forecast[0].high);
    low = Number(weatherData.query.results.channel.item.forecast[0].low );
    currentTemp = Number(weatherData.query.results.channel.item.condition.temp);


    //create variables for farenheit conversions
    highF = high*(9/5)+32;
    lowF = low*(9/5)+32;
    currentF = currentTemp*(9/5)+32;

    //chop off the decimals on farenheit temps
    lowFshort = lowF.toString().substr(0,2);
    highFshort = highF.toString().substr(0,2);
    currentF = currentF.toString().substr(0,2);


    //prep css string for background color based on temps
//should look like this when complete
// var jumboColor = "-webkit-gradient(linear, left top, left bottom, from(#FF8C00), to(#66CDAA))"


//set first part of jumbotron background gradient based on low temp
    if(low <= 0){
      jumboColor += "from(#B0C4DE), ";
    }
    if(low >= 0 && low < 5){
      jumboColor += "from(#B0E0E6), ";
    }
    if(low >= 5 && low < 10){
      jumboColor += "from(#87CEFA), ";
    }
    if(low >=  10 && low < 15){
      jumboColor += "from(#AFEEEE), ";
    }
    if(low >=  15 && low < 20){
      jumboColor += "from(#66CDAA), ";
    }
    if(low >=  20 && low < 25){
      jumboColor += "from(#8FBC8F), ";
    }
    if(low >=  25 && low < 30){
      jumboColor += "from(#FF8C00), ";
    }
    if(low >=  30 && low < 35){
      jumboColor += "from(#F4A460), ";
    }
    if(low >=  35){
      jumboColor += "from(#DC143C), ";
    }

//change css for high color
if(high <= 0){
    jumboColor += "to(#B0C4DE))";
  }
  if(high >= 0 && high < 5){
    jumboColor += "to(#B0E0E6))";
  }
  if(high >= 5 && high < 10){
    jumboColor += "to(#87CEFA))";
  }
  if(high >=  10 && high < 15){
    jumboColor += "to(#AFEEEE))";
  }
  if(high >=  15 && high < 20){
    jumboColor += "to(#66CDAA))";
  }
  if(high >=  20 && high < 25){
    jumboColor += "to(#8FBC8F))";
  }
  if(high >=  25 && high < 30){
    jumboColor += "to(#FF8C00))";
  }
  if(high >=  30 && high < 35){
    jumboColor += "to(#F4A460))";
  }
  if(high >=  35){
    jumboColor += "to(#DC143C))";
  }

    //get the string that contains the icon url
    var longURL = weatherData.query.results.channel.item.description;

    // remove extraneous text from icon url
    var i =18;
    while( (longURL[i] !== ">") && (i < 100) ){
      iconURL += longURL[i];
      i++;
    }
    // some additional cleaning to remove unneeded text from url
    iconURL = iconURL.substring(0,iconURL.length-1);


    //start output to screen

    //update jumbotron
    $("#jumbo-high").html("The high today is " + high + "&#176;C.");
    $("#jumbo-low").html("The low today is " + low + "&#176;C." );

    //add icon and current weather conditions
    $("#jumbo-description").html("<img src =" + iconURL + ">" + "<br>" + "<h2>" + weatherData.query.results.channel.item.forecast[0].text + "</h2>" + currentTemp + "&#176;C / " + currentF + "&#176;F."
    );

    //make units button appear with weather
    $("#units-button-f").removeClass("hidden");

    //toggle to farenheit display
    $("#units-button-f").click(function(){
      $("#jumbo-high").html("The high today is " + highFshort + "&#176;F.").hide().fadeIn(1500);
      $("#jumbo-low").html("The low today is " + lowFshort + "&#176;F.").hide().fadeIn(1500);
      $("#units-button-f").toggle();
      $("#units-button-c").toggle();
    });

    //toggle to celcius display
    $("#units-button-c").click(function(){
      $("#jumbo-high").html("The high today is " + high + "&#176;C.").hide().fadeIn(1500);
      $("#jumbo-low").html("The low today is " + low + "&#176;C.").hide().fadeIn(1500);
      $("#units-button-f").toggle();
      $("#units-button-c").toggle();
    });

    //change background color to match weather
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
    $("#tomorrow-weather").html("<li>High: " + high + " &#176;C" + " / " + highFshort + " &#176;F</li>" +
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

  var userLat = position.coords.latitude;
  var userLong = position.coords.longitude;

  userURL = "https://simple-weather.p.mashape.com/weatherdata?lat=" + userLat + "&" + "lng="+ userLong;
  console.log("Logged from savePosition" + userURL);

  //having issues with asynchronous / order of functions
  // if getWeather and weatherDisplay don't run here, they won't have the URL which is produced from the location
  // maybe this is accidentally working as a callback?

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
      type: "GET",
      url: userURL,
      success: function(weatherInfo){

        console.log("AJAX is trying to get weather.")
        // prep data for handling as object
        weatherData = JSON.parse(weatherInfo);
        console.log("ajax got the weather", weatherData);

        weatherDisplay();

      }
    });
  });
}

getLocation();
