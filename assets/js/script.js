  const key = 'a36715b7289d49ee08223b849dbb2c64';
  

  // let today = moment(DD, MMM, do)
  let cityInput = document.getElementById("userInput");
  let cityHistoryList = document.getElementById("cityContainer");
  
  let cityEl = document.getElementById('location');
  let tempEl = document.getElementById('temp');
  let uvEl = document.getElementById('uv');
  let humidEl = document.getElementById('humid');
  let windEl = document.getElementById('wind');
  let dateEl = document.getElementById('today');
  let iconEl = document.getElementById('icon');
  
  var lat;
  var lon;
  var temp;
  var wind;
  var humid;
  var uvi;
  var icon;
  var icon2;
  var data;
  var newName;

  
  document.getElementById('submitButton').addEventListener('click', function weatherToday(event) {
    event.preventDefault()
    storeCityname(); //store the name given on click
    
    
    fetch('http://api.openweathermap.org/geo/1.0/direct?q='+cityInput.value+'&appid='+key)
    .then(function(response) { return response.json() }) 
    .then(function(data) {
      console.log(data)
      
      lat = ('lat', data[0].lat)
      lon = ('lon', data[0].lon)
      weather()     //call the weather fetch on response   
    })
    .catch(function() {
    })
  }); // end of click and fetch coordinates
  
  // weather fetch
  function weather() {  
    
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&current.weather.icon&units=metric&appid='+key)
    .then(function(response) { return response.json() }) 
    .then(function(data) {
      console.log(data)
      temp = data.current.temp;
      wind = data.current.wind_speed;
      humid = data.current.humidity;
      uvi = data.current.uvi;
      icon = data.current.weather[0].icon;
      icon2 = data.current.weather[1].icon;
    })
    .catch(function() {
    })
    todayCard();    //calling the display weather function after data is retrieved
  } //end of weather fetch
  
  
// capitalize the first letter of a given name
  function formatCityNames () {
    formatName = cityInput.value.toLowerCase().split(' ');
    
    for (var i = 0; i < formatName.length; i++) {
      formatName[i] = formatName[i][0].toUpperCase() + formatName[i].substr(1);
    }
    newName = formatName.join(' ');
  } //end of formatting name func
  
  
  function storeCityname() {
    formatCityNames();
    var cityArr = JSON.parse(localStorage.getItem("city")) || [];
    let tempArr = newName;
    cityArr.push(tempArr);
    
  //the city name is set here
  localStorage.setItem('city', JSON.stringify(cityArr));
} //end of storing city name func


//display the name of city in a today card, a history list, and a five day card

function todayCard () {
  let iconUrl =  `http://openweathermap.org/img/wn/${icon}.png`;
  console.log(icon)
  
  cityEl.textContent = newName;
  tempEl.textContent = temp;
  windEl.textContent = wind;
  humidEl.textContent = humid;
  uvEl.textContent = uv;
  iconEl.setAttribute('src', iconUrl);
  document.getElementById('location').append(iconEl)
}