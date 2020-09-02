//query my containers
var searchFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#search");
var weatherContainerEl = document.querySelector("#weather-dash");
var currentCityEl = document.querySelector("#current-city");
var currentCityIconEl = document.querySelector("#icon");
// console.log(currentCityIconEl);

//fetch api for current day weather, include error checks.
//link search form to fetch city
//create dynamic html for all the data I need to display
//append it to weather dash container
//clear search box
var getCityWeather = function (cityName) {
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&units=imperial" +
    "&appid=729f5bb07186b173f99eddc857ac24ca";

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayWeather(data, cityName);
      });
    } else {
      // if not successful, redirect to homepage
      document.location.replace("./index.html");
    }
  });
};

var searchHandler = function (event) {
  event.preventDefault();

  //get search value
  var cityName = cityInputEl.value.trim();

  if (cityName) {
    getCityWeather(cityName);
    cityInputEl.value = "";
  } else {
    alert("Please enter a City Name");
  }
};

var getUvIndex = function (){
     //getting UV Index
 var currentLat = cityWeather.coord.lat;
 var currentLon = cityWeather.coord.lon;
 var uvIndex = "http://api.openweathermap.org/data/2.5/uvi?appid=729f5bb07186b173f99eddc857ac24ca&lat=" + currentLat + "&lon=" + currentLon;
    var j = fetch(uvIndex).then(function(response) {
  response.json().then(function(data) {
    console.log(data.value);
  });
});
}

var displayWeather = function (cityWeather) {
  // clear old content
  weatherContainerEl.textContent = "";

  //convert UNIX date timestamp into readable format
  var currentDate = moment.unix(cityWeather.dt).format("MM/DD/YYYY");

  //get icon
  var iconCode = cityWeather.weather[0].icon;
  var iconImage = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
  // console.log(iconImage);
  currentCityIconEl.setAttribute("src", iconImage);
//   console.log(currentCityIconEl);

  //cityName and date added to the page
  currentCity = cityWeather.name + " " + currentDate;
//   console.log(currentCity);
  currentCityEl.textContent = currentCity;
  weatherContainerEl.appendChild(currentCityEl);

  //getting temperature
  var cityTemperature = cityWeather.main.temp;
//   console.log(cityTemperature);
  var cityTemperatureEl = document.createElement("h3");
  cityTemperatureEl.textContent = "Temperature: " + cityTemperature + "℉";
  weatherContainerEl.appendChild(cityTemperatureEl);

  //getting humidity
  var cityHumidity = cityWeather.main.humidity;
//   console.log(cityHumidity);
  var cityHumidityEl = document.createElement("h3");
  cityHumidityEl.textContent = "Humidity: " + cityHumidity + "℉";
  weatherContainerEl.appendChild(cityHumidityEl);
  +"%";

  //getting wind speed
  var cityWindSpeed = cityWeather.wind.speed;
//   console.log(cityWindSpeed);
  var cityWindSpeedEl = document.createElement("h3");
  cityWindSpeedEl.textContent = "Wind Speed: " + cityWindSpeed + "℉";
  weatherContainerEl.appendChild(cityWindSpeedEl);
  +"MPH";

};


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
