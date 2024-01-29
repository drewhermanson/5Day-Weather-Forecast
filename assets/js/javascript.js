//names to cords
//http://api.openweathermap.org/geo/1.0/direct?q={city name}&limit={1}&appid={d5d879a5a7dac48b5c30575d2453e07b}
//5day api
//api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&units=imperial&appid={d5d879a5a7dac48b5c30575d2453e07b}

var searchformEl = document.querySelector('#searchForm');
var searchButton = document.querySelector('#searchBtn');
var currentDay = document.querySelector('#weather-container');
var fiveDay = document.querySelector('#fiveDayForecast');

var formSubmission = function(event) {
    event.preventDefault();
    var city = document.querySelector('#searchForm').value.trim();

    if (city) {
        localStorage.setItem('city', city);

        getGeoCode(city);
    } else {
        alert('Please enter a city name');
    }
}

var getGeoCode = function(city) {
    var geoUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=d5d879a5a7dac48b5c30575d2453e07b";
   

    fetch(geoUrl).then(function (response){
        if (response.ok) {
            response.json().then(function (cords) {
                getWeather(cords[0].lat, cords[0].lon);
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    });
}

var getWeather = function(lat, lon) {
    var lat = lat;
    var lon = lon;

    var apiUrl = 
    "http://api.openweathermap.org/data/2.5/forecast?&lat=" + lat + "&lon=" + lon + "&units=imperial&appid=d5d879a5a7dac48b5c30575d2453e07b";


    fetch(apiUrl).then(function (response){
        if (response.ok) {
            response.json().then(function (weather) {
                displayWeather(weather)
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    });

}


    searchButton.addEventListener('click', formSubmission);
