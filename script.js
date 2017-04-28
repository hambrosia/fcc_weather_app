var userLat = "";
var userLong = "";

console.log("1. No scripts have run yet.")

//var x = document.getElementById("demo");



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

          $("#city").html("<li>City: " + weatherData.query.results.channel.location.city + "</li>" +
        "<li>Region: " + weatherData.query.results.channel.location.region + "</li>" +
        "<li>Country: " + weatherData.query.results.channel.location.country + "</li>");

        $("#current-weather").html("<li>High: " + weatherData.query.results.channel.item.forecast[0].high + " C</li>" +
      "<li>Low: " + weatherData.query.results.channel.item.forecast[0].low + " C</li>" +
      "<li>" + weatherData.query.results.channel.item.forecast[0].text + "</li>");


            $("#sun-wind").html("<li>Sunrise: " + weatherData.query.results.channel.astronomy.sunrise + "</li>" +
            "<li>Sunset: " + weatherData.query.results.channel.astronomy.sunset + "</li>" +
            "<li>Wind: " + weatherData.query.results.channel.wind.speed + " km/h</li>");





        }
      });
    });
  }



getLocation();
