var helloAjax = $.ajax({
  url: "https://api.spacexdata.com/v4/launches/upcoming",
  type: "GET",
  success: spaceXSuccess,
  error: spaceXError,
});

function spaceXSuccess (data) {

  console.log(data);
  var launchString = data[0].date_utc

  // var launchDate = Date.parse(launchString)
  var countDownsec = setInterval(function () {
    var today = new Date();
    var countDown = Date.parse(launchString) - Date.parse(today);
    var seconds = Math.floor((countDown / 1000) % 60);
    var minutes = Math.floor((countDown / 1000 / 60) % 60);
    var hours = Math.floor((countDown / (1000 * 60 * 60)) % 24);
    var days = Math.floor(countDown / (1000 * 60 * 60 * 24))

    /// grab the UI elements and display the countdown
    document.getElementById('days').innerText = days
    document.getElementById('hours').innerText = hours
    document.getElementById('minutes').innerText = minutes
    document.getElementById('seconds').innerText = seconds
  });
}

function spaceXError(error) {
  console.log(error);
}
