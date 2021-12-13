
var getWeatherData = function () {
    var weatherAPI = 'https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=f16d7083a167785de27297dbf5a2e73c';
    fetch(weatherAPI).then(function (response) {
        console.log(response);
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data)
            });
        } else {
            alert("input invalid");
            return;
        }

    })
      
};

getWeatherData();
