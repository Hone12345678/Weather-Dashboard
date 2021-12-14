
// golobal
var searchForm = document.querySelector(".citySearchInput")
var searchInput = document.querySelector("#searchInput")
var searchHist = []
var displayDataEl  = document.getElementById("displayData")


var getCoordinates = function (city) {
    var weatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f16d7083a167785de27297dbf5a2e73c`;
    fetch(weatherAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log("data",data)
            getWeather(data);
            // renderItem(data);
            // searchHist(city)
        })
        .catch(function (err) {
            console.log(err)
        })

};

var handleFormSubmit = function (event) {
    event.preventDefault()
    if (!searchInput.value) {
        return null
    }
    var searchValue = searchInput.value.trim()
    getCoordinates(searchValue);
    console.log(searchValue)
}

searchForm.addEventListener("submit", handleFormSubmit)

function getWeather(data) {
    var lat = data.coord.lat
    var lon = data.coord.lon
    var cityName = data.name
    var apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=f16d7083a167785de27297dbf5a2e73c`
    fetch(apiURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log("data:", data)
            renderItem(data);
        })
        .catch(function (err) {
            console.log(err)
        })
        function renderItem(data) {
            for (let i = 0; i < data.daily.length; i++) {
        
                var displayWeatherEl = $("<div></div>");
                displayWeatherEl.addClass("border border-dark col-sm-12 mb-3 bckgrnd"); 

                var tempEl = $("<div></div>");
                var tempval = (data.daily[i].temp.day)
               
                    tempval = parseFloat(tempval);
                    tempval =((tempval-273.15)*1.8)+32;
                    tempEl.text("Temp:" + tempval +"F")
                  
                tempEl.appendTo(displayWeatherEl)
                displayWeatherEl.appendTo(displayDataEl)

                var windEl = $("<div></div>");
                windEl.text("wind: " + data.daily[i].wind_speed+"MPH")
                windEl.appendTo(displayWeatherEl)
                displayWeatherEl.appendTo(displayDataEl)
        
                var humidityEL = $("<div></div>");
                humidityEL.text("Humidity: " + data.daily[i].humidity+"%")
                humidityEL.appendTo(displayWeatherEl)
                displayWeatherEl.appendTo(displayDataEl)
            }
        }
        
};

// function renderItem(data) {
//     for (let i = 0; i < data.daily.length; i++) {

//         var diplayWeatherEl = $("<div></div>");
//         diplayWeatherEl.addClass("border border-dark col-sm-12 mb-3 bckgrnd");

//         var humidityEL = $("<div></div>");
//         humidityEL.text(data.daily[i].humidity)
//         humidityEL.appendTo(diplayWeatherEl)
//     }
// }







// function serchHist(city) {
//     searchHist.push(city)
//     localStorage.setItem("search", JSON.stringify(searchHist))



// }
