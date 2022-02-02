  const key = 'a36715b7289d49ee08223b849dbb2c64';
  
  var cityInput = document.getElementById("userInput");
  var cityHistoryList = document.getElementById("cityList");
  var city = document.getElementById('location');
  // dsd
  var desc = document.getElementById('desc');
  var button = document.getElementById('submitButton');
  let lat;
  let lon;

  button.addEventListener('click', function(event) {
    event.preventDefault();

   
    fetch('http://api.openweathermap.org/geo/1.0/direct?q='+cityInput.value+'&appid='+key)
    .then(function(response) { return response.json() }) 
    .then(function(data) {
      console.log(data)

    })
    .catch(function() {
    })

    console.log(response.body);
  
  
  
  
    // store();
    
    

  //   fetch('https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid='+key)
  //   .then(function(response) { return response.json() }) 
  //   .then(function(data) {
  //     console.log(data)
  //   })
  //   .catch(function() {
  //   })
  //   store();
  // })

});


  
  
  
  // function store() {
    
  //   var cityArr = JSON.parse(localStorage.getItem("city")) || [];
  //   let temp = cityInput.value;
  
  //   cityArr.push(temp);
  //   console.log(cityArr);

  // localStorage.setItem('city', JSON.stringify(cityArr));
  // }