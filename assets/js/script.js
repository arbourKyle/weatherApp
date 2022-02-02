  const key = 'a36715b7289d49ee08223b849dbb2c64';
  
  var cityInput = document.getElementById("userInput");
  var cityHistoryList = document.getElementById("cityList");
  var city = document.getElementById('location');
  var temp = document.getElementById('temp');
  var desc = document.getElementById('desc');
  var button = document.getElementById('submitButton');

  button.addEventListener('click', function(event) {
    event.preventDefault();

    fetch('https://api.openweathermap.org/data/2.5/weather?q='+cityInput.value+'&appid='+key)
    .then(function(response) { return response.json() }) 
    .then(function(data) {
      console.log(data)
    })
    .catch(function() {
    })
  })
  
  
  cityArr = [];
  temp = cityInput.value;
  console.log(temp);
  
  function store() {
    for(var i = 0;i<temp.length; i++);
    cityArr.push[i];
    console.log(store(i))
    
  }
  
  store();