//TODO:
//initiate program with user input submit

///fetch lat and long

//fetch weather one call with lat and long

//populate a list of cities that have been searched, and repeat the fetch cycle on click

//display todays weather on a big card

//display 5 day forecast on smaller cards


//uppercase format func is tied to input, must also tie it to name of button

//submit func is not displaying

const key = 'a36715b7289d49ee08223b849dbb2c64';

$('#submitButton').on('submit', function(event) {
    event.preventDefault();
    
});

let city = ()=> $('#userInput').value;

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


 