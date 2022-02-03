  const key = 'a36715b7289d49ee08223b849dbb2c64';
  

  // let today = moment(DD, MMM, do)
  let cityInput = document.getElementById("userInput");
  let cityHistoryList = document.getElementById("cityContainer");
  
  let cityEl = document.getElementById('location');
  let tempEl = document.getElementById('temp');
  let uvEl = document.getElementById('uv');
  let humidEl = document.getElementById('humid');
  let windEl = document.getElementById('wind');




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
  }); //end of click func
  
  function weather() {
  let lat = sessionStorage.getItem('lat');
  let lon = sessionStorage.getItem('lon');
  console.log(lat, lon);

  fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&appid='+key)
  .then(function(response) { return response.json() }) 
  .then(function(data) {
    console.log(data.current)
    sessionStorage.setItem('weather', JSON.stringify(data))
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
    
    let temp = sessionStorage.getItem('weather', );
    // let wind = sessionStorage.getItem('weather', JSON.parse(data.current.wind_speed));
    // let humid = sessionStorage.getItem('weather', JSON.parse(data.current.humidity));
    // let uv = sessionStorage.getItem('weather', JSON.parse(data.current.uvi));

    cityEl.textContent = cityInput.value;
    console.log(cityEl);

    tempEl.textContent = temp.value;
    windEl.textContent = wind.value;
    humidEl.textContent = humid.value;
    uvEl.textContent = uv.value;
  }