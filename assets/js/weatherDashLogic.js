
var lat = 33.44
var lon = -94.04
var getWeatherData = function () {
    var weatherAPI = 'https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={f16d7083a167785de27297dbf5a2e73c}';
    fetch(weatherAPI).then(function (response) {
        console.log(response);
        if (response.ok) {
            response.json().then(function (data) {
                renderItem(data);
            });
        } else {
            alert("input invalid");
            return;
        }

    })
        .then(function (data) {
            (data)
            console.log(data)

        });
};

getWeatherData();
