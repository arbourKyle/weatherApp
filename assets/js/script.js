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
var city;

var today  = new Date();
dateObj = today.toLocaleDateString("en-US");
// console.log(dateEl)

let nextDay = moment().add(24, 'hours').format('M/DD/YYYY');
let day2 = moment().add(2, 'days').format('M/DD/YYYY');
let day3 = moment().add(3, 'days').format('M/DD/YYYY');
let day4 = moment().add(4, 'days').format('M/DD/YYYY');
let day5 = moment().add(5, 'days').format('M/DD/YYYY');


//click the submit button and call 2 funcs--LatLon and Format city name
document.getElementById('submitButton').addEventListener('click', function(event) {
  event.preventDefault()
  let city = cityInput.value
  formatCityNames(city); //format the name given to capitalize the first letter
  fetchLatLon(city);
});
  
//Fetch lat and lon 
function fetchLatLon(city){
  fetch('http://api.openweathermap.org/geo/1.0/direct?q='+city+'&appid='+key)
  .then(function(response) { return response.json() }) 
  .then(function(data) {
    // console.log(data)
    
    weather(data)     //call the weather fetch on response   
  })
  .catch(function() {
  })
} // end of fetch coordinates

// weather fetch
function weather(data) {  
  let lat = data[0].lat
  let lon = data[0].lon
  
  fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&current.weather.icon&units=metric&exclude=minutely&exclude=hourly&appid='+key)
  .then(function(response) { return response.json() }) 
  .then(function(data) {
    console.log(data)
    todayCard(data, city, formatName)  //calling the display weather function after data is retrieved
    forecast(data)              //calling forecast function
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


function storeCityName(formatName) {
  
  var cityArr = JSON.parse(localStorage.getItem("city")) || [];
  let tempArr = formatName;
  cityArr.push(tempArr);
  
//the city name is set here
  localStorage.setItem('city', JSON.stringify(cityArr));

  cityHistory(cityArr, formatName);      //calling the list append function

} //end of storing city name func


//display the name of city in a today card
function todayCard (data, city, formatName) {
  formatName = cityInput.value;
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
} //end of today card func

//the history list below the search bar
function cityHistory(cityArr, formatName, event) {
  console.log(formatName)
  
  let listItem = document.createElement('p');
  listItem.textContent = formatName;
  listItem.id = formatName;
  cityHistoryList.appendChild(listItem);
  

  listItem.addEventListener('click', function(event){

        if(event.target == this) {
          cityInput.value = event.target.id;
          fetchLatLon(event.target.id);
        }
        console.log(event.target.id);
  })
  
} //end of history list func


//the 5 day forecast
function forecast(data) {
  // console.log(formatName)
    
  //day 1
  let timeEl1 = document.querySelector('#time1');
  let tempEl1 = document.querySelector('#temp1');
  let windEl1 = document.querySelector('#wind1');
  let humidEl1 = document.querySelector('#humid1');

  
  
  timeEl1.textContent = nextDay;
  tempEl1.textContent = data.daily[1].temp.day;
  windEl1.textContent = data.daily[1].wind_speed;
  humidEl1.textContent = data.daily[1].humidity;
  
  
  var iconEl1 = document.querySelector('#icon1');
  var iconUrl1 = `http://openweathermap.org/img/wn/${data.daily[1].weather[0].icon}.png`;
  iconEl1.setAttribute('src', iconUrl1);
  
  //day2
  let timeEl2 = document.querySelector('#time2');
  let tempEl2 = document.querySelector('#temp2');
  let windEl2 = document.querySelector('#wind2');
  let humidEl2 = document.querySelector('#humid2');
  
  timeEl2.textContent = day2;
  tempEl2.textContent = data.daily[2].temp.day;
  windEl2.textContent = data.daily[2].wind_speed;
  humidEl2.textContent = data.daily[2].humidity;
  
  const iconEl2 = document.querySelector('#icon2');
  const iconUrl2 = `http://openweathermap.org/img/wn/${data.daily[2].weather[0].icon}.png`;
  iconEl2.setAttribute('src', iconUrl2);
 

//day3
let timeEl3 = document.querySelector('#time3');
let tempEl3 = document.querySelector('#temp3');
let windEl3 = document.querySelector('#wind3');
let humidEl3 = document.querySelector('#humid3');

  timeEl3.textContent = day3;
  tempEl3.textContent = data.daily[3].temp.day;
  windEl3.textContent = data.daily[3].wind_speed;
  humidEl3.textContent = data.daily[3].humidity;

  let iconEl3 = document.querySelector('#icon3');
  let iconUrl3 = `http://openweathermap.org/img/wn/${data.daily[3].weather[0].icon}.png`;
  iconEl3.setAttribute('src', iconUrl3);

//day4
let timeEl4 = document.querySelector('#time4');
let tempEl4 = document.querySelector('#temp4');
let windEl4 = document.querySelector('#wind4');
let humidEl4 = document.querySelector('#humid4');

  timeEl4.textContent = day4;
  tempEl4.textContent = data.daily[4].temp.day;
  windEl4.textContent = data.daily[4].wind_speed;
  humidEl4.textContent = data.daily[4].humidity;

  let iconEl4 = document.querySelector('#icon4');
  let iconUrl4 = `http://openweathermap.org/img/wn/${data.daily[4].weather[0].icon}.png`;
  iconEl4.setAttribute('src', iconUrl4);

//day5
let timeEl5 = document.querySelector('#time5');
let tempEl5 = document.querySelector('#temp5');
let windEl5 = document.querySelector('#wind5');
let humidEl5 = document.querySelector('#humid5');

  timeEl5.textContent = day5;
  tempEl5.textContent = data.daily[5].temp.day;
  windEl5.textContent = data.daily[5].wind_speed;
  humidEl5.textContent = data.daily[5].humidity;

  let iconEl5 = document.querySelector('#icon5');
  let iconUrl5 = `http://openweathermap.org/img/wn/${data.daily[5].weather[0].icon}.png`;
  iconEl5.setAttribute('src', iconUrl5);


} //end of 5 day func