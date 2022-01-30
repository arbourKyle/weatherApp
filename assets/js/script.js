  const key = '980b8738932c5c557956e464ec4e4651';

  var cityInput = document.getElementById("userInput");
  var city = document.getElementById('location');
  var temp = document.getElementById('temp');
  var desc = document.getElementById('desc');
  var button = document.getElementById('submitButton');

  button.addEventListener('click', function() {

    fetch('https://api.openweathermap.org/data/2.5/weather?q='+cityInput.value+'&appid='+key.value)
    .then(function(response) { return response.json() }) // Convert data to json
    .then(function(data) {
      console.log(data)
    })
    .catch(function() {
      // catch any errors
    })
  })
  