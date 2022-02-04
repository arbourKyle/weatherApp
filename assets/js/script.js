  const key = 'a36715b7289d49ee08223b849dbb2c64';
  

  // let today = moment(DD, MMM, do)
  let cityInput = document.getElementById("userInput");
  let cityHistoryList = document.getElementById("cityContainer");
  
  let cityEl = document.getElementById('location');
  let tempEl = document.getElementById('temp');
  let uvEl = document.getElementById('uv');
  let humidEl = document.getElementById('humid');
  let windEl = document.getElementById('wind');
  let iconEl = document.getElementById('today');




  let button = document.getElementById('submitButton');
  
  
  button.addEventListener('click', function geoC(event) {
    event.preventDefault();
    
    fetch('http://api.openweathermap.org/geo/1.0/direct?q='+cityInput.value+'&appid='+key)
    .then(function(response) { return response.json() }) 
    .then(function(data) {
      console.log(data)
      
      sessionStorage.setItem('lat', data[0].lat)
      sessionStorage.setItem('lon', data[0].lon)
      
      weather();
    })
    .catch(function() {
    })
    store();
  }); //end of click init geo func
  
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
  
  function store() {
    
    var cityArr = JSON.parse(localStorage.getItem("city")) || [];
    let temp = cityInput.value;
  
    cityArr.push(temp);
    console.log(cityArr);
    localStorage.setItem('city', JSON.stringify(cityArr));
    
    popCities();
    
  } //end of store func
  
  function popCities() {
    var cityArr = JSON.parse(localStorage.getItem("city"))
  
  //create and append city names to boxes

    newArr = cityArr[cityArr.length -1];
    
    let displayC = document.createElement('div');
    displayC.style = 'border: 1px solid black; margin: 0.5rem 0 0.5rem 0;';
    let textC = document.createTextNode(newArr);

    displayC.appendChild(textC);
    cityHistoryList.appendChild(displayC);

  //convert appended boxes to clickable items
    cityHistoryList.addEventListener('click', function () {

    



}) //End of list click func

populateWeather();
  
  } //end of popCities func

  function populateWeather() {
    
    let temp =  sessionStorage.getItem('temp');
    let wind =  sessionStorage.getItem('wind');
    let humid = sessionStorage.getItem('humid');
    let uv =    sessionStorage.getItem('uv');
    let icon =  sessionStorage.getItem('icon');

    //format user input to capitalize the first letter

    let formatName = cityInput.value.toLowerCase().split(' ');

    for (let i = 0; i < formatName.length; i++) {
      formatName[i] = formatName[i][0].toUpperCase() + formatName[i].substr(1);
    }
    let newName = formatName.join(' ');
    console.log(newName);

    //display content to today card
    cityEl.textContent = newName;
    console.log(cityEl);
    
    iconEl.innerHtml = icon;

    tempEl.textContent = temp;
    windEl.textContent = wind;
    humidEl.textContent = humid;
    uvEl.textContent = uv;

} //end of populateweather func