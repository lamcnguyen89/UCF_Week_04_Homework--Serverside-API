
// This is our API key:
let APIKey = "aee00fff2bc5d505beb8a8f7330dfaaf";

//This is our location variable and DOM setup thingy...
// The variable is linked to the input from the search bar on the html.
let cityName = "Orlando,Florida"

function currentWeather (response) {
    // In this section we are building the code for the row that will display the current day forecast for a particular location.
        // Here we are building the URL we need to query the database for the current day weather forecast
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;

        console.log("queryURL: " + queryURL);

        // Here we run our AJAX call the current day weather forecast from the server and turn it into an object to be used by the webpage.
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            // We store all of the retrieved data inside of an object called "response":
            .then(function (response) {

                // Log the resulting object to be able to look at the object and know the data to pull from and where its located on the index.
                console.log(response);

                //Pulls and displays the name of the city from the object
                $(".city").html("<h1>" + response.name + " Weather Details</h1>");
                // Pulls and displays the humidity data from the object
                $(".humidity").text("Humidity: " + response.main.humidity + "%");

                // Pulls temp data in Kelvin, converts to Fahrenheit, and displays the temperature in Fahrenheit on the webpage.
                var tempF = (response.main.temp - 273.15) * 1.80 + 32;
                $(".tempF").text("Temperature (F) " + tempF.toFixed(2));
                // Pulls and displays the windspeed from the object.
                $(".wind").text("Wind Speed: " + response.wind.speed + " MPH");   

                // Since the UV index isn't in the object, we have to call it separately:
                let lat = response.coord.lat;
                let lon = response.coord.lon;

                var queryUVURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lat + "&lon=" + lon;

                // The return function makes something available outside of a function. But anything underneath the return will not be available.
                //Call ajax to retrieve the UV data from the server and return it outside the function for use globally.
                return $.ajax({
                    url: queryUVURL,
                    method: "GET"
                    })
            })

            // We store the UV data inside an object and then display the data on the webpage:
            .then(function (uvResponse) {
                var uv = uvResponse.value;
                //Hook the value of the UV index to the HTML
                $(".uvindex").text("UV Index: " + uv);
                console.log("UV Index: " + uv);
            });
};

// In this section we will build the 5 day weather forecast section:


        // First we build the URL from which to recieve the 5 day weather forecast:
        var fiveDayURL = "api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey;

        console.log("5 Day Forecast URL: " + fiveDayURL);

        // Now we do an Ajax call to turn the 5 day weather data into an object that can be used by the webpage.
        $.ajax({
            url: fiveDayURL,
            method: "GET"
        })
        
        // .then(function (fiveDayForecast){

        //     console.log(fiveDayForecast);

            // We create a loop to pull data from each day of the 5-day forecast and insert each day in its own individual card.
            // for (let i = 1; i < fiveDayForecast.length; i += 8) {

             

                // var currentDay=fiveDayForecast.list[i];

                // var date = new Date(fiveDayForecast.list[i].dt * 1000);
                //     var day = date.getDate();
                //     var month = date.getMonth() + 1;
                //     var year = date.getFullYear();

                //     console.log("Date: " + month + "/" + day + "/" + year);

                // let cloud = [];
                // let temp = [];
                // let humidity = [];

                
                
            // });



        



















