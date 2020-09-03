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

var cityName = "";
var cities = [];

var loadCities = function () {
 cities = JSON.parse(localStorage.getItem('cities')) || [];

  for (var i = 0; i < cities.length; i++) {
    var listEL = document.createElement("li");
    listEL.textContent = (cities[i].toUpperCase());
    $("#search-history").append(listEL)
  };
};

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
    displaySearchHistory(cityName);
    cityInputEl.value = "";
  } else {
    // document.location.replace("./index.html");
    return
  }
 
  //  if(!cities) {
  //    cities = []
  //  }

  // indexOf
   if(cities.indexOf(cityName) === -1) {
     cities.push(cityName);
     JSON.stringify(localStorage.setItem("cities", JSON.stringify(cities)));
    }else {
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
  var icon = cityWeather.weather[0].icon;
  var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
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
    .then(function (cityWeather) {
      for (var i = 0; i < 5; i++) {
        var currentDate = moment
          .unix(cityWeather.list[(i + 1) * 8 - 1].dt)
          .format("MM/DD/YYYY");
        //get icon
        var icon = cityWeather.list[(i + 1) * 8 - 1].weather[0].icon;
        var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
        //getting temperature
        var cityTemperature = cityWeather.list[(i + 1) * 8 - 1].main.temp;
        //getting humidity
        var cityHumidity = cityWeather.list[(i + 1) * 8 - 1].main.humidity;
        //update
        $("#current-city-date" + i).html(currentDate);
        $("#icon" + i).attr("src", iconUrl);
        $("#current-temp" + i).html(cityTemperature);
        $("#current-humidity" + i).html(cityHumidity);
      }
    });
};
//store search history in local storage
//display search history in search history container
//enable it to be selected to display weather

var displaySearchHistory = function (cityName) {
  // console.log(typeof city);
  if (cities.indexOf(cityName) === -1) {
    var listEL = document.createElement("li");
    listEL.textContent = (cityName.toUpperCase());
    $("#search-history").append(listEL);
  } else {
    return;
  }
};

var searchHistoryList = function (event) {
  var listEL=event.target;
  if (event.target.matches("li")){
      getCityWeather(listEL.textContent);
      getFiveDayWeather(listEL.textContent);
    }
};
//event listeners
searchFormEl.addEventListener("submit", searchHandler);
document.addEventListener("click", searchHistoryList);
loadCities();