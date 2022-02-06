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
  
  //submit button click
  
  document.getElementById('submitButton').addEventListener('click',  function (event) {
    event.preventDefault();
    
     getCityInfo(cityInput.value)
     popCities();
     storeCityName();
     populateWeather();
  }); //end of click init func

//fetch the lat and long of users city
function getCityInfo(city){
    fetch('http://api.openweathermap.org/geo/1.0/direct?q='+city+'&appid='+key)
    .then(function(response) { return response.json() }) 
    .then(function(data) {
      console.log(data)
      
      sessionStorage.setItem('lat', data[0].lat)
      sessionStorage.setItem('lon', data[0].lon)
      
      weather();
    })
    .catch(function() {
    })
  } //End of lat and long func
  
//fetch the weather of a given location
function weather() {
  let lat = sessionStorage.getItem('lat');
  let lon = sessionStorage.getItem('lon');
  console.log(lat, lon);

  fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&current.weather.icon&units=metric&appid='+key)
  .then(function(response) { return response.json() }) 
  .then(function(data) {
    console.log(data.current)
    sessionStorage.setItem('temp', data.current.temp)
    sessionStorage.setItem('wind', data.current.wind_speed)
    sessionStorage.setItem('humid', data.current.humidity)
    sessionStorage.setItem('uv', data.current.uvi)
    sessionStorage.setItem('icon', data.current.weather[0].icon)
    sessionStorage.setItem('icon2', data.current.weather[1].icon)
  })
  .catch(function() {
  })
} //end of weather func


// localStorage the name of city and calls the function to display the city
  function storeCityName() {
    
    var cityArr = JSON.parse(localStorage.getItem("city")) || [];
    let temp = cityInput.value;
  
    cityArr.push(temp);
    console.log(cityArr);

  //the city name is set here
    localStorage.setItem('city', JSON.stringify(cityArr));
    
    
    
  } //end of store func

  
//displays the cities in a history list that can be clicked on
  function popCities() {
    /* var cityArr2 = JSON.parse(localStorage.getItem("city"))
  
  //create and append city names to boxes

    city = cityArr2[cityArr2.length -1];
    
    let displayC = document.createElement('div');
    displayC.className = "cityButton";
    displayC.style = 'border: 1px solid black; margin: 0.5rem 0 0.5rem 0; cursor: pointer;';
    displayC.textContent = city;
    
    cityHistoryList.append(displayC);

  //convert appended boxes to clickable items

  let savedBtns = document.getElementsByClassName('cityButton');

  for(let i =0; i < savedBtns.length; i++) {
    savedBtns[i].addEventListener('click', function (event) {
      let btnText = this.textContent;
      console.log(this);
      
      getCityInfo(btnText)
      weather();
      populateWeather();
          
    }) //End of list click func
  } //end of first for loop
 */
  // populateWeather();
} //end of popCities func

//function to format user input city to uppercase the first letter of each word


function populateWeather() {
  
  let temp =  sessionStorage.getItem('temp');
  let wind =  sessionStorage.getItem('wind');
  let humid = sessionStorage.getItem('humid');
  let uv =    sessionStorage.getItem('uv');
  let icon =  sessionStorage.getItem('icon');
  let iconEl = document.createElement('img');
  
  let iconUrl =  `http://openweathermap.org/img/wn/${icon}.png`;
  console.log(icon)
  
  
  //display content to today card
  formatName = cityInput.value.toLowerCase().split(' ');
  for (let i = 0; i < formatName.length; i++) {
    formatName[i] = formatName[i][0].toUpperCase() + formatName[i].substr(1);
  }
  let newName = formatName.join(' ');
  
  cityEl.innerText = newName;
  console.log(cityEl);
  
  
  
  tempEl.textContent = temp;
  windEl.textContent = wind;
  humidEl.textContent = humid;
  uvEl.textContent = uv;
  iconEl.setAttribute('src', iconUrl);
  document.getElementById('location').append(iconEl)
  

} //end of populateweather func