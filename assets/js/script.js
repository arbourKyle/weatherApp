const key = 'a36715b7289d49ee08223b849dbb2c64';
  


let cityInput = document.getElementById("userInput");
let cityHistoryList = document.getElementById("cityContainer");

//id the today forecast card
let cityEl = document.querySelector('.location');
let tempEl = document.getElementById('temp');
let uvEl = document.getElementById('uv');
let humidEl = document.getElementById('humid');
let windEl = document.getElementById('wind');
let dateEl = document.getElementById('today');

//id the 5 day forecast cards
let c1 = document.getElementById('c1');
let c2 = document.getElementById('c2');
let c3 = document.getElementById('c3');
let c4 = document.getElementById('c4');
let c5 = document.getElementById('c5');

//global vars
var lat;
var lon;
var temp;
var wind;
var humid;
var uvi;
var icon;
var icon2;
var data;
var formatName;


//click the submit button and fetch the lat and long
document.getElementById('submitButton').addEventListener('click', function (event) {
  event.preventDefault()
  formatCityNames(); //format the name given to capitalize the first letter
  // storeCityName(); //store the name given on click
  
  
  fetch('http://api.openweathermap.org/geo/1.0/direct?q='+cityInput.value+'&appid='+key)
  .then(function(response) { return response.json() }) 
  .then(function(data) {
    // console.log(data)
    
    weather(data)     //call the weather fetch on response   
  })
  .catch(function() {
  })
}); // end of click and fetch coordinates

// weather fetch
function weather(data) {  
  let lat = data[0].lat
  let lon = data[0].lon
  
  fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&current.weather.icon&units=metric&exclude=minutely&exclude=hourly&appid='+key)
  .then(function(response) { return response.json() }) 
  .then(function(data) {
    console.log(data)
    todayCard(data, name)  //calling the display weather function after data is retrieved
    forecast(data, name)              //calling forecast function
  })
  .catch(function() {
  })
} //end of weather fetch


// capitalize the first letter of a given name
function formatCityNames () {
  let name = cityInput.value.toLowerCase().split(' ');
  for (var i = 0; i < name.length; i++) {
    name[i] = name[i][0].toUpperCase() + name[i].substr(1);
  }
  name = name.join(' ');
  console.log(name)
  storeCityName(name)
} //end of formatting name func


function storeCityName(name) {
  
  var cityArr = JSON.parse(localStorage.getItem("city")) || [];
  let tempArr = name;
  cityArr.push(tempArr);
  
//the city name is set here
  localStorage.setItem('city', JSON.stringify(cityArr));

  

} //end of storing city name func


//display the name of city in a today card, a history list, and a five day card

function todayCard (data, name) {
  let icon = (data.current.weather[0].icon);
  let iconEl = document.createElement('img');
  let iconUrl =  `http://openweathermap.org/img/wn/${icon}.png`;
  // console.log(iconUrl)
  console.log(name)
  cityEl.innerText = name;
  tempEl.textContent = data.current.temp;
  windEl.textContent = data.current.wind_speed;
  humidEl.textContent = data.current.humidity;
  uvEl.textContent = data.current.uvi;
  iconEl.setAttribute('src', iconUrl);
  document.querySelector('.location').append(iconEl);
  dateEl.textContent = new Date();
}

//the history list below the search bar

/* function cityHistory(name) {
  console.log(name)
  let listItem = document.createElement('div');
  listItem.setAttribute('name', name);
  cityHistoryList.append(listItem);

} */


//the 5 day forecast

function forecast(data, name) {
  console.log(data.daily)

  c1.textContent = data.daily[1];
  c2.textContent = data.daily[2];
  c3.textContent = data.daily[3];
  c4.textContent = data.daily[4];
  c5.textContent = data.daily[5];


} 