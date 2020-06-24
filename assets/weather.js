
// This is our API key:
let APIKey = "aee00fff2bc5d505beb8a8f7330dfaaf";



// // The variable cityName is linked to the input from the search bar on the html.
    
//     let cityName = $("#searchBar").val();
//     $("#searchBar").keypress(function(event){
        
//         if (event.keyCode === 13) {
//             event.preventDefault();
//             $("#searchBtn").click();
//         }
//     });


//   // Create the function that occurs once the Search Button is clicked.
//   $("#searchBtn").on("click", function(){

//                 //This code makes the forecast header visible:
//                 $("#fiveDayHeader").addClass('show');

//                 // Stores the city name that the user entered into a variable used to retrieve weather data for that particular city:
//                 cityName = $("#searchBar").val();
//                 // Clear the search bar:
//                 $("#searchBar").val("");

//                 listCities(cityName);
//                 currentForecast(cityName);
//                 weeklyForecast(cityName);  

//     });

let cityName = "Asheville";

// The URL that contains the current weather conditions:
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
    console.log("Current Conditions Forecast URL: " + queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
})
// We store all of the retrieved data inside of an object called "response":
.then(function (response) {
    currentForecast(response);
    weeklyForecast(response);
    listCities();
});


// Create Function that shows a list of the cities you've searched for below the search bar:
function listCities() {

    let listItem = $("<li>").addClass("list-group-item").text(cityName);
    $(".list").append(listItem);

}; 


// Function to display current weather conditions:
function currentForecast(response) {

            console.log("Current Weather Object: " + JSON.stringify(response));

            // Build the HTML elements that Weather API data will be hooked up to:

            var currentCard = $("<div>").addClass("card");
            var currentCardBody = $("<div>").addClass("card-body");
            var currentCity = $("<h4>").addClass("city card-title");
            var currentDate = $("<h4>").addClass("currentDate card-title");
            var currentTemp = $("<p>").addClass("tempF");
            var currentHumidity = $("<p>").addClass("humidity");
            var currentWind = $("<p>").addClass("wind");
            var currentUVIndex =$("<p>").addClass("uvindex");

            //Append the elements together and join them to the Webpage:
            $("#currentForeCast").append(currentCard);
            $(currentCard).append(currentCardBody);
            $(currentCardBody).append(currentCity, currentTemp, currentHumidity, currentWind, currentUVIndex);
            $(currentCity).append(currentDate);


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
            $.ajax({
                url: queryUVURL,
                method: "GET"
                })

            // We store the UV data inside an object and then display the data on the webpage:
            .then(function (response) {
                var uv = response.value;
                //Hook the value of the UV index to the HTML
                $(".uvindex").text("UV Index: " + uv);
                console.log("UV Index: " + uv);
            });

    };



// First we build the URL from which to recieve the 5 day weather forecast:
var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey;
    console.log("5 Day Forecast URL: " + fiveDayURL);

// In this section we will build the 5 day weather forecast section:
function weeklyForecast() {

        // Now we do an Ajax call to turn the 5 day weather data into an object that can be used by the webpage.
        $.ajax({
            url: fiveDayURL,
            method: "GET",
        })

        .then(function (fiveDayForecast){

            //We create a loop to pull data from each day of the 5-day forecast and insert each day in its own individual card.
            for (let i = 1; i < fiveDayForecast.length; i += 8) {

                var currentDay=fiveDayForecast.list[i];
                console.log("5 Day Forecast: " + JSON.stringify(currentDay));

                var date = new Date(fiveDayForecast.list[i].dt * 1000);
                    var day = date.getDate();
                    var month = date.getMonth() + 1;
                    var year = date.getFullYear();

                console.log("Date: " + month + "/" + day + "/" + year);

                let cloud = [];
                let temp = [];
                let humidity = [];

                // get the temperature and convert to fahrenheit:
                let fiveDayTemp = (fiveDayForecast[i].main.temp - 273.15) * 1.80 + 32;
                tempF = Math.floor(fiveDayTemp);
            }
                
        });

};



        



















