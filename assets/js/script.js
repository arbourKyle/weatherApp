  const key = 'a36715b7289d49ee08223b849dbb2c64';
  
  var cityInput = document.getElementById("userInput");
  var cityHistoryList = document.getElementById("cityList");
  var city = document.getElementById('location');
  // dsd
  var desc = document.getElementById('desc');
  var button = document.getElementById('submitButton');
  
  
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

  fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&current.uvi'+'&appid='+key)
  .then(function(response) { return response.json() }) 
  .then(function(data) {
    console.log(data.current)
    console.log(data.current.humidity)
  })
  .catch(function() {
  })
} //end of weather func
  
  function store() {
    
    var cityArr = JSON.parse(localStorage.getItem("city")) || [];
    let temp = cityInput.value;
  
    cityArr.push(temp);
    console.log(cityArr);
    
    
    let newArr = [];
    
    if(cityArr === 1) {
      cityArr.pop();
      cityArr[0] = newArr;
    }
    else {
      
      localStorage.setItem('city', JSON.stringify(cityArr));
  }
 
  }