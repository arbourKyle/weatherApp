
var cityInput = $("#cityInput");
var cityList = $("#cityList");

// var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

var apiKey = "b8149456ebf22679f89374a350ed5a0d";
var city;

// fetch(queryURL)

var searchCity = function (event) {
    event.preventDefault();
  
    var user = cityInput.value.trim();
  
    if (!user) {
        
        localStorage.setItem('cityName', user.value)
       
    } else {
      alert('Please enter a city');
    }
  };

  document.addEventListener("submit", searchCity);



