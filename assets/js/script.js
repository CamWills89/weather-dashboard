//query my containers
var searchFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#search");
// console.log(cityInputEl);

//fetch api for current day weather, include error checks.
//link search form to fetch city
//create dynamic html for all the data I need to display
//append it to weather dash container
//clear search box
var getCityWeather = function(cityName) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=729f5bb07186b173f99eddc857ac24ca";
    
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
            console.log(data);
            })
        } else {
            // if not successful, redirect to homepage
            document.location.replace("./index.html");
          }
    })
  };

var searchHandler = function(event) {
    event.preventDefault();
    
    //get search value
    var cityName = cityInputEl.value.trim();

    if (cityName) {
        getCityWeather(cityName);
        cityInputEl.value = "";
      } else {
        alert("Please enter a City Name");
      }
}
//fetch api for 5-day weather, include error checks.
//link search form to fetch city
//create dynamic html for all the data I need to display in 5 boces/cards
//append it to weather dash container
//clear search box

//store search history in local storage
//display search history in search history container
//enable it to be selected to display weather

//event listeners
searchFormEl.addEventListener("submit", searchHandler);