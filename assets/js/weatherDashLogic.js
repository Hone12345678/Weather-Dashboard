
// golobal
var searchForm = document.querySelector(".citySearchInput")
var searchInput = document.querySelector("#searchInput")
var searchHist = []
var displayDataEl  = document.getElementById("displayData")

// access openweathermap api to get city coordinates base on the city name searched by the user
// corrdinets will be used (lat and Long) to make an api call that returns local weather based on location
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
            setSearchHist(city)
        })
        .catch(function (err) {
            console.log(err)
        })
};

// allows the value from the search bar to be trimmed and placed as the teplate literal in the getGetCoordinates function to obtain lat and long
var handleFormSubmit = function (event) {
    event.preventDefault()
    if (!searchInput.value) {
        return null
    }
    var searchValue = searchInput.value.trim()
    getCoordinates(searchValue);
    console.log(searchValue)
}

//event listener allowing the user to hit search and using the API calls to return data based on the city entered into the search bar
searchForm.addEventListener("submit", handleFormSubmit)

// takes the lat long data brought in by the handleFormSubmit and uses a for loop to access the 5 day forcast
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

        // dynamicly generated html from the data returned from the api call
        function renderItem(data) {
            for (let i = 0; i < data.daily.length-3; i++) {

                var weeklyForcasts = $("<div></div>");
                weeklyForcasts.addClass("col-10 card deck")

                var displayWeatherEl = $("<div></div>");
                displayWeatherEl.addClass("border border-dark col-sm-12 mb-3 bckgrnd"); 
                weeklyForcasts.appendTo(displayWeatherEl)

                var dateTimeEL = $("<div></div>");
                dateTimeEL.text(data.daily[i].dt)
                dateTimeEL.appendTo(displayWeatherEl)
                displayWeatherEl.appendTo(displayDataEl)

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


//Local Hist in progress
function setSearchHist(city) {
    searchHist.push(city)
    localStorage.setItem("search", JSON.stringify(searchHist))

}

function accessLocalStore() {
var tempStore = localStorage.getItem("search")
if (tempStore){
    
}

}


function renderSearchHist() {
    var tempStore = localStorage.getItem("search")
    }
    