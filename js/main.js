var launchString = '';
var weatherFor = '';
var mission = '';

var helloSpaceX = $.ajax({
  url: "https://api.spacexdata.com/v4/launches/upcoming",
  type: "GET",
  success: spaceXSuccess,
  error: spaceXError,
});
var helloWeather = $.ajax({
  url: "https://api.weatherapi.com/v1/forecast.json?key=1955bca76eb54eec87c151904202309&days=4&q=32920",
  type: "GET",
  success: weatherSuccess,
  error: weatherError,
})

function weatherSuccess(data) {
  console.log(data);
  for(var i = 0; i < data.forecast.forecastday.length; i++) {
    var position = launchString.indexOf("T");
    var foreCast = data.forecast.forecastday[0];
    var launchDateString = launchString.substring(0,position);
    if(launchDateString === foreCast.date){
      weatherFor = foreCast.day;
    }
  }
  if(weatherFor === ''){
    var lastIndex = data.forecast.forecastday.length - 1;
    weatherFor = data.forecast.forecastday[lastIndex];
  }
    var weatherDay = weatherFor.day;

    /// grab the UI elements and display the countdown
    var wholeNumberWeather = weatherDay.maxtemp_f;
    var wholeWeather = Math.floor(wholeNumberWeather);
    var h1Sun = document.getElementById('temp').innerText = wholeWeather + '°';
    var h1Rain = document.getElementById('chance-of-rain').innerText = weatherDay.daily_chance_of_rain + '%'
}
function weatherError(error) {
  console.log(error);
}

/* SpaceX functions for the countdown */
function spaceXSuccess (data) {
  console.log(data);
  launchString = data[0].date_utc
  var countDownsec = setInterval(function () {
    var today = new Date();
    var countDown = Date.parse(launchString) - Date.parse(today);
    var seconds = Math.floor((countDown / 1000) % 60);
    var minutes = Math.floor((countDown / 1000 / 60) % 60);
    var hours = Math.floor((countDown / (1000 * 60 * 60)) % 24);
    var days = Math.floor(countDown / (1000 * 60 * 60 * 24))

    document.getElementById('days').innerText = days
    document.getElementById('hours').innerText = hours
    document.getElementById('minutes').innerText = minutes
    document.getElementById('seconds').innerText = seconds

    if(data[0].details === null) {
      mission = 'Mission Brief will be coming soon!'
      window.localStorage.setItem('mission', mission);
    } else {
      mission = data[0].details;
      window.localStorage.setItem('mission', data[0].details);
    }
  });
}

function spaceXError(error) {
  console.log(error);
}
