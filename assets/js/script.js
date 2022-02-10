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
let iconEl = document.getElementById('iconEl');


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


var today  = new Date();
dateObj = today.toLocaleDateString("en-US");
// console.log(dateEl)

let nextDay = moment().add(24, 'hours').format('M, DD, YYYY ');
let day2 = moment().add(2, 'days');
let day3 = moment().add(3, 'days');
let day4 = moment().add(4, 'days');
let day5 = moment().add(5, 'days');


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
    todayCard(data, formatName)  //calling the display weather function after data is retrieved
    forecast(data, formatName)              //calling forecast function
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
  formatName = name.join(' ');
  console.log(formatName)
  storeCityName(formatName)
} //end of formatting name func


function storeCityName(name) {
  
  var cityArr = JSON.parse(localStorage.getItem("city")) || [];
  let tempArr = name;
  cityArr.push(tempArr);
  
//the city name is set here
  localStorage.setItem('city', JSON.stringify(cityArr));

  cityHistory(formatName);      //calling the list append function

} //end of storing city name func


//display the name of city in a today card, a history list, and a five day card

function todayCard (data, formatName) {
  
  // console.log(iconUrl)
  // console.log(formatName)
  cityEl.innerText = formatName;
  tempEl.textContent = data.current.temp;
  windEl.textContent = data.current.wind_speed;
  humidEl.textContent = data.current.humidity;
  uvEl.textContent = data.current.uvi;
  
  let icon = (data.current.weather[0].icon);
  let iconUrl =  `http://openweathermap.org/img/wn/${icon}.png`;
  iconEl.setAttribute('src', iconUrl);
  // document.querySelector('#today').append(iconEl);
  dateEl.textContent = dateObj;
}

//the history list below the search bar

function cityHistory(formatName) {
  console.log(formatName)
  let listItem = document.createElement('div').textContent = formatName;
  
  cityHistoryList.append(listItem);

}


//the 5 day forecast

function forecast(data, formatName) {
  console.log(data.daily)
  // console.log(formatName)
  let nameObj = document.querySelector('.location');
  formatName = nameObj;
  

//day 1
/* let iconEl1 = document.querySelector('#icon1').data.daily[1].weather.icon;
let iconUrl1 =  `http://openweathermap.org/img/wn/${iconEl1}.png`;
iconEl1.setAttribute('src', iconUrl1); */
let timeEl1 = document.querySelector('#time1');
let tempEl1 = document.querySelector('#temp1');
let windEl1 = document.querySelector('#wind1');
let humidEl1 = document.querySelector('#humid1');



  timeEl1.textContent = nextDay;
  tempEl1.textContent = data.daily[1].temp.day;
  windEl1.textContent = data.daily[1].wind_speed;
  humidEl1.textContent = data.daily[1].humidity;



//day2

let timeEl2 = document.querySelector('#time2');
let iconEl2 = document.querySelector('#icon2');
let tempEl2 = document.querySelector('#temp2');
let windEl2 = document.querySelector('#wind2');
let humidEl2 = document.querySelector('#humid2');

  timeEl2.textContent = day2;
  iconEl2.textContent = data.daily[2].weather.icon;
  tempEl2.textContent = data.daily[2].temp.day;
  windEl2.textContent = data.daily[2].wind_speed;
  humidEl2.textContent = data.daily[2].humidity;

//day3

let timeEl3 = document.querySelector('#time3');
let iconEl3 = document.querySelector('#icon3');
let tempEl3 = document.querySelector('#temp3');
let windEl3 = document.querySelector('#wind3');
let humidEl3 = document.querySelector('#humid3');

  timeEl3.textContent = day3;
  iconEl3.textContent = data.daily[3].weather.icon;
  tempEl3.textContent = data.daily[3].temp.day;
  windEl3.textContent = data.daily[3].wind_speed;
  humidEl3.textContent = data.daily[3].humidity;

//day4

let timeEl4 = document.querySelector('#time4');
let iconEl4 = document.querySelector('#icon4');
let tempEl4 = document.querySelector('#temp4');
let windEl4 = document.querySelector('#wind4');
let humidEl4 = document.querySelector('#humid4');

  timeEl4.textContent = day4;
  iconEl4.textContent = data.daily[4].weather.icon;
  tempEl4.textContent = data.daily[4].temp.day;
  windEl4.textContent = data.daily[4].wind_speed;
  humidEl4.textContent = data.daily[4].humidity;

//day5

let timeEl5 = document.querySelector('#time5');
let iconEl5 = document.querySelector('#icon5');
let tempEl5 = document.querySelector('#temp5');
let windEl5 = document.querySelector('#wind5');
let humidEl5 = document.querySelector('#humid5');

  timeEl5.textContent = day5;
  iconEl5.textContent = data.daily[5].weather.icon;
  tempEl5.textContent = data.daily[5].temp.day;
  windEl5.textContent = data.daily[5].wind_speed;
  humidEl5.textContent = data.daily[5].humidity;



} 