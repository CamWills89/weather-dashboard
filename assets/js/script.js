//query my containers
var searchFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#search");
var weatherContainerEl = document.querySelector("#weather-dash");
var currentCityEl = document.querySelector("#current-city");
var currentCityForecEl = document.querySelector("#current-city-forecast");
var currentCityIconEl = document.querySelector("#icon");
var fiveDayWeatherContainerEl = document.querySelector("#five-day-weather");
// console.log(fiveDayWeatherContainerEl);

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
    getFiveDayWeather(cityName);
    cityInputEl.value = "";
  } else {
    document.location.replace("./index.html");
  }
};

var getUvIndex = function (cityWeather) {
  //getting UV Index
  var currentLat = cityWeather.coord.lat;
  var currentLon = cityWeather.coord.lon;
  var uvApiUrl =
    "http://api.openweathermap.org/data/2.5/uvi?appid=729f5bb07186b173f99eddc857ac24ca&lat=" +
    currentLat +
    "&lon=" +
    currentLon;
  var uvIndex = fetch(uvApiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var currentUvIndex = data.value;
      
      var cityUvIndexEl = document.createElement("h3");
      cityUvIndexEl.textContent = "UV Index: " + currentUvIndex;
      weatherContainerEl.appendChild(cityUvIndexEl);

      //display appropriate color according to UVI severity
      if (currentUvIndex < 4) {
        cityUvIndexEl.classList = "favorable";
      } else if (currentUvIndex > 4 && currentUvIndex < 7) {
        cityUvIndexEl.classList = "moderate";
      } else if (currentUvIndex > 7) {
        cityUvIndexEl.classList = "severe";
      }
    });
};

var displayWeather = function (cityWeather) {
  // clear old content
  weatherContainerEl.textContent = "";

  //get icon
  var iconCode = cityWeather.weather[0].icon;
  var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
  // console.log(iconUrl);
  currentCityIconEl.setAttribute("src", iconUrl);
  // console.log(currentCityIconEl);

  //convert UNIX date timestamp into readable format
  var currentDate = moment.unix(cityWeather.dt).format("MM/DD/YYYY");

  //cityName and date added to the page
  currentCity = cityWeather.name + " " + currentDate;
  //console.log(currentCity);
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

  getUvIndex(cityWeather);
};


//fetch api for 5-day weather, include error checks.
//link search form to fetch city
//create dynamic html for all the data I need to display in 5 boces/cards
//append it to weather dash container
//clear search box

//store search history in local storage
//display search history in search history container
//enable it to be selected to display weather
var getFiveDayWeather = function (cityName) {
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityName +
    "&units=imperial" +
    "&appid=729f5bb07186b173f99eddc857ac24ca";

  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      displayFiveDayWeather(data, cityName);
    });
};

var displayFiveDayWeather = function (cityWeather) {
  // clear old content
  fiveDayWeatherContainerEl.textContent = "";
  //convert UNIX date timestamp into readable format
  var currentDate = moment.unix(cityWeather.list[0].dt).format("MM/DD/YYYY");
  console.log(currentDate);
  var iconCode = cityWeather.list[0].weather[0].icon;
  var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
  console.log(iconUrl);

  //getting temperature
  var cityTemperature = cityWeather.list[0].main.temp;
  console.log(cityTemperature);

  //getting humidity
  var cityHumidity = cityWeather.list[0].main.humidity;
  console.log(cityHumidity);
};

//event listeners
searchFormEl.addEventListener("submit", searchHandler);
