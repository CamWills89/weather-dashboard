//query my containers
var searchFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#search");
var currentCityEl = document.querySelector("#current-city");
var currentTempEl = document.querySelector("#current-temp");
var currentHumidityEl = document.querySelector("#current-humidity");
var currentWindSpeedEl = document.querySelector("#current-wind-speed");
var currentUVIEl = document.querySelector("#current-UVI");
var currentCityIconEl = document.querySelector("#icon");
var fiveDayWeatherContainerEl = document.querySelector("#five-day-weather");

// console.log(fiveDayWeatherContainerEl);

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
    searchHistory(cityName);
    cityInputEl.value = "";
  } else {
    document.location.replace("./index.html");
  }

  localStorage.setItem("city", cityName)
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
      currentUVIEl.textContent = currentUvIndex;

      //display appropriate color according to UVI severity
      if (currentUvIndex < 4) {
        currentUVIEl.classList = "favorable";
      } else if (currentUvIndex > 4 && currentUvIndex < 7) {
        currentUVIEl.classList = "moderate";
      } else if (currentUvIndex > 7) {
        currentUVIEl.classList = "severe";
      }
    });
};

var displayWeather = function (cityWeather) {
  //get icon
  var iconCode = cityWeather.weather[0].icon;
  var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
  // console.log(iconUrl);
  currentCityIconEl.setAttribute("src", iconUrl);

  //convert UNIX date timestamp into readable format
  var currentDate = moment.unix(cityWeather.dt).format("MM/DD/YYYY");

  //cityName and date added to the page
  currentCity = cityWeather.name + " " + currentDate;
  //console.log(currentCity);
  currentCityEl.textContent = currentCity;

  //getting temperature
  var cityTemperature = cityWeather.main.temp;
  currentTempEl.textContent = cityTemperature;
  //   console.log(cityTemperature);

  //getting humidity
  var cityHumidity = cityWeather.main.humidity;
  currentHumidityEl.textContent = cityHumidity;
  //   console.log(cityHumidity);

  //getting wind speed
  var cityWindSpeed = cityWeather.wind.speed;
  currentWindSpeedEl.textContent = cityWindSpeed;
  //   console.log(cityWindSpeed);

  //display uv index
  getUvIndex(cityWeather);
};

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
  //display first day of forecast
  //convert UNIX date timestamp into readable format
  var currentDate = moment.unix(cityWeather.list[0].dt).format("MM/DD/YYYY");
  //get icon
  var iconCode = cityWeather.list[0].weather[0].icon;
  var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
  //getting temperature
  var cityTemperature = cityWeather.list[0].main.temp;
  //getting humidity
  var cityHumidity = cityWeather.list[0].main.humidity;
  //update
  $("#current-city-date1").text(currentDate);
  $("#icon1").attr("src", iconUrl);
  $("#current-temp1").text(cityTemperature);
  $("#current-humidity1").text(cityHumidity);

  //display second day of forecast
  //convert UNIX date timestamp into readable format
  var currentDate = moment.unix(cityWeather.list[1].dt).format("MM/DD/YYYY");
  //get icon
  var iconCode = cityWeather.list[1].weather[0].icon;
  var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
  //getting temperature
  var cityTemperature = cityWeather.list[1].main.temp;
  //getting humidity
  var cityHumidity = cityWeather.list[1].main.humidity;
  //update
  $("#current-city-date2").text(currentDate);
  $("#icon2").attr("src", iconUrl);
  $("#current-temp2").text(cityTemperature);
  $("#current-humidity2").text(cityHumidity);

  //display third day of forecast
  //convert UNIX date timestamp into readable format
  var currentDate = moment.unix(cityWeather.list[2].dt).format("MM/DD/YYYY");
  //get icon
  var iconCode = cityWeather.list[2].weather[0].icon;
  var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
  //getting temperature
  var cityTemperature = cityWeather.list[2].main.temp;
  //getting humidity
  var cityHumidity = cityWeather.list[2].main.humidity;
  //update
  $("#current-city-date3").text(currentDate);
  $("#icon3").attr("src", iconUrl);
  $("#current-temp3").text(cityTemperature);
  $("#current-humidity3").text(cityHumidity);

  //display fourth day of forecast
  //convert UNIX date timestamp into readable format
  var currentDate = moment.unix(cityWeather.list[3].dt).format("MM/DD/YYYY");
  //get icon
  var iconCode = cityWeather.list[3].weather[0].icon;
  var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
  //getting temperature
  var cityTemperature = cityWeather.list[3].main.temp;
  //getting humidity
  var cityHumidity = cityWeather.list[3].main.humidity;
  //update
  $("#current-city-date4").text(currentDate);
  $("#icon4").attr("src", iconUrl);
  $("#current-temp4").text(cityTemperature);
  $("#current-humidity4").text(cityHumidity);

  //display fifth day of forecast
  //convert UNIX date timestamp into readable format
  var currentDate = moment.unix(cityWeather.list[4].dt).format("MM/DD/YYYY");
  //get icon
  var iconCode = cityWeather.list[4].weather[0].icon;
  var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
  //getting temperature
  var cityTemperature = cityWeather.list[4].main.temp;
  //getting humidity
  var cityHumidity = cityWeather.list[4].main.humidity;
  //update
  $("#current-city-date5").text(currentDate);
  $("#icon5").attr("src", iconUrl);
  $("#current-temp5").text(cityTemperature);
  $("#current-humidity5").text(cityHumidity);
};

//store search history in local storage
//display search history in search history container
//enable it to be selected to display weather

var searchHistory = function(cityName) {
 var city = localStorage.getItem("city")
  // console.log(typeof city);
  var ListEL = document.createElement("li")
  ListEL.textContent = city;
console.log(ListEL);
  $("#search-history").append(ListEL);
}

var display = function() {
  
}
//event listeners
searchFormEl.addEventListener("submit", searchHandler);
